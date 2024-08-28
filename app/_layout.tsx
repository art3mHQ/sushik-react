import { Button } from "react-native";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

import { Provider } from "react-redux";
import store from "../redux/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PaymentResult from "./paymentresult";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="order" options={{ headerShown: false }} />

            <Stack.Screen
              name="singleProductScreen"
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="greatsuccess"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="liqpayScreen"
              options={{
                // presentation: "modal",
                // headerShown: false,
                title: "натисніть на завершенні ->",
                headerStyle: {
                  // backgroundColor: '#f4511e',
                },
                // headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: 20,
                },
                headerBackVisible: false,
                headerRight: () => <Button title="Ok" />,
              }}
            />

            {/*<Stack.Screen
              name="paymentresult"
              // component={PaymentResult}
              options={{
                headerShown: false,
                headerBackVisible: false,
              }}
            />*/}
          </Stack>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
