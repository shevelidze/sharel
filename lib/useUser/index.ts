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
  const [user, updateUser, signOut] = useContext(UserContext);
  return [
    user,
    (tokens, redirect = true) => {
      saveTokens(tokens);
      updateUser();
      if (redirect) router.replace('/home');
    },
    signOut,
  ];
}

export { UserContext };
