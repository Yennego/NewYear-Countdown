"use client";

import React from "react";
import { ParticleField } from "./ParticleField";
import { ScriptureLoop } from "./ScriptureLoop";
import { Watermark } from "./Watermark";

export const WaitingRoom: React.FC = () => {
    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center cinematic-bg overflow-hidden">
            <ParticleField />

            <main className="z-10 w-full">
                <ScriptureLoop />
            </main>

            <Watermark />
        </div>
    );
};
