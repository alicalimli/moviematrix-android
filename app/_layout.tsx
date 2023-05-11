import { Stack } from "expo-router";
import { store } from "../redux/store";
import { Text } from "react-native";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Stack />
      </Provider>
    </QueryClientProvider>
  );
};

export default Layout;
