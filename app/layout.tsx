import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { authEnabled } from "@/lib/auth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// This app is database-backed on every page (the header resolves the current
// user). Render per-request so `next build` never executes DB queries at build
// time — the database is only needed at runtime.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Property Registry — Official-style property title search",
    template: "%s · Property Registry",
  },
  description:
    "Search property records by postcode or address and download title documents. An MVP demonstration platform (sample data — not affiliated with HM Land Registry).",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );

  // Only mount ClerkProvider when configured, so public pages render (and the
  // app deploys) before Clerk keys are added.
  return authEnabled() ? <ClerkProvider>{content}</ClerkProvider> : content;
}
