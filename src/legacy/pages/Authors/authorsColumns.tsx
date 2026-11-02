import { ActionsDropdown } from "@/components/shared/ActionsDropdown";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Author } from "@/types/author";

interface AuthorRowActionsProps {
  author: Author;
  onView: (author: Author) => void;
  onEdit: (author: Author) => void;
  onDelete: (author: Author) => void;
}

export function AuthorRowActions({
  author,
  onView,
  onEdit,
  onDelete,
}: AuthorRowActionsProps) {
  return (
    <ActionsDropdown
      actions={[
        {
          label: "View Details",
          icon: <Eye className="h-4 w-4" />,
          onClick: () => onView(author),
        },
        {
          label: "Edit",
          icon: <Pencil className="h-4 w-4" />,
          onClick: () => onEdit(author),
        },
        {
          label: "Delete",
          icon: <Trash2 className="h-4 w-4" />,
          onClick: () => onDelete(author),
          variant: "destructive",
        },
      ]}
    />
  );
}
