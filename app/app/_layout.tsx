import { FavoritesProvider } from "@/src/contexts/FavoritesContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <Stack initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
