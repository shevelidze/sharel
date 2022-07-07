import { useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from './UserContext';
import UserAuthentification from './UserAuthentification';
import alertUnknownError from '../alertUnknownError';
import saveTokens from './saveTokens';

export type SignIn = (
  tokens: { access: string; refresh: string },
  redirect?: boolean
) => void;

export type SignOut = (redirect?: boolean) => Promise<void>;

export default function useUser(): [
  UserAuthentification | null,
  SignIn,
  SignOut
] {
  const router = useRouter();
  const [user, updateUser] = useContext(UserContext);
  return [
    user,
    (tokens, redirect = true) => {
      saveTokens(tokens);
      updateUser();
      if (redirect) router.replace('/home');
    },
    async (redirect = true) => {
      if (user !== null) {
        const fetchResult = await fetch('/api/auth/sign_out', {
          headers: {
            Authorization: `Bearer ${user.refreshToken}`,
          },
        });
        if (!fetchResult.ok) alertUnknownError();
      }
      localStorage.removeItem('userAccessToken');
      localStorage.removeItem('userRefreshToken');
      document.cookie = 'is_authorized=; Max-Age=0';
      updateUser();
      if (redirect) router.replace('/');
    },
  ];
}

export { UserContext };
