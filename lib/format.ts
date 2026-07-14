import type { PropertyType, DocumentType, OrderStatus } from "@prisma/client";

/** Format an amount stored in whole GBP (e.g. 450000 -> "£450,000"). */
export function formatGBP(pounds: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(pounds);
}

/** Format an amount stored in pence (e.g. 300 -> "£3.00"). */
export function formatPence(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(pence / 100);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  DETACHED: "Detached house",
  SEMI_DETACHED: "Semi-detached house",
  TERRACED: "Terraced house",
  FLAT: "Flat / Apartment",
  BUNGALOW: "Bungalow",
  COMMERCIAL: "Commercial",
  LAND: "Land",
};

export function propertyTypeLabel(type: PropertyType): string {
  return PROPERTY_TYPE_LABELS[type] ?? type;
}

const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  TITLE_REGISTER: "Title Register",
  TITLE_PLAN: "Title Plan",
  FLOOD_RISK: "Flood Risk Report",
  ENERGY_PERFORMANCE: "Energy Performance Certificate",
};

export function documentTypeLabel(type: DocumentType): string {
  return DOCUMENT_TYPE_LABELS[type] ?? type;
}

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export function orderStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status] ?? status;
}

/** Normalise a postcode for comparison: uppercase, single spaces trimmed. */
export function normalisePostcode(postcode: string): string {
  return postcode.replace(/\s+/g, " ").trim().toUpperCase();
}

export const PROPERTY_TYPE_OPTIONS = Object.entries(PROPERTY_TYPE_LABELS).map(
  ([value, label]) => ({ value: value as PropertyType, label }),
);

export const DOCUMENT_TYPE_OPTIONS = Object.entries(DOCUMENT_TYPE_LABELS).map(
  ([value, label]) => ({ value: value as DocumentType, label }),
);
