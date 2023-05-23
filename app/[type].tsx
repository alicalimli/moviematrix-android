import { View, SafeAreaView } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import CardsSection from "../components/home/cards-section/CardsSection";
import { useEffect, useState } from "react";
import { API_KEY } from "../config";
import { useAppSelector } from "../hooks";
import { getBookmarksState } from "../redux/slices/bookmarksSlice";

import Constants from "expo-constants";
import { useQuery } from "@tanstack/react-query";

const getApiURL = (type, apiKey) => {
  switch (type) {
    case "home":
      return `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
      break;
    case "movies":
      return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
      break;
    case "shows":
      return `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
      break;
  }
};

const fetchCardsData = async (type: string | any, url) => {
  const response = await fetch(url);
  console.log("ASFASFASF");
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.status_message);
  } else {
    return {
      cardsData: data.results,
    };
  }
};

const CardsPage = () => {
  const router = useRouter();
  const { type } = useSearchParams();

  const { items: bookmarksData } = useAppSelector(getBookmarksState);

  const { data, error, isLoading } = useQuery({
    queryKey: [type],
    queryFn: () => {
      if (type === "bookmarks") return { cardsData: bookmarksData };

      return fetchCardsData(type, getApiURL(type, API_KEY));
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-[#111] px-4">
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#111",
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: false,
        }}
      />

      <View style={{ marginTop: Constants.statusBarHeight }} />
      {!isLoading && <CardsSection cardsData={data.cardsData} />}
    </SafeAreaView>
  );
};

export default CardsPage;
