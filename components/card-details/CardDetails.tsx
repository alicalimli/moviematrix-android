import { Stack, useNavigation, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import {
  addBookmark,
  getBookmarksState,
  removeBookmark,
} from "../../redux/slices/bookmarksSlice";
import { API_KEY } from "../../config";
import { useQuery } from "@tanstack/react-query";

import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";

const fetchDetails = async (mediaType: "movie" | "tv", id: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}`
  );
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.status_message);
  } else {
    return {
      details: data,
    };
  }
};

interface CardDetailsProps {}

const CardDetails = ({ id, type }: CardDetailsProps) => {
  const navigation = useNavigation();

  const { items } = useAppSelector(getBookmarksState);
  const dispatch = useAppDispatch();

  const isBookmarked = items.find((item) => +item.id === +id) ? true : false;

  const [movie, setMovie] = useState(null);

  const { data, error, isLoading } = useQuery({
    queryKey: [type, id],
    queryFn: () => fetchDetails(type, id),
  });

  const onBookmarkPress = (detail: any) => {
    dispatch(isBookmarked ? removeBookmark(+detail.id) : addBookmark(detail));
  };

  const details = data?.details;

  return (
    <SafeAreaView className="bg-[#111] flex-1">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: false,
        }}
      />

      <View>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <ScrollView>
            <View className="relative">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${details?.poster_path}`,
                }}
                resizeMode="cover"
                className="w-full h-96"
              />

              <TouchableOpacity
                style={{
                  marginTop: Constants.statusBarHeight,
                  marginLeft: 16,
                }}
                className="absolute"
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View className="p-4 gap-2">
              <View className="flex flex-row flex-wrap items-center">
                <Text className="text-[#fff] text-2xl font-medium">
                  {details?.title}
                </Text>
              </View>

              <Text className="text-slate-300 text-sm">
                {details?.overview}
              </Text>
              <TouchableOpacity
                className="flex-1"
                onPress={() => onBookmarkPress(details)}
              >
                <Text
                  className={`
                      text-center
                  ${
                    isBookmarked
                      ? "bg-[#20C997] text-[#fff]"
                      : "text-[#20C997] "
                  }
                  border border-[#20C997] p-2 px-6 text-lg rounded-full
                `}
                >
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CardDetails;
