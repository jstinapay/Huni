"use client";

import { Coins } from "lucide-react";
import { useStore } from "@tanstack/react-form";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";

import { 
  COST_PER_CHARACTER, 
  TEXT_MAX_LENGTH
} from "@/features/text-to-speech/data/constants";
import { ttsFormOptions } from "./text-to-speech-form";
import { GenerateButton } from "./generate-button";

export function TextInputPanel() {
  const form = useTypedAppFormContext(ttsFormOptions);

  const text = useStore(form.store, (s) => s.values.text);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);
  const isValid = useStore(form.store, (s) => s.isValid);

  const charCount = text.length;
  const progress = charCount / TEXT_MAX_LENGTH;
  const cost = charCount * COST_PER_CHARACTER;

  return (
    <div className="flex h-full min-h-0 flex-col flex-1">
      <div className="relative min-h-0 flex-1">
        <form.Field name="text">
          {(field) => (
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="absolute inset-0 resize-none border-0 bg-transparent p-4 pb-6 lg:p-6 lg:pb-8 text-base! leading-relaxed tracking-tight shadow-none focus-visible:ring-0 focus-visible:border-transparent"
              maxLength={TEXT_MAX_LENGTH}
              disabled={isSubmitting}
            />
          )}
        </form.Field>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="shrink-0 px-4 pb-4 lg:px-6 lg:pb-6">
        <div className="mb-3 h-1 rounded-full bg-muted/60 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-300"
            style={{ width: `${Math.min(progress * 100, 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5 border-dashed transition-colors duration-200",
              charCount > 0 && "border-solid border-chart-5/30 bg-chart-5/5"
            )}
          >
            <Coins className="size-3 text-chart-5" />
            <span className="text-xs">
              {charCount === 0 ? (
                "Start typing to estimate"
              ) : (
                <>
                  <span className="tabular-nums">${cost.toFixed(4)}</span>&nbsp;estimated
                </>
              )}
            </span>
          </Badge>

          <div className="flex items-center gap-3">
            {charCount > 0 && (
              <p className="text-xs tabular-nums text-muted-foreground">
                {charCount.toLocaleString()}
                <span className="text-muted-foreground/60">&nbsp;/&nbsp;{TEXT_MAX_LENGTH.toLocaleString()}</span>
              </p>
            )}
            <GenerateButton
              size="sm"
              disabled={isSubmitting || !isValid || !charCount}
              isSubmitting={isSubmitting}
              onSubmit={() => form.handleSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
