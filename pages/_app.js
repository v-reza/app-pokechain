import Head from "next/head";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider as AuthGuard } from "src/contexts/AuthContext";
import { ReactQueryDevtools } from "react-query/devtools";
import { store } from "@/redux/store";
import Notification from "@/components/Notification";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, ...props }) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthGuard>
          <Notification />
          <Component {...pageProps} />
          <ReactQueryDevtools
            initialIsOpen={
              process.env.NODE_ENV === "development" ? true : false
            }
          />
        </AuthGuard>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
