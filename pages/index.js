import Head from 'next/head';

import Header from '../components/Header';
import Home from '../components/HomePage';
import Footer from '../components/Footer';

export default function App() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Ubuntu:wght@400;500&display=swap"
          rel="stylesheet" />
         {/* <Script src="https://use.fontawesome.com/releases/v5.13.1/js/all.js" data-auto-replace-svg="nest" /> */}
      </Head>
      {/*<Header />*/}
      <Home />
      {/*<Footer/>*/}
    </>
  );
}
