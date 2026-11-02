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
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import type { Borrow } from "@/types/borrow";

interface ReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  borrowing: Borrow;
  bookName: string;
  userName: string;
  days: number;
  onSendReminder: () => void;
}
export function ReminderDialog({
  open, onOpenChange, borrowing, bookName, userName, days, onSendReminder,
}: ReminderDialogProps) {
  const [reminderMessage, setReminderMessage] = useState("");
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setReminderMessage("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Send Overdue Reminder
          </DialogTitle>
          <DialogDescription>
            Send a reminder to the student about their overdue book.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-md space-y-1 text-sm">
            <p>
              <strong>Book:</strong> {bookName}
            </p>
            <p>
              <strong>Student:</strong> {userName}
            </p>
            <p className="text-destructive">
              <strong>Days Overdue:</strong> {days} days
            </p>
            {(borrowing.lateFee ?? 0) > 0 && (
              <p className="text-destructive">
                <strong>Late Fee:</strong>{" "}
                {formatCurrency(borrowing.lateFee ?? 0)}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="reminderMessage">
              Additional Message (optional)
            </Label>
            <Textarea
              id="reminderMessage"
              placeholder="Add a personal message to the reminder..."
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
              rows={3}
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
            onClick={onSendReminder}
            className="bg-orange-600 hover:bg-orange-700"
            type="button"
          >
            Send Reminder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
