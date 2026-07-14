import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: 1, title: "Property Details" },
  { n: 2, title: "Your Details" },
  { n: 3, title: "Make Payment" },
];

export function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-lg border">
      {STEPS.map((s) => {
        const state =
          s.n < current ? "done" : s.n === current ? "active" : "upcoming";
        return (
          <div
            key={s.n}
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-3 text-center sm:flex-row sm:justify-center sm:gap-2",
              state === "active" && "bg-accent text-accent-foreground",
              state === "done" && "bg-accent/15 text-foreground",
              state === "upcoming" && "bg-muted text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                state === "active" && "bg-white/25",
                state === "done" && "bg-accent text-accent-foreground",
                state === "upcoming" && "bg-background",
              )}
            >
              {state === "done" ? <Check className="h-3.5 w-3.5" /> : s.n}
            </span>
            <span className="text-xs font-semibold sm:text-sm">
              <span className="hidden sm:inline">Step {s.n}: </span>
              {s.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
