import { bookFormSchema } from "@/validations/book";
import { NumberInputField } from "@/components/shared/FormFields";
import type { AnyFieldApi } from "@/components/shared/FormFields";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BookFormPriceFields({ form }: { form: any }) {
  return (
    <>
      <form.Field
        name="priceOriginal"
        validators={{ onChange: bookFormSchema.shape.priceOriginal }}
      >
        {(field: AnyFieldApi<number>) => (
          <NumberInputField
            field={field}
            label="Original Price ($)"
            min={0}
            step={0.01}
          />
        )}
      </form.Field>

      <form.Field
        name="priceCurrent"
        validators={{ onChange: bookFormSchema.shape.priceCurrent }}
      >
        {(field: AnyFieldApi<number>) => (
          <NumberInputField
            field={field}
            label="Current Price ($)"
            min={0}
            step={0.01}
            required
          />
        )}
      </form.Field>

      <form.Field
        name="rentalPrice"
        validators={{ onChange: bookFormSchema.shape.rentalPrice }}
      >
        {(field: AnyFieldApi<number>) => (
          <NumberInputField
            field={field}
            label="Rental Price ($)"
            min={0}
            step={0.01}
            required
          />
        )}
      </form.Field>

      <form.Field
        name="lateFeePerDay"
        validators={{ onChange: bookFormSchema.shape.lateFeePerDay }}
      >
        {(field: AnyFieldApi<number>) => (
          <NumberInputField
            field={field}
            label="Late Fee Per Day ($)"
            min={0}
            step={0.01}
            required
          />
        )}
      </form.Field>
    </>
  );
}
