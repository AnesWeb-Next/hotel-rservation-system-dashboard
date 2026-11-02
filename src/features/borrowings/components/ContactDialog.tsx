import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/useToast";
import { Mail, Clock } from "lucide-react";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
}

function copyToClipboard(text: string, label: string): void {
  navigator.clipboard.writeText(text);
  toast({
    title: "Copied",
    description: `${label} copied to clipboard.`,
  });
}

export function ContactDialog({
  open,
  onOpenChange,
  userName,
}: ContactDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Student</DialogTitle>
          <DialogDescription>
            Contact information for {userName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>student@example.com</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard("student@example.com", "Email")}
                type="button"
              >
                Copy
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard("+15551234567", "Phone")}
                type="button"
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            type="button"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
