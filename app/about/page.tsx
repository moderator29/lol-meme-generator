"use client";

import { motion } from "framer-motion";
import { Globe2, ShieldCheck, Users, TrendingUp, Award, Clock, Package, Zap } from "lucide-react";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

const STATS = [
  { value: "2.4M+", label: "Shipments Delivered" },
  { value: "180+", label: "Countries Served" },
  { value: "99.4%", label: "On Time Delivery Rate" },
  { value: "50,000+", label: "Business Partners" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity in Every Delivery",
    description:
      "We operate with full transparency at every stage. Every shipment is logged, every status is real, and every customer deserves to know exactly where their goods are. No vague updates, no excuses.",
  },
  {
    icon: Globe2,
    title: "Built for a Connected World",
    description:
      "Our network spans more than 180 countries with direct carrier partnerships on every continent. Whether your shipment is crossing a city or an ocean, we treat it as our single most important delivery.",
  },
  {
    icon: Users,
    title: "People Behind Every Package",
    description:
      "Behind every status update is a real team of operators, drivers, customs brokers, and logistics engineers who care about getting it right. Automation handles the speed. People handle the exceptions.",
  },
  {
    icon: TrendingUp,
    title: "Relentless Improvement",
    description:
      "We measure everything, review every delay, and invest continuously in routing, infrastructure, and carrier quality. EDP Courier today is faster and more reliable than it was last year, and we intend to keep it that way.",
  },
  {
    icon: Award,
    title: "Enterprise Grade Standards",
    description:
      "From chain of custody documentation to tamper evident packaging standards, we operate at the quality level that regulated industries demand. Medical, legal, financial, and retail clients all trust us with their most sensitive shipments.",
  },
  {
    icon: Clock,
    title: "Time Is the Asset We Protect",
    description:
      "Missed delivery windows have real costs. That is why we build delivery time guarantees into our express tiers and give every partner an account manager whose job is to make sure nothing falls through the cracks.",
  },
];

const MILESTONES = [
  { year: "2018", title: "Founded", description: "EDP Courier launched with a focus on private enterprise shipping across West Africa." },
  { year: "2019", title: "Regional Expansion", description: "Extended network to cover 40 countries, adding dedicated freight and same day courier tiers." },
  { year: "2021", title: "Global Rollout", description: "Launched international freight with customs clearance to over 120 countries and opened three new hub facilities." },
  { year: "2023", title: "180 Countries", description: "Reached full global coverage across 180 countries with real time tracking on every shipment in the network." },
  { year: "2026", title: "Today", description: "2.4 million shipments delivered, 50,000 business partners, and a platform built to scale for the next decade." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden px-4 pt-20 pb-20">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="aurora-blob aurora-1 absolute left-[-8%] top-[-10%] h-[450px] w-[450px] bg-[radial-gradient(circle,rgba(201,168,76,0.4),transparent_70%)]" />
            <div className="aurora-blob aurora-2 absolute right-[-5%] top-[5%] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(99,102,241,0.25),transparent_70%)]" />
          </div>
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-label uppercase tracking-widest text-gold-dark"
            >
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-3 font-display text-[clamp(2rem,6vw,3.75rem)] font-bold leading-tight text-navy-deep dark:text-ivory"
            >
              We Built the Courier Service We Wished Existed.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-5 text-body-lg text-navy-soft/75 dark:text-ivory/65"
            >
              EDP Courier was founded on a simple belief: businesses and individuals deserve a private courier service that is fast, transparent, and operates at the same standard as the world&apos;s largest carriers. We built exactly that.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 pb-16">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: i * 0.08 }}
                className="glass-card flex flex-col items-center p-6 text-center"
              >
                <span className="font-display text-h2 font-bold text-gold-dark">{stat.value}</span>
                <span className="mt-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="glass-card-gold grid grid-cols-1 gap-0 overflow-hidden lg:grid-cols-2">
              <div className="p-10 lg:p-14">
                <span className="text-label uppercase tracking-widest text-gold-dark">Our Mission</span>
                <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-navy-deep dark:text-navy-deep">
                  Move what matters, exactly when it needs to arrive.
                </h2>
                <p className="mt-5 text-body text-navy-soft/80 dark:text-navy-soft/80 leading-relaxed">
                  We exist to remove the uncertainty from private courier logistics. Every tool we build, every route we optimize, and every partnership we form is designed to give businesses and individuals the confidence that their shipment will arrive safely, on time, and fully documented.
                </p>
                <p className="mt-4 text-body text-navy-soft/80 dark:text-navy-soft/80 leading-relaxed">
                  We do not cut corners on documentation, customs, or chain of custody. We hold ourselves to the standard of the world&apos;s best logistics operators because our clients have built their businesses on the assumption that we will deliver.
                </p>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-gold-light/20 to-navy-deep/5 p-10 lg:p-14">
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { icon: Package, label: "Every Package Tracked" },
                    { icon: ShieldCheck, label: "Secure Chain of Custody" },
                    { icon: Globe2, label: "Global Carrier Network" },
                    { icon: Zap, label: "Express Same Day Options" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="glass-card flex flex-col items-center gap-3 p-5 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-light to-gold-dark text-navy-deep shadow-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-body-sm font-semibold text-navy-deep dark:text-ivory">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="text-label uppercase tracking-widest text-gold-dark">What We Stand For</span>
              <h2 className="mt-3 font-display text-h2 font-bold text-navy-deep dark:text-ivory">
                The Principles We Operate By.
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {VALUES.map((value, i) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, delay: i * 0.07 }}
                    className="glass-card p-7"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark text-navy-deep shadow-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-h4 font-semibold text-navy-deep dark:text-ivory">{value.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-navy-soft/70 dark:text-ivory/60">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-4 py-16 pb-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="text-label uppercase tracking-widest text-gold-dark">History</span>
              <h2 className="mt-3 font-display text-h2 font-bold text-navy-deep dark:text-ivory">
                How We Got Here.
              </h2>
            </div>
            <div className="mt-12 relative">
              <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-gold-primary/60 via-gold-primary/30 to-transparent sm:left-1/2" />
              <div className="space-y-10">
                {MILESTONES.map((milestone, i) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 30, delay: i * 0.08 }}
                    className="relative flex gap-6 pl-16 sm:pl-0 sm:even:flex-row-reverse"
                  >
                    <div className="absolute left-6 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold-dark bg-ivory dark:bg-navy-deep sm:left-1/2 sm:-translate-x-1/2">
                      <div className="h-2 w-2 rounded-full bg-gold-dark" />
                    </div>
                    <div className="glass-card p-6 sm:w-[calc(50%-2rem)]">
                      <span className="font-mono text-body-sm font-bold text-gold-dark">{milestone.year}</span>
                      <h3 className="mt-1 font-display text-h4 font-semibold text-navy-deep dark:text-ivory">{milestone.title}</h3>
                      <p className="mt-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
