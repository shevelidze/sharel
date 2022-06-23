import React from 'react';
import type { NextPage } from 'next';
import checkIfUnauthorized from '../lib/checkIfUnauthorized';
import FormikTextField from '../components/FormikTextField';
import { Form, Formik } from 'formik';
import { RegularButton, LinkButton } from '../components/buttons';

export const getServerSideProps = checkIfUnauthorized;

const SignIn: NextPage = () => {
  return (
    <div>
      <Formik
        initialValues={{ hello: '' }}
        initialErrors={{ hello: 'Hello initial error' }}
        onSubmit={() => console.log('Submit!')}
      >
        <Form>
          <FormikTextField
            formikFieldProps={{ name: 'hello' }}
            textFieldProps={{ isHidable: true }}
          />
          <RegularButton type="submit">Submit!</RegularButton>
          <LinkButton href="/">Anchor to index!</LinkButton>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
