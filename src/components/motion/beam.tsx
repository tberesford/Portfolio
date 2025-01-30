'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatedBeam, Circle } from './setup';
import { GrActions } from "react-icons/gr";
import { GrAction } from "react-icons/gr";
import { IoCarSport } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { TbHomeEco } from "react-icons/tb";
import axios from 'axios';
import { z } from 'zod';
import SolarModels from '@/models/solarmodel';

interface AnimatedProps {
  name: string,
  flowDirection: boolean,
  containerRef: React.RefObject<HTMLDivElement | null>,
  fromRef: React.RefObject<HTMLDivElement | null>,
  toRef: React.RefObject<HTMLDivElement | null>,
  beamColor: string
}

type SolarData = z.infer<typeof SolarModels>;


function CreateAnimatedBeam(animatedProps: AnimatedProps){
  if (animatedProps.name !== "grid" && animatedProps.flowDirection === false){
    // Solar cannot import, Car cannot export
    return (
      <AnimatedBeam
        duration={0}
        containerRef={animatedProps.containerRef}
        fromRef={animatedProps.fromRef}
        toRef={animatedProps.toRef}
        reverse={animatedProps.flowDirection}
        pathColor="red"
        gradientStartColor={animatedProps.beamColor}
        gradientStopColor={animatedProps.beamColor}
        dotted
        dotSpacing={5}
      />
    )
  } else {
    return (
      <AnimatedBeam
        duration={4}
        containerRef={animatedProps.containerRef}
        fromRef={animatedProps.fromRef}
        toRef={animatedProps.toRef}
        reverse={animatedProps.flowDirection}
        pathColor="gray"
        gradientStartColor={animatedProps.beamColor}
        gradientStopColor={animatedProps.beamColor}
        dotted
        dotSpacing={5}
      />
    )
  }
}

export default function CustomBeamChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const solarRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const batteryRef = useRef<HTMLDivElement>(null);

  const [isGridExporting, setIsGridExporting] = useState(false);
  const [isCarCharging, setIsCarCharging] = useState(false);
  const [isSolar, setIsSolar] = useState(false);
  const [isBatteryCharging, setIsBatteryCharging] = useState(false);

  useEffect(() => {
    // Improve by using context / updates in real time
    // Use props instead of call
    async function fetchData(){
      const response = await axios.get("api/solar?dayrange=1");
      const data: SolarData = [response.data[response.data.length - 1]];
      const comparisonData: SolarData = [response.data[response.data.length - 2]];
      
      data[0].GRID > 0 ? setIsGridExporting(false) : setIsGridExporting(true);
      data[0].SOLAR > 0 ? setIsSolar(true) : setIsSolar(false);
      data[0].PERCENT_CHARGED > comparisonData[0].PERCENT_CHARGED ? setIsBatteryCharging(true) : setIsBatteryCharging(false);
      
      const currentTime = new Date();
      if(currentTime.getHours() > 23 || currentTime.getHours() < 5){
        setIsCarCharging(true);
      } else {
        setIsCarCharging(false);
      }
    }
    fetchData();
  }, [])


  const gridAnimatedProps: AnimatedProps = {
    name: "grid",
    flowDirection: isGridExporting,
    containerRef: containerRef,
    fromRef: gridRef,
    toRef: homeRef,
    beamColor: '#4d40ff'
  }
  const carAnimatedProps: AnimatedProps = {
    name: "car",
    flowDirection: isCarCharging,
    containerRef: containerRef,
    fromRef: carRef,
    toRef: homeRef,
    beamColor: '#4ade80'
  }
  const solarAnimatedProps: AnimatedProps = {
    name: "solar",
    flowDirection: isSolar,
    containerRef: containerRef,
    fromRef: solarRef,
    toRef: homeRef,
    beamColor: '#fde047'
  }
  const batteryAnimatedProps: AnimatedProps = {
    name: "battery",
    flowDirection: isBatteryCharging,
    containerRef: containerRef,
    fromRef: batteryRef,
    toRef: homeRef,
    beamColor: '#4338ca'
  }

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
