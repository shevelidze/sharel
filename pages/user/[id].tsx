import { NextPage } from 'next';
import checkIfAuthorized from '../../lib/checkIfAuthorized';
import { useRouter } from 'next/router';
import MainLayout from '../../components/MainLayout';
import Posts from '../../components/Posts';
import User from '../../components/User';
import styles from '../../styles/UserPage.module.css';

export const getServerSideProps = checkIfAuthorized;

const UserPage: NextPage = () => {
  const router = useRouter();
  return (
    <MainLayout>
      <div className={styles.userWrapper}>
        <User userId={router.query.id as string} />
      </div>
      <Posts userId={router.query.id as string} />
    </MainLayout>
  );
};

export default UserPage;
