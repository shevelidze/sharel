import React from 'react';
import Link, { type LinkProps } from 'next/link';
import styles from './Button.module.css';

interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, ...props }) => (
  <Link {...props}>
    <a className={styles.root}>{children}</a>
  </Link>
);

export default LinkButton;
