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
import { Stack, useRouter } from "expo-router";
import CardsSection from "../components/home/cards-section/CardsSection";
import { useEffect, useState } from "react";

const apiKey = "b51b535b2fa399a23d7dfdf78f4f91c3";

const Home = () => {
  const router = useRouter();

  const [trendings, setTrendings] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setTrendings(data.results));
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#111]">
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

      <ScrollView showsVerticalScrollIndicator className="px-4">
        <CardsSection sectionTitle="Trending Now" cardsData={trendings} />
        <CardsSection sectionTitle="Movies" cardsData={trendings} />
        <CardsSection sectionTitle="TV Shows" cardsData={trendings} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
