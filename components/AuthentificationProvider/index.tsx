import React, { useState } from 'react';
import { UserContext } from '../../lib/useUser';
import UserAuthentification from '../../lib/useUser/UserAuthentification';

const AuthentificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAuthentification | null>(null);
  return (
    <UserContext.Provider
      value={[user, () => setUser(new UserAuthentification(() => {}))]}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthentificationProvider;
