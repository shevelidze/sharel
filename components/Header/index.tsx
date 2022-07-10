import React, { useState } from 'react';
import Search from '../Search';
import styles from './Header.module.css';
import useMobile from '../../lib/useMobile';
import Burger from './Burger.svg';
import Drawer from '../Drawer';
import User from '../User';

const Header: React.FC<{ onSearchButtonClick: () => void }> = ({
  onSearchButtonClick,
}) => {
  const isMobile = useMobile();
  const [drawerIsOpened, setDrawerIsOpened] = useState(false);

  const toggleDrawer = () => setDrawerIsOpened(!drawerIsOpened);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.leftSection}>
          <Burger onClick={toggleDrawer} />
          <h1 className={styles.logo}>sharel</h1>
        </div>
        {isMobile ? (
          <button onClick={onSearchButtonClick}>open search</button>
        ) : (
          <>
            <Search />
            <div className={styles.userWrapper}><User /></div>
          </>
        )}
      </div>
      <Drawer isOpened={drawerIsOpened} toggle={toggleDrawer} />
    </>
  );
};

export default Header;
