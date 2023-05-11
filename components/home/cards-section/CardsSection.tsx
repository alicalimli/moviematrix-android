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
    router.push("/" + card.media_type + card.id);
  };

  return (
    <View className="flex gap-2 mb-6">
      <Text className="text-[#fff] text-2xl">{sectionTitle}</Text>
      <FlatList
        data={cardsData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onImagePress(item)}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
              }}
              resizeMethod="resize"
              className="w-40 h-52 object-contain"
            />
          </TouchableOpacity>
        )}
        horizontal
        contentContainerStyle={{ columnGap: 8 }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CardsSection;
