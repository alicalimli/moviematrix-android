import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface CardsSectionProps {
  sectionTitle: string;
  cardsData: any[];
  onShowMore: () => void;
}

const CardsSection = ({
  sectionTitle,
  cardsData,
  onShowMore,
}: CardsSectionProps) => {
  const router = useRouter();
  const onImagePress = (card) => {
    console.log(card);
    router.push("/details/" + card.media_type + card.id);
  };

  return (
    <View className="flex gap-2 mb-6">
      <Text className="text-[#fff] text-2xl">{sectionTitle}</Text>
      <FlatList
        data={cardsData}
        renderItem={({ item }) => (
          <TouchableOpacity
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
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={{
          gap: 8,
          width: "100%",
        }}
        keyExtractor={(item) => `key-${item.name ?? item.title}`}
      />
    </View>
  );
};

export default CardsSection;
