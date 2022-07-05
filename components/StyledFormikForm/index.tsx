import React from 'react';
import { Form } from 'formik';
import styles from './StyledFormikForm.module.css';

interface StyledFormikFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
  errorMessage?: string;
}

const StyledFormikForm: React.FC<StyledFormikFormProps> = ({
  children,
  errorMessage,
  ...props
}) => {
  return (
    <Form className={styles.root} {...props}>
      <div className={styles.container}>
        {errorMessage !== null ? (
          <div className={styles.error}>{errorMessage}</div>
        ) : null}
        {children}
      </div>
    </Form>
  );
};

export default StyledFormikForm;
