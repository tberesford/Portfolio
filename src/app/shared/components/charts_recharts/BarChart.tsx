'use client';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer } from "recharts";

const CustomBarChart: React.FC = () => {
    const [BarData, setBarData] = useState([]);
    useEffect(() => {
        async function fetchData(){
            const response = await axios.get("/api/solar?dayrange=1");
            setBarData(response.data);
            console.log([response.data[0], response.data[1]])
        }
        fetchData();
    }, [])


    return (
        <ResponsiveContainer>
            <BarChart data={[BarData[0], BarData[10]]} margin={{ right: 20, left: 20 }}>
                <Bar dataKey={'SOLAR'} fill="{`hsl(221.2, 83.2%, 53.3%)`}"/>
                <Bar dataKey={'GRID'} fill="{`hsl(201.2, 83.2%, 53.3%)`}"/>
                <CartesianGrid vertical={false} strokeOpacity={0.3}/>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default CustomBarChart;