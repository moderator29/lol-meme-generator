"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { storage } from "@/lib/storage";
import { propertyInputSchema, documentInputSchema } from "@/lib/validations";

export type FormState = { error?: string; ok?: boolean };

function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

/** Generate a plausible, unique registry (title) number like "AB1234567". */
async function generateRegistryNumber(): Promise<string> {
  const letters = "ABCDEFGHJKLMNPRSTVWXYZ";
  const rand = (n: number) => Math.floor(Math.random() * n);
  for (let attempt = 0; attempt < 8; attempt++) {
    const code = `${letters[rand(letters.length)]}${letters[rand(letters.length)]}${100000 + rand(900000)}`;
    const clash = await prisma.property.findUnique({
      where: { registryNumber: code },
    });
    if (!clash) return code;
  }
  return `PR${Date.now().toString().slice(-9)}`;
}

function buildPropertyData(fd: FormData) {
  return propertyInputSchema.safeParse({
    registryNumber: str(fd, "registryNumber"),
    addressLine1: str(fd, "addressLine1"),
    addressLine2: str(fd, "addressLine2"),
    city: str(fd, "city"),
    postcode: str(fd, "postcode"),
    propertyType: str(fd, "propertyType"),
    tenure: str(fd, "tenure") || "Freehold",
    estimatedValue: str(fd, "estimatedValue"),
    bedrooms: str(fd, "bedrooms") || undefined,
    bathrooms: str(fd, "bathrooms") || undefined,
    description: str(fd, "description"),
    published: fd.get("published") === "on" || fd.get("published") === "true",
  });
}

export async function createProperty(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = buildPropertyData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // Auto-generate the registry code when left blank; otherwise ensure unique.
  let registryNumber = parsed.data.registryNumber?.trim() ?? "";
  if (!registryNumber) {
    registryNumber = await generateRegistryNumber();
  } else {
    const existing = await prisma.property.findUnique({
      where: { registryNumber },
    });
    if (existing) {
      return { error: "A property with that registry number already exists." };
    }
  }

  const property = await prisma.property.create({
    data: {
      ...parsed.data,
      registryNumber,
      addressLine2: parsed.data.addressLine2 || null,
      description: parsed.data.description || "",
    },
  });

  revalidatePath("/admin/properties");
  revalidatePath("/");
  redirect(`/admin/properties/${property.id}`);
}

export async function updateProperty(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const id = str(formData, "id");
  if (!id) return { error: "Missing property id" };

  const parsed = buildPropertyData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  let registryNumber = parsed.data.registryNumber?.trim() ?? "";
  if (!registryNumber) {
    registryNumber = await generateRegistryNumber();
  } else {
    const clash = await prisma.property.findFirst({
      where: { registryNumber, NOT: { id } },
    });
    if (clash) {
      return { error: "Another property already uses that registry number." };
    }
  }

  await prisma.property.update({
    where: { id },
    data: {
      ...parsed.data,
      registryNumber,
      addressLine2: parsed.data.addressLine2 || null,
      description: parsed.data.description || "",
    },
  });

  revalidatePath(`/admin/properties/${id}`);
  revalidatePath("/admin/properties");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteProperty(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) {
    // Best-effort cleanup of locally stored document files.
    const docs = await prisma.document.findMany({
      where: { propertyId: id },
      select: { storageKey: true },
    });
    await Promise.all(
      docs.map((d) => storage().remove(d.storageKey).catch(() => undefined)),
    );
    await prisma.property.delete({ where: { id } }).catch(() => undefined);
  }
  revalidatePath("/admin/properties");
  redirect("/admin/properties");
}

export async function addImage(formData: FormData) {
  await requireAdmin();
  const propertyId = str(formData, "propertyId");
  if (!propertyId) return;

  const url = str(formData, "url").trim();
  const file = formData.get("file");
  let finalUrl = url;

  if (file instanceof File && file.size > 0) {
    // Store the image inline as a data URL so it persists in the database and
    // renders on any deployment (serverless disks are ephemeral, so we don't
    // rely on local file storage for uploaded images).
    if (file.size > 6_000_000) {
      return { error: "Image is too large (max 6 MB)." } as FormState;
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const contentType = file.type || "image/jpeg";
    finalUrl = `data:${contentType};base64,${buffer.toString("base64")}`;
  }

  if (!finalUrl) return;

  const count = await prisma.propertyImage.count({ where: { propertyId } });
  await prisma.propertyImage.create({
    data: {
      propertyId,
      url: finalUrl,
      isPrimary: count === 0,
      sortOrder: count,
    },
  });

  revalidatePath(`/admin/properties/${propertyId}`);
  revalidatePath(`/property/${propertyId}`);
  revalidatePath("/");
}

export async function deleteImage(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const propertyId = str(formData, "propertyId");
  if (id) {
    const image = await prisma.propertyImage.findUnique({ where: { id } });
    if (image?.url.startsWith("/api/storage/")) {
      const key = image.url.replace("/api/storage/", "");
      await storage().remove(key).catch(() => undefined);
    }
    await prisma.propertyImage.delete({ where: { id } }).catch(() => undefined);
  }
  revalidatePath(`/admin/properties/${propertyId}`);
}

export async function addDocument(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();
  const parsed = documentInputSchema.safeParse({
    propertyId: str(formData, "propertyId"),
    type: str(formData, "type"),
    title: str(formData, "title"),
    description: str(formData, "description"),
    priceInPence: str(formData, "priceInPence") || "300",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Please attach a PDF document." };
  }
  if (file.type && file.type !== "application/pdf") {
    return { error: "The document must be a PDF file." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const storageKey = await storage().put({
    body: buffer,
    contentType: "application/pdf",
    keyPrefix: "documents",
    filename: file.name,
  });

  await prisma.document.create({
    data: {
      propertyId: parsed.data.propertyId,
      type: parsed.data.type,
      title: parsed.data.title,
      description: parsed.data.description || "",
      priceInPence: parsed.data.priceInPence,
      storageKey,
    },
  });

  revalidatePath(`/admin/properties/${parsed.data.propertyId}`);
  return { ok: true };
}

export async function deleteDocument(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const propertyId = str(formData, "propertyId");
  if (id) {
    const doc = await prisma.document.findUnique({ where: { id } });
    if (doc) {
      await storage().remove(doc.storageKey).catch(() => undefined);
      await prisma.document.delete({ where: { id } }).catch(() => undefined);
    }
  }
  revalidatePath(`/admin/properties/${propertyId}`);
}
