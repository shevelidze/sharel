import { NextPage } from 'next';
import checkIfAuthorized from '../lib/checkIfAuthorized';
import MainLayout from '../components/MainLayout';

export const getServerSideProps = checkIfAuthorized;

const Home: NextPage = () => {
  return <MainLayout>Home</MainLayout>;
};

export default Home;
