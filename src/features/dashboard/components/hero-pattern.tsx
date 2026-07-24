"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { WavyBackground } from "@/components/ui/wavy-background"

export function HeroPattern() {
    const { resolvedTheme } = useTheme()
    const [opts, setOpts] = useState({ bgFill: "hsl(0 0% 100%)", waveOpacity: 0.1 })

    useEffect(() => {
        if (resolvedTheme === "dark") {
            setOpts({ bgFill: "oklch(0.148 0.004 228.8)", waveOpacity: 0 })
        } else {
            setOpts({ bgFill: "hsl(0 0% 100%)", waveOpacity: 0.1 })
        }
    }, [resolvedTheme])

    return (
        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
            <WavyBackground 
                colors={["#2DD4BF", "#22D3EE", "#38BDF8", "#818CF8"]}
                backgroundFill={opts.bgFill}
                blur={3}
                speed="slow"
                waveOpacity={opts.waveOpacity}
                waveWidth={100}
                waveYOffset={670}
                containerClassName="h-full"
                className="hidden"
            />
        </div>
    )
}