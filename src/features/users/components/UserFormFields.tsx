import { TextInputField } from "@/components/shared/FormFields";
import type { AnyFieldApi } from "@/components/shared/FormFields";
import { userFormSchema } from "@/validations/user";
import { UserRoleBorrowFields } from "./UserRoleBorrowFields";

interface UserFormFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isEditing: boolean;
}

export function UserFormFields({ form, isEditing }: UserFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="firstName"
          validators={{ onChange: userFormSchema.shape.firstName }}
        >
          {(field: AnyFieldApi) => (
            <TextInputField
              field={field}
              label="First Name"
              placeholder="John"
              required
            />
          )}
        </form.Field>

        <form.Field
          name="lastName"
          validators={{ onChange: userFormSchema.shape.lastName }}
        >
          {(field: AnyFieldApi) => (
            <TextInputField
              field={field}
              label="Last Name"
              placeholder="Doe"
              required
            />
          )}
        </form.Field>
      </div>

      <form.Field
        name="email"
        validators={{ onChange: userFormSchema.shape.email }}
      >
        {(field: AnyFieldApi) => (
          <TextInputField
            field={field}
            label="Email"
            type="email"
            placeholder="john.doe@example.com"
            required
          />
        )}
      </form.Field>

      {!isEditing && (
        <form.Field
          name="password"
          validators={{ onChange: userFormSchema.shape.password }}
        >
          {(field: AnyFieldApi) => (
            <TextInputField
              field={field}
              label="Password"
              type="password"
              placeholder="••••••••"
              required={!isEditing}
            />
          )}
        </form.Field>
      )}
      <UserRoleBorrowFields form={form} />
    </>
  );
}
