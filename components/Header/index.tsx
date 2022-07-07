import React from 'react';
import styles from './Header.module.css';
import HidableSearch from '../HidableSearch';

const Header: React.FC = () => {
  return (
    <div className={styles.root}>
      <HidableSearch />
    </div>
  );
};

export default Header;
