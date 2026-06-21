"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { ChevronDown, ArrowRight } from "lucide-react";

export const ALL_FAQS = [
  {
    category: "Tracking and Shipment Status",
    items: [
      {
        question: "How do I track my shipment?",
        answer:
          "Enter your EDP tracking number into the search bar on the homepage or on the dedicated Track page. Our system instantly retrieves the current status, full location history, courier hand off records, and your estimated delivery window. No account or login is needed to track a shipment.",
      },
      {
        question: "What does an EDP tracking number look like?",
        answer:
          "Every EDP tracking number follows the format EDP, followed by the year, followed by a six digit sequence number, for example EDP-2026-000001. It is generated automatically the moment our operations team registers your shipment in the system.",
      },
      {
        question: "How often is the tracking information updated?",
        answer:
          "Tracking milestones update in real time as your package moves through our network. Events such as facility arrival, customs clearance, and courier pickup appear within minutes of the actual event occurring. For international shipments, some customs and in transit stages may have longer gaps between updates depending on the destination country.",
      },
      {
        question: "Why has my tracking not updated in a while?",
        answer:
          "Tracking pauses most commonly occur during international transit legs or while a package awaits customs clearance. These pauses are normal and do not indicate a problem. If your tracking has not updated for more than five business days and your shipment is not in an international transit or customs stage, please contact our support team with your tracking number.",
      },
      {
        question: "What do the different shipment statuses mean?",
        answer:
          "EDP uses a detailed status system: Shipment Created means your booking is registered. Package Collected means the courier has picked it up. Received at Origin Facility, Sorting Facility, and Awaiting Dispatch track it through our hubs. In Transit and International Transit cover the movement phase. Customs Clearance and Arrived at Destination Country cover cross border processing. Out for Delivery means a courier is on the way to you. Delivered Successfully is the final confirmation.",
      },
      {
        question: "Can I share my tracking link with someone else?",
        answer:
          "Yes. You can share your EDP tracking number with anyone. The public tracking page only displays limited information such as first name, origin city, and destination city. Full addresses, phone numbers, and email addresses are never shown on the public tracking view.",
      },
    ],
  },
  {
    category: "Shipping Services",
    items: [
      {
        question: "What shipping services does EDP Courier offer?",
        answer:
          "EDP Courier offers four main service tiers: Express Delivery with guaranteed delivery windows and priority hub handling; International Freight for large or heavy cross border shipments with full customs support; Same Day Courier for local urgent deliveries within hours; and Enterprise Logistics for businesses requiring dedicated fleet allocation, account management, and custom integrations.",
      },
      {
        question: "What types of packages can I ship with EDP Courier?",
        answer:
          "We handle documents, parcels, fragile items, electronics, medical cargo, perishables, liquids, freight, pallets, and oversized shipments. Each package type receives handling instructions appropriate to its category. Some restrictions apply to hazardous materials and prohibited goods depending on the destination country.",
      },
      {
        question: "Is there a weight or size limit for shipments?",
        answer:
          "For standard parcel services the limit is 70 kilograms and 300 centimeters combined length and girth. For freight and pallet shipments there are no fixed upper limits, but oversized cargo requires advance coordination with our operations team. Contact us before booking any shipment over 70 kilograms.",
      },
      {
        question: "Do you offer insurance for shipments?",
        answer:
          "Yes. You can add shipment insurance at the time of booking. Insurance covers the declared value of your package against loss or damage during transit. We recommend declaring the full replacement value of your goods. Insurance claims are processed within 10 business days of submission.",
      },
      {
        question: "How do I get a shipping quote?",
        answer:
          "Use the Get a Quote section on our Contact page or reach out directly to our operations team. Quotes are based on origin, destination, weight, dimensions, service tier, and declared value. Enterprise customers can request custom rate tables through their account manager.",
      },
    ],
  },
  {
    category: "Delivery and Pickup",
    items: [
      {
        question: "What happens if a delivery attempt fails?",
        answer:
          "If our courier cannot complete delivery on the first attempt, the shipment status updates to Delivery Attempted. A second delivery attempt is automatically scheduled for the next business day. If a second attempt also fails, the package is held at the nearest EDP facility for up to five business days for collection. After that period, the shipment may be returned to the sender.",
      },
      {
        question: "Can I change my delivery address after the shipment has been created?",
        answer:
          "Address changes are possible as long as your shipment has not yet reached the Out for Delivery status. Contact our support team as early as possible with your tracking number and the corrected address. A small address correction fee may apply for international shipments that have already cleared customs.",
      },
      {
        question: "Do I need to be home to receive a delivery?",
        answer:
          "For standard parcels, our couriers will leave the package in a safe location if no one is available to sign. For shipments requiring a signature, express deliveries, or high value packages, someone must be present to accept and sign for the delivery. You can add delivery instructions to your shipment booking to specify preferred drop points.",
      },
      {
        question: "Can I collect my shipment from an EDP facility?",
        answer:
          "Yes. If you prefer to collect your package from our facility rather than waiting for home delivery, contact our support team with your tracking number. We can hold the shipment at the local hub for up to five business days for you to collect at your convenience.",
      },
      {
        question: "My package shows delivered but I have not received it. What should I do?",
        answer:
          "First check with all members of your household and any safe spots the courier may have used such as a porch, mailroom, or neighbor. If you still cannot locate it, contact our support team immediately with your tracking number. We will retrieve the proof of delivery photo and signature, and if necessary initiate a full investigation with the local delivery courier.",
      },
    ],
  },
  {
    category: "International Shipping",
    items: [
      {
        question: "Does EDP Courier ship internationally?",
        answer:
          "Yes. EDP Courier operates in over 180 countries across every continent. Our international network includes direct partnerships with customs brokers, bonded carriers, and destination country logistics providers, giving your shipment a seamless cross border journey.",
      },
      {
        question: "How does customs clearance work?",
        answer:
          "For international shipments, EDP Courier handles the customs clearance process on your behalf. You are required to provide an accurate commercial invoice, the correct HS tariff code for your goods, and a truthful declared value. Our customs team prepares all required documentation and liaises with customs authorities at the destination. Most clearances complete within one to two business days.",
      },
      {
        question: "Who is responsible for import duties and taxes?",
        answer:
          "By default, import duties, VAT, and local taxes are the responsibility of the recipient. If you prefer to pre pay all duties on behalf of your recipient, contact our operations team to set up a Delivery Duty Paid arrangement before the shipment departs. This provides a smoother delivery experience and removes any surprise charges for the recipient.",
      },
      {
        question: "Are there items that cannot be shipped internationally?",
        answer:
          "Yes. Prohibited items include currency, living animals, perishables without prior approval, firearms, illegal substances, and certain types of batteries without proper documentation. Restricted items such as alcohol, tobacco, and medical devices may be allowed with the correct permits and documentation. Contact us before booking if you are unsure about your goods.",
      },
      {
        question: "How long does international shipping take?",
        answer:
          "International delivery times depend on the origin and destination country pair, the service tier chosen, and customs clearance time. Express international shipments typically arrive in two to five business days. Standard international shipments take five to ten business days. Freight and oversized cargo timelines vary based on routing and clearance requirements.",
      },
    ],
  },
  {
    category: "Billing and Payments",
    items: [
      {
        question: "What payment methods does EDP Courier accept?",
        answer:
          "EDP Courier accepts major credit and debit cards, bank transfers, and invoice billing for enterprise accounts. Prepaid credit is also available for high frequency shippers. All transactions are processed through encrypted, PCI compliant payment systems.",
      },
      {
        question: "When am I charged for a shipment?",
        answer:
          "Payment is collected at the time of booking for standard and express shipments. Enterprise customers with monthly invoicing are billed at the end of each billing cycle with full itemized breakdowns. For freight and charter shipments, a deposit is collected at booking and the balance is due before dispatch.",
      },
      {
        question: "How do I request a refund?",
        answer:
          "If your shipment was not delivered due to an error on our part, or if you cancel an eligible booking before the package is collected, you may be entitled to a full or partial refund. Submit a refund request through our contact form with your tracking number and booking reference. Our billing team responds within three business days.",
      },
      {
        question: "Can I get an invoice for my shipment?",
        answer:
          "Yes. A digital invoice is generated automatically for every shipment and sent to the email address on the booking. Enterprise customers can access full invoice history, monthly statements, and export records through their account portal. If you need a revised invoice for accounting purposes, contact our billing support team.",
      },
    ],
  },
  {
    category: "Account and Admin Access",
    items: [
      {
        question: "How do I get admin access to manage shipments?",
        answer:
          "Admin access to the EDP Courier operations portal is granted by our team to verified business customers. Reach out through the Contact page to request an account setup. Once verified, you will receive secure credentials to access the admin portal at edpcourier.com/admin, where you can create shipments, update statuses, manage timelines, and view analytics.",
      },
      {
        question: "Where is the admin panel?",
        answer:
          "The admin operations portal is accessible by adding /admin to the end of any EDP Courier domain. For example, if the site is at your configured domain, visit yourdomain.com/admin to reach the secure login page. All admin access requires verified credentials and is protected by session based authentication.",
      },
      {
        question: "Can multiple team members have admin access?",
        answer:
          "Yes. EDP Courier supports multiple admin users with tiered permission levels including Super Admin, Admin, Operator, and Viewer roles. Super Admins can create and manage additional admin accounts. Each user has their own secure login credentials and all actions are logged in the activity audit trail.",
      },
    ],
  },
];

const PREVIEW_COUNT = 6;

export function FAQSection() {
  const t = useTranslations("faq");
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  const previewItems = ALL_FAQS.flatMap((cat, ci) =>
    cat.items.slice(0, ci === 0 ? 4 : 1).map((item, ii) => ({ item, key: `${ci}-${ii}` }))
  ).slice(0, PREVIEW_COUNT);

  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="text-label uppercase tracking-widest text-gold-dark">Support</span>
          <h2 className="mt-3 font-display text-h2 font-bold text-navy-deep dark:text-ivory">{t("title")}</h2>
          <p className="mt-4 text-body-lg text-navy-soft/75 dark:text-ivory/65">{t("subtitle")}</p>
        </div>

        <div className="mt-12 space-y-3">
          {previewItems.map(({ item, key }) => {
            const isOpen = openKey === key;
            return (
              <div key={key} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenKey(isOpen ? null : key)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="font-semibold text-navy-deep dark:text-ivory">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-gold-dark transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                      <p className="px-6 pb-5 text-body-sm leading-relaxed text-navy-soft/75 dark:text-ivory/65">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-body-sm font-semibold text-gold-dark hover:text-gold-light transition-colors"
          >
            View all questions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
