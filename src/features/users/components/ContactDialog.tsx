import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, Copy } from "lucide-react";
import { toast } from "@/hooks/useToast";
import type { User } from "@/types/user";

interface ContactDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({
  user,
  open,
  onOpenChange,
}: ContactDialogProps) {
  const copyToClipboard = (text: string, label: string): void => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Contact {user.fullName} {user.displayName}
          </DialogTitle>
          <DialogDescription>
            Use the information below to contact this student.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(user.email, "Email")}
              type="button"
              className="gap-2"
            >
              <Copy className="h-3 w-3" />
              Copy
            </Button>
          </div>
          {user.phone && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-md">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(user.phone ?? "", "Phone")}
                type="button"
                className="gap-2"
              >
                <Copy className="h-3 w-3" />
                Copy
              </Button>
            </div>
          )}
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
