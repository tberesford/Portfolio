'use client';

import React, { useRef } from 'react';
import { AnimatedBeam, Circle } from './setup';
import { GrActions } from "react-icons/gr";
import { GrAction } from "react-icons/gr";

export default function CustomBeamChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className='relative flex w-full max-w-[500px] mx-auto items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl'
      ref={containerRef}
    >
      <div className='flex h-full w-full flex-col items-stretch justify-between gap-10'>
        <div className='flex flex-row justify-between'>
          <Circle className='p-2' ref={div1Ref}>
            <GrActions />
          </Circle>
          <Circle ref={div2Ref}>
            <GrAction />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div2Ref}
        dotted
        dotSpacing={5}
      />
    </div>
  );
}
