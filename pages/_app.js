import Script from 'next/script';
import {Provider} from 'react-redux';

import 'swiper/css/bundle';
import '../styles/globals.scss';
import store from '../store/store';
import Layout from '../components/shared/common/specific/Layout';
import {NextSeo} from "next-seo";

function MyApp({Component, pageProps}) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>
      <Script
        strategy="afterInteractive"
        src="https://use.fontawesome.com/releases/v5.13.1/js/all.js"
        data-auto-replace-svg="nest"
      />
      <NextSeo
        defaultTitle={'FoxBooks'}
        titleTemplate={'%s | FoxBooks'}
        title={pageProps.SEO?.title}
        description={pageProps.SEO?.description}
        openGraph={{
          title: pageProps.SEO?.title,
          description: pageProps.SEO?.description,
          images: [
            {
              url: `https://api.foxbooks.ec/storage${pageProps.SEO?.image}`,
              alt: `${pageProps.SEO?.title}`,
              type: 'image/jpeg',
            },
          ],
          site_name: 'FoxBooks',
        }}
        keywords={pageProps.SEO?.keywords?.toString()}
      />
      <Layout>
        <main className="main">
          {getLayout(
            <Component {...pageProps} />
          )}
        </main>
      </Layout>
    </Provider>
  );
}

export default MyApp;
