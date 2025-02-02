'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatedBeam, Circle } from './setup';
import { GrActions } from "react-icons/gr";
import { GrAction } from "react-icons/gr";
import { IoCarSport } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { TbHomeEco } from "react-icons/tb";
import axios from 'axios';
import { SolarObject } from '@/types/SolarTypes';

interface AnimatedProps {
  name: string,
  flowDirection: number, // 0 - No transmission, 1 - House is consuming, 2 - House is exporting
  containerRef: React.RefObject<HTMLDivElement | null>,
  fromRef: React.RefObject<HTMLDivElement | null>,
  toRef: React.RefObject<HTMLDivElement | null>,
  beamColor: string,
  pathColor: string
}


function CreateAnimatedBeam(animatedProps: AnimatedProps){
  const beamKey = `${animatedProps.name}${animatedProps.flowDirection}`;
  let duration;
  let reverse = false;
  let dotSpacing = 0;
  let pathColor = animatedProps.pathColor;
  
  if(animatedProps.flowDirection == 0){
    duration = 0;
    dotSpacing = 5;
    pathColor = 'gray';
  } else if(animatedProps.flowDirection == 1){
    duration = 5;
  } else if(animatedProps.flowDirection == 2){
    duration = 4;
    reverse = true;
  }

  return (
    <AnimatedBeam
      key={beamKey}
      duration={duration}
      containerRef={animatedProps.containerRef}
      fromRef={animatedProps.fromRef}
      toRef={animatedProps.toRef}
      reverse={reverse}
      pathColor={pathColor}
      gradientStartColor={animatedProps.beamColor}
      gradientStopColor={animatedProps.beamColor}
      dotted
      dotSpacing={dotSpacing}
    />
  )
}

export default function CustomBeamChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const solarRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const batteryRef = useRef<HTMLDivElement>(null);

  const [powerwallData, setPowerwallData] = useState<SolarObject>();
  const [isGridExporting, setIsGridExporting] = useState(0);
  const [isCarCharging, setIsCarCharging] = useState(0);
  const [isSolar, setIsSolar] = useState(0);
  const [isBatteryCharging, setIsBatteryCharging] = useState(0);

  useEffect(() => {
    // Improve by using context / updates in real time
    // Use props instead of call
    async function fetchData(){
      const response = await axios.get("api/solar?dayrange=1");
      const data: SolarObject = response.data[response.data.length - 1];

      setPowerwallData(data);      
    }
    fetchData();
    setInterval(fetchData, 5*60*1000);
  }, [])

  useEffect(() => {
    if(powerwallData){
      if(powerwallData.GRID == 0){
        setIsGridExporting(0);
      } else if (powerwallData.GRID > 0){
        setIsGridExporting(1);
      } else {
        setIsGridExporting(2);
      }
      powerwallData.SOLAR > 0 ? setIsSolar(1) : setIsSolar(0);

      const batteryPower = powerwallData.LOAD - powerwallData.GRID + powerwallData.SOLAR;
      if(batteryPower > 0){
        //Powerwall is discharging
        setIsBatteryCharging(2);
      } else if(batteryPower < 0){
        //Powerwall is charging
        setIsBatteryCharging(1);
      } else {
        //Powerwall is idle
        setIsBatteryCharging(0);
      }
      
      const currentTime = new Date();
      if(currentTime.getHours() > 23 || currentTime.getHours() < 5){
        setIsCarCharging(1);
      } else {
        setIsCarCharging(0);
      }
    }
  }, [powerwallData]);

  const gridAnimatedProps: AnimatedProps = {
    name: "grid",
    flowDirection: isGridExporting,
    containerRef: containerRef,
    fromRef: gridRef,
    toRef: homeRef,
    beamColor: '#2563eb',
    pathColor: '#1d4ed8'
  }
  const carAnimatedProps: AnimatedProps = {
    name: "car",
    flowDirection: isCarCharging,
    containerRef: containerRef,
    fromRef: carRef,
    toRef: homeRef,
    beamColor: '#4ade80',
    pathColor: '#22c55e'
  }
  const solarAnimatedProps: AnimatedProps = {
    name: "solar",
    flowDirection: isSolar,
    containerRef: containerRef,
    fromRef: solarRef,
    toRef: homeRef,
    beamColor: '#fde047',
    pathColor: '#facc15'
  }
  const batteryAnimatedProps: AnimatedProps = {
    name: "battery",
    flowDirection: isBatteryCharging,
    containerRef: containerRef,
    fromRef: batteryRef,
    toRef: homeRef,
    beamColor: '#059669',
    pathColor: '#047857'
  }

  if(!containerRef){
    return <div>Loading...</div>
  } else {
    return (
      <div
        className='relative flex w-full mx-auto items-center justify-center p-10'
        ref={containerRef}
      >
        <div className='flex h-full w-full flex-row items-stretch justify-between gap-10'>
          <div className='flex flex-col justify-center gap-4'>
            <Circle ref={solarRef}>
              <GrActions size={23}/>
            </Circle>
            <Circle ref={gridRef}>
              <GrAction size={23}/>
            </Circle>
          </div>
          <div className='flex flex-col justify-center gap-4'>
            <Circle ref={homeRef}>
              <IoHome size={30}/>
            </Circle>
          </div>
          <div className='flex flex-col justify-center gap-4'>
            <Circle ref={carRef}>
              <IoCarSport size={23}/>
            </Circle>
            <Circle ref={batteryRef}>
              <TbHomeEco size={23}/>
            </Circle>
          </div>
        </div>

        {CreateAnimatedBeam(solarAnimatedProps)}
        {CreateAnimatedBeam(gridAnimatedProps)}
        {CreateAnimatedBeam(carAnimatedProps)}
        {CreateAnimatedBeam(batteryAnimatedProps)}
      </div>
    );
  }
}
