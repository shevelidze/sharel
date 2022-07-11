import React from 'react';
import HeaderWithSearch from '../HeaderWithSearch';
import Footer from '../Footer';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeaderWithSearch />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
