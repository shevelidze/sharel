import React from 'react';
import { Form } from 'formik';
import styles from './StyledFormikForm.module.css';

interface StyledFormikFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

const StyledFormikForm: React.FC<StyledFormikFormProps> = ({
  children,
  ...props
}) => {
  return (
    <Form className={styles.root} {...props}>
      <div className={styles.container}> {children}</div>
    </Form>
  );
};

export default StyledFormikForm;
