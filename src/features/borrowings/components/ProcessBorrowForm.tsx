import { useEffect, useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SelectField, TextareaField } from "@/components/shared/FormFields";
import type { Borrow } from "@/types/borrow";
import { useProcessBorrowMutations } from "./useProcessBorrowMutations";
import { ProcessBorrowSummary } from "./ProcessBorrowSummary";

interface ProcessBorrowFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  borrowing: Borrow;
  onSuccess?: () => void;
}

export function ProcessBorrowForm({ open, onOpenChange, borrowing, onSuccess }: ProcessBorrowFormProps) {
  const { approveMutation, rejectMutation, returnMutation, isPending } =
    useProcessBorrowMutations({ onOpenChange, onSuccess });

  const defaultValues = useMemo(() => ({ action: "" as string, reason: "" }), []);

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const id = borrowing._id;
      switch (value.action) {
        case "approve": approveMutation.mutate(id); break;
        case "reject": rejectMutation.mutate({ id, reason: value.reason || undefined }); break;
        case "return": returnMutation.mutate(id); break;
      }
    },
  });

  useEffect(() => {
    if (open) form.reset(defaultValues);
  }, [open, borrowing._id, defaultValues, form]);

  const actionOptions = useMemo(() => {
    if (borrowing.status === "pending") {
      return [{ value: "approve", label: "Approve" }, { value: "reject", label: "Reject" }];
    }
    if (["approved", "active", "overdue"].includes(borrowing.status)) {
      return [{ value: "return", label: "Mark as Returned" }];
    }
    return [];
  }, [borrowing.status]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Process Borrowing</DialogTitle>
          <DialogDescription>Update the status of this borrowing request.</DialogDescription>
        </DialogHeader>
        <ProcessBorrowSummary borrowing={borrowing} />
        <form
          onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit(); }}
          className="space-y-4"
        >
          <form.Field name="action">
            {(field) => <SelectField field={field} label="Action" options={actionOptions} required />}
          </form.Field>
          <form.Subscribe selector={(state) => state.values.action}>
            {(action) => action === "reject" ? (
              <form.Field name="reason">
                {(field) => <TextareaField field={field} label="Rejection Reason" placeholder="Reason for rejection..." rows={3} />}
              </form.Field>
            ) : null}
          </form.Subscribe>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting || isPending}>
                  {isSubmitting || isPending ? "Saving..." : "Update Status"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
