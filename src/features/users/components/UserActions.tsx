import { useUserActions } from "@/features/users/components/useUserActions";
import { UserQuickBadges } from "@/features/users/components/UserQuickBadges";
import { UserPrimaryButtons } from "@/features/users/components/UserPrimaryButtons";
import { UserSecondaryButtons } from "@/features/users/components/UserSecondaryButtons";
import { ContactDialog } from "@/features/users/components/ContactDialog";
import { ReminderDialog } from "@/features/users/components/ReminderDialog";
import { SuspendDialog } from "@/features/users/components/SuspendDialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import type { User } from "@/types/user";

interface UserActionsProps {
  user: User;
  compact?: boolean;
}

export function UserActions({ user, compact = false }: UserActionsProps) {
  const {
    activeBorrowings,
    overdueBorrowings,
    contactDialogOpen,
    setContactDialogOpen,
    reminderDialogOpen,
    setReminderDialogOpen,
    suspendDialogOpen,
    setSuspendDialogOpen,
    reactivateDialogOpen,
    setReactivateDialogOpen,
    handleViewProfile,
    handleViewHistory,
    handleEdit,
    handleNewBorrowing,
    handleSuspend,
    handleReactivate,
  } = useUserActions(user);

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        {!compact && (
          <UserQuickBadges
            user={user}
            activeBorrowingsCount={activeBorrowings.length}
            overdueBorrowingsCount={overdueBorrowings.length}
            onReminderClick={() => setReminderDialogOpen(true)}
          />
        )}
        <UserPrimaryButtons
          compact={compact}
          isActive={user.isActive}
          hasOverdue={overdueBorrowings.length > 0}
          onViewProfile={handleViewProfile}
          onNewBorrowing={handleNewBorrowing}
          onSendReminder={() => setReminderDialogOpen(true)}
        />
        <UserSecondaryButtons
          isActive={user.isActive}
          onViewHistory={handleViewHistory}
          onEdit={handleEdit}
          onContact={() => setContactDialogOpen(true)}
          onSuspend={() => setSuspendDialogOpen(true)}
          onReactivate={() => setReactivateDialogOpen(true)}
        />
      </div>

      <ContactDialog
        user={user}
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
      />
      <ReminderDialog
        user={user}
        overdueBorrowings={overdueBorrowings}
        open={reminderDialogOpen}
        onOpenChange={setReminderDialogOpen}
      />
      <SuspendDialog
        user={user}
        activeBorrowingsCount={activeBorrowings.length}
        open={suspendDialogOpen}
        onOpenChange={setSuspendDialogOpen}
        onSuspend={handleSuspend}
      />
      <ConfirmDialog
        open={reactivateDialogOpen}
        onOpenChange={setReactivateDialogOpen}
        title="Reactivate Account"
        description={`Are you sure you want to reactivate ${user.firstName} ${user.lastName}'s account?`}
        confirmLabel="Reactivate Account"
        onConfirm={handleReactivate}
        variant="default"
      />
    </>
  );
}
