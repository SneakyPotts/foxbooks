import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/*<link*/}
        {/*  rel="preload"*/}
        {/*  href="/fonts/FiraSans-Medium.woff2"*/}
        {/*  as="font"*/}
        {/*  crossOrigin=""*/}
        {/*/>*/}
        {/*<link*/}
        {/*  rel="preload"*/}
        {/*  href="/fonts/FiraSans-Medium.woff"*/}
        {/*  as="font"*/}
        {/*  crossOrigin=""*/}
        {/*/>*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500&family=Merriweather:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
