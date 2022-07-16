import React from 'react';
import { SendButton } from '../../Inputs';
import styles from './PostButton.module.css';
import Textarea from '../../Inputs/Textarea';
import { Form, Formik } from 'formik';

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
          <Textarea placeholder="New post..." name="content" />
        </Form>
      </Formik>
    </div>
  );
};

export default PostEditor;
