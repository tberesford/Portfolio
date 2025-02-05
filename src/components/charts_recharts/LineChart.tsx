'use client';
import GetTimeLabels from '@/services/ChartService/getTimeLabels';
import { SolarArray } from '@/types/SolarTypes';
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
    return <Line dataKey={props.key} type={props.type} strokeWidth={props.strokeWidth} dot={props.dot} stroke={props.stroke} max={125}/>
}

const CustomLineChart: React.FC = () => {
    var [LineData, setLineData] = useState<SolarArray>([]);
    var [tickInterval, setTickInterval] = useState(0);
    const [angle, setAngle] = useState(0);
    const [isError, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("/api/solar?dayrange=1");
            if(response.data.status === 200){
                setLineData(response.data.data);
            } else {
                setError(response.data.error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const updateTickInterval = () => {
            if (window.innerWidth < 640) {
                setAngle(-15);
                setTickInterval(7); // Show fewer ticks on small screens
            } else if(window.innerWidth < 1024){
                setAngle(-15);
                setTickInterval(7);
            } else if(window.innerWidth < 1536){
                setTickInterval(7);
            } else {
                setTickInterval(5); // Default behavior (auto)
            }
        };

        updateTickInterval(); // Set initially
        window.addEventListener('resize', updateTickInterval);
        return () => window.removeEventListener('resize', updateTickInterval);
    }, []);
    

    if(isError) {
        return <div>{isError}</div>
    } else if(!LineData){
        return <div>Loading...</div>
    } else {
        return (
            <ResponsiveContainer width='90%' height='80%'>
                <LineChart data={LineData} margin={{ right: 20, left: 20, bottom: -angle - 5 }}>
                    <CartesianGrid vertical={false} strokeOpacity={0.3} horizontalValues={[25, 50, 75, 100]}/>
                    <XAxis 
                        dataKey='TS'
                        tickMargin={7}
                        fontSize={14}
                        angle={angle}
                        ticks={GetTimeLabels(LineData)}
                        interval={tickInterval}
                        tickFormatter={(value) => { 
                            const date = new Date(value);
                            const axisDate = date.toLocaleTimeString("en-GB", 
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                                day: "numeric",
                                month: "short"
                            });
                            return axisDate;}}
                    />
                    <YAxis unit="%" tickMargin={8} padding={{top: 5}} fontSize={14}/>
                    
                    <Tooltip labelFormatter={(value) => { 
                        const date = new Date(value);
                        const axisDate = date.toLocaleTimeString("en-GB", {month: 'short', day: 'numeric'});
                        return axisDate;
                        }}
                    />

                    {/* recharts currently has no method for creating components - must call the function directly */}
                    {CustomLine({key: 'PERCENT_CHARGED', type: 'linear', strokeWidth: 2, dot: false, stroke: `hsl(221.2, 83.2%, 53.3%)`})}
                </LineChart>
            </ResponsiveContainer>
        )
    }
}

export default CustomLineChart;