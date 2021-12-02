import Head from 'next/head';
import Header from '../components/Header/Header';
import Home from './Home';

export default function App() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crosorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Ubuntu:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Home />
    </>
  );
}
