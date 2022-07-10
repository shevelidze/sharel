import { NextPage } from 'next';
import checkIfAuthorized from '../lib/checkIfAuthorized';
import HeaderWithSearch from '../components/HeaderWithSearch';

export const getServerSideProps = checkIfAuthorized;

const Home: NextPage = () => {
  return (
    <div>
      <HeaderWithSearch />
    </div>
  );
};

export default Home;
