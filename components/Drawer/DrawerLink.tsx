import React from 'react';
import Link, { LinkProps } from 'next/link';
import styles from './DrawerElement.module.css';

const DrawerLink: React.FC<LinkProps & React.PropsWithChildren> = (props) => {
  return (
    <Link {...props}>
      <a className={styles.root}>{props.children}</a>
    </Link>
  );
};

export default DrawerLink;
