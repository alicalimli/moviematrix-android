import { Stack, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import {
  addBookmark,
  getBookmarksState,
  removeBookmark,
} from "../../redux/slices/bookmarksSlice";

interface CardDetailsProps {}

const CardDetails = ({ id, type }: CardDetailsProps) => {
  const { bookmarkedIds } = useAppSelector(getBookmarksState);

  const isBookmarked = bookmarkedIds.includes(+id);

  const dispatch = useAppDispatch();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.API_KEY}`
      );
      const data = await response.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  const onBookmarkPress = (id: number) => {
    dispatch(isBookmarked ? removeBookmark(id) : addBookmark(id));
  };

  return (
    <SafeAreaView className="bg-[#111] flex-1">
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#111" },
          headerShadowVisible: false,
          headerTintColor: "white",
          headerTitle: id,
        }}
      />

      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            resizeMode="cover"
            className="w-full h-96"
          />
        </View>

        <View className="p-2">
          <View className="flex flex-row flex-wrap items-center">
            <Text className="text-[#fff] text-2xl font-medium">
              {movie.title}
            </Text>
            <TouchableOpacity
              className="ml-auto"
              onPress={() => onBookmarkPress(+movie.id)}
            >
              <Text
                className={`
                ${isBookmarked ? "bg-[#20C997] text-[#fff]" : "text-[#20C997] "}
                border border-[#20C997] p-2 px-6 rounded-md text-lg 
              `}
              >
                Bookmark
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-[#fff] text-lg">{movie.overview}</Text>
          <Text className="text-[#fff] text-lg">{movie.overview}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardDetails;
