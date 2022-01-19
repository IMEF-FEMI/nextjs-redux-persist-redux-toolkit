import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/lib/integration/react";

import store from "app/store";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
