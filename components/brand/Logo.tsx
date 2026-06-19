import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "full" | "symbol";
}

export function Logo({ className, variant = "full" }: LogoProps) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-light to-gold-dark font-display text-h4 font-bold text-navy-deep shadow-gold transition-transform duration-300 group-hover:scale-105">
        E
      </span>
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-h4 font-bold tracking-tight text-navy-deep dark:text-ivory">
            EDP
          </span>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            Courier
          </span>
        </span>
      )}
    </Link>
  );
}
