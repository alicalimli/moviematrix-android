import { Stack, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { getBookmarksState } from "../../../redux/slices/bookmarksSlice";
import { useAppSelector } from "../../../hooks";
import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "../../../config";

import Constants from "expo-constants";

import ErrorSVG from "../../../assets/error.svg";
import VoidSVG from "../../../assets/void.svg";

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
  if (!url) {
    return {
      cardsData: [],
    };
  }

  const response = await fetch(url);

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.status_message);
  } else {
    return {
      cardsData: data.results,
    };
  }
};

interface CardsSectionProps {
  page: "bookmarks" | "movies" | "home" | "shows";
}

const CardsSection = ({ page }: CardsSectionProps) => {
  const router = useRouter();

  const { items: bookmarksData } = useAppSelector(getBookmarksState);

  const { data, error, isLoading } = useQuery({
    queryKey: [page],
    queryFn: () => {
      if (page === "bookmarks") return { cardsData: bookmarksData };

      return fetchCardsData(page, getApiURL(page, API_KEY));
    },
  });

  const cardsData = data?.cardsData;

  const onImagePress = (card) => {
    let cardType = "";

    if (page === "movies") {
      cardType = "movie";
    } else if (page === "shows") {
      cardType = "tv";
    } else {
      cardType = card.media_type;
    }

    router.push("/details/" + cardType + card.id);
  };

  const renderCard = useCallback(
    ({ item }) => (
      <Pressable
        className={`${cardsData?.length > 1 ? "flex-1" : "w-1/2"}`}
        onPress={() => onImagePress(item)}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
          resizeMethod="resize"
          className="h-64 ml-2"
        />
      </Pressable>
    ),
    []
  );

  const keyExtractor = useCallback(
    (item) => `key-${item.name ?? item.title}`,
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-[#111] px-4 justify-center items-center">
      <View
        style={{ marginTop: Constants.statusBarHeight }}
        className="flex gap-2 mb-6"
      >
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

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <View className="items-center justify-center">
            <ErrorSVG width={300} height={300} />
            <Text className="text-[#fff] text-2xl font-medium">
              Something Went Wrong
            </Text>
            <Text className="text-slate-300 mt-1">
              Please check your internet connection and try again
            </Text>
          </View>
        ) : !cardsData.length ? (
          <View className="items-center justify-center">
            <VoidSVG width={200} height={200} />
            <Text className="text-[#fff] text-2xl mt-4 font-medium">
              No Results Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={cardsData}
            renderItem={renderCard}
            numColumns={2}
            contentContainerStyle={{
              gap: 8,
              width: "100%",
            }}
            keyExtractor={keyExtractor}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CardsSection;
