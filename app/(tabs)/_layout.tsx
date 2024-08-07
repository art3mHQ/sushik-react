import "react-native-gesture-handler";
// import "./gesture-handler.native";
// import { Tabs } from "expo-router";
import React from "react";

// import { TabBarIcon } from "@/components/navigation/TabBarIcon";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../../components/CustomDrawer";

export default function DrawerLayout() {
  // console.log("from layout");
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawer}
        screenOptions={{
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Головна",
            title: "main page",
            // Hide the header for this route
            headerShown: false,
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="foodmenu" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Меню доставки",
            title: "MENU",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="fish-outline" size={size} color={color} />
            ),
            // Hide the header for this route
            // headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
