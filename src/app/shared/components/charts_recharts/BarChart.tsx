'use client';
import { SolarModel } from "@/app/solar/interfaces/solarmodel";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, YAxis } from "recharts";

const CustomBarChart: React.FC = () => {
    const [BarData, setBarData] = useState<SolarModel[]>([]);
    useEffect(() => {
        async function fetchData(){
            const response = await axios.get("/api/solar?dayrange=1");
            const data: SolarModel[] = [response.data[response.data.length - 1]];
            setBarData(data);
            console.log(data);
        }
        fetchData();
    }, [])


    return (
        <ResponsiveContainer width='90%' height='80%'>
            <BarChart data={BarData} margin={{ right: 20, left: 20 }}>
                <Bar dataKey={'SOLAR'} fill={`hsl(211.2, 83.2%, 53.3%)`}/>
                {/* <Bar dataKey={'GRID'} fill={'hsl(201.2, 83.2%, 53.3%)'}/> */}
                <Bar dataKey={'LOAD'} fill={'hsl(181.2, 73.2%, 53.3%)'} fillOpacity={0.3}/>
                <YAxis domain={[0,5]} unit="kW/h"/>
                <CartesianGrid vertical={false} strokeOpacity={0.3}/>
                
                <Tooltip shared={false}/>
                <Legend/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default CustomBarChart;