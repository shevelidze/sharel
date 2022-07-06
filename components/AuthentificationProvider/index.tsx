import React, { useEffect, useState } from 'react';
import { UserContext } from '../../lib/useUser';
import UserAuthentification from '../../lib/useUser/UserAuthentification';

const AuthentificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAuthentification | null>(null);
  useEffect(() => {
    setUser(UserAuthentification.getAuthentification());
  }, [setUser]);
  return (
    <UserContext.Provider
      value={[user, () => setUser(UserAuthentification.getAuthentification())]}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthentificationProvider;
