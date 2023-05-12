import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import CardsSection from "../components/home/cards-section/CardsSection";
import { useEffect, useState } from "react";
import { API_KEY } from "../config";
import { useAppSelector } from "../hooks/use-redux";
import { getBookmarksState } from "../redux/slices/bookmarksSlice";

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

const CardsPage = () => {
  const router = useRouter();
  const { type } = useSearchParams();

  const [cardsData, setCardsData] = useState([]);
  const { items: bookmarksData } = useAppSelector(getBookmarksState);

  useEffect(() => {
    if (type === "bookmarks") return setCardsData(bookmarksData);

    fetch(getApiURL(type, API_KEY))
      .then((res) => res.json())
      .then((data) => setCardsData(data.results));
  }, [type]);

  return (
    <SafeAreaView className="flex-1 bg-[#111] px-4">
      <StatusBar barStyle="light-content" />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#111" },
          headerShadowVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <Image
              className="w-12 h-12"
              resizeMode="cover"
              source={require("../assets/logo.png")}
            />
          ),
        }}
      />

      <CardsSection sectionTitle="Trending Now" cardsData={cardsData} />
    </SafeAreaView>
  );
};

export default CardsPage;
