import React from 'react';
import type { NextPage } from 'next';
import checkIfUnauthorized from '../lib/checkIfUnauthorized';
import FormikTextField from '../components/FormikTextField';
import { Formik } from 'formik';
import { RegularButton } from '../components/Buttons';
import StyledFormikForm from '../components/StyledFormikForm';

export const getServerSideProps = checkIfUnauthorized;

const SignIn: NextPage = () => {
  return (
    <div>
      <Formik
        initialValues={{ hello: '' }}
        initialErrors={{ hello: 'Hello initial error' }}
        onSubmit={() => console.log('Submit!')}
      >
        <StyledFormikForm>
          <h1>Sign in</h1>
          <FormikTextField
            formikFieldProps={{ name: 'hello' }}
            textFieldProps={{ isHidable: true }}
          />
          <RegularButton type="submit">Submit</RegularButton>
        </StyledFormikForm>
      </Formik>
    </div>
  );
};

export default SignIn;
