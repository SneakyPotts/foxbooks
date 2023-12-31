import Script from 'next/script';

import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import GoogleAnalytics from '../components/AnaliticsScript/GoogleAnalytics';
import '../styles/globals.scss';
import { NextSeo } from 'next-seo';
import 'swiper/css/bundle';

import store from '../store/store';

import useSEO from '../hooks/useSEO';

import Layout from '../components/shared/common/specific/Layout';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <HelmetProvider>
      <Provider store={store}>
        <Script
          strategy="afterInteractive"
          src="https://use.fontawesome.com/releases/v5.13.1/js/all.js"
          data-auto-replace-svg="nest"
        />

        <GoogleAnalytics />

        <NextSeo
          noindex={useSEO().noIndex}
          nofollow={useSEO().noIndex}
          canonical={useSEO().canonical}
          defaultTitle={'Онлайн-библиотека книг FoxBooks 🦊'}
          title={pageProps.SEO?.title}
          description={pageProps.SEO?.description}
          openGraph={{
            title: pageProps.SEO?.og_title || pageProps.SEO?.title,
            description: pageProps.SEO?.og_description || pageProps.SEO?.description,
            images: [
              {
                url: `${pageProps.SEO?.og_img || 'https://api.foxbooks.ec/storage/FoxBooks_logo.jpg'}`,
                type: 'image/jpeg',
              },
            ],
            site_name: 'FoxBooks',
          }}
          keywords={pageProps.SEO?.keywords || ''}
        />

        <Layout>
          <main className="main">{getLayout(<Component {...pageProps} />)}</main>
        </Layout>
      </Provider>
    </HelmetProvider>
  );
}

export default MyApp;
