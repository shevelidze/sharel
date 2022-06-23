import React from 'react';
import type { NextPage } from 'next';
import { Formik } from 'formik';
import checkIfUnauthorized from '../lib/checkIfUnauthorized';
import { RegularButton } from '../components/Buttons';
import StyledFormikForm from '../components/StyledFormikForm';
import FormikTextField from '../components/FormikTextField';

export const getServerSideProps = checkIfUnauthorized;

const SignUp: NextPage = () => {
  return (
    <Formik
      initialValues={{
        fullName: '',
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
      }}
      onSubmit={() => {
        alert('Submit!');
      }}
    >
      <StyledFormikForm>
        <h1>Sign up</h1>
        <FormikTextField
          formikFieldProps={{ name: 'fullName' }}
          textFieldProps={{ placeholder: 'Full name' }}
        />
        <FormikTextField
          formikFieldProps={{ name: 'username' }}
          textFieldProps={{ placeholder: 'Username' }}
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
        <RegularButton type="submit">Submit</RegularButton>
      </StyledFormikForm>
    </Formik>
  );
};

export default SignUp;
