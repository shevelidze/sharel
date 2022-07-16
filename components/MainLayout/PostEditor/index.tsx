import React from 'react';
import { SendButton } from '../../Inputs';
import styles from './PostButton.module.css';
import Textarea from '../../Inputs/Textarea';
import { Form, Formik } from 'formik';
import { FormikTextarea } from '../../Inputs';

const PostEditor: React.FC = () => {
  return (
    <div className={styles.root}>
      <Formik
        initialValues={{ content: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <div className={styles.buttonsWrapper}>
            <SendButton type="submit" />
          </div>
          <FormikTextarea
            textareaProps={{ placeholder: 'New post...' }}
            formikFieldProps={{ name: 'content' }}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default PostEditor;
