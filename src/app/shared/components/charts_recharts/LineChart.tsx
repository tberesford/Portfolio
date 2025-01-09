'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, Tooltip, XAxis, CartesianGrid, ResponsiveContainer, YAxis } from 'recharts';
import { CurveType } from 'recharts/types/shape/Curve';

interface CustomLineProps {
    key: string,
    type: CurveType,
    strokeWidth: number,
    dot: boolean,
    stroke: string
}

const CustomLine = (props: CustomLineProps) => {
    return <Line dataKey={props.key} type={props.type} strokeWidth={props.strokeWidth} dot={props.dot} stroke={props.stroke}/>
}

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

                <YAxis unit="%" tickMargin={8} padding={{top: 1}}/>
                
                <Tooltip labelFormatter={(value) => { 
                    const date = new Date(value);
                    const axisDate = date.toLocaleTimeString("en-GB", {month: 'short', day: 'numeric'});
                    return axisDate;
                    }}
                />

                {/* recharts currently has no method for creating components - must call the function directly */}
                {CustomLine({key: 'PERCENT_CHARGED', type: 'natural', strokeWidth: 2, dot: false, stroke: `hsl(221.2, 83.2%, 53.3%)`})}
            </LineChart>
        </ResponsiveContainer>
    )
}

export default CustomLineChart;