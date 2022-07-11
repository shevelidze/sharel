import { NextPage } from 'next';
import checkIfAuthorized from '../lib/checkIfAuthorized';
import MainLayout from '../components/MainLayout';

export const getServerSideProps = checkIfAuthorized;

const MyPosts: NextPage = () => {
  return <MainLayout>My posts</MainLayout>;
};

export default MyPosts;
