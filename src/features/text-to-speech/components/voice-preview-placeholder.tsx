import { AudioLines, Sparkles, Volume2 } from "lucide-react";

export function VoicePreviewPlaceholder() {
  return (
    <div className="hidden flex-1 flex-col items-center justify-center gap-6 border-t bg-muted/20 lg:flex">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex w-32 items-center justify-center">
          <div className="absolute left-0 -rotate-30 rounded-full bg-sidebar-accent p-4 shadow-sm">
            <Volume2 className="size-5 text-sidebar-foreground/60" />
          </div>
          <div className="relative z-10 rounded-full bg-sidebar-primary p-4 shadow-md">
            <Sparkles className="size-5 text-sidebar-primary-foreground" />
          </div>
          <div className="absolute right-0 rotate-30 rounded-full bg-sidebar-accent p-4 shadow-sm">
            <AudioLines className="size-5 text-sidebar-foreground/60" />
          </div>
        </div>
        <div className="space-y-1.5 text-center">
          <p className="text-lg font-semibold tracking-tight text-foreground">
            Preview will appear here
          </p>
          <p className="max-w-64 text-sm leading-relaxed text-muted-foreground">
            Once you generate, your audio result will appear here. Sit back and relax.
          </p>
        </div>
      </div>
    </div>
  );
};
