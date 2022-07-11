import React from 'react';

const MenuContext = React.createContext<
  ((element: React.ReactNode | null) => void) | null
>(null);

export default MenuContext;
