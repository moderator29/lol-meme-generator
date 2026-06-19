import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  gold?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, gold, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(gold ? "glass-card-gold" : "glass-card", "p-6", className)} {...props}>
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";
