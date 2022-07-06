import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import checkIfUnauthorized from '../lib/checkIfUnauthorized';
import { RegularButton } from '../components/Buttons';
import StyledFormikForm from '../components/StyledFormikForm';
import FormikTextField from '../components/FormikTextField';
import * as Yup from 'yup';
import sendJson from '../lib/sendJson';
import useUser from '../lib/useUser';

export const getServerSideProps = checkIfUnauthorized;

const signUpFormSchema = Yup.object({
  firstName: Yup.string().required('First name is required.'),
  lastName: Yup.string().required('Last name is required.'),
  email: Yup.string().email('Email is invalid.').required('Email is required.'),
  password: Yup.string()
    .required('Password is required.')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
      `Password must be at least 8 characters long, and contain:
    - at least one special character
    - at least one lowercase letter
    - at least one upercase letter
    `
    ),
  passwordRepeat: Yup.string().oneOf(
    [Yup.ref('password')],
    "Passwords don't match."
  ),
});

const SignUp: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [user, setTokens] = useUser();
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordRepeat: '',
      }}
      validationSchema={signUpFormSchema}
      onSubmit={async (values) => {
        const response = await sendJson('api/auth/sign_up', values);
        if (response.status === 400) {
          setErrorMessage((await response.json()).message);
        } else if (response.ok) {
          setTokens(await response.json());
        } else {
          alert('Unknown error. Please contact the administrator.');
        }
      }}
    >
      {({ isSubmitting, isValid }) => (
        <StyledFormikForm errorMessage={errorMessage}>
          <h1>Sign up</h1>
          <FormikTextField
            formikFieldProps={{ name: 'firstName' }}
            textFieldProps={{ placeholder: 'First name' }}
          />
          <FormikTextField
            formikFieldProps={{ name: 'lastName' }}
            textFieldProps={{ placeholder: 'Last name' }}
          />
          <FormikTextField
            formikFieldProps={{ name: 'email' }}
            textFieldProps={{ placeholder: 'Email' }}
          />
          <FormikTextField
            formikFieldProps={{ name: 'password' }}
            textFieldProps={{ placeholder: 'Password', isHidable: true }}
          />
          <FormikTextField
            formikFieldProps={{ name: 'passwordRepeat' }}
            textFieldProps={{ placeholder: 'Repeat password', isHidable: true }}
          />
          <RegularButton type="submit" disabled={isSubmitting || !isValid}>
            Submit
          </RegularButton>
        </StyledFormikForm>
      )}
    </Formik>
  );
};

export default SignUp;
