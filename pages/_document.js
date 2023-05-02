import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/logo.ico" />
        <link rel="apple-touch-icon" sizes="192x192" href="/192x192-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-site-verification" content="google106f429059b048b0.html" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
