import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookName: string;
  userName: string;
  onReject: (reason: string) => void;
}

export function RejectDialog({
  open,
  onOpenChange,
  bookName,
  userName,
  onReject,
}: RejectDialogProps) {
  const [rejectReason, setRejectReason] = useState("");

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setRejectReason("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Borrowing Request</DialogTitle>
          <DialogDescription>
            Provide a reason for rejecting this borrowing request.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-muted p-3 rounded-md space-y-1 text-sm">
            <p>
              <strong>Book:</strong> {bookName}
            </p>
            <p>
              <strong>Student:</strong> {userName}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rejectReason">Rejection Reason</Label>
            <Textarea
              id="rejectReason"
              placeholder="Please provide a reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => onReject(rejectReason)}
            disabled={!rejectReason.trim()}
            type="button"
          >
            Reject Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
