"use server";

import { createServiceClient } from "@/lib/supabase/server";

export async function getShipmentsByDay(days = 14) {
  const supabase = createServiceClient();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from("shipments")
    .select("created_at, current_status")
    .gte("created_at", since.toISOString());

  if (error || !data) return [];

  const buckets = new Map<string, number>();
  for (const row of data) {
    const day = row.created_at.slice(0, 10);
    buckets.set(day, (buckets.get(day) ?? 0) + 1);
  }
  return Array.from(buckets.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getStatusBreakdown() {
  const supabase = createServiceClient();
  const { data, error } = await supabase.from("shipments").select("current_status");
  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (const row of data) {
    counts.set(row.current_status, (counts.get(row.current_status) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([status, count]) => ({ status, count }));
}

export async function getActivityLogs(limit = 30) {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("activity_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return data;
}
