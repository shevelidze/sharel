import React from 'react';
import SecondaryButton from '../SecondaryButton';
import TrashCan from '../../TrashCan';

const DeleteButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props
) => (
  <SecondaryButton {...props}>
    <TrashCan />
  </SecondaryButton>
);

export default DeleteButton;
