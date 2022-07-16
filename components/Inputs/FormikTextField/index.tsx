import React from 'react';
import { Field, type FieldAttributes, type FieldProps } from 'formik';
import TextField, { type TextFieldProps } from '../TextField';

interface FormikTextFieldProps {
  formikFieldProps: FieldAttributes<any>;
  textFieldProps?: TextFieldProps;
}

const FormikTextField: React.FC<FormikTextFieldProps> = ({
  formikFieldProps,
  textFieldProps,
}) => {
  return (
    <Field {...formikFieldProps}>
      {({ field, meta }: FieldProps) => (
        <TextField inputProps={field} error={meta.error} {...textFieldProps} />
      )}
    </Field>
  );
};

export default FormikTextField;
