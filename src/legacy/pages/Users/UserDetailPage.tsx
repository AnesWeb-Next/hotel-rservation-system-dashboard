import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DetailPageLayout } from "@/components/layout/DetailPageLayout";
import { UserDetailMainCard } from "@/pages/Users/UserDetailMainCard";
import { getUserDetailSideCards } from "@/pages/Users/UserDetailSideCards";
import { getUserBorrowingTabs } from "@/pages/Users/UserBorrowingTabs";
import { UserDetailDialogs } from "@/pages/Users/UserDetailDialogs";
import { useUserDetailData } from "@/pages/Users/useUserDetailData";
import { Pencil, Trash2, User as UserIcon, Shield, Loader2 } from "lucide-react";

export function UserDetailPage() {
  const {
    user, isLoading, borrowings, activeBorrowings, overdueBorrowings,
    formOpen, setFormOpen, deleteDialogOpen, setDeleteDialogOpen,
    deactivateDialogOpen, setDeactivateDialogOpen,
    handleDelete, handleToggleActive, handleFormSuccess,
  } = useUserDetailData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) {
    return (
      <DetailPageLayout
        breadcrumbs={[{ label: "Users", href: "/users" }, { label: "Not Found" }]}
        title="User not found" backHref="/users"
        mainCard={
          <Card><CardContent className="p-8 text-center">
            <UserIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">User not found</h2>
            <p className="text-muted-foreground mt-2">
              The user you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
          </CardContent></Card>
        }
      />
    );
  }

  return (
    <>
      <DetailPageLayout
        breadcrumbs={[{ label: "Users", href: "/users" }, { label: `${user.firstName} ${user.lastName}` }]}
        title={`${user.firstName} ${user.lastName}`}
        subtitle={
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
            {!user.isActive && <Badge variant="destructive">Inactive</Badge>}
          </div>
        }
        backHref="/users"
        actions={
          <>
            <Button variant="outline" onClick={() => setFormOpen(true)} type="button">
              <Pencil className="h-4 w-4 mr-2" />Edit
            </Button>
            <Button variant={user.isActive ? "outline" : "default"} onClick={() => setDeactivateDialogOpen(true)} type="button">
              <Shield className="h-4 w-4 mr-2" />{user.isActive ? "Deactivate" : "Activate"}
            </Button>
            <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)} type="button">
              <Trash2 className="h-4 w-4 mr-2" />Delete
            </Button>
          </>
        }
        mainCard={<UserDetailMainCard user={user} />}
        sideCards={getUserDetailSideCards({ user, borrowings, activeBorrowings, overdueBorrowings })}
        tabs={getUserBorrowingTabs(borrowings)}
      />
      <UserDetailDialogs
        user={user} formOpen={formOpen} setFormOpen={setFormOpen}
        deleteDialogOpen={deleteDialogOpen} setDeleteDialogOpen={setDeleteDialogOpen}
        deactivateDialogOpen={deactivateDialogOpen} setDeactivateDialogOpen={setDeactivateDialogOpen}
        handleDelete={handleDelete} handleToggleActive={handleToggleActive}
        handleFormSuccess={handleFormSuccess}
      />
    </>
  );
}
