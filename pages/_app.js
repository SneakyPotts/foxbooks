import Script from 'next/script'
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script strategy="afterInteractive" src="https://use.fontawesome.com/releases/v5.13.1/js/all.js" data-auto-replace-svg="nest" />
      <Component {...pageProps} />
    </>
    
  );
}
export default MyApp;
