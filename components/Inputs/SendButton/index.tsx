import React from 'react';
import SecondaryButton from '../SecondaryButton';
import PaperPlane from './PaperPlane.svg';

const SendButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => (
  <SecondaryButton {...props}>
    <PaperPlane />
  </SecondaryButton>
);

export default SendButton;
