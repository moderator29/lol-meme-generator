import { format, formatDistanceToNow } from "date-fns";

export function formatTrackingDate(value: string | null | undefined): string {
  if (!value) return "Not available";
  return format(new Date(value), "EEEE, MMMM d, yyyy");
}

export function formatTrackingDateTime(value: string | null | undefined): string {
  if (!value) return "Not available";
  return format(new Date(value), "MMMM d, yyyy 'at' h:mm a");
}

export function formatTimeAgo(value: string | null | undefined): string {
  if (!value) return "Unknown";
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

export function formatWeight(kg: number | null | undefined): string {
  if (kg === null || kg === undefined) return "Not specified";
  return `${kg.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg`;
}

export function formatDimensions(
  length: number | null | undefined,
  width: number | null | undefined,
  height: number | null | undefined
): string {
  if (!length || !width || !height) return "Not specified";
  return `${length} x ${width} x ${height} cm`;
}

export function formatCurrency(value: number | null | undefined, currency = "USD"): string {
  if (value === null || value === undefined) return "Not specified";
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);
}

export function formatCount(value: number | null | undefined): string {
  if (value === null || value === undefined) return "0";
  return value.toLocaleString();
}

export function titleCase(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function firstNameOnly(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}
