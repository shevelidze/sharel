import React from 'react';
import HeaderWithSearch from '../HeaderWithSearch';
import Footer from '../Footer';
import DarknessProvider from '../DarknessProvider';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <DarknessProvider>
      <HeaderWithSearch />
      {children}
      <Footer />
    </DarknessProvider>
  );
};

export default MainLayout;
