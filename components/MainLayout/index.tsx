import React from 'react';
import HeaderWithSearch from '../HeaderWithSearch';
import Footer from '../Footer';
import DarknessProvider from '../DarknessProvider';
import MenuLayoutProvider from '../MenuLayoutProvider';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <DarknessProvider>
      <MenuLayoutProvider>
        <HeaderWithSearch />
        {children}
        <Footer />
      </MenuLayoutProvider>
    </DarknessProvider>
  );
};

export default MainLayout;
