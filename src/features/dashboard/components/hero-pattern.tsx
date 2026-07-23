"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { WavyBackground } from "@/components/ui/wavy-background"

export function HeroPattern() {
    const { resolvedTheme } = useTheme()
    const [bgFill, setBgFill] = useState("hsl(0 0% 100%)")

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setBgFill("oklch(0.148 0.004 228.8)")
        } else {
            setBgFill("hsl(0 0% 100%)")
        }
    }, [resolvedTheme])

    return (
        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
            <WavyBackground 
                colors={["#2DD4BF", "#22D3EE", "#38BDF8", "#818CF8"]}
                backgroundFill={bgFill}
                blur={3}
                speed="slow"
                waveOpacity={0.1}
                waveWidth={100}
                waveYOffset={670}
                containerClassName="h-full"
                className="hidden"
            />
        </div>
    )
}