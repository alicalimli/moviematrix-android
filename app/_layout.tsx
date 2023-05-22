import { Stack } from "expo-router";
import { store } from "../redux/store";
import { StatusBar, Text, View } from "react-native";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/navbar/Navbar";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />

        <Stack />
        <Navbar />
      </Provider>
    </QueryClientProvider>
  );
};

export default Layout;
