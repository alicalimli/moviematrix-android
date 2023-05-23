import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, Image, Pressable, View } from "react-native";

interface CardsSectionProps {
  cardsData: any[];
  page: "bookmarks" | "movies" | "home" | "shows";
}

const CardsSection = ({ cardsData, page }: CardsSectionProps) => {
  const router = useRouter();

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
        className={`${cardsData.length > 1 ? "flex-1" : "w-1/2"}`}
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
    <View className="flex gap-2 mb-6">
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
    </View>
  );
};

export default CardsSection;
