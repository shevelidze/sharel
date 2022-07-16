import React from 'react';
import styles from './SecondaryButton.module.css';

export interface SecondaryButtonProps
  extends React.PropsWithChildren,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  isFixed?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  isFixed = false,
  ...butttonProps
}) => {
  const rootClassList = [styles.root];
  if (isFixed) rootClassList.push(styles.fixed);
  return (
    <button className={rootClassList.join(' ')} {...butttonProps}>
      {children}
    </button>
  );
};

export default SecondaryButton;
