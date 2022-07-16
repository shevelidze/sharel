import React from 'react';
import { SendButton } from '../../Inputs';
import styles from './PostButton.module.css';
import { Form, Formik } from 'formik';
import { FormikTextarea } from '../../Inputs';
import useUser from '../../../lib/useUser';
import Loader from '../../Loader';
import useMenu from '../../../lib/useMenu';

const PostEditor: React.FC = () => {
  const [user] = useUser();
  const setMenu = useMenu();

  if (user === null) return <Loader />;

  return (
    <Formik
      initialValues={{ content: '' }}
      onSubmit={async (values) => {
        const response = await user.sendJson('/api/entities/my_post/', values, {
          method: 'PUT',
        });
        if (response.ok) setMenu(null);
      }}
    >
      <Form className={styles.root}>
        <div className={styles.buttonsWrapper}>
          <SendButton type="submit" />
        </div>
        <FormikTextarea
          textareaProps={{ placeholder: 'New post...' }}
          formikFieldProps={{ name: 'content' }}
        />
      </Form>
    </Formik>
  );
};

export default PostEditor;
