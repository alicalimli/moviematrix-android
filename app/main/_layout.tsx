import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, Tabs } from "expo-router";
import { View } from "react-native";

const tabLinks = [
  {
    name: "Home",
    tabName: "home",
    icon: "home-outline",
  },
  {
    name: "Movies",
    tabName: "movies",
    icon: "film-outline",
  },
  {
    name: "Shows",
    tabName: "shows",
    icon: "tv-outline",
  },
  {
    name: "Bookmarks",
    tabName: "bookmarks",
    icon: "bookmark-outline",
  },
];

const _layout = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#20C997",
          tabBarStyle: {
            backgroundColor: "black",
            paddingVertical: 10,
          },
        }}
      >
        {tabLinks.map((tab) => (
          <Tabs.Screen
            name={tab.tabName}
            options={{
              tabBarIcon: ({ color }) => (
                <View>
                  <Ionicons
                    // style={{
                    //   color: isActive ? "#20C997" : "#cbd5e1",
                    // }}
                    name={tab.icon}
                    size={24}
                    color={color}
                  />
                </View>
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default _layout;
