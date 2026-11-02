import { bookFormSchema } from "@/validations/book";
import {
  TextInputField,
  NumberInputField,
  TextareaField,
} from "@/components/shared/FormFields";
import type { AnyFieldApi } from "@/components/shared/FormFields";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BookFormDetailFields({ form }: { form: any }) {
  return (
    <>
      <form.Field
        name="cover"
        validators={{ onChange: bookFormSchema.shape.cover }}
      >
        {(field: AnyFieldApi) => (
          <div className="col-span-2 space-y-2">
            <TextInputField
              field={field}
              label="Cover Image URL"
              placeholder="https://example.com/cover.jpg"
            />
            {field.state.value && (
              <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50">
                <img
                  src={field.state.value}
                  alt="Cover preview"
                  className="w-16 h-24 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="text-sm text-muted-foreground">
                  Cover preview
                </span>
              </div>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="description"
        validators={{ onChange: bookFormSchema.shape.description }}
      >
        {(field: AnyFieldApi) => (
          <TextareaField
            field={field}
            label="Description"
            placeholder="Book description..."
            rows={3}
            className="col-span-2"
          />
        )}
      </form.Field>

      <form.Field
        name="totalStock"
        validators={{ onChange: bookFormSchema.shape.totalStock }}
      >
        {(field: AnyFieldApi<number>) => (
          <NumberInputField
            field={field}
            label="Total Stock"
            min={0}
            required
          />
        )}
      </form.Field>

      <form.Field
        name="availableStock"
        validators={{ onChange: bookFormSchema.shape.availableStock }}
      >
        {(field: AnyFieldApi<number>) => (
          <NumberInputField
            field={field}
            label="Available Stock"
            min={0}
            required
          />
        )}
      </form.Field>
    </>
  );
}
