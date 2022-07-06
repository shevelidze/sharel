import React, { useState } from 'react';
import type { NextPage } from 'next';
import checkIfUnauthorized from '../lib/checkIfUnauthorized';
import FormikTextField from '../components/FormikTextField';
import { Formik } from 'formik';
import { RegularButton } from '../components/Buttons';
import StyledFormikForm from '../components/StyledFormikForm';
import sendJson from '../lib/sendJson';
import useUser from '../lib/useUser';
import * as Yup from 'yup';

export const getServerSideProps = checkIfUnauthorized;

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required.'),
  password: Yup.string().required('Password is required.'),
});

const SignIn: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [user, setTokens] = useUser();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values) => {
        const response = await sendJson('api/auth/sign_in', values);
        if (response.status === 400) {
          setErrorMessage((await response.json()).message);
        } else if (response.ok) {
          setTokens(await response.json());
        } else {
          alert('Unknown error. Please contact the administrator.');
        }
      }}
      validationSchema={schema}
    >
      {({ isSubmitting, isValid }) => (
        <StyledFormikForm errorMessage={errorMessage}>
          <h1>Sign in</h1>
          <FormikTextField
            formikFieldProps={{ name: 'email' }}
            textFieldProps={{ placeholder: 'Email' }}
          />
          <FormikTextField
            formikFieldProps={{ name: 'password' }}
            textFieldProps={{ placeholder: 'Password', isHidable: true }}
          />
          <RegularButton type="submit" disabled={isSubmitting || !isValid}>
            Submit
          </RegularButton>
        </StyledFormikForm>
      )}
    </Formik>
  );
};

export default SignIn;
