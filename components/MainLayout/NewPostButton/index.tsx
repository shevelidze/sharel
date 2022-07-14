import React from 'react';
import SecondaryButton from '../../SecondaryButton';
import Cross from './Cross.svg';
import PostEditor from '../PostEditor';
import useMenu from '../../../lib/useMenu';

const NewPostButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  const setMenu = useMenu();
  return (
    <SecondaryButton {...props} isFixed onClick={() => setMenu(<PostEditor />)}>
      <span>New post</span>
      <Cross />
    </SecondaryButton>
  );
};

export default NewPostButton;
