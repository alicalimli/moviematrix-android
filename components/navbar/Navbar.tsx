import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Link } from "expo-router";

const Navbar = () => {
  // const route = useRoute();

  const links = [
    { name: "Home", routeName: "home" },
    { name: "Movies", routeName: "movies" },
    { name: "Shows", routeName: "shows" },
    { name: "Bookmarks", routeName: "bookmarks" },
  ];

  return (
    <View className="flex flex-row justify-between bg-gray-100 p-4">
      {links.map((link) => (
        <Link
          key={link.routeName}
          href={link.routeName}
          // className={`px-4 py-2 rounded-lg ${
          //   route.name === link.routeName ? "bg-gray-200" : ""
          // }`}
        >
          <Text className="text-gray-700 font-medium">{link.name}</Text>
        </Link>
      ))}
    </View>
  );
};

export default Navbar;
