import { useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from './UserContext';
import UserAuthentification from './UserAuthentification';

export default function useUser(): [
  UserAuthentification | null,
  (tokens: { access: string; refresh: string }, redirect?: boolean) => void
] {
  const router = useRouter();
  const [user, updateUser] = useContext(UserContext);
  return [
    user,
    (tokens, redirect = true) => {
      localStorage.setItem('userAccessToken', tokens.access);
      localStorage.setItem('userRefreshToken', tokens.refresh);
      document.cookie = 'is_authorized=true';
      updateUser();
      if (redirect) router.replace('/home');
    },
  ];
}

export { UserContext };
