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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";
import type { Borrow } from "@/types/borrow";

interface ExtendDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  borrowing: Borrow;
  bookName: string;
  userName: string;
  onExtend: (days: number) => void;
}

export function ExtendDialog({
  open,
  onOpenChange,
  borrowing,
  bookName,
  userName,
  onExtend,
}: ExtendDialogProps) {
  const [extendDays, setExtendDays] = useState(7);

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setExtendDays(7);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Extend Due Date</DialogTitle>
          <DialogDescription>
            Extend the due date for this borrowing.
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
            <p>
              <strong>Current Due Date:</strong> {formatDate(borrowing.dueDate)}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="extendDays">Extend by (days)</Label>
            <Input
              id="extendDays"
              type="number"
              min={1}
              max={30}
              value={extendDays}
              onChange={(e) => setExtendDays(Number(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              New due date will be:{" "}
              {formatDate(
                new Date(
                  new Date(borrowing.dueDate).getTime() +
                    extendDays * 24 * 60 * 60 * 1000,
                ).toISOString(),
              )}
            </p>
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
          <Button onClick={() => onExtend(extendDays)} type="button">
            Extend Due Date
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
