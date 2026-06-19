"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { STATUS_ORDER, STATUS_CONFIG } from "@/lib/utils/statusConfig";
import { addTimelineEvent } from "@/lib/actions/timeline";
import type { ShipmentStatus } from "@/lib/types/shipment";

interface StatusUpdateModalProps {
  shipmentId: string;
  onClose: () => void;
  onUpdated: () => void;
}

export function StatusUpdateModal({ shipmentId, onClose, onUpdated }: StatusUpdateModalProps) {
  const [status, setStatus] = useState<ShipmentStatus>("in_transit");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      await addTimelineEvent(shipmentId, { status, location, public_note: note }, "admin");
      toast.success("Status updated.");
      onUpdated();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update status.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/50 p-4">
      <div className="glass-card w-full max-w-md p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Update Status</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gold-mist">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <select value={status} onChange={(e) => setStatus(e.target.value as ShipmentStatus)} className="input-field">
            {STATUS_ORDER.map((value) => (
              <option key={value} value={value}>{STATUS_CONFIG[value].label}</option>
            ))}
          </select>
          <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <textarea
            placeholder="Public note (visible to customer)"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="input-field resize-none"
          />
        </div>
        <Button onClick={handleSubmit} isLoading={isSubmitting} className="mt-5 w-full">
          Update Shipment
        </Button>
      </div>
    </div>
  );
}
