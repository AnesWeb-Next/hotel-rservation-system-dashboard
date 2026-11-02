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
import { AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/useToast";
import { formatCurrency } from "@/lib/utils";
import { OverdueBooksList } from "@/features/users/components/OverdueBooksList";
import type { User } from "@/types/user";
import type { Borrow } from "@/types/borrow";
interface ReminderDialogProps {
  user: User;
  overdueBorrowings: Borrow[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ReminderDialog({
  user, overdueBorrowings, open, onOpenChange,
}: ReminderDialogProps) {
  const [reminderMessage, setReminderMessage] = useState("");
  const handleSendReminder = (): void => {
    toast({
      title: "Reminder sent",
      description: `Reminder sent to ${user.firstName} ${user.lastName} about ${overdueBorrowings.length} overdue book(s).`,
      variant: "success",
    });
    onOpenChange(false);
    setReminderMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Send Overdue Reminder
          </DialogTitle>
          <DialogDescription>
            Send a reminder about overdue books to this student.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-md space-y-2 text-sm">
            <p>
              <strong>Student:</strong> {user.firstName} {user.lastName}
            </p>
            <p className="text-destructive">
              <strong>Overdue Books:</strong> {overdueBorrowings.length}
            </p>
            {user.fines > 0 && (
              <p className="text-destructive">
                <strong>Total Fines:</strong> {formatCurrency(user.fines)}
              </p>
            )}
          </div>
          <OverdueBooksList overdueBorrowings={overdueBorrowings} />
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
            onClick={handleSendReminder}
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
