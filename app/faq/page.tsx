"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { ALL_FAQS } from "@/components/public/FAQSection";

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = ALL_FAQS.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        (!query || item.question.toLowerCase().includes(query.toLowerCase()) || item.answer.toLowerCase().includes(query.toLowerCase())) &&
        (!activeCategory || cat.category === activeCategory)
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative isolate overflow-hidden px-4 pt-20 pb-16">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="aurora-blob aurora-1 absolute left-[-8%] top-[-10%] h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(201,168,76,0.45),transparent_70%)]" />
            <div className="aurora-blob aurora-2 absolute right-[-5%] top-[5%] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(99,102,241,0.28),transparent_70%)]" />
          </div>
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-label uppercase tracking-widest text-gold-dark"
            >
              Help Center
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-3 font-display text-[clamp(2rem,6vw,3.75rem)] font-bold leading-tight text-navy-deep dark:text-ivory"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-5 text-body-lg text-navy-soft/70 dark:text-ivory/60"
            >
              Everything you need to know about shipping, tracking, customs, billing, and working with EDP Courier. Can not find your answer? Contact our support team.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="glass-card mx-auto mt-8 flex max-w-xl items-center gap-3 px-4 py-3"
            >
              <Search className="h-5 w-5 shrink-0 text-gold-dark" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all questions..."
                className="w-full bg-transparent text-body text-navy-deep outline-none placeholder:text-navy-soft/45 dark:text-ivory dark:placeholder:text-ivory/35"
              />
            </motion.div>
          </div>
        </section>

        {/* Category pills */}
        <section className="px-4 pb-4">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`rounded-full border px-4 py-1.5 text-body-sm font-medium transition-all ${
                  activeCategory === null
                    ? "border-gold-dark bg-gold-dark text-navy-deep"
                    : "border-gold-primary/30 text-navy-soft/70 hover:border-gold-dark hover:text-gold-dark dark:text-ivory/60"
                }`}
              >
                All Topics
              </button>
              {ALL_FAQS.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category === activeCategory ? null : cat.category)}
                  className={`rounded-full border px-4 py-1.5 text-body-sm font-medium transition-all ${
                    activeCategory === cat.category
                      ? "border-gold-dark bg-gold-dark text-navy-deep"
                      : "border-gold-primary/30 text-navy-soft/70 hover:border-gold-dark hover:text-gold-dark dark:text-ivory/60"
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ content */}
        <section className="px-4 py-10 pb-24">
          <div className="mx-auto max-w-4xl space-y-14">
            {filtered.length === 0 ? (
              <div className="py-20 text-center text-body text-navy-soft/60 dark:text-ivory/50">
                No questions match your search. Try a different keyword or browse all topics.
              </div>
            ) : (
              filtered.map((cat, catIndex) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 30, delay: catIndex * 0.05 }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gold-primary/20" />
                    <h2 className="font-display text-h4 font-bold text-navy-deep dark:text-ivory whitespace-nowrap">
                      {cat.category}
                    </h2>
                    <div className="h-px flex-1 bg-gold-primary/20" />
                  </div>

                  <div className="space-y-3">
                    {cat.items.map((item, itemIndex) => {
                      const key = `${cat.category}-${itemIndex}`;
                      const isOpen = openKey === key;
                      return (
                        <div key={key} className="glass-card overflow-hidden">
                          <button
                            onClick={() => setOpenKey(isOpen ? null : key)}
                            className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                          >
                            <span className="font-semibold leading-snug text-navy-deep dark:text-ivory">
                              {item.question}
                            </span>
                            <ChevronDown
                              className={`mt-0.5 h-4 w-4 shrink-0 text-gold-dark transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <p className="px-6 pb-6 text-body-sm leading-relaxed text-navy-soft/75 dark:text-ivory/65">
                                  {item.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Still need help */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <div className="glass-card-gold p-10">
              <h3 className="font-display text-h3 font-bold text-navy-deep dark:text-ivory">
                Still have questions?
              </h3>
              <p className="mt-3 text-body-sm text-navy-soft/70 dark:text-ivory/60">
                Our global operations team is available around the clock. Reach out and we will get back to you within one business day.
              </p>
              <a
                href="/contact"
                className="btn-primary mt-6 inline-flex"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
