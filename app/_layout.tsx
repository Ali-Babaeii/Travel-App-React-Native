import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="all-destinations"
          options={{
            headerShown: true,
            title: "Popular Destinations",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="all-hotels"
          options={{
            headerShown: true,
            title: "Featured Hotels",
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="search-results"
          options={{
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </>
  );
}
