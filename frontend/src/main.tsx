// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import moment from "moment";
import "moment/locale/ko";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import "./font/font.css";

moment.locale("ko");
const clientId =
  "303398331485-bi8j2vvltn2lk7ah62dhuo2qpgbqmp1j.apps.googleusercontent.com";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </Provider>
  // </React.StrictMode>
);
