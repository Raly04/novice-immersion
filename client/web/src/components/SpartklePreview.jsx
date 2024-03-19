import React from "react";
import { SparklesCore } from "./spartkle";

export function SparklesPreview() {
    return (
        <div className="h-[100vh] absolute top-0 z-[-2]   w-full  flex flex-col items-center justify-center overflow-hidden rounded-md">
            <div className="w-full  inset-0 h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>
        </div>
    );
}
