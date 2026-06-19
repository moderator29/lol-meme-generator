import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input ref={ref} className={cn("input-field", error && "border-status-red", className)} {...props} />
      {error ? <p className="mt-1.5 text-body-sm text-status-red">{error}</p> : null}
    </div>
  );
});
Input.displayName = "Input";
