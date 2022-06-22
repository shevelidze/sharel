import React from 'react';
import type { NextPage } from 'next';
import checkIfUnauthorized from '../lib/checkIfUnauthorized';

export const getServerSideProps = checkIfUnauthorized;

const SignIn: NextPage = () => {
  return <h1>Sign in!</h1>;
};

export default SignIn;
