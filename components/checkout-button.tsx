"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatPence } from "@/lib/format";

export function CheckoutButton({
  propertyId,
  documentIds,
  total,
  demoMode,
}: {
  propertyId: string;
  documentIds: string[];
  total: number;
  demoMode: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function pay() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, documentIds }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Checkout failed");
      }
      if (data.url?.startsWith("http")) {
        window.location.href = data.url; // external Stripe Checkout
      } else {
        router.push(data.url);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={pay}
        disabled={loading || documentIds.length === 0}
        variant="accent"
        size="lg"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Processing…
          </>
        ) : (
          <>Pay {formatPence(total)} &amp; download</>
        )}
      </Button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5" />
        {demoMode
          ? "Demo mode — no real payment is taken"
          : "Secure payment powered by Stripe"}
      </p>
    </div>
  );
}
