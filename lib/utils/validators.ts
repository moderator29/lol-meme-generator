import { z } from "zod";

export const trackingIdSchema = z
  .string()
  .trim()
  .min(4, "Please enter a valid tracking number.")
  .transform((value) => value.toUpperCase());

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please choose a subject."),
  message: z.string().min(10, "Please enter a message with at least 10 characters."),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const shipmentFormSchema = z.object({
  sender_name: z.string().min(2, "Sender name is required."),
  sender_phone: z.string().optional(),
  sender_email: z.string().email("Enter a valid email address.").optional().or(z.literal("")),
  sender_address: z.string().optional(),
  sender_postal_code: z.string().optional(),
  origin_country: z.string().min(2, "Origin country is required."),
  origin_country_code: z.string().optional(),
  origin_state: z.string().optional(),
  origin_city: z.string().optional(),

  receiver_name: z.string().min(2, "Receiver name is required."),
  receiver_phone: z.string().optional(),
  receiver_email: z.string().email("Enter a valid email address.").optional().or(z.literal("")),
  receiver_address: z.string().optional(),
  receiver_postal_code: z.string().optional(),
  destination_country: z.string().min(2, "Destination country is required."),
  destination_country_code: z.string().optional(),
  destination_state: z.string().optional(),
  destination_city: z.string().optional(),

  package_type: z.enum([
    "document",
    "parcel",
    "fragile",
    "freight",
    "pallet",
    "oversized",
    "liquid",
    "perishable",
    "electronics",
    "medical",
  ]),
  package_description: z.string().optional(),
  weight_kg: z.coerce.number().positive().optional(),
  length_cm: z.coerce.number().positive().optional(),
  width_cm: z.coerce.number().positive().optional(),
  height_cm: z.coerce.number().positive().optional(),
  declared_value: z.coerce.number().nonnegative().optional(),
  currency: z.string().default("USD"),
  item_count: z.coerce.number().int().positive().default(1),

  shipping_method: z.enum([
    "economy",
    "standard",
    "express",
    "overnight",
    "same_day",
    "freight",
    "charter",
  ]),
  priority_level: z.enum(["low", "normal", "high", "critical", "emergency"]),
  insurance_enabled: z.boolean().default(false),
  insurance_value: z.coerce.number().nonnegative().optional(),
  shipping_fee: z.coerce.number().nonnegative().optional(),

  expected_delivery_date: z.string().optional(),
  special_instructions: z.string().optional(),
  internal_notes: z.string().optional(),
  public_notes: z.string().optional(),
});

export type ShipmentFormSchema = z.infer<typeof shipmentFormSchema>;

export const statusUpdateSchema = z.object({
  status: z.string().min(1, "Please choose a status."),
  location: z.string().optional(),
  public_note: z.string().optional(),
  internal_note: z.string().optional(),
});

export type StatusUpdateInput = z.infer<typeof statusUpdateSchema>;
