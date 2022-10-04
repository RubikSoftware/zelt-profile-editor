import React, { forwardRef } from "react";
import { Field, FieldProps, FieldValidator } from "formik";
import {
  KeyboardDatePicker as DatePicker,
  KeyboardDatePickerProps as DatePickerProps,
} from "@material-ui/pickers";

export type FormKeyboardDatePickerProps = {
  fieldProps: {
    name: string;
    validate?: FieldValidator;
  };
  datePickerProps?: Omit<DatePickerProps, "onChange" | "value">;
};

export const FormKeyboardDatePicker = forwardRef<
  HTMLInputElement,
  FormKeyboardDatePickerProps
>(({ fieldProps, datePickerProps }, ref) => {
  return (
    <Field name={fieldProps.name} validate={fieldProps.validate}>
      {({ field, form }: FieldProps) => {
        return (
          <DatePicker
            ref={ref}
            {...datePickerProps}
            value={field.value}
            onChange={(date: any) => form.setFieldValue(fieldProps.name, date)}
          />
        );
      }}
    </Field>
  );
});
