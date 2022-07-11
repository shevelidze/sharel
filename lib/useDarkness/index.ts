import React, { useContext } from 'react';
import DarknessContext, { type DarknessHookReturn } from './DarknessContext';

export default function useDarkness(): DarknessHookReturn {
  const contextValue = useContext(DarknessContext);
  if (contextValue === null)
    throw new Error('Falied to find darkness provider.');

  return contextValue;
}
