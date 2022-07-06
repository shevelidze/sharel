import { NextPage } from 'next';
import checkIfAuthorized from '../lib/checkIfAuthorized';
import useUser from '../lib/useUser';

export const getServerSideProps = checkIfAuthorized;

const Home: NextPage = () => {
  const [user, signIn, signOut] = useUser();
  return (
    <>
      <h1>Homepage!</h1>
      <button onClick={() => signOut()}>Logout</button>
    </>
  );
};

export default Home;
