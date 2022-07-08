import { useState } from 'react';
import { NextPage } from 'next';
import checkIfAuthorized from '../lib/checkIfAuthorized';
import useUser from '../lib/useUser';
import HeaderWithSearch from '../components/HeaderWithSearch';

export const getServerSideProps = checkIfAuthorized;

const Home: NextPage = () => {
  const [user, signIn, signOut] = useUser();
  const [showChildIndex, setShowChildIndex] = useState(0);
  return (
    <div>
      <HeaderWithSearch />
    </div>
  );
};

export default Home;
