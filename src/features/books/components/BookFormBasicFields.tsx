import { bookFormSchema } from "@/validations/book";
import { TextInputField, SelectField } from "@/components/shared/FormFields";
import type { AnyFieldApi } from "@/components/shared/FormFields";

interface SelectOption {
  value: string;
  label: string;
}

interface BookFormBasicFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  authorOptions: SelectOption[];
  categoryOptions: SelectOption[];
}

export function BookFormBasicFields({
  form,
  authorOptions,
  categoryOptions,
}: BookFormBasicFieldsProps) {
  return (
    <>
      <form.Field
        name="title"
        validators={{ onChange: bookFormSchema.shape.title }}
      >
        {(field: AnyFieldApi) => (
          <TextInputField
            field={field}
            label="Title"
            placeholder="Enter book title"
            required
            className="col-span-2"
          />
        )}
      </form.Field>

      <form.Field
        name="author"
        validators={{ onChange: bookFormSchema.shape.author }}
      >
        {(field: AnyFieldApi) => (
          <SelectField
            field={field}
            label="Author"
            placeholder="Select author"
            options={authorOptions}
            required
          />
        )}
      </form.Field>

      <form.Field
        name="category"
        validators={{ onChange: bookFormSchema.shape.category }}
      >
        {(field: AnyFieldApi) => (
          <SelectField
            field={field}
            label="Category"
            placeholder="Select category"
            options={categoryOptions}
          />
        )}
      </form.Field>

      <form.Field
        name="keywords"
        validators={{ onChange: bookFormSchema.shape.keywords }}
      >
        {(field: AnyFieldApi) => (
          <TextInputField
            field={field}
            label="Keywords"
            placeholder="fiction, classic, adventure"
          />
        )}
      </form.Field>
    </>
  );
}
