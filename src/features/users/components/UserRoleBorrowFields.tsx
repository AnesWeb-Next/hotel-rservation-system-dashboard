import { NumberInputField, SelectField } from "@/components/shared/FormFields";
import type { AnyFieldApi } from "@/components/shared/FormFields";
import { userFormSchema } from "@/validations/user";

const roleOptions = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

interface UserRoleBorrowFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}

export function UserRoleBorrowFields({ form }: UserRoleBorrowFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <form.Field
        name="role"
        validators={{ onChange: userFormSchema.shape.role }}
      >
        {(field: AnyFieldApi) => (
          <SelectField
            field={field}
            label="Role"
            options={roleOptions}
            required
          />
        )}
      </form.Field>

      <form.Field
        name="borrowLimit"
        validators={{ onChange: userFormSchema.shape.borrowLimit }}
      >
        {(field: AnyFieldApi<number>) => (
          <NumberInputField
            field={field}
            label="Borrow Limit"
            min={1}
            max={10}
            required
          />
        )}
      </form.Field>
    </div>
  );
}
