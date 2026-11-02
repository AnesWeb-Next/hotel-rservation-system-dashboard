import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Shield, Calendar } from "lucide-react";
import type { User as UserType } from "@/types/user";

interface ProfileInfoCardProps {
  user: UserType;
}

export function ProfileInfoCard({ user }: ProfileInfoCardProps) {
  return (
    <Card className="lg:col-span-1">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User className="h-10 w-10" />
        </div>
        <CardTitle>
          {user.firstName} {user.lastName}
        </CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Role
          </span>
          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
            {user.role}
          </Badge>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </span>
          <span className="text-sm">{user.email}</span>
        </div>
        {user.phone && (
          <>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </span>
              <span className="text-sm">{user.phone}</span>
            </div>
          </>
        )}
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Status
          </span>
          <Badge variant={user.isActive ? "default" : "destructive"}>
            {user.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
