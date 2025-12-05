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
            <View className="bg-card p-6 rounded-lg border border-border w-full mb-6">
              <View className="items-center mb-4">
                <View
                  className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
                    data.ok ? "bg-success/20" : "bg-error/20"
                  }`}
                >
                  <Text
                    className={`text-2xl font-bold ${
                      data.ok ? "text-success" : "text-error"
                    }`}
                  >
                    {data.ok ? "✓" : "✗"}
                  </Text>
                </View>
                <Text className="text-text text-lg font-semibold mb-2">
                  {data.message}
                </Text>
              </View>
              <View className="border-t border-border pt-4 mt-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-text-secondary">Status:</Text>
                  <Text className="text-text font-semibold">
                    {data.ok ? "Success" : "Failed"}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-text-secondary">Delay:</Text>
                  <Text className="text-text font-semibold">
                    {data.delayMs}ms
                  </Text>
                </View>
              </View>
            </View>
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
