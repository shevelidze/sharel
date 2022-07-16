import React from 'react';
import { Field, FieldAttributes, FieldProps } from 'formik';
import Textarea from '../Textarea';

interface FormikTextareaProps {
  formikFieldProps: FieldAttributes<any>;
  textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const FormikTextarea: React.FC<FormikTextareaProps> = ({
  formikFieldProps,
  textareaProps,
}) => (
  <Field {...formikFieldProps}>
    {({ field }: FieldProps) => <Textarea {...field} {...textareaProps} />}
  </Field>
);

export default FormikTextarea;
