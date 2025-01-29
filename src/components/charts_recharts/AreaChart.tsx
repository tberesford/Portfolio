import React, { useState, useEffect } from "react";
import axios from "axios";
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";

const CustomAreaChart: React.FC = () => {
    const [AreaData, setAreaData] = useState([]);
    useEffect(() => {
        async function fetchData(){
            const response = await axios.get("/api/solar?dayrange=1");
            setAreaData(response.data);
        }
        //Initial fetch
        fetchData();
        // Interval
        setInterval(fetchData, (5*60*1000)); // 5 minutes?
    }, [])

    return (
        <ResponsiveContainer width='90%' height='80%'>
            <AreaChart data={AreaData}>
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
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "numeric",
                            month: "short"
                        })
                    }}
                />

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

export default CustomAreaChart;