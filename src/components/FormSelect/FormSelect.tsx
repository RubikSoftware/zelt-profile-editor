import React, { forwardRef } from "react";
import { FormControl, Select, SelectProps } from "@material-ui/core";
import { Field, FieldProps, FieldValidator } from "formik";

export type FormSelectProps = {
  fieldProps: {
    name: string;
    validate?: FieldValidator;
  };
  selectProps: SelectProps;
};

export const FormSelect = forwardRef<HTMLDivElement, FormSelectProps>(
  ({ fieldProps, selectProps }, ref) => {
    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field }: FieldProps) => {
          return (
            <FormControl ref={ref}>
              <Select
                {...selectProps}
                name={fieldProps.name}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            </FormControl>
          );
        }}
      </Field>
    );
  }
);
