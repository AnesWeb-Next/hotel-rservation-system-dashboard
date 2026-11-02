import type { User } from "@/types/user";

export interface ProfileEditFormProps {
  user: User;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  }) => void;
  isPending: boolean;
}
