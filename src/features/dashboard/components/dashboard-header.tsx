"use client"

import { useUser } from "@clerk/nextjs";
import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BlurText } from "@/components/ui/blur-text";

export function DashboardHeader() {
    const { isLoaded, user } = useUser();

    const displayName = isLoaded ? (user?.fullName ?? user?.firstName ?? "User") : "...";

    return (
        <div className="flex items-start justify-between">
            <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                    Welcome back
                </p>
                <BlurText
                    text={displayName}
                    animateBy="words"
                    direction="top"
                    delay={150}
                    stepDuration={0.4}
                    className="text-2xl lg:text-3xl font-semibold tracking-tight"
                />
            </div>

            <div className="lg:flex items-center gap-3 hidden">
                <Link href="mailto:justin_custodio@dlsu.edu.ph">
                    <Button variant="outline" size="sm" className="gap-2">
                        <ThumbsUp />
                        <span className="hidden lg:block">Feedback</span>
                    </Button>
                </Link>
                <Link href="mailto:justin_custodio@dlsu.edu.ph">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Headphones />
                        <span className="hidden lg:block">Need help?</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}