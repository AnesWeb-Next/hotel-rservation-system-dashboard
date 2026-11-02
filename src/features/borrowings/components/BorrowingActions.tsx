import { useState } from "react";
import type { Borrow } from "@/types/borrow";
import { getDueDateInfo } from "./getDueDateInfo";
import { useBorrowingMutations } from "./useBorrowingMutations";
import { useBorrowingActionHandlers } from "./useBorrowingActionHandlers";
import { BorrowingStatusActions } from "./BorrowingStatusActions";
import { BorrowingSecondaryActions } from "./BorrowingSecondaryActions";
import { ReturnDialog } from "./ReturnDialog";
import { ExtendDialog } from "./ExtendDialog";
import { ReminderDialog } from "./ReminderDialog";
import { ContactDialog } from "./ContactDialog";
import { RejectDialog } from "./RejectDialog";

interface BorrowingActionsProps {
  borrowing: Borrow;
  compact?: boolean;
}

export function BorrowingActions({ borrowing, compact = false }: BorrowingActionsProps) {
  const mutations = useBorrowingMutations();
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [extendDialogOpen, setExtendDialogOpen] = useState(false);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const { days } = getDueDateInfo(borrowing.dueDate);

  const {
    handleView, handleViewBook, handleViewUser,
    handleApprove, handleReturn, handleExtend, handleReject, handleSendReminder,
    bookName, userName,
  } = useBorrowingActionHandlers({
    borrowing, mutations,
    setReturnDialogOpen, setExtendDialogOpen, setReminderDialogOpen, setRejectDialogOpen,
  });

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <BorrowingStatusActions
          borrowing={borrowing} compact={compact}
          onApprove={handleApprove} onRejectOpen={() => setRejectDialogOpen(true)}
          onReturnOpen={() => setReturnDialogOpen(true)} onExtendOpen={() => setExtendDialogOpen(true)}
          onReminderOpen={() => setReminderDialogOpen(true)} onContactOpen={() => setContactDialogOpen(true)}
        />
        <BorrowingSecondaryActions onView={handleView} onViewBook={handleViewBook} onViewUser={handleViewUser} />
      </div>
      <ReturnDialog
        open={returnDialogOpen} onOpenChange={setReturnDialogOpen}
        borrowing={borrowing} bookName={bookName} userName={userName} onConfirm={handleReturn}
      />
      <ExtendDialog
        open={extendDialogOpen} onOpenChange={setExtendDialogOpen}
        borrowing={borrowing} bookName={bookName} userName={userName} onExtend={handleExtend}
      />
      <ReminderDialog
        open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}
        borrowing={borrowing} bookName={bookName} userName={userName}
        days={days} onSendReminder={handleSendReminder}
      />
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} userName={userName} />
      <RejectDialog
        open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}
        bookName={bookName} userName={userName} onReject={handleReject}
      />
    </>
  );
}
