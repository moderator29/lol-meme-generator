import { PrismaClient, type PropertyType } from "@prisma/client";
import { storage } from "../lib/storage";

const prisma = new PrismaClient();

/**
 * Build a minimal, valid single-page PDF with a few lines of text.
 * Avoids adding a PDF dependency to the MVP while keeping downloads real.
 */
function buildSamplePdf(lines: string[]): Buffer {
  const esc = (s: string) => s.replace(/([()\\])/g, "\\$1");
  let y = 780;
  const text = lines
    .map((line, i) => {
      const size = i === 0 ? 22 : 12;
      const cmd = `BT /F1 ${size} Tf 60 ${y} Td (${esc(line)}) Tj ET`;
      y -= i === 0 ? 40 : 20;
      return cmd;
    })
    .join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(text, "latin1")} >>\nstream\n${text}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => {
    pdf += `${off.toString().padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
}

type SeedProperty = {
  registryNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  propertyType: PropertyType;
  tenure: string;
  estimatedValue: number;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  images: string[];
};

const IMG = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const properties: SeedProperty[] = [
  {
    registryNumber: "SY1234567",
    addressLine1: "14 Oakfield Gardens",
    city: "Manchester",
    postcode: "M1 4AE",
    propertyType: "SEMI_DETACHED",
    tenure: "Freehold",
    estimatedValue: 385000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A well-presented three-bedroom semi-detached family home on a quiet residential road, close to local schools, transport links and green space. Comprising two reception rooms, a modern kitchen-diner, and a landscaped rear garden.",
    images: [
      IMG("photo-1568605114967-8130f3a36994"),
      IMG("photo-1570129477492-45c003edd2be"),
      IMG("photo-1512917774080-9991f1c4c750"),
    ],
  },
  {
    registryNumber: "LN9988776",
    addressLine1: "Flat 6, Riverside Court",
    addressLine2: "22 Wharf Road",
    city: "London",
    postcode: "SW1A 1AA",
    propertyType: "FLAT",
    tenure: "Leasehold",
    estimatedValue: 615000,
    bedrooms: 2,
    bathrooms: 2,
    description:
      "A bright two-bedroom apartment in a modern riverside development with 24-hour concierge, secure parking and communal gardens. Open-plan living space with floor-to-ceiling windows and a private balcony overlooking the water.",
    images: [
      IMG("photo-1502672260266-1c1ef2d93688"),
      IMG("photo-1493809842364-78817add7ffb"),
      IMG("photo-1484154218962-a197022b5858"),
    ],
  },
  {
    registryNumber: "WK4455667",
    addressLine1: "Willow Cottage",
    addressLine2: "Church Lane",
    city: "York",
    postcode: "YO1 7HH",
    propertyType: "DETACHED",
    tenure: "Freehold",
    estimatedValue: 720000,
    bedrooms: 4,
    bathrooms: 3,
    description:
      "A characterful four-bedroom detached period property set within mature gardens on the edge of a sought-after village. Retaining many original features including exposed beams and an inglenook fireplace, with a large driveway and double garage.",
    images: [
      IMG("photo-1518780664697-55e3ad937233"),
      IMG("photo-1580587771525-78b9dba3b914"),
      IMG("photo-1600585154340-be6161a56a0c"),
    ],
  },
  {
    registryNumber: "BR3322110",
    addressLine1: "48 Highgrove Terrace",
    city: "Bristol",
    postcode: "BS1 5TR",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 342000,
    bedrooms: 2,
    bathrooms: 1,
    description:
      "A charming two-bedroom Victorian mid-terrace in a popular city-centre location, ideal for first-time buyers or investors. Featuring a bay-fronted living room, a refitted kitchen and a low-maintenance courtyard garden.",
    images: [
      IMG("photo-1592595896551-12b371d546d5"),
      IMG("photo-1523217582562-09d0def993a6"),
    ],
  },
  {
    registryNumber: "ED7766554",
    addressLine1: "3 Braeburn Rise",
    city: "Edinburgh",
    postcode: "EH1 1BB",
    propertyType: "BUNGALOW",
    tenure: "Freehold",
    estimatedValue: 468000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A deceptively spacious three-bedroom detached bungalow occupying a generous corner plot in a desirable suburb. Offering flexible single-storey living, a conservatory, off-street parking and beautifully maintained wrap-around gardens.",
    images: [
      IMG("photo-1449844908441-8829872d2607"),
      IMG("photo-1570129477492-45c003edd2be"),
    ],
  },
  {
    registryNumber: "LE1029384",
    addressLine1: "Unit 5, Meridian Business Park",
    city: "Leeds",
    postcode: "LS1 2AB",
    propertyType: "COMMERCIAL",
    tenure: "Leasehold",
    estimatedValue: 890000,
    description:
      "A modern commercial unit extending to approximately 6,500 sq ft on an established business park with excellent motorway access. Suitable for office, light industrial or trade counter use, with allocated parking and loading access.",
    images: [
      IMG("photo-1497366216548-37526070297c"),
      IMG("photo-1524758631624-e2822e304c36"),
    ],
  },
];

const DOCUMENT_TEMPLATES = [
  {
    type: "TITLE_REGISTER" as const,
    title: "Official Copy — Title Register",
    description:
      "The register of title showing ownership, price paid, and any rights, restrictions or charges affecting the property.",
    priceInPence: 300,
  },
  {
    type: "TITLE_PLAN" as const,
    title: "Official Copy — Title Plan",
    description:
      "The title plan identifying the general boundaries of the registered property, based on Ordnance Survey mapping.",
    priceInPence: 300,
  },
];

async function main() {
  console.log("Seeding database…");

  // Reset the tables we manage (order matters for FKs).
  await prisma.order.deleteMany();
  await prisma.document.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();

  // A demo admin + a demo customer so dashboards have context.
  const adminEmail = (process.env.ADMIN_EMAILS ?? "admin@example.com")
    .split(",")[0]
    .trim();
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      email: adminEmail,
      firstName: "Registry",
      lastName: "Admin",
      role: "ADMIN",
    },
  });

  for (const p of properties) {
    const { images, ...data } = p;
    const property = await prisma.property.create({ data });

    await prisma.propertyImage.createMany({
      data: images.map((url, i) => ({
        propertyId: property.id,
        url,
        alt: `${property.addressLine1}, ${property.city}`,
        isPrimary: i === 0,
        sortOrder: i,
      })),
    });

    for (const tpl of DOCUMENT_TEMPLATES) {
      const pdf = buildSamplePdf([
        "PROPERTY REGISTRY — SAMPLE DOCUMENT",
        tpl.title,
        "",
        `Registry number: ${property.registryNumber}`,
        `Property: ${property.addressLine1}, ${property.city}`,
        `Postcode: ${property.postcode}`,
        `Tenure: ${property.tenure}`,
        "",
        "This is sample demonstration data generated for an MVP.",
        "It is not an official HM Land Registry document.",
      ]);
      const storageKey = await storage().put({
        body: pdf,
        contentType: "application/pdf",
        keyPrefix: "documents",
        filename: `${property.registryNumber}-${tpl.type}.pdf`,
      });

      await prisma.document.create({
        data: {
          propertyId: property.id,
          type: tpl.type,
          title: tpl.title,
          description: tpl.description,
          priceInPence: tpl.priceInPence,
          storageKey,
        },
      });
    }

    console.log(`  • ${property.addressLine1}, ${property.city}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
