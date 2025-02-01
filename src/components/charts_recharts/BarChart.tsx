'use client';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { SolarArray } from "@/types/SolarTypes";

const CustomBarChart: React.FC = () => {
    const [BarData, setBarData] = useState<SolarArray>([]);
    useEffect(() => {
        async function fetchData(){
            const response = await axios.get("/api/solar?dayrange=1");
            const data: SolarArray = [response.data[response.data.length - 1]];
            setBarData(data);
        }
        fetchData();
    }, [])

    if(!BarData){
        return <div>Loading...</div>
    } else {
        return (
            <ResponsiveContainer width='90%' height='80%'>
                <BarChart data={BarData} margin={{ right: 20, left: 20 }}>
                    <Bar dataKey={'SOLAR'} fill={`hsl(211.2, 83.2%, 53.3%)`} fontSize={14}/>
                    <Bar dataKey={'LOAD'} fill={'hsl(181.2, 73.2%, 53.3%)'} fontSize={14}/>
                    <YAxis domain={[0,5]} unit="kW/h" fontSize={14}/>
                    <CartesianGrid vertical={false} strokeOpacity={0.3}/>
                    
                    <Tooltip shared={false}/>
                    <Legend display={'Solar'}/>
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default CustomBarChart;