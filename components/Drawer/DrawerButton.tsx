import React, { useContext } from 'react';
import styles from './DrawerElement.module.css';
import DrawerContext from './DrawerContext';

const DrawerButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  const { onClick, ...rest } = props;
  const toggle = useContext(DrawerContext);
  return (
    <button
      {...rest}
      onClick={(e) => {
        toggle();
        onClick?.(e);
      }}
      className={styles.root}
    />
  );
};

export default DrawerButton;
