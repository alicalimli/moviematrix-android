import { Stack } from "expo-router";
import { store } from "../redux/store";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />

        <Stack />
      </Provider>
    </QueryClientProvider>
  );
};

export default Layout;
