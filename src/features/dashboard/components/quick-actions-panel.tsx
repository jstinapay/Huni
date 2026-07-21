"use client";

import { motion } from "motion/react";
import { quickActions } from "@/features/dashboard/data/quick-actions";
import { QuickActionCard } from "./quick-action-card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function QuickActionsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick actions</h2>
      <motion.div
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {quickActions.map((action) => (
          <motion.div key={action.title} variants={item}>
            <QuickActionCard
              title={action.title}
              description={action.description}
              gradient={action.gradient}
              href={action.href}
              icon={action.icon}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}