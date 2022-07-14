import React from 'react';
import HeaderWithSearch from '../HeaderWithSearch';
import Footer from '../Footer';
import DarknessProvider from '../DarknessProvider';
import MenuLayoutProvider from '../MenuLayoutProvider';
import NewPostButton from './NewPostButton';
import styles from './MainLayout.module.css';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <DarknessProvider>
      <MenuLayoutProvider>
        <div className={styles.content}>
          <HeaderWithSearch />
          {children}
          <NewPostButton />
        </div>
        <Footer />
      </MenuLayoutProvider>
    </DarknessProvider>
  );
};

export default MainLayout;
