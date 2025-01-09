'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, Tooltip, XAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const CustomLineChart: React.FC = () => {
    var [LineData, setLineData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("/api/solar?dayrange=1");
            setLineData(response.data);
        }
        fetchData();
    }, []);


    return (
        <ResponsiveContainer width='90%' height='80%'>
            <LineChart data={LineData} margin={{ right: 20, left: 20 }}>
                <Line dataKey='SOLAR' type="natural" strokeWidth={3} dot={false} stroke={`hsl(221.2, 83.2%, 53.3%)`}/>
                <Line dataKey='GRID' type="natural" strokeWidth={3} dot={false} stroke={`hsl(201.2, 83.2%, 53.3%)`}/>
                <CartesianGrid vertical={false} strokeOpacity={0.3}/>
                <XAxis 
                    dataKey='TS'
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32} 
                    tickFormatter={(value) => { 
                        const date = new Date(value);
                        const axisDate = date.toLocaleTimeString("en-GB", {month: 'short', day: 'numeric'});
                        return axisDate;}}
                />
                
                <Tooltip labelFormatter={(value) => { 
                    const date = new Date(value);
                    const axisDate = date.toLocaleTimeString("en-GB", {month: 'short', day: 'numeric'});
                    return axisDate;
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default CustomLineChart;