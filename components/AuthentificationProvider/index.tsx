import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../lib/useUser';
import UserAuthentification from '../../lib/useUser/UserAuthentification';

const AuthentificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAuthentification | null>(null);
  const router = useRouter();

  const signOut = async (redirect = true) => {
    if (user !== null) {
      const fetchResult = await fetch('/api/auth/sign_out', {
        headers: {
          Authorization: `Bearer ${user.refreshToken}`,
        },
      });
      if (!fetchResult.ok) throw new Error('Failed to sign out.');
    }
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('userRefreshToken');
    document.cookie = 'is_authorized=; Max-Age=0';
    setUser(null);
    if (redirect) router.replace('/');
  };

  const updateUser = () => {
    setUser(UserAuthentification.getAuthentification(signOut));
  };

  useEffect(updateUser, [setUser]);

  return (
    <UserContext.Provider value={[user, updateUser, signOut]}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthentificationProvider;
