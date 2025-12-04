import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VendorDetails = () => {
  const data = useLocalSearchParams();

  return (
    <SafeAreaView>
      <View>
        <Text>{data.id.toString()}</Text>
      </View>
    </SafeAreaView>
  );
};

export default VendorDetails;
