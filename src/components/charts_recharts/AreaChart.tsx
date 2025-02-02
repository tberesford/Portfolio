'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip, YAxis } from "recharts";
import GetTimeLabels from "@/services/ChartService/getTimeLabels";
import { SolarArray } from "@/types/SolarTypes";

const CustomAreaChart: React.FC = () => {
    const [AreaData, setAreaData] = useState<SolarArray>([]);
    const [tickInterval, setTickInterval] = useState(1);
    useEffect(() => {
        async function fetchData(){
            const response = await axios.get("/api/solar?dayrange=1");
            setAreaData(response.data);
        }
        fetchData();
        setInterval(fetchData, (5*60*1000)); // 5 minutes?
    }, [])

    useEffect(() => {
        const updateTickInterval = () => {
        if (window.innerWidth < 640) {
            setTickInterval(7); // Show fewer ticks on small screens
        } else if(window.innerWidth < 1024){
            setTickInterval(4);
        } else {
            setTickInterval(1); // Default behavior (auto)
        }
        };

        updateTickInterval(); // Set initially
        window.addEventListener('resize', updateTickInterval);
        return () => window.removeEventListener('resize', updateTickInterval);
    }, []);

    if(!AreaData){
        return <div>Loading...</div>
    } else {
        return (
            <ResponsiveContainer width='90%' height='80%'>
                <AreaChart data={AreaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={`hsl(211.2, 83.2%, 53.3%)`} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={`hsl(211.2, 83.2%, 53.3%)`} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={'hsl(201.2, 83.2%, 53.3%)'} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={'hsl(201.2, 83.2%, 53.3%)'} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={'hsl(181.2, 73.2%, 53.3%)'} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={'hsl(181.2, 73.2%, 53.3%)'} stopOpacity={0}/>
                        </linearGradient>
                    </defs>

                    <Area dataKey={'SOLAR'} type={'bump'} stroke={'hsl(221.2, 83.2%, 53.3%)'} strokeWidth={2} fill='url(#colorSolar)' fillOpacity={0.4}/>
                    <Area dataKey={'LOAD'} type={'bump'} stroke={'hsl(201.2, 83.2%, 53.3%)'} strokeWidth={2} fill='url(#colorLoad)' fillOpacity={0.4}/>
                    <Area dataKey={'GRID'} type={'bump'} stroke={'hsl(181.2, 73.2%, 53.3%)'} strokeWidth={2} fill='url(#colorGrid)' fillOpacity={0.4}/>

                    <XAxis
                        dataKey="TS"
                        fontSize={14}
                        tickMargin={7}
                        ticks={GetTimeLabels(AreaData)}
                        interval={tickInterval}
                        tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleTimeString("en-GB", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit"
                            })
                        }}
                    />
                    <YAxis tickMargin={3} unit={'kW/h'} fontSize={14}/>

                    <Tooltip
                        labelFormatter={(value) => {
                            return new Date(value).toLocaleTimeString("en-GB", {
                            month: "short",
                            day: "numeric",
                            })
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}

export default CustomAreaChart;