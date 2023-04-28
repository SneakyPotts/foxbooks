import Script from 'next/script';

import React from 'react';

const id = process.env.NEXT_PUBLIC_GTAG_ID;

const GoogleAnalytics = () => {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" async />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
