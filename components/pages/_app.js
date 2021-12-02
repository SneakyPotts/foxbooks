import App from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* <style jsx global>{`
        body {
          font-family: 'Ubuntu', sans-serif;
        }
      `}</style> */}
    </>
  );
}
export default MyApp;
