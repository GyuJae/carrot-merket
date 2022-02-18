import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div className="w-full max-w-xl mx-auto">
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </SWRConfig>
  );
}

export default MyApp;
