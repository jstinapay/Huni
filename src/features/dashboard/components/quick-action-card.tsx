import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { QuickAction } from "@/features/dashboard/data/quick-actions";
import { cn } from "@/lib/utils";

type QuickActionCardProps = QuickAction;

export function QuickActionCard({
  title,
  description,
  gradient,
  href,
}: QuickActionCardProps) {
  return (
    <SpotlightCard
      className="group rounded-xl border bg-card p-3 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
      spotlightColor="rgba(99, 102, 241, 0.15)"
    >
      <div className="flex gap-4">
        {/* Visual placeholder with gradient */}
        <div
          className={cn(
            "relative h-31 w-41 shrink-0 overflow-hidden rounded-xl bg-linear-to-br transition-transform duration-300 group-hover:scale-[1.02]",
            gradient,
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-12 rounded-full bg-white/30 transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="absolute inset-2 rounded-lg ring-2 ring-inset ring-white/20" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between py-1">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
          <Button
            variant="outline"
            size="xs"
            className="w-fit transition-colors duration-200 group-hover:border-primary/40 group-hover:text-primary"
          >
            <Link className="flex items-center gap-2" href={href}>
              Try now
              <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </SpotlightCard>
  );
}