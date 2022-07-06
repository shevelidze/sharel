import React, { useState } from 'react';
import { UserContext } from '../../lib/useUser';
import UserAuthentification from '../../lib/useUser/UserAuthentification';

const AuthentificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAuthentification | null>(
    UserAuthentification.getAuthentification(() => {})
  );
  return (
    <UserContext.Provider
      value={[
        user,
        () => setUser(UserAuthentification.getAuthentification(() => {})),
      ]}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthentificationProvider;
