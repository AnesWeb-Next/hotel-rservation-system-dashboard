import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface UserFormFooterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isEditing: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  onCancel: () => void;
}

export function UserFormFooter({
  form,
  isEditing,
  isCreating,
  isUpdating,
  onCancel,
}: UserFormFooterProps) {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <form.Subscribe
        selector={(state: { canSubmit: boolean; isSubmitting: boolean }) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]: [boolean, boolean]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting || isCreating || isUpdating}
          >
            {isSubmitting || isCreating || isUpdating
              ? "Saving..."
              : isEditing
                ? "Update User"
                : "Add User"}
          </Button>
        )}
      </form.Subscribe>
    </DialogFooter>
  );
}
