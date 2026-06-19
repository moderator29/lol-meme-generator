import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

export function KPICard({ label, value, icon: Icon, trend }: KPICardProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between">
        <span className="text-caption uppercase text-navy-soft/55 dark:text-ivory/45">{label}</span>
        <Icon className="h-4 w-4 text-gold-dark" />
      </div>
      <p className="mt-3 font-display text-h2 font-bold text-navy-deep dark:text-ivory">{value}</p>
      {trend ? <p className="mt-1 text-body-sm text-status-emerald">{trend}</p> : null}
    </div>
  );
}
