"use client";

import React from "react";
import { ParticleField } from "./ParticleField";
import { PropheticTimer } from "./PropheticTimer";
import { Watermark } from "./Watermark";

export const SacredMoment: React.FC<{ isAuto?: boolean }> = ({ isAuto }) => {
    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
            {/* Darker particles, focus on the center */}
            <div className="absolute inset-0 opacity-20">
                <ParticleField />
            </div>

            <div className="z-10 flex flex-col items-center">
                <PropheticTimer isAuto={isAuto} />
            </div>

            <Watermark />
        </div>
    );
};
