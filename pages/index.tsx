import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/Footer';
import Landing from '../components/Landing';

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sharel</title>
        <meta name="description" content="A social network." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
      <Footer />
    </div>
  );
};

export default Index;
