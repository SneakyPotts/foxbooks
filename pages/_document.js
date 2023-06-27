import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang={'ru'}>
      <Head>
        <link
          rel="shortcut icon"
          href="/logo.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/192x192-logo.png"
        />
        <link
          rel="manifest"
          href="/manifest.json"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
