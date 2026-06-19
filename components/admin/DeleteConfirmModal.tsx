"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { deleteShipment } from "@/lib/actions/shipments";

interface DeleteConfirmModalProps {
  shipmentId: string;
  trackingId: string;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteConfirmModal({ shipmentId, trackingId, onClose, onDeleted }: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteShipment(shipmentId);
      toast.success(`Shipment ${trackingId} deleted.`);
      onDeleted();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete shipment.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/50 p-4">
      <div className="glass-card w-full max-w-sm p-6 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-status-red" />
        <h3 className="mt-4 font-display text-h4 font-semibold text-navy-deep dark:text-ivory">Delete Shipment</h3>
        <p className="mt-2 text-body-sm text-navy-soft/70 dark:text-ivory/60">
          This will permanently delete shipment {trackingId} and its history. This action cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1 bg-status-red" isLoading={isDeleting} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
