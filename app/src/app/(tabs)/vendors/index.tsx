import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-500 text-right">
        Edit app/index.tsx to edit this screen.
      </Text>
      <TouchableOpacity onPress={() => router.push("/vendors/[id]")}>
        <Text>Vendor Details</Text>
      </TouchableOpacity>
    </View>
  );
}
