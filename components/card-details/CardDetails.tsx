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
  Pressable,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addBookmark,
  getBookmarksState,
  removeBookmark,
} from "../../redux/slices/bookmarksSlice";
import { API_KEY } from "../../config";

import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { useQuery } from "@tanstack/react-query";

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

  const { data, error, isLoading } = useQuery({
    queryKey: [type, id],
    queryFn: () => fetchDetails(type, id),
  });

  const onBookmarkPress = (detail: any) => {
    dispatch(
      isBookmarked
        ? removeBookmark(+detail.id)
        : addBookmark({ ...detail, media_type: type })
    );
  };

  const details = data?.details;

  console.log(details);

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
          <View className="h-full justify-center items-center">
            <ActivityIndicator size="large" />
          </View>
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

              <Pressable
                style={{
                  marginTop: Constants.statusBarHeight + 10,
                  marginLeft: 20,
                }}
                className="absolute"
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={30} color="white" />
              </Pressable>
            </View>

            <View className="p-4 gap-2">
              <View className="flex-row items-center">
                <View className="rounded-full bg-yellow-400 p-2 px-4">
                  <Text className="font-medium">
                    IMDB <Text>{details?.vote_average}</Text>
                  </Text>
                </View>
                <Text className="text-slate-300 ml-3">
                  ({details?.vote_count} reviews)
                </Text>

                <Pressable
                  onPress={() => onBookmarkPress(details)}
                  style={{
                    marginTop: Constants.statusBarHeight + 10,
                    marginLeft: 20,
                  }}
                  className="absolute right-4"
                >
                  <Ionicons
                    name={isBookmarked ? "bookmark" : "bookmark-outline"}
                    size={30}
                    color="#20C997"
                  />
                </Pressable>
              </View>
              <View className="flex flex-row flex-wrap items-center">
                <Text className="text-[#fff] text-2xl font-medium">
                  {details?.title ?? details?.name ?? details?.original_title}
                </Text>
                <Text className="text-slate-300 text-sm mt-2">
                  {details?.overview}
                </Text>
              </View>

              {/* <View className="flex-row pt-4">
                <View className="border border-[#20C997] rounded-md items-center justify-center w-24 h-24">
                  <Text className="text-2xl text-[#20C997]">
                    {details?.vote_average ?? 0}
                  </Text>
                  <Text className="text-slate-300">
                    {details?.vote_count ?? 0}
                  </Text>
                </View>
                <View className="justify-center">
                  <Text className="text-[#20C997]">
                    Release Date:{" "}
                    <Text className="text-white">
                      {details?.release_date ??
                        details?.first_air_date ??
                        "N/A"}
                    </Text>
                  </Text>

                  <Text className="text-[#20C997]">
                    Duration:{" "}
                    <Text className="text-white">
                      {details?.runtime ?? "N/A"}
                    </Text>
                  </Text>

                  <Text className="text-[#20C997]">
                    Status:{" "}
                    <Text className="text-white">
                      {details?.status ?? "N/A"}
                    </Text>
                  </Text>
                </View>
              </View> */}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CardDetails;
