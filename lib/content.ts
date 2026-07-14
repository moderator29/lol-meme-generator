import type { FaqItem } from "@/components/faq-accordion";

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is a Title Register?",
    answer:
      "The Title Register shows the recorded ownership of a property or piece of land, along with the price paid, tenure, and any rights, restrictions or covenants that affect it.",
  },
  {
    question: "What is a Title Plan?",
    answer:
      "The Title Plan is a map, based on Ordnance Survey data, showing the general boundaries of a registered property. It is best read alongside the Title Register.",
  },
  {
    question: "How will I receive the documents?",
    answer:
      "Once your order is complete, your documents are available to download instantly as PDFs from your dashboard, and a copy is emailed to you.",
  },
  {
    question: "How long does it take to get the documents?",
    answer:
      "In this demonstration, documents are generated instantly. In a production deployment, official copies are typically returned within minutes to a few hours.",
  },
  {
    question: "Do I have to own the property to order documents?",
    answer:
      "No. Registered title information is publicly available, so you can order documents for any registered property, whether or not you own it.",
  },
  {
    question: "Are you the official Land Registry?",
    answer:
      "No. Property Registry is an independent demonstration MVP and is not affiliated with, owned or operated by HM Land Registry or the UK Government. All data shown here is sample data.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "The application for land documents was very accessible and with clear instructions. Acknowledged promptly and received within the hour. Thank you for this service.",
    name: "Karen",
    location: "Newcastle",
  },
  {
    quote:
      "Straightforward to search by postcode and the title documents were exactly what my solicitor asked for. Would use again.",
    name: "David",
    location: "Bristol",
  },
  {
    quote:
      "Really simple checkout and the PDF downloads worked immediately. A much nicer experience than I expected.",
    name: "Priya",
    location: "London",
  },
];

export const FEATURES = [
  {
    title: "Official-style title records",
    body: "Search recorded ownership, tenure, boundaries and legal rights for registered properties.",
    icon: "FileText",
  },
  {
    title: "Search by postcode or address",
    body: "Find any registered property in England, Wales, Scotland and Northern Ireland in seconds.",
    icon: "MapPin",
  },
  {
    title: "Instant PDF delivery",
    body: "Documents are delivered as downloadable PDFs to your dashboard and by email.",
    icon: "Download",
  },
  {
    title: "Secure card payments",
    body: "Checkout is handled securely by Stripe. Your card details never touch our servers.",
    icon: "ShieldCheck",
  },
];
