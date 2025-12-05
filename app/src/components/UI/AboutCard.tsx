import { AboutResponse } from "@/src/interfaces/about";
import React from "react";
import { Text, View } from "react-native";

interface AboutCardProps {
  data: AboutResponse;
}

export default function AboutCard({ data }: AboutCardProps) {
  return (
    <View className="bg-white p-6 rounded-lg border border-border w-full mb-6">
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
          <Text className="text-text font-semibold">{data.delayMs}ms</Text>
        </View>
      </View>
    </View>
  );
}
