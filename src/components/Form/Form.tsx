import React from "react";
import { Box, BoxProps, styled } from "@mui/material";
import { Formik, FormikConfig, FormikProps } from "formik";
import _ from "lodash";

type DefiniteFormikConfig = FormikConfig<Record<string, any>>;
type DefiniteFormikProps = FormikProps<Record<string, any>>;

const StyledForm = styled("form")``;

export type FormProps = Omit<
  DefiniteFormikConfig,
  "initialValues" | "render" | "children" | "component"
> & {
  initialValues?: DefiniteFormikConfig["initialValues"];
  formikRef?: React.ClassAttributes<HTMLFormElement>["ref"];
  handleErrors?: boolean;
  boxProps?: BoxProps;
  formNodeProps?: Omit<
    React.ComponentProps<typeof StyledForm>,
    "ref" | "onSubmit" | "css"
  >;
  children?: React.FC<DefiniteFormikProps>;

  oldCss?: any;
};

export const Form: React.FC<FormProps> = ({
  boxProps,
  formNodeProps,
  initialValues = {},
  handleErrors = true,
  enableReinitialize = true,
  onSubmit,
  formikRef,
  children,
  ...props
}) => {
  return (
    <Box {...boxProps}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={enableReinitialize}
        {...props}
      >
        {(formProps) => (
          <StyledForm
            ref={formikRef}
            onSubmit={formProps.handleSubmit}
            {...formNodeProps}
          >
            {_.isFunction(children) ? children(formProps) : children}
          </StyledForm>
        )}
      </Formik>
    </Box>
  );
};
