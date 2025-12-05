import { FavoritesProvider } from "@/src/contexts/FavoritesContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <FavoritesProvider>
            <Stack initialRouteName="(tabs)">
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </FavoritesProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
