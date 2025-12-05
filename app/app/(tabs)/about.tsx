import AboutCard from "@/src/components/UI/AboutCard";
import ErrorDisplay from "@/src/components/UI/ErrorDisplay";
import useAbout from "@/src/hooks/useAbout";
import LottieView from "lottie-react-native";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  const { isLoading, isRefreshing, error, data, callSlow, retry, refresh } =
    useAbout();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
      >
        {/* Loading State */}
        {isLoading && (
          <View className="items-center">
            <Text className="text-2xl font-bold text-text mb-4 text-center">
              About
            </Text>
            <LottieView
              source={require("../../assets/Prepare Food.json")}
              autoPlay
              loop
              style={{ width: 200, height: 200 }}
            />
            <Text className="text-text mt-4 text-lg">Loading...</Text>
            <Text className="text-text-secondary mt-2 text-center">
              This may take a while
            </Text>
          </View>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <View className="items-center w-full">
            <Text className="text-2xl font-bold text-text mb-4 text-center">
              About
            </Text>
            <ErrorDisplay message={error} />
            <TouchableOpacity
              onPress={retry}
              className="bg-primary px-6 py-3 rounded-lg mt-4"
              activeOpacity={0.7}
            >
              <Text className="text-text-primary font-semibold text-base">
                Retry
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Success State */}
        {data && !isLoading && !error && (
          <View className="items-center w-full">
            <Text className="text-2xl font-bold text-text mb-6 text-center">
              About
            </Text>
            <AboutCard data={data} />
            <TouchableOpacity
              onPress={callSlow}
              className="bg-primary px-6 py-3 rounded-lg"
              activeOpacity={0.7}
            >
              <Text className="text-text-primary font-semibold text-base">
                Test Again
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
