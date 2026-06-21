"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, ExternalLink } from "lucide-react";

interface TrackingCodeBannerProps {
  trackingId: string;
}

export function TrackingCodeBanner({ trackingId }: TrackingCodeBannerProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-6 mt-5 flex flex-col items-start justify-between gap-3 rounded-2xl border border-gold-primary/30 bg-gold-mist px-5 py-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-caption uppercase tracking-widest text-gold-dark">Tracking Code</p>
        <p className="mt-1 font-mono text-h3 font-bold tracking-wider text-navy-deep dark:text-navy-deep">
          {trackingId}
        </p>
        <p className="mt-0.5 text-caption text-navy-soft/65">
          Share this code with your customer so they can track their shipment.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-xl border border-gold-primary/40 bg-white/60 px-4 py-2.5 text-body-sm font-semibold text-navy-deep transition-all hover:border-gold-dark hover:bg-white"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy Code"}
        </button>
        <Link
          href={`/track/${trackingId}`}
          target="_blank"
          className="flex items-center gap-2 rounded-xl border border-gold-primary/40 bg-white/60 px-4 py-2.5 text-body-sm font-semibold text-navy-deep transition-all hover:border-gold-dark hover:bg-white"
        >
          <ExternalLink className="h-4 w-4" />
          Preview
        </Link>
      </div>
    </div>
  );
}
