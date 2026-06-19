import { ThemeToggle } from "@/components/public/ThemeToggle";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gold-primary/10 px-6 py-5">
      <div>
        <h1 className="font-display text-h3 font-bold text-navy-deep dark:text-ivory">{title}</h1>
        {subtitle ? <p className="mt-1 text-body-sm text-navy-soft/65 dark:text-ivory/55">{subtitle}</p> : null}
      </div>
      <ThemeToggle />
    </div>
  );
}
