import { NextPage } from 'next';
import checkIfAuthorized from '../lib/checkIfAuthorized';

export const getServerSideProps = checkIfAuthorized;

const Home: NextPage = () => {
  return <h1>Homepage!</h1>;
};

export default Home;
