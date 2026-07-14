import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/#documents", label: "Title Documents" },
  { href: "/#faq", label: "FAQ" },
  { href: "/dashboard", label: "My Account" },
];

const LEGAL_LINKS = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/cookies", label: "Cookies Policy" },
  { href: "/legal/terms", label: "Terms & Conditions" },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="container flex flex-col items-center gap-6 py-12 text-center">
        <BrandLogo tone="light" />

        <p className="max-w-md text-sm text-brand-foreground/70">
          Property Registry is a demonstration MVP. It is not affiliated with,
          owned or operated by HM Land Registry or the UK Government. All
          property data shown is sample data for illustration only.
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-brand-foreground/80 transition-colors hover:text-brand-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {LEGAL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-brand-foreground/60 transition-colors hover:text-brand-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Payment trust badges */}
        <div className="flex items-center gap-3 opacity-80">
          <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium">
            Secure checkout
          </span>
          <span className="rounded bg-white/10 px-2 py-1 text-xs font-semibold tracking-wide">
            stripe
          </span>
          <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium">
            VISA
          </span>
          <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium">
            Mastercard
          </span>
        </div>

        <p className="text-xs text-brand-foreground/50">
          © {new Date().getFullYear()} Property Registry (demo). All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
