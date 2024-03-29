import React, { useState } from 'react';
import MenuLayout from './MenuLayout';
import MenuContext from '../../lib/useMenu/MenuContext';

const MenuLayoutProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [element, setElement] = useState<React.ReactNode>(null);
  const close = () => setElement(null);

  return (
    <>
      <MenuContext.Provider value={setElement}>
        {children}
        <MenuLayout close={close}>{element}</MenuLayout>
      </MenuContext.Provider>
    </>
  );
};

export default MenuLayoutProvider;
