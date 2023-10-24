// pages/_app.tsx
import { Provider } from "react-redux";
import { AppProps } from "next/app"; // Next.js의 AppProps 타입 import
import { SessionProvider } from "next-auth/react";
import store from "../src/store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
