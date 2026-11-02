import type { FilterOption } from "@/components/shared/FilterSheet";
import type { User } from "@/types/user";

export const usersFilterOptions: FilterOption[] = [
  {
    key: "role",
    label: "Role",
    type: "select",
    placeholder: "All roles",
    options: [
      { value: "user", label: "User" },
      { value: "admin", label: "Admin" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    placeholder: "All statuses",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
  {
    key: "hasFines",
    label: "Fines",
    type: "select",
    placeholder: "All",
    options: [
      { value: "yes", label: "Has Fines" },
      { value: "no", label: "No Fines" },
    ],
  },
];

export function filterUsers(
  users: User[],
  searchQuery: string,
  filters: Record<string, string>,
): User[] {
  return users.filter((user) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }
    if (filters.role && user.role !== filters.role) return false;
    if (filters.status === "active" && !user.isActive) return false;
    if (filters.status === "inactive" && user.isActive) return false;
    if (filters.hasFines === "yes" && user.fines <= 0) return false;
    if (filters.hasFines === "no" && user.fines > 0) return false;
    return true;
  });
}
