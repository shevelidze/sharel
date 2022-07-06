import React from 'react';
import { NextPage } from 'next';
import AuthentificationProvider from '../components/AuthentificationProvider';
import TestAuthentificationConsumer from '../components/TestAuthentificationConsumer';

const Test: NextPage = () => {
  return (
    <AuthentificationProvider>
      <TestAuthentificationConsumer id={1} />
      <TestAuthentificationConsumer id={2} />
      <TestAuthentificationConsumer id={3} />
      <TestAuthentificationConsumer id={5} />
    </AuthentificationProvider>
  );
};

export default Test;
