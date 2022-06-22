import React from 'react';
import type { NextPage } from 'next';
import checkIfUnauthorized from '../lib/checkIfUnauthorized';
import TextFileld from '../components/TextField';

export const getServerSideProps = checkIfUnauthorized;

const SignIn: NextPage = () => {
  return (
    <div>
      <TextFileld />
    </div>
  );
};

export default SignIn;
