"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob aurora-2 absolute right-[-10%] top-[-20%] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(99,102,241,0.22),transparent_70%)]" />
        <div className="aurora-blob aurora-3 absolute bottom-[-15%] left-[15%] h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(20,184,166,0.22),transparent_70%)]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="mx-auto max-w-4xl"
      >
        <div className="glass-card-gold overflow-hidden p-10 text-center sm:p-14">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark text-navy-deep shadow-gold">
            <Package className="h-7 w-7" />
          </div>
          <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight text-navy-deep dark:text-ivory">
            Ready to Ship with EDP Courier?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-navy-soft/70 dark:text-ivory/60">
            Join over 50,000 businesses that trust EDP Courier to move what matters most. Express, freight, same day, and international shipping all from one platform.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Get a Quote <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/track">
              <Button variant="secondary" size="lg">
                Track a Shipment
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
