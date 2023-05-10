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

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <StatusBar barStyle="light-content" />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#111" },
          headerShadowVisible: false,
          headerTitle: "test",
          headerLeft: () => (
            <Image
              className="w-12 h-12"
              resizeMode="cover"
              source={require("../assets/logo.png")}
            />
          ),
        }}
      />

      <ScrollView showsVerticalScrollIndicator>
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
