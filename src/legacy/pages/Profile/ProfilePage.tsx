import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageLayout } from "@/components/layout/PageLayout";
import { updateUser } from "@/api/endpoints/users";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/useToast";
import { ProfileInfoCard } from "./ProfileInfoCard";
import { ProfileEditForm } from "./ProfileEditForm";
import type { User } from "@/types/user";

export function ProfilePage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: (data: Partial<User>) => updateUser(user!._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", user?._id] });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  if (!user) return null;

  return (
    <PageLayout
      breadcrumbs={[{ label: "Profile" }]}
      title="My Profile"
      description="View and update your account information"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileInfoCard user={user} />
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Update your personal information below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileEditForm
              user={user}
              onSubmit={(data) => updateProfileMutation(data)}
              isPending={isPending}
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
