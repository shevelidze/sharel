import React from 'react';
import UserAuthentification from './UserAuthentification';

const UserContext = React.createContext<
  [UserAuthentification | null, () => void]
>([null, () => {}]);

export default UserContext;
