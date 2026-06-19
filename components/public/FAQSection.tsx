"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "How do I track my shipment?",
    answer:
      "Enter your EDP tracking number into the search field on the homepage or the dedicated tracking page. You will instantly see the current status, location history, and estimated delivery time for your package.",
  },
  {
    question: "What does a tracking number look like?",
    answer:
      "Every EDP tracking number follows the format EDP followed by the year and a six digit sequence, for example EDP 2026 000001. It is generated automatically the moment our operations team creates your shipment.",
  },
  {
    question: "How often is tracking information updated?",
    answer:
      "Tracking information updates in real time as your package moves through our network. Most milestones appear within minutes of the event actually happening at the facility or with the courier.",
  },
  {
    question: "Can I change my delivery address after a shipment is created?",
    answer:
      "Address changes are possible before the package reaches the out for delivery stage. Contact our support team with your tracking number and the new address as early as possible.",
  },
  {
    question: "What happens if a delivery attempt fails?",
    answer:
      "If our courier cannot complete delivery, the shipment status updates to delivery attempted and a new attempt is automatically scheduled. You will receive an updated estimated delivery window.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. Our network spans more than one hundred and eighty countries with full customs clearance support, tax calculation, and documentation assistance built into every international shipment.",
  },
  {
    question: "How is my personal information protected?",
    answer:
      "We use military grade encryption across every layer of our platform. Public tracking pages only ever display a first name and city, never full addresses, phone numbers, or email addresses.",
  },
  {
    question: "What should I do if my package is marked delivered but I have not received it?",
    answer:
      "Contact our support team immediately with your tracking number. We will investigate with the local delivery courier and provide proof of delivery details or initiate a resolution process.",
  },
  {
    question: "Can businesses get a dedicated account manager?",
    answer:
      "Enterprise customers shipping at scale receive a dedicated account manager, custom integration support, and priority handling through our enterprise logistics program.",
  },
  {
    question: "How do I get an admin account for my company?",
    answer:
      "Reach out through our contact page and our operations team will set up a company account, walk you through onboarding, and provide secure admin portal access.",
  },
];

export function FAQSection() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-display text-h2 font-bold text-navy-deep dark:text-ivory">{t("title")}</h2>
          <p className="mt-4 text-body-lg text-navy-soft/75 dark:text-ivory/65">{t("subtitle")}</p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="font-semibold text-navy-deep dark:text-ivory">{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-body-sm text-navy-soft/75 dark:text-ivory/65">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
