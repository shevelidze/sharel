import React from 'react';
import styles from './DrawerElement.module.css';

const DrawerButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return <button {...props} className={styles.root} />;
};

export default DrawerButton;
