import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Link, useNavigation, usePathname, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      routeName: "home",
      icon: "home-outline",
    },
    {
      name: "Movies",
      routeName: "movies",
      icon: "film-outline",
    },
    {
      name: "Shows",
      routeName: "shows",
      icon: "tv-outline",
    },
    {
      name: "Bookmarks",
      routeName: "bookmarks",
      icon: "bookmark-outline",
    },
  ];

  return (
    <View className="flex flex-row justify-between bg-black p-4">
      {links.map((link) => {
        const isActive = pathname.includes(link.routeName);
        const Icon = link.icon;

        return (
          <Pressable
            className="items-center "
            onPress={() => router.replace(link.routeName)}
            key={link.routeName}
            href={link.routeName}
          >
            <Ionicons
              style={{
                color: isActive ? "#20C997" : "#cbd5e1",
              }}
              name={link.icon}
              size={24}
              color="white"
            />
            <Text
              className={`
                px-4 py-2 rounded-lg font-medium
                ${isActive ? "text-[#20C997]" : "text-slate-300"}
              `}
            >
              {link.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Navbar;
