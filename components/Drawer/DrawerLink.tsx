import React, { useContext } from 'react';
import Link, { LinkProps } from 'next/link';
import styles from './DrawerElement.module.css';
import DrawerContext from './DrawerContext';

const DrawerLink: React.FC<LinkProps & React.PropsWithChildren> = (props) => {
  const { onClick, ...rest } = props;
  const toggle = useContext(DrawerContext);
  return (
    <Link {...rest} shallow>
      <a
        className={styles.root}
        onClick={(e) => {
          toggle();
          onClick?.(e);
        }}
      >
        {props.children}
      </a>
    </Link>
  );
};

export default DrawerLink;
