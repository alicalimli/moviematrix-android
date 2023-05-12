import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Link, usePathname } from "expo-router";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", routeName: "home" },
    { name: "Movies", routeName: "movies" },
    { name: "Shows", routeName: "shows" },
    { name: "Bookmarks", routeName: "bookmarks" },
  ];

  return (
    <View className="flex flex-row justify-between bg-black p-4">
      {links.map((link) => {
        const isActive = pathname.includes(link.routeName);

        return (
          <Link key={link.routeName} href={link.routeName}>
            <Text
              className={`
                px-4 py-2 rounded-lg font-medium
                ${isActive ? "text-[#20C997]" : "text-[#fff]"}
              `}
            >
              {link.name}
            </Text>
          </Link>
        );
      })}
    </View>
  );
};

export default Navbar;
