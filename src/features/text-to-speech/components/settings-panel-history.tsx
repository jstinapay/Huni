"use client";

import { History } from "lucide-react";

export function SettingsPanelHistory() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
      <div className="rounded-full bg-sidebar-accent p-4 shadow-sm">
        <History className="size-6 text-sidebar-foreground/60" />
      </div>
      <div className="space-y-1 text-center">
        <p className="font-semibold tracking-tight text-foreground">
          No generations yet
        </p>
        <p className="max-w-48 text-xs leading-relaxed text-muted-foreground">
          Generate some audio and it will appear here for quick re-use
        </p>
      </div>
    </div>
  );
}
