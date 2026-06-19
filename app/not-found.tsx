import Link from "next/link";
import { PackageX } from "lucide-react";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-20">
        <div className="glass-card max-w-lg p-10 text-center">
          <PackageX className="mx-auto h-12 w-12 text-gold-primary/60" />
          <h1 className="mt-5 font-display text-h2 font-bold text-navy-deep dark:text-ivory">Page Not Found</h1>
          <p className="mt-3 text-body-sm text-navy-soft/70 dark:text-ivory/60">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/">
            <Button className="mt-6">Return Home</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
