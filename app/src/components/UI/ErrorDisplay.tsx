import React from "react";
import { Text, View } from "react-native";

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <View className="bg-error/10 mb-2 p-3 rounded-lg border border-error/20">
      <Text className="text-error text-sm text-center">{message}</Text>
    </View>
  );
};

export default ErrorDisplay;
