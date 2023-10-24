// pages/_app.tsx
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import store from '../src/store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
