import { z } from "zod";

export const propertyTypeEnum = z.enum([
  "DETACHED",
  "SEMI_DETACHED",
  "TERRACED",
  "FLAT",
  "BUNGALOW",
  "COMMERCIAL",
  "LAND",
]);

export const documentTypeEnum = z.enum([
  "TITLE_REGISTER",
  "TITLE_PLAN",
  "FLOOD_RISK",
  "ENERGY_PERFORMANCE",
]);

export const propertyInputSchema = z.object({
  registryNumber: z.string().trim().min(3, "Registry number is required"),
  addressLine1: z.string().trim().min(2, "Address is required"),
  addressLine2: z.string().trim().optional().or(z.literal("")),
  city: z.string().trim().min(2, "City is required"),
  postcode: z.string().trim().min(4, "Postcode is required"),
  propertyType: propertyTypeEnum,
  tenure: z.string().trim().min(2).default("Freehold"),
  estimatedValue: z.coerce.number().int().min(0, "Value must be positive"),
  bedrooms: z.coerce.number().int().min(0).optional(),
  bathrooms: z.coerce.number().int().min(0).optional(),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
  published: z.coerce.boolean().default(true),
});

export type PropertyInput = z.infer<typeof propertyInputSchema>;

export const documentInputSchema = z.object({
  propertyId: z.string().min(1),
  type: documentTypeEnum,
  title: z.string().trim().min(2, "Title is required"),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  priceInPence: z.coerce.number().int().min(0).default(300),
});

export type DocumentInput = z.infer<typeof documentInputSchema>;

export const searchSchema = z.object({
  q: z.string().trim().max(200).optional().default(""),
  type: z.string().trim().optional().default(""),
});
