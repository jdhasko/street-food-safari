import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface HeaderFavoriteButtonProps {
  isFavorite: boolean;
  iconColor: string;
  onPress?: () => void;
}

const HeaderFavoriteButton = ({
  isFavorite,
  iconColor,
  onPress,
}: HeaderFavoriteButtonProps) => {
  const handlePress = () => {
    onPress?.();
  };

  const heartColor = isFavorite ? "#D32F2F" : iconColor;

  return (
    <View className="w-11 h-11 justify-center items-center">
      <TouchableOpacity
        onPress={handlePress}
        className="w-full h-full justify-center items-center"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={heartColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderFavoriteButton;
