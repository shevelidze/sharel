import React from 'react';
import styles from './Button.module.css';

interface RegularButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const RegularButton: React.FC<RegularButtonProps> = ({
  children,
  ...buttonProps
}) => (
  <button className={styles.root} {...buttonProps}>
    {children}
  </button>
);

export default RegularButton;
