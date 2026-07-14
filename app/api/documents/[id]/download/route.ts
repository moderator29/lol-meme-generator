import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { hasDocumentAccess } from "@/lib/orders";
import { storage } from "@/lib/storage";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const user = await getCurrentUser();
  if (!user) {
    return new Response("Not authenticated", { status: 401 });
  }

  // Access control: the user must own a PAID order for this document.
  const allowed = await hasDocumentAccess(user.id, id);
  if (!allowed) {
    return new Response("Payment required to download this document", {
      status: 403,
    });
  }

  const document = await prisma.document.findUnique({
    where: { id },
    include: { property: true },
  });
  if (!document) {
    return new Response("Document not found", { status: 404 });
  }

  let file: { body: Buffer; contentType: string };
  try {
    file = await storage().get(document.storageKey);
  } catch {
    return new Response("Document file is unavailable", { status: 404 });
  }

  const filename = `${document.property.registryNumber}-${document.type}.pdf`
    .replace(/[^a-zA-Z0-9._-]/g, "_");

  return new Response(new Uint8Array(file.body), {
    headers: {
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(file.body.length),
      "Cache-Control": "private, no-store",
    },
  });
}
