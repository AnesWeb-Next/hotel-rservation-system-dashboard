import { useEffect, useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { userFormSchema } from "@/validations/user";
import type { User } from "@/types/user";
import { useUserFormMutations } from "./useUserFormMutations";
import { UserFormFields } from "./UserFormFields";
import { UserFormFooter } from "./UserFormFooter";

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  onSuccess?: () => void;
}

export function UserForm({
  open,
  onOpenChange,
  user,
  onSuccess,
}: UserFormProps) {
  const { handleSubmit, isCreating, isUpdating, isEditing } =
    useUserFormMutations({ user, onSuccess, onOpenChange });

  const defaultValues = useMemo<UserFormValues>(
    () => ({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      password: "",
      role: user?.role ?? "user",
      borrowLimit: user?.borrowLimit ?? 5,
    }),
    [user],
  );

  const form = useForm({ defaultValues, onSubmit: handleSubmit });
  useEffect(() => {
    if (open) form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user?._id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the user details below."
              : "Fill in the details to add a new user."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <UserFormFields form={form} isEditing={isEditing} />
          <UserFormFooter
            form={form}
            isEditing={isEditing}
            isCreating={isCreating}
            isUpdating={isUpdating}
            onCancel={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
