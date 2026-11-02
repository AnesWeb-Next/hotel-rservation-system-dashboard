import { useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { TextInputField } from "@/components/shared/FormFields";
import { profileFormSchema } from "@/validations/profile";
import type { ProfileEditFormProps } from "./profileEditFormTypes";
import { ProfileSaveButton } from "./ProfileSaveButton";

export function ProfileEditForm({
  user,
  onSubmit,
  isPending,
}: ProfileEditFormProps) {
  const defaultValues = useMemo(
    () => ({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    }),
    [user],
  );

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) =>
      onSubmit({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        phone: value.phone || undefined,
      }),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form.Field
          name="firstName"
          validators={{ onChange: profileFormSchema.shape.firstName }}
        >
          {(field) => (
            <TextInputField
              label="First Name"
              field={field}
              placeholder="Enter first name"
            />
          )}
        </form.Field>
        <form.Field
          name="lastName"
          validators={{ onChange: profileFormSchema.shape.lastName }}
        >
          {(field) => (
            <TextInputField
              label="Last Name"
              field={field}
              placeholder="Enter last name"
            />
          )}
        </form.Field>
      </div>
      <form.Field
        name="email"
        validators={{ onChange: profileFormSchema.shape.email }}
      >
        {(field) => (
          <TextInputField
            label="Email"
            field={field}
            placeholder="Enter email address"
            type="email"
          />
        )}
      </form.Field>
      <form.Field
        name="phone"
        validators={{ onChange: profileFormSchema.shape.phone.unwrap() }}
      >
        {(field) => (
          <TextInputField
            label="Phone (optional)"
            field={field}
            placeholder="Enter phone number"
          />
        )}
      </form.Field>
      <ProfileSaveButton isPending={isPending} />
    </form>
  );
}
