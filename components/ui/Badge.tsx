import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

export function Badge({ className, color, bgColor, borderColor, style, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn("badge border", className)}
      style={{ color, backgroundColor: bgColor, borderColor, ...style }}
      {...props}
    >
      {children}
    </span>
  );
}
