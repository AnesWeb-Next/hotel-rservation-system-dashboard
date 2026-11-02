import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { UserForm } from "@/features/users/components/UserForm";
import type { User } from "@/types/user";

interface UserDetailDialogsProps {
  user: User;
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  deactivateDialogOpen: boolean;
  setDeactivateDialogOpen: (open: boolean) => void;
  handleDelete: () => void;
  handleToggleActive: () => void;
  handleFormSuccess: () => void;
}

export function UserDetailDialogs({
  user, formOpen, setFormOpen, deleteDialogOpen, setDeleteDialogOpen,
  deactivateDialogOpen, setDeactivateDialogOpen, handleDelete, handleToggleActive,
  handleFormSuccess,
}: UserDetailDialogsProps) {
  return (
    <>
      <UserForm open={formOpen} onOpenChange={setFormOpen} user={user} onSuccess={handleFormSuccess} />
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description={`Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`}
        onConfirm={handleDelete}
        confirmLabel="Delete"
        variant="destructive"
      />
      <ConfirmDialog
        open={deactivateDialogOpen}
        onOpenChange={setDeactivateDialogOpen}
        title={user.isActive ? "Deactivate User" : "Activate User"}
        description={
          user.isActive
            ? `Are you sure you want to deactivate ${user.firstName} ${user.lastName}? They will not be able to borrow books.`
            : `Are you sure you want to activate ${user.firstName} ${user.lastName}?`
        }
        onConfirm={handleToggleActive}
        confirmLabel={user.isActive ? "Deactivate" : "Activate"}
        variant={user.isActive ? "destructive" : "default"}
      />
    </>
  );
}
