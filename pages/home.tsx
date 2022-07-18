import { NextPage } from 'next';
import checkIfAuthorized from '../lib/checkIfAuthorized';
import MainLayout from '../components/MainLayout';
import Posts from '../components/Posts';

export const getServerSideProps = checkIfAuthorized;

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Posts />
    </MainLayout>
  );
};

export default Home;
