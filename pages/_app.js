import Script from 'next/script';
import { Provider } from 'react-redux';

import '../styles/globals.scss';
import 'swiper/css/bundle';
import store from '../store/store';
import Layout from '../components/shared/common/specific/Layout';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>
      <Script
        strategy="afterInteractive"
        src="https://use.fontawesome.com/releases/v5.13.1/js/all.js"
        data-auto-replace-svg="nest"
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
