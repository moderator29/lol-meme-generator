import { prisma } from "@/lib/prisma";
import { normalisePostcode } from "@/lib/format";

export async function getFeaturedProperties(limit = 6) {
  try {
    return await prisma.property.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        images: { orderBy: { sortOrder: "asc" } },
      },
    });
  } catch (err) {
    console.error("getFeaturedProperties failed:", err);
    return [];
  }
}

export async function searchProperties(query: string) {
  const q = query.trim();
  if (!q) {
    return getFeaturedProperties(12);
  }

  const postcode = normalisePostcode(q);

  try {
    return await prisma.property.findMany({
      where: {
        published: true,
        OR: [
          { postcode: { contains: postcode, mode: "insensitive" } },
          { postcode: { contains: q, mode: "insensitive" } },
          { addressLine1: { contains: q, mode: "insensitive" } },
          { addressLine2: { contains: q, mode: "insensitive" } },
          { city: { contains: q, mode: "insensitive" } },
          { registryNumber: { contains: q, mode: "insensitive" } },
        ],
      },
      orderBy: { estimatedValue: "desc" },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
      },
    });
  } catch (err) {
    console.error("searchProperties failed:", err);
    return [];
  }
}

export async function getPropertyById(id: string) {
  try {
    return await prisma.property.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        documents: { orderBy: { priceInPence: "asc" } },
      },
    });
  } catch (err) {
    console.error("getPropertyById failed:", err);
    return null;
  }
}
