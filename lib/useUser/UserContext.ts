import React from 'react';
import UserAuthentification from './UserAuthentification';

const UserContext = React.createContext<
  [
    UserAuthentification | null,
    () => void,
    (redirect?: boolean) => Promise<void>
  ]
>([null, () => {}, async () => {}]);

export default UserContext;
