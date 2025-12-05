import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useImperativeHandle, useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";

interface FilterBottomSheetProps {
  title: string;
  options: string[];
  selected: string | null;
  onSelect: (selected: string | null) => void;
}

export interface FilterBottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

const FilterBottomSheet = React.forwardRef<
  FilterBottomSheetRef,
  FilterBottomSheetProps
>(({ title, options, selected, onSelect }, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const colors = useThemeColors();

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetModalRef.current?.present(),
    dismiss: () => bottomSheetModalRef.current?.dismiss(),
  }));

  const handleSelect = useCallback(
    (option: string) => {
      const newSelection = selected === option ? null : option;
      onSelect(newSelection);
      bottomSheetModalRef.current?.dismiss();
    },
    [selected, onSelect]
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      const isSelected = selected === item;
      return (
        <TouchableOpacity
          onPress={() => handleSelect(item)}
          className="flex-row items-center justify-between py-4 px-4 border-b border-gray-100"
          activeOpacity={0.7}
        >
          <Text
            className="text-base flex-1"
            style={{ color: colors.text.primary }}
            pointerEvents="none"
          >
            {item}
          </Text>
          <Ionicons
            name={isSelected ? "radio-button-on" : "radio-button-off"}
            size={24}
            color={isSelected ? colors.accent : colors.text.muted}
          />
        </TouchableOpacity>
      );
    },
    [selected, handleSelect, colors]
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={["75%"]}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      )}
      backgroundStyle={{ backgroundColor: colors.background }}
      handleIndicatorStyle={{ backgroundColor: colors.border }}
    >
      <BottomSheetView className="flex-1 pb-6">
        <View className="px-4 pt-2 pb-4 border-b border-gray-200">
          <View className="flex-row items-center justify-between">
            <Text
              className="text-xl font-semibold"
              style={{ color: colors.text.primary }}
            >
              {title}
            </Text>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current?.dismiss()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={24} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          className="flex-1"
          ListEmptyComponent={
            <View className="py-8 px-4 items-center">
              <Text style={{ color: colors.text.muted }}>
                No options available
              </Text>
            </View>
          }
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

FilterBottomSheet.displayName = "FilterBottomSheet";

export default FilterBottomSheet;
