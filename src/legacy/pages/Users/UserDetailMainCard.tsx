import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User as UserIcon } from "lucide-react";
import type { User } from "@/types/user";

interface UserDetailMainCardProps {
  user: User;
}

export function UserDetailMainCard({ user }: UserDetailMainCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span>{user.email}</span>
        </div>
        {user.phone && (
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span>{user.phone}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
