import { useContext } from 'react';
import MenuContext from './MenuContext';

export default function useMenu() {
  const constextValue = useContext(MenuContext);
  if (constextValue === null)
    throw new Error('Failed to find menu layout provider.');

  return constextValue;
}
