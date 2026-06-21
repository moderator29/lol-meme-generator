"use client";

import { motion } from "framer-motion";
import { Zap, Ship, Clock, Building2, Package, Shield, Globe2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { CTASection } from "@/components/public/CTASection";

const SERVICES = [
  {
    icon: Zap,
    name: "Express Delivery",
    tag: "2 to 5 Business Days",
    description:
      "Priority handling at every hub, guaranteed delivery windows, and full real time tracking from pickup to signature confirmation. Express is our most popular tier for businesses that need reliability above all else.",
    features: [
      "Guaranteed delivery window",
      "Priority hub handling",
      "Real time tracking at every checkpoint",
      "Delivery signature confirmation",
      "Automated delay notifications",
    ],
    color: "from-gold-light to-gold-dark",
  },
  {
    icon: Ship,
    name: "International Freight",
    tag: "Cross Border",
    description:
      "Full customs clearance, duty calculation, and commercial invoice preparation for cross border freight of any volume. We handle the paperwork so your goods move without interruption at the border.",
    features: [
      "Full customs clearance support",
      "Duty and tax calculation",
      "Commercial documentation preparation",
      "Bonded carrier network",
      "180 country coverage",
    ],
    color: "from-indigo-400 to-indigo-600",
  },
  {
    icon: Clock,
    name: "Same Day Courier",
    tag: "Within Hours",
    description:
      "Local pickup and delivery within hours for urgent documents, legal papers, medical cargo, and time critical business goods. Our same day fleet operates seven days a week in all major urban centers.",
    features: [
      "Pickup within 60 minutes of booking",
      "Dedicated same day courier",
      "Real time driver location updates",
      "Chain of custody documentation",
      "7 day a week availability",
    ],
    color: "from-teal-400 to-teal-600",
  },
  {
    icon: Building2,
    name: "Enterprise Logistics",
    tag: "High Volume",
    description:
      "Dedicated infrastructure, account management, warehouse coordination, and custom API integration for businesses shipping at serious scale. Enterprise clients receive white glove service from a named account manager.",
    features: [
      "Dedicated account manager",
      "Custom API integration",
      "Warehouse coordination",
      "Volume pricing and rate tables",
      "Monthly consolidated invoicing",
    ],
    color: "from-violet-400 to-violet-600",
  },
];

const EXTRAS = [
  { icon: Package, title: "Fragile and Specialty Handling", description: "Electronics, medical devices, glassware, and artwork handled with custom packaging protocols and documented chain of custody." },
  { icon: Shield, title: "Shipment Insurance", description: "Declare the full value of your goods and we cover loss or damage in transit. Claims processed within 10 business days." },
  { icon: Globe2, title: "Multi Origin Consolidation", description: "Consolidate shipments from multiple suppliers into a single outbound delivery, reducing cost and complexity." },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden px-4 pt-20 pb-16">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="aurora-blob aurora-1 absolute left-[-8%] top-[-10%] h-[450px] w-[450px] bg-[radial-gradient(circle,rgba(201,168,76,0.4),transparent_70%)]" />
            <div className="aurora-blob aurora-3 absolute right-[-5%] bottom-[-5%] h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(20,184,166,0.25),transparent_70%)]" />
          </div>
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-label uppercase tracking-widest text-gold-dark"
            >
              What We Offer
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-3 font-display text-[clamp(2rem,6vw,3.75rem)] font-bold leading-tight text-navy-deep dark:text-ivory"
            >
              Every Shipping Need, Covered.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-5 text-body-lg text-navy-soft/75 dark:text-ivory/65"
            >
              From a single document to a palletized freight charter, EDP Courier has a service tier built for it. Every shipment moves with real time tracking, full documentation, and our guarantee behind it.
            </motion.p>
          </div>
        </section>

        {/* Services grid */}
        <section className="px-4 pb-16">
          <div className="mx-auto max-w-6xl space-y-6">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 30, delay: i * 0.06 }}
                  className="glass-card overflow-hidden"
                >
                  <div className="grid grid-cols-1 gap-0 lg:grid-cols-5">
                    <div className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-10">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="rounded-full border border-gold-primary/25 px-3 py-0.5 text-caption font-semibold uppercase tracking-wide text-gold-dark">
                          {service.tag}
                        </span>
                      </div>
                      <h2 className="mt-4 font-display text-h3 font-bold text-navy-deep dark:text-ivory">{service.name}</h2>
                      <p className="mt-3 text-body text-navy-soft/75 dark:text-ivory/65 leading-relaxed">{service.description}</p>
                      <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-2 text-body-sm font-semibold text-gold-dark hover:text-gold-light transition-colors"
                      >
                        Get a quote for this service <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="border-t border-gold-primary/10 bg-gold-mist/30 p-8 dark:bg-navy-mid/30 lg:col-span-2 lg:border-l lg:border-t-0">
                      <h4 className="text-caption font-bold uppercase tracking-widest text-gold-dark">What is included</h4>
                      <ul className="mt-4 space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-body-sm text-navy-deep dark:text-ivory">
                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-dark" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Add ons */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-label uppercase tracking-widest text-gold-dark">Additional Services</span>
              <h2 className="mt-3 font-display text-h2 font-bold text-navy-deep dark:text-ivory">
                Available on Every Tier.
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {EXTRAS.map((extra, i) => {
                const Icon = extra.icon;
                return (
                  <motion.div
                    key={extra.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, delay: i * 0.1 }}
                    className="glass-card p-7"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold-light to-gold-dark text-navy-deep shadow-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-h4 font-semibold text-navy-deep dark:text-ivory">{extra.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-navy-soft/70 dark:text-ivory/60">{extra.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
