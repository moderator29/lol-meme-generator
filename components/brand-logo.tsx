import Link from "next/link";
import { cn } from "@/lib/utils";

/** Wordmark: "Property Registry" with a pin + house glyph, echoing the reference. */
export function BrandLogo({
  className,
  href = "/",
  tone = "light",
}: {
  className?: string;
  href?: string;
  tone?: "light" | "dark";
}) {
  const textColor = tone === "light" ? "text-white" : "text-primary";
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2 font-semibold", className)}
    >
      <span className={cn("text-lg tracking-tight sm:text-xl", textColor)}>
        Property<span className="font-extrabold">Registry</span>
      </span>
      <svg
        viewBox="0 0 24 24"
        className={cn("h-6 w-6", tone === "light" ? "text-accent" : "text-accent")}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8.6 11.2 12 8.4l3.4 2.8V15a.6.6 0 0 1-.6.6h-1.9v-2.3h-1.8v2.3H9.2a.6.6 0 0 1-.6-.6v-3.8Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
}
