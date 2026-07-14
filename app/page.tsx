import Link from "next/link";
import {
  FileText,
  MapPin,
  Download,
  ShieldCheck,
  Check,
  ArrowRight,
  FileSearch,
  CreditCard,
} from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { PropertyCard } from "@/components/property-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { Stars } from "@/components/stars";
import { Button } from "@/components/ui/button";
import { getFeaturedProperties } from "@/lib/data";
import { FAQ_ITEMS, TESTIMONIALS } from "@/lib/content";

const FEATURE_ICONS = { FileText, MapPin, Download, ShieldCheck };

const DOCUMENT_PRODUCTS = [
  {
    title: "Title Register",
    price: "£24.95",
    body: "Shows ownership of the property or land, a description, price paid and restrictive covenants where available.",
    recommended: true,
  },
  {
    title: "Title Plan",
    price: "£24.95",
    body: "A visual representation of the property or land in a registered title, based on Ordnance Survey mapping.",
    recommended: true,
  },
  {
    title: "Conveyancing Pack",
    price: "£44.95",
    body: "Contains all available lease, transfer and conveyancing deeds and charges filed against the property.",
    recommended: false,
  },
];

export default async function HomePage() {
  const properties = await getFeaturedProperties(6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-brand-foreground">
        <div className="absolute inset-0 bg-grid opacity-[0.07]" />
        <div className="container relative py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium">
              <Stars rating={4} size="h-3.5 w-3.5" />
              Rated 4.2/5 by 2,289 customers
            </div>
            <h1 className="text-balance text-3xl font-extrabold leading-tight sm:text-5xl">
              Search Official-Style Property Title Records
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-brand-foreground/80 sm:text-lg">
              Find and download the Title Register, Title Plan and ownership
              records for any registered property in England, Wales, Scotland
              &amp; Northern Ireland. Delivered instantly as a PDF.
            </p>

            <div className="mx-auto mt-8 max-w-2xl rounded-xl bg-white p-3 shadow-lg">
              <SearchForm />
            </div>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-foreground/80">
              {[
                "Official-style copies",
                "Delivered by email",
                "Instant PDF download",
              ].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-b bg-secondary/40">
        <div className="container grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              { title: "Official-style records", body: "Ownership, tenure, boundaries and rights.", icon: "FileText" },
              { title: "Search by postcode", body: "Any registered property, in seconds.", icon: "MapPin" },
              { title: "Instant PDF delivery", body: "To your dashboard and by email.", icon: "Download" },
              { title: "Secure Stripe checkout", body: "Your card details stay protected.", icon: "ShieldCheck" },
            ] as const
          ).map((f) => {
            const Icon = FEATURE_ICONS[f.icon];
            return (
              <div key={f.title} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Three simple steps to your official-style property documents.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              step: "Step 1",
              title: "Find the property",
              body: "Search by postcode or address and select the property you need.",
              icon: FileSearch,
            },
            {
              step: "Step 2",
              title: "Choose your documents",
              body: "Pick the Title Register, Title Plan or a full conveyancing pack.",
              icon: FileText,
            },
            {
              step: "Step 3",
              title: "Pay & download",
              body: "Check out securely with Stripe and download your PDFs instantly.",
              icon: CreditCard,
            },
          ].map((s) => (
            <div key={s.step} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <s.icon className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                {s.step}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Document products */}
      <section id="documents" className="border-y bg-secondary/40">
        <div className="container py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Select the title deeds you require
            </h2>
            <p className="mt-2 text-muted-foreground">
              Choose one or more official-style documents for your property.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {DOCUMENT_PRODUCTS.map((d) => (
              <div
                key={d.title}
                className="relative flex flex-col rounded-xl border bg-card p-6 shadow-sm"
              >
                {d.recommended && (
                  <span className="absolute right-4 top-4 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                    Recommended
                  </span>
                )}
                <h3 className="text-lg font-semibold">{d.title}</h3>
                <p className="mt-1 text-2xl font-extrabold text-primary">
                  {d.price}
                </p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {d.body}
                </p>
                <Button asChild variant="outline" className="mt-5">
                  <Link href="/search">
                    Find a property <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
            Prices shown are illustrative sample pricing for this demonstration.
            The official HM Land Registry fee for a title copy is £3.
          </p>
        </div>
      </section>

      {/* Featured properties */}
      <section className="container py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Recently added properties
            </h2>
            <p className="mt-2 text-muted-foreground">
              A sample of registered properties available to search.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/search">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand text-brand-foreground">
        <div className="container py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              What our customers say
            </h2>
            <div className="mt-3 flex justify-center">
              <Stars rating={5} size="h-6 w-6" />
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <Stars rating={5} />
                <blockquote className="mt-3 text-sm leading-relaxed text-brand-foreground/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold">
                  {t.name},{" "}
                  <span className="font-normal text-brand-foreground/70">
                    {t.location}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-brand text-brand-foreground">
        <div className="container max-w-3xl border-t border-white/10 py-16">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to find a property?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
            Search by postcode or address and download official-style title
            documents in minutes.
          </p>
          <Button asChild size="lg" variant="accent" className="mt-6">
            <Link href="/search">
              Start your search <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
