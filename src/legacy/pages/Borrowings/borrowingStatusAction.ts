type StatusAction = (id: string) => Promise<unknown>;

export async function executeBorrowStatusAction(
  newStatus: string,
  borrowingId: string,
  approveAsync: StatusAction,
  rejectAsync: StatusAction,
  returnAsync: StatusAction,
): Promise<void> {
  switch (newStatus) {
    case "approved":
      await approveAsync(borrowingId);
      break;
    case "rejected":
      await rejectAsync(borrowingId);
      break;
    case "returned":
      await returnAsync(borrowingId);
      break;
  }
}
