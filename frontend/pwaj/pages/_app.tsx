// pages/_app.tsx
import { Provider } from 'react-redux';
import { AppProps } from 'next/app'; // Next.js의 AppProps 타입 import
import store from '../src/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
