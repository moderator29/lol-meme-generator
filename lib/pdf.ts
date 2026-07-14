/**
 * Minimal, dependency-free PDF generation for sample title documents.
 * Used by the seed script and as a fallback in the download route so that
 * documents are always downloadable even when no file is in storage (e.g. on
 * a serverless deployment where local files don't persist).
 */

export function buildSamplePdf(lines: string[]): Buffer {
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

/** Build a sample PDF for a specific document + its property. */
export function buildDocumentPdf(input: {
  documentTitle: string;
  registryNumber: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  postcode: string;
  tenure: string;
}): Buffer {
  const address = [input.addressLine1, input.addressLine2, input.city]
    .filter(Boolean)
    .join(", ");
  return buildSamplePdf([
    "PROPERTY REGISTRY — SAMPLE DOCUMENT",
    input.documentTitle,
    "",
    `Registry number: ${input.registryNumber}`,
    `Property: ${address}`,
    `Postcode: ${input.postcode}`,
    `Tenure: ${input.tenure}`,
    "",
    "This is sample demonstration data generated for an MVP.",
    "It is not an official HM Land Registry document.",
  ]);
}
