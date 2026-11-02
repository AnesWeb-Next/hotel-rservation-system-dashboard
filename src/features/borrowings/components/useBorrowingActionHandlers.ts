import { useNavigate } from "react-router";
import { toast } from "@/hooks/useToast";
import { formatDate, getDisplayName } from "@/lib/utils";
import type { Borrow } from "@/types/borrow";
import type { Book } from "@/types/book";
import type { User as UserType } from "@/types/user";
import type { useBorrowingMutations } from "./useBorrowingMutations";

interface UseBorrowingActionHandlersOptions {
  borrowing: Borrow;
  mutations: ReturnType<typeof useBorrowingMutations>;
  setReturnDialogOpen: (open: boolean) => void;
  setExtendDialogOpen: (open: boolean) => void;
  setReminderDialogOpen: (open: boolean) => void;
  setRejectDialogOpen: (open: boolean) => void;
}

export function useBorrowingActionHandlers({
  borrowing, mutations, setReturnDialogOpen, setExtendDialogOpen, setReminderDialogOpen, setRejectDialogOpen,
}: UseBorrowingActionHandlersOptions) {
  const navigate = useNavigate();
  const { approveMutation, rejectMutation, returnMutation, extendMutation } = mutations;
  const bookName = getDisplayName(borrowing.book as string | Book);
  const userName = getDisplayName(borrowing.user as string | UserType);

  const handleView = () => navigate(`/borrowings/${borrowing._id}`);
  const handleViewBook = () => {
    const bookId = typeof borrowing.book === "string" ? borrowing.book : (borrowing.book as Book)?._id;
    if (bookId) navigate(`/books/${bookId}`);
  };
  const handleViewUser = () => {
    const userId = typeof borrowing.user === "string" ? borrowing.user : (borrowing.user as UserType)?._id;
    if (userId) navigate(`/users/${userId}`);
  };

  const handleApprove = () => {
    approveMutation.mutate(borrowing._id, {
      onSuccess: () => toast({ title: "Borrowing approved", description: `Borrowing request for "${bookName}" has been approved.`, variant: "success" }),
      onError: () => toast({ title: "Error", description: "Failed to approve borrowing. Please try again.", variant: "destructive" }),
    });
  };

  const handleReturn = () => {
    returnMutation.mutate(borrowing._id, {
      onSuccess: () => {
        toast({ title: "Book returned", description: `"${bookName}" has been marked as returned.`, variant: "success" });
        setReturnDialogOpen(false);
      },
      onError: () => toast({ title: "Error", description: "Failed to mark book as returned. Please try again.", variant: "destructive" }),
    });
  };

  const handleExtend = (extendDays: number) => {
    extendMutation.mutate({ id: borrowing._id, days: extendDays }, {
      onSuccess: () => {
        const newDueDate = new Date(borrowing.dueDate);
        newDueDate.setDate(newDueDate.getDate() + extendDays);
        toast({ title: "Due date extended", description: `Due date extended by ${extendDays} days to ${formatDate(newDueDate.toISOString())}.`, variant: "success" });
        setExtendDialogOpen(false);
      },
      onError: () => toast({ title: "Error", description: "Failed to extend due date. Please try again.", variant: "destructive" }),
    });
  };

  const handleReject = (reason: string) => {
    rejectMutation.mutate({ id: borrowing._id, reason }, {
      onSuccess: () => {
        toast({ title: "Borrowing rejected", description: `Borrowing request for "${bookName}" has been rejected.`, variant: "success" });
        setRejectDialogOpen(false);
      },
      onError: () => toast({ title: "Error", description: "Failed to reject borrowing. Please try again.", variant: "destructive" }),
    });
  };

  const handleSendReminder = () => {
    toast({ title: "Reminder sent", description: `Reminder sent to ${userName} about overdue book "${bookName}".`, variant: "success" });
    setReminderDialogOpen(false);
  };

  return { handleView, handleViewBook, handleViewUser, handleApprove, handleReturn, handleExtend, handleReject, handleSendReminder, bookName, userName };
}
