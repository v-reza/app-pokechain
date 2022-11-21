import Head from "next/head";
import { Provider, useDispatch } from "react-redux";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider as AuthGuard } from "src/contexts/AuthContext";
import { ReactQueryDevtools } from "react-query/devtools";
import { store } from "@/redux/store";
import Notification from "@/components/Notification";
import { useEffect, useState } from "react";
import { OnlineContextProvider } from "@/contexts/OnlineContext";
import useOnline from "@/hooks/useOnline";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, ...props }) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthGuard>
          <OnlineContextProvider>
            <Notification />
            <Component {...pageProps} />
            <ReactQueryDevtools
              initialIsOpen={
                process.env.NODE_ENV === "development" ? true : false
              }
            />
          </OnlineContextProvider>
        </AuthGuard>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
