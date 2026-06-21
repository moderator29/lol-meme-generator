import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "EDP Courier | Precision. Speed. Delivered.",
  description:
    "EDP Courier delivers packages to over 180 countries with real time tracking, express options, international freight, and same day courier services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} bg-ivory font-sans text-navy-deep antialiased dark:bg-navy-deep dark:text-ivory`}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Toaster richColors position="top-right" closeButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
