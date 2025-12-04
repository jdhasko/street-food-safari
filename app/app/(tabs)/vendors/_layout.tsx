import { Stack } from "expo-router";
import React from "react";

const VendorLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerTransparent: true,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default VendorLayout;
