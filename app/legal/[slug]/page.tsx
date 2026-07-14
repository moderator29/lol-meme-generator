import { notFound } from "next/navigation";
import type { Metadata } from "next";

const PAGES: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "This is a demonstration MVP. This page is placeholder content and does not constitute a real privacy policy.",
      "In a production deployment, this page would describe what personal data is collected (such as your name, email address and order history), how it is used to fulfil document orders, the third parties involved (for example Clerk for authentication and Stripe for payments), how long data is retained, and your rights under UK GDPR.",
      "No real personal data should be entered into this demonstration.",
    ],
  },
  cookies: {
    title: "Cookies Policy",
    body: [
      "This is a demonstration MVP. This page is placeholder content.",
      "A production deployment would explain the cookies used for essential functionality (such as authentication sessions) and any analytics cookies, along with how to manage your preferences.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      "This is a demonstration MVP. This page is placeholder content and does not constitute real terms of service.",
      "Property Registry is not affiliated with, owned or operated by HM Land Registry or the UK Government. All property data shown in this demonstration is sample data and must not be relied upon.",
      "The official HM Land Registry service is available at gov.uk, where title copies can be obtained for a statutory fee of £3.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: PAGES[slug]?.title ?? "Legal" };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold">{page.title}</h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        {page.body.map((p, i) => (
          <p key={i} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
