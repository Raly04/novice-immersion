import { Link } from 'react-router-dom'
import { Button } from "@nextui-org/react";
import React, { Suspense } from 'react';
import { useEffect, useRef } from "react";
const Spline = React.lazy(() => import('@splinetool/react-spline'));
import { SparklesPreview } from "../SpartklePreview"
import HeroText from './HeroText';

const Hero = () => {
    return (
        <div className=" h-[80vh] flex bg-transparent justify-center items-center" id="imersion">
            <Suspense fallback={<div className="text-[50px] absolute text-center ">Loading...</div>}>
                <main className="pattern1">
                    <div className=" z-10  " >
                        <main className="flex mx-auto justify-between items-end relative z-20 max-w-[1200px] ">
                            <section className="font-semibold  ">
                                <div className='max-w-[600px] my-auto ' >
                                    <HeroText />
                                </div>
                            </section>
                            <section className=" z-[-3]">
                                <div className="max-w-[1000px] container ml-48">
                                    <Spline scene="https://prod.spline.design/4njfpIeQDXBw4PF0/scene.splinecode" />
                                </div>
                            </section>
                        </main>

                    </div>
            {/* <SparklesPreview /> */}
                </main>
            </Suspense >

        </div >
    );
}

export default Hero;