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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { User } from "@/types/user";

interface SuspendDialogProps {
  user: User;
  activeBorrowingsCount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuspend: () => void;
}

export function SuspendDialog({
  user,
  activeBorrowingsCount,
  open,
  onOpenChange,
  onSuspend,
}: SuspendDialogProps) {
  const [suspendReason, setSuspendReason] = useState("");

  const handleSuspend = (): void => {
    onSuspend();
    setSuspendReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">
            Suspend Account
          </DialogTitle>
          <DialogDescription>
            This will suspend the student's account and prevent new borrowings.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-muted p-3 rounded-md space-y-1 text-sm">
            <p>
              <strong>Student:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Active Borrowings:</strong> {activeBorrowingsCount}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="suspendReason">Suspension Reason</Label>
            <Textarea
              id="suspendReason"
              placeholder="Please provide a reason for suspension..."
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
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
            onClick={handleSuspend}
            disabled={!suspendReason.trim()}
            type="button"
          >
            Suspend Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
