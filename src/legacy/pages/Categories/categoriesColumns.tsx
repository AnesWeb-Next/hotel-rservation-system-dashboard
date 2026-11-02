import { ActionsDropdown } from "@/components/shared/ActionsDropdown";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Category } from "@/types/category";

interface CategoryRowActionsProps {
  category: Category;
  onView: (category: Category) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryRowActions({
  category,
  onView,
  onEdit,
  onDelete,
}: CategoryRowActionsProps) {
  return (
    <ActionsDropdown
      actions={[
        {
          label: "View Details",
          icon: <Eye className="h-4 w-4" />,
          onClick: () => onView(category),
        },
        {
          label: "Edit",
          icon: <Pencil className="h-4 w-4" />,
          onClick: () => onEdit(category),
        },
        {
          label: "Delete",
          icon: <Trash2 className="h-4 w-4" />,
          onClick: () => onDelete(category),
          variant: "destructive",
        },
      ]}
    />
  );
}
