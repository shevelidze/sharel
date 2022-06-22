import React from 'react';
import type { NextPage } from 'next';
import checkIfUnauthorized from '../lib/checkIfUnauthorized';

export const getServerSideProps = checkIfUnauthorized;

const SignUp: NextPage = () => {
  return <h1>Sign up!</h1>;
};

export default SignUp;
