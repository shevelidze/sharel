import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthentificationProvider from '../components/AuthentificationProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthentificationProvider>
      <Component {...pageProps} />
    </AuthentificationProvider>
  );
}

export default MyApp;
