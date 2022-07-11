import React, { useState } from 'react';
import Search from '../Search';
import styles from './Header.module.css';
import useMobile from '../../lib/useMobile';
import Burger from './Burger.svg';
import Drawer from '../Drawer';
import User from '../User';
import SearchIcon from '../Search/SearchIcon.svg';

const Header: React.FC<{ onSearchButtonClick: () => void }> = ({
  onSearchButtonClick,
}) => {
  const isMobile = useMobile();
  const [drawerIsOpened, setDrawerIsOpened] = useState(false);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.leftSection}>
          <Burger onClick={() => setDrawerIsOpened(true)} />
          <h1 className={styles.logo}>sharel</h1>
        </div>
        {isMobile ? (
          <SearchIcon onClick={onSearchButtonClick} />
        ) : (
          <>
            <Search />
            <div className={styles.userWrapper}>
              <User />
            </div>
          </>
        )}
      </div>
      <Drawer
        isOpened={drawerIsOpened}
        close={() => setDrawerIsOpened(false)}
      />
    </>
  );
};

export default Header;
