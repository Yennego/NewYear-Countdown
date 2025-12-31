"use client";

import React from "react";
import { ParticleField } from "./ParticleField";
import { CountdownRadial } from "./CountdownRadial";
import { WATCHNIGHT_CONFIG } from "@/config/watchnight.config";
import { Watermark } from "./Watermark";

export const AwakeningRoom: React.FC = () => {
    const config = WATCHNIGHT_CONFIG.phases.awakening;

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center cinematic-bg overflow-hidden">
            <ParticleField />

            <div className="z-10 flex flex-col items-center gap-12">
                <h3 className="text-gold tracking-[0.5em] uppercase text-sm font-bold opacity-80 animate-pulse">
                    {config.label}
                </h3>

                <CountdownRadial />
            </div>

            <Watermark />
        </div>
    );
};
