"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
} & HTMLMotionProps<"button">;

const baseClass =
  "relative overflow-hidden inline-flex items-center justify-center font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 group z-10 cursor-pointer transition-colors duration-300 rounded-xl";

const sizeClass = {
  md: "px-6 py-3 text-sm",
  lg: "px-10 py-5 text-lg",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseClass,
        sizeClass[size],
        variant === "primary"
          ? "text-white shadow-lg shadow-orange-500/10 border border-transparent bg-gradient-to-r from-orange-500 to-amber-500 md:bg-none"
          : "border border-slate-200 text-slate-800 bg-white/75 md:bg-none",
        "btn-group",
        className
      )}
      {...props}
    >
      {/* Background slide-up layers for Desktop only */}
      {variant === "primary" ? (
        <>
          {/* Base Layer */}
          <span className="hidden md:block absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-amber-500 -z-20 btn-base-layer" />
          {/* Hover Layer (slides from bottom) */}
          <span className="hidden md:block absolute inset-0 w-full h-full bg-gradient-to-t from-orange-600 to-orange-500 -z-10 btn-hover-layer" />
        </>
      ) : (
        <>
          {/* Base Layer */}
          <span className="hidden md:block absolute inset-0 w-full h-full bg-white/70 -z-20 btn-base-layer" />
          {/* Hover Layer (slides from bottom) */}
          <span className="hidden md:block absolute inset-0 w-full h-full bg-orange-500 -z-10 btn-hover-layer" />
        </>
      )}

      {/* Button content */}
      <span className={cn(
        "relative z-10 flex items-center justify-center gap-2 transition-colors duration-300",
        variant === "outline" ? "text-slate-800 btn-text-layer-outline" : "text-white"
      )}>
        {children}
      </span>
    </motion.button>
  );
}

