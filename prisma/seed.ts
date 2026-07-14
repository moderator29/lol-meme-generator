import { PrismaClient, type PropertyType, type DocumentType } from "@prisma/client";
import { storage } from "../lib/storage";
import { buildSamplePdf } from "../lib/pdf";

const prisma = new PrismaClient();

const IMG = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Curated Unsplash photo pools, grouped so each property gets fitting imagery.
const POOLS: Record<string, string[]> = {
  house: [
    "photo-1568605114967-8130f3a36994",
    "photo-1512917774080-9991f1c4c750",
    "photo-1518780664697-55e3ad937233",
    "photo-1580587771525-78b9dba3b914",
    "photo-1449844908441-8829872d2607",
    "photo-1600596542815-ffad4c1539a9",
    "photo-1600047509807-ba8f99d2cdde",
    "photo-1512918728675-ed5a9ecdebfd",
    "photo-1605276374104-dee2a0ed3cd6",
    "photo-1570129477492-45c003edd2be",
  ],
  terraced: [
    "photo-1592595896551-12b371d546d5",
    "photo-1576941089067-2de3c901e126",
    "photo-1522708323590-d24dbb6b0267",
    "photo-1600585154340-be6161a56a0c",
  ],
  flat: [
    "photo-1502005229762-cf1b2da7c5d6",
    "photo-1502672260266-1c1ef2d93688",
    "photo-1493809842364-78817add7ffb",
    "photo-1560448204-e02f11c3d0e2",
  ],
  commercial: [
    "photo-1497366216548-37526070297c",
    "photo-1524758631624-e2822e304c36",
    "photo-1497366811353-6870744d04b2",
  ],
  land: [
    "photo-1500382017468-9049fed747ef",
    "photo-1416879595882-3373a0480b5b",
  ],
  interior: [
    "photo-1600607687939-ce8a6c25118c",
    "photo-1600566753086-00f18fb6b3ea",
    "photo-1560184897-ae75f418493e",
    "photo-1484154218962-a197022b5858",
    "photo-1523217582562-09d0def993a6",
    "photo-1616486338812-3dadae4b4ace",
  ],
};

function pick(pool: string[], i: number) {
  return pool[i % pool.length];
}

function imagesFor(type: PropertyType, i: number): string[] {
  let exterior: string[];
  switch (type) {
    case "FLAT":
      exterior = POOLS.flat;
      break;
    case "TERRACED":
      exterior = POOLS.terraced;
      break;
    case "COMMERCIAL":
      return [IMG(pick(POOLS.commercial, i)), IMG(pick(POOLS.commercial, i + 1))];
    case "LAND":
      return [IMG(pick(POOLS.land, i)), IMG(pick(POOLS.land, i + 1))];
    default:
      exterior = POOLS.house;
  }
  return [
    IMG(pick(exterior, i)),
    IMG(pick(POOLS.interior, i)),
    IMG(pick(POOLS.interior, i + 2)),
  ];
}

type Seed = {
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
};

// 30 properties across 30 real UK postcode districts, with area-appropriate
// values, tenures and descriptions.
const PROPERTIES: Seed[] = [
  {
    registryNumber: "GM418823",
    addressLine1: "24 Elm Grove",
    city: "Manchester",
    postcode: "M20 2RN",
    propertyType: "SEMI_DETACHED",
    tenure: "Freehold",
    estimatedValue: 425000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A well-proportioned three-bedroom semi-detached home in leafy Didsbury, moments from the village shops, Metrolink and the River Mersey. Two reception rooms, a modern kitchen-diner and a private south-facing garden.",
  },
  {
    registryNumber: "GM520147",
    addressLine1: "8 Beech Road",
    city: "Manchester",
    postcode: "M21 9HG",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 360000,
    bedrooms: 2,
    bathrooms: 1,
    description:
      "A stylish two-bedroom Victorian terrace in the heart of Chorlton, walking distance to the bars and delis of Beech Road. Original features throughout with a contemporary rear extension and courtyard garden.",
  },
  {
    registryNumber: "MS330419",
    addressLine1: "62 Allerton Road",
    city: "Liverpool",
    postcode: "L18 1JU",
    propertyType: "SEMI_DETACHED",
    tenure: "Freehold",
    estimatedValue: 312000,
    bedrooms: 3,
    bathrooms: 1,
    description:
      "A traditional bay-fronted semi in sought-after Allerton, close to Calderstones Park and excellent schools. Generous room sizes, a large through-lounge and a mature 90ft rear garden.",
  },
  {
    registryNumber: "WYK611230",
    addressLine1: "15 Cardigan Lane",
    city: "Leeds",
    postcode: "LS6 2AH",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 285000,
    bedrooms: 3,
    bathrooms: 1,
    description:
      "A classic back-to-front terrace in vibrant Headingley, popular with families and professionals alike. Three double bedrooms, a cellar and a low-maintenance yard, minutes from the cricket ground.",
  },
  {
    registryNumber: "SYK709884",
    addressLine1: "4 Ecclesall Rise",
    city: "Sheffield",
    postcode: "S11 8YZ",
    propertyType: "DETACHED",
    tenure: "Freehold",
    estimatedValue: 465000,
    bedrooms: 4,
    bathrooms: 2,
    description:
      "A substantial four-bedroom detached family home on the edge of the Peak District in prized Ecclesall. Off-street parking, a double garage and beautifully landscaped gardens backing onto woodland.",
  },
  {
    registryNumber: "WMD812365",
    addressLine1: "Apartment 9, Calthorpe House",
    addressLine2: "36 Frederick Road",
    city: "Birmingham",
    postcode: "B15 3TR",
    propertyType: "FLAT",
    tenure: "Leasehold",
    estimatedValue: 245000,
    bedrooms: 2,
    bathrooms: 2,
    description:
      "A modern two-bedroom apartment in leafy Edgbaston with allocated parking and a private balcony. Open-plan living, en-suite to the master, and secure entry, close to the QE Hospital and city centre.",
  },
  {
    registryNumber: "NGM913476",
    addressLine1: "The Cedars",
    addressLine2: "12 Lenton Road",
    city: "Nottingham",
    postcode: "NG7 1AW",
    propertyType: "DETACHED",
    tenure: "Freehold",
    estimatedValue: 540000,
    bedrooms: 5,
    bathrooms: 3,
    description:
      "An elegant five-bedroom Victorian villa in The Park Estate, a private tree-lined conservation area minutes from the city. High ceilings, original cornicing, a large kitchen-breakfast room and gated parking.",
  },
  {
    registryNumber: "LES214590",
    addressLine1: "48 Stoneygate Avenue",
    city: "Leicester",
    postcode: "LE2 2AA",
    propertyType: "SEMI_DETACHED",
    tenure: "Freehold",
    estimatedValue: 330000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A characterful Edwardian semi in the desirable Stoneygate conservation area. Retaining stained glass and picture rails, with a refitted kitchen, two bathrooms and a well-stocked rear garden.",
  },
  {
    registryNumber: "TWR315608",
    addressLine1: "20 Osborne Avenue",
    city: "Newcastle upon Tyne",
    postcode: "NE2 2DS",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 295000,
    bedrooms: 3,
    bathrooms: 1,
    description:
      "A handsome Tyneside terrace in fashionable Jesmond, close to Osborne Road, the Metro and Jesmond Dene. Three bedrooms, a bay-fronted lounge and a sunny west-facing garden.",
  },
  {
    registryNumber: "NYK416729",
    addressLine1: "31 Holgate Road",
    city: "York",
    postcode: "YO24 1AB",
    propertyType: "SEMI_DETACHED",
    tenure: "Freehold",
    estimatedValue: 342000,
    bedrooms: 3,
    bathrooms: 1,
    description:
      "A charming three-bedroom semi within the city walls' reach, a short stroll from York railway station and the Minster. Period charm with a modern kitchen extension and a landscaped garden.",
  },
  {
    registryNumber: "AVN517841",
    addressLine1: "7 Zetland Road",
    city: "Bristol",
    postcode: "BS6 6QR",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 520000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A beautifully presented Victorian terrace in vibrant Redland, moments from Gloucester Road's independent shops and cafés. Three double bedrooms, a loft study and a landscaped courtyard garden.",
  },
  {
    registryNumber: "SOM618953",
    addressLine1: "5 Widcombe Hill",
    city: "Bath",
    postcode: "BA2 6AA",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 610000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A Grade II listed Georgian townhouse in Widcombe with far-reaching views over the World Heritage city. Bath stone frontage, sash windows, three storeys of accommodation and a tiered rear garden.",
  },
  {
    registryNumber: "AVN720064",
    addressLine1: "Flat 4, Vyvyan Terrace",
    city: "Bristol",
    postcode: "BS8 2XE",
    propertyType: "FLAT",
    tenure: "Leasehold",
    estimatedValue: 395000,
    bedrooms: 2,
    bathrooms: 1,
    description:
      "A grand two-bedroom garden-level apartment in a Regency terrace in the heart of Clifton. High ceilings, ornate plasterwork, a private patio and residents' parking, near the Suspension Bridge.",
  },
  {
    registryNumber: "LDN821175",
    addressLine1: "Flat 12, Nelson Court",
    addressLine2: "44 The Pavement",
    city: "London",
    postcode: "SW4 0JA",
    propertyType: "FLAT",
    tenure: "Leasehold",
    estimatedValue: 625000,
    bedrooms: 2,
    bathrooms: 2,
    description:
      "A bright two-bedroom apartment overlooking Clapham Common, seconds from the Northern line. Open-plan reception, two double bedrooms, en-suite and a share of freehold.",
  },
  {
    registryNumber: "LDN922286",
    addressLine1: "63 Melbourne Grove",
    city: "London",
    postcode: "SE22 8RG",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 850000,
    bedrooms: 4,
    bathrooms: 2,
    description:
      "A superb four-bedroom Victorian terrace in the heart of East Dulwich, close to Lordship Lane and North Dulwich station. A double reception, side-return kitchen extension and a 60ft garden.",
  },
  {
    registryNumber: "LDN023397",
    addressLine1: "Flat 2, Thornhill Mansions",
    addressLine2: "18 Thornhill Road",
    city: "London",
    postcode: "N1 1JP",
    propertyType: "FLAT",
    tenure: "Leasehold",
    estimatedValue: 720000,
    bedrooms: 2,
    bathrooms: 1,
    description:
      "A characterful two-bedroom period conversion in the Barnsbury conservation area of Islington. Original fireplaces, high ceilings and access to a communal garden, near Angel and Caledonian Road.",
  },
  {
    registryNumber: "LDN124408",
    addressLine1: "Flat 7, Powell House",
    addressLine2: "9 Mare Street",
    city: "London",
    postcode: "E8 4RP",
    propertyType: "FLAT",
    tenure: "Leasehold",
    estimatedValue: 545000,
    bedrooms: 2,
    bathrooms: 1,
    description:
      "A contemporary two-bedroom warehouse-style apartment in the heart of Hackney, close to London Fields and Broadway Market. Exposed brick, large windows and a concierge.",
  },
  {
    registryNumber: "LDN225519",
    addressLine1: "112 Grove Park Terrace",
    city: "London",
    postcode: "W4 3QE",
    propertyType: "SEMI_DETACHED",
    tenure: "Freehold",
    estimatedValue: 1250000,
    bedrooms: 4,
    bathrooms: 3,
    description:
      "An impressive four-bedroom family home in a prime Chiswick riverside location, moments from the Thames and Turnham Green. Elegant reception rooms, a large kitchen-diner and a sunny garden.",
  },
  {
    registryNumber: "BRK326620",
    addressLine1: "Flat 5, Kennet Wharf",
    addressLine2: "2 Kings Road",
    city: "Reading",
    postcode: "RG1 3AB",
    propertyType: "FLAT",
    tenure: "Leasehold",
    estimatedValue: 265000,
    bedrooms: 2,
    bathrooms: 2,
    description:
      "A modern two-bedroom riverside apartment a short walk from Reading station and the Oracle. Open-plan living, a private balcony over the Kennet and secure underground parking.",
  },
  {
    registryNumber: "OXF427731",
    addressLine1: "26 Walton Street",
    city: "Oxford",
    postcode: "OX2 6AB",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 575000,
    bedrooms: 3,
    bathrooms: 1,
    description:
      "A sought-after three-bedroom Victorian terrace in vibrant Jericho, moments from the canal, Oxford University Press and Walton Street's cafés. Characterful throughout with a pretty walled garden.",
  },
  {
    registryNumber: "CBG528842",
    addressLine1: "41 Mill Road",
    city: "Cambridge",
    postcode: "CB1 2AD",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 560000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A well-appointed three-bedroom terrace on the doorstep of eclectic Mill Road, a mile from Cambridge station and the city centre. Two receptions, a modern kitchen and a landscaped rear garden.",
  },
  {
    registryNumber: "SXE629953",
    addressLine1: "18 Preston Drove",
    city: "Brighton",
    postcode: "BN1 6LA",
    propertyType: "SEMI_DETACHED",
    tenure: "Freehold",
    estimatedValue: 485000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A bright three-bedroom 1930s semi overlooking Preston Park, a short bus ride from the seafront and the Lanes. Bay windows, a west-facing garden and off-street parking.",
  },
  {
    registryNumber: "MLN731064",
    addressLine1: "2F2, 14 Saxe Coburg Place",
    city: "Edinburgh",
    postcode: "EH3 5BR",
    propertyType: "FLAT",
    tenure: "Freehold",
    estimatedValue: 420000,
    bedrooms: 2,
    bathrooms: 1,
    description:
      "A traditional two-bedroom tenement flat in desirable Stockbridge, moments from the boutiques, the Water of Leith and the Botanic Garden. High ceilings, a bay window and a residents' garden.",
  },
  {
    registryNumber: "GLA832175",
    addressLine1: "Flat 1/2, 88 Cresswell Street",
    city: "Glasgow",
    postcode: "G12 8AB",
    propertyType: "FLAT",
    tenure: "Freehold",
    estimatedValue: 275000,
    bedrooms: 2,
    bathrooms: 1,
    description:
      "A spacious two-bedroom Victorian tenement flat in the heart of the West End's Hillhead, close to Byres Road, the University and the Subway. Bay window, original features and an enclosed garden.",
  },
  {
    registryNumber: "CDF933286",
    addressLine1: "9 Kings Road",
    city: "Cardiff",
    postcode: "CF11 9DA",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 355000,
    bedrooms: 3,
    bathrooms: 1,
    description:
      "A handsome three-bedroom Victorian terrace in leafy Pontcanna, walking distance to Sophia Gardens, the river and the independent shops of Pontcanna Street. Bright rooms and a sunny courtyard.",
  },
  {
    registryNumber: "BLF034397",
    addressLine1: "27 Deramore Drive",
    city: "Belfast",
    postcode: "BT9 5JS",
    propertyType: "SEMI_DETACHED",
    tenure: "Freehold",
    estimatedValue: 265000,
    bedrooms: 3,
    bathrooms: 1,
    description:
      "A comfortable three-bedroom semi in the desirable Malone area of South Belfast, close to good schools, the Lagan towpath and Queen's University. Driveway parking and a private rear garden.",
  },
  {
    registryNumber: "NFK135408",
    addressLine1: "12 Grove Avenue",
    city: "Norwich",
    postcode: "NR2 2AF",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 290000,
    bedrooms: 3,
    bathrooms: 1,
    description:
      "A charming three-bedroom terrace in Norwich's popular Golden Triangle, a level walk to the city centre, the market and the university. Period features with a contemporary kitchen and a courtyard.",
  },
  {
    registryNumber: "DEV236519",
    addressLine1: "5 Wonford Road",
    city: "Exeter",
    postcode: "EX2 4LB",
    propertyType: "BUNGALOW",
    tenure: "Freehold",
    estimatedValue: 375000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A deceptively spacious three-bedroom detached bungalow in the leafy St Leonards area, moments from the RD&E hospital and the city centre. Single-storey living, a conservatory and wrap-around gardens.",
  },
  {
    registryNumber: "CHS337620",
    addressLine1: "3 Abbey Green",
    city: "Chester",
    postcode: "CH1 2JH",
    propertyType: "TERRACED",
    tenure: "Freehold",
    estimatedValue: 320000,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A characterful three-storey Georgian townhouse within the historic city walls, moments from the Rows, the cathedral and the river. Original features, three bedrooms and a pretty walled courtyard.",
  },
  {
    registryNumber: "HMP438731",
    addressLine1: "Flat 3, Bedford House",
    addressLine2: "21 Bedford Place",
    city: "Southampton",
    postcode: "SO15 2DB",
    propertyType: "FLAT",
    tenure: "Leasehold",
    estimatedValue: 210000,
    bedrooms: 2,
    bathrooms: 1,
    description:
      "A well-presented two-bedroom apartment in the heart of Bedford Place, Southampton's café quarter, close to the Common, the university and the station. Bright open-plan living and allocated parking.",
  },
];

type DocTemplate = {
  type: DocumentType;
  title: string;
  description: string;
  priceInPence: number;
  residentialOnly?: boolean;
};

// Prices mirror the landing-page product cards so the site reads consistently.
const DOCUMENT_TEMPLATES: DocTemplate[] = [
  {
    type: "TITLE_REGISTER",
    title: "Official Copy — Title Register",
    description:
      "Shows the recorded ownership of the property, the price paid, tenure, and any rights, restrictions or covenants affecting it.",
    priceInPence: 2495,
  },
  {
    type: "TITLE_PLAN",
    title: "Official Copy — Title Plan",
    description:
      "A plan based on Ordnance Survey mapping identifying the general boundaries of the registered property.",
    priceInPence: 2495,
  },
  {
    type: "ENERGY_PERFORMANCE",
    title: "Energy Performance Certificate",
    description:
      "The property's energy efficiency rating and estimated running costs. Sample document for demonstration.",
    priceInPence: 995,
    residentialOnly: true,
  },
];

async function main() {
  console.log("Seeding database…");

  await prisma.order.deleteMany();
  await prisma.document.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();

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

  for (let i = 0; i < PROPERTIES.length; i++) {
    const p = PROPERTIES[i];
    const property = await prisma.property.create({ data: p });

    const images = imagesFor(p.propertyType, i);
    await prisma.propertyImage.createMany({
      data: images.map((url, idx) => ({
        propertyId: property.id,
        url,
        alt: `${p.addressLine1}, ${p.city}`,
        isPrimary: idx === 0,
        sortOrder: idx,
      })),
    });

    const isResidential =
      p.propertyType !== "COMMERCIAL" && p.propertyType !== "LAND";

    for (const tpl of DOCUMENT_TEMPLATES) {
      if (tpl.residentialOnly && !isResidential) continue;

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
  }

  const counts = {
    properties: await prisma.property.count(),
    images: await prisma.propertyImage.count(),
    documents: await prisma.document.count(),
  };
  console.log(
    `Seed complete — ${counts.properties} properties, ${counts.images} images, ${counts.documents} documents.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
