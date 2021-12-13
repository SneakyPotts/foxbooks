import Script from 'next/script'
import { Provider } from 'react-redux'
import store from "../store/store";
import '../styles/globals.scss';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Script strategy="afterInteractive" src="https://use.fontawesome.com/releases/v5.13.1/js/all.js" data-auto-replace-svg="nest" />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
