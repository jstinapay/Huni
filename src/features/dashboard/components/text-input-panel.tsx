"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coins, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import {
  TEXT_MAX_LENGTH,
  COST_PER_CHARACTER,
} from "@/features/text-to-speech/data/constants";

export function TextInputPanel() {
  const [text, setText] = useState("");
  const router = useRouter();
  const charCount = text.length;
  const progress = charCount / TEXT_MAX_LENGTH;

  const handleGenerate = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    router.push(`/text-to-speech?text=${encodeURIComponent(trimmed)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-[22px] bg-linear-185 from-[#ff8ee3] from-15% via-[#57d7e0] via-39% to-[#dbf1f2] to-85% p-0.5 shadow-[0_0_0_4px_white]"
    >
      <div className="rounded-[20px] bg-[#F9F9F9] p-1">
        <div className="space-y-3 rounded-2xl bg-white p-4 drop-shadow-xs">
          <Textarea
            placeholder="Start typing or paste your text here..."
            className="h-48 resize-none border-0 bg-transparent px-3 py-2 shadow-none leading-relaxed text-[15px] focus-visible:ring-0 focus-visible:border-transparent"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={TEXT_MAX_LENGTH}
          />

          <div className="h-1.5 mx-3 rounded-full bg-muted/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ff8ee3] to-[#57d7e0] transition-all duration-300"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pb-3 pt-2">
          <div className="flex items-center gap-2">
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
                    <span className="tabular-nums">
                      ${(charCount * COST_PER_CHARACTER).toFixed(4)}
                    </span>{" "}
                    estimated
                  </>
                )}
              </span>
            </Badge>
            <span className="text-xs text-muted-foreground tabular-nums">
              {charCount.toLocaleString()} / {TEXT_MAX_LENGTH.toLocaleString()}
            </span>
          </div>

          <Button
            size="sm"
            disabled={!text.trim()}
            onClick={handleGenerate}
            className="w-full lg:w-auto gap-1.5"
          >
            <Sparkles className="size-3.5" />
            Generate speech
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
