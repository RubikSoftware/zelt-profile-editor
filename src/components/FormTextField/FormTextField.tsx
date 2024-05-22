import React, { forwardRef } from "react";
import { Interpolation, Theme } from "@emotion/react";
import { Field, FieldProps, FieldValidator, useFormik } from "formik";

import { TextField, TextFieldProps } from "@material-ui/core";

export type FormTextFieldProps = {
  fieldProps: {
    name: string;
    validate?: FieldValidator;
  };
  formik?: ReturnType<typeof useFormik>;
  inputProps?: TextFieldProps & { css?: Interpolation<Theme> };
};

export const FormTextField = forwardRef<HTMLInputElement, FormTextFieldProps>(
  ({ fieldProps, inputProps = {} }, ref) => {
    return (
      <Field name={fieldProps.name} validate={fieldProps.validate}>
        {({ field }: FieldProps) => {
          return (
            <TextField
              ref={ref}
              {...inputProps}
              name={fieldProps.name}
              value={field.value ?? ""}
              onChange={field.onChange}
            />
          );
        }}
      </Field>
    );
  }
);
