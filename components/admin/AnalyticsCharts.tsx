"use client";

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { titleCase } from "@/lib/utils/formatters";

interface AnalyticsChartsProps {
  byDay: { date: string; count: number }[];
  byStatus: { status: string; count: number }[];
}

export function AnalyticsCharts({ byDay, byStatus }: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="glass-card p-6">
        <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Shipments Created</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={byDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.12)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#C9A84C" fill="rgba(201,168,76,0.2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card p-6">
        <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Status Breakdown</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byStatus.map((row) => ({ ...row, label: titleCase(row.status) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.12)" />
              <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#C9A84C" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
