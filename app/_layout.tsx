import { Stack } from "expo-router";
import { store } from "../redux/store";
import { Provider } from "react-redux";

const Layout = () => {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
};

export default Layout;
