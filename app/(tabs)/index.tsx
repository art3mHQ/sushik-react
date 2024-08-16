import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

// import Carousel from "../../components/Carousel";
import Anothercarousel from "../../components/Anothercarousel";
import Categories from "../../components/Categories";
import Recommended from "../../components/Recommended";
// import Menu from "../../components/Menu";
import LastOrders from "../../components/LastOrders";
import Noncense from "../../components/Noncense";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { Link } from "expo-router";

import { useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "no default address ...",
  );

  const navigation = useNavigation();
  // dispatch(savenonce(sosi));
  // ------------------------

  const savednonce = useSelector((state) => state.cart.nonce);
  console.log("savednonce", savednonce);

  const hardcodedUsedCats = [21, 23, 22, 16, 24, 19, 35];

  const getUserData = async () => {
    try {
      const savedUserData = await AsyncStorage.getItem("userdata");
      const currentUserData = JSON.parse(savedUserData);
      console.log(
        "------currentUserData--fromStorage!---fromIndex!!!---->",
        currentUserData,
      );
      if (currentUserData.adr) setDisplayCurrentAddress(currentUserData.adr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // const wcNonce = fethNonce();

  return (
    <SafeAreaView style={styles.safecontainer}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#f8f8f8",
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            padding: 10,
          }}
        >
          <Ionicons
            style={{
              paddingRight: 10,
              paddingLeft: 8,
            }}
            name="menu"
            size={26}
            color="black"
            onPress={() => navigation.openDrawer()}
            title="Go to Drawer"
          />

          <Octicons name="location" size={24} color="#E52850" />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Адреса для доставки
            </Text>
            <Text style={{ color: "gray", fontSize: 16, marginTop: 3 }}>
              {displayCurrentAddress}
            </Text>
          </View>
          <Pressable
            style={{
              backgroundColor: "#6CB4EE",
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/*<Text>S</Text>*/}
            <SimpleLineIcons name="user-follow" size={20} color="black" />
          </Pressable>
        </View>
        {/*<Carousel />*/}
        <Anothercarousel />
        <Text
          style={{
            textAlign: "center",
            marginTop: 24,
            letterSpacing: 4,
            marginBottom: 6,
            color: "gray",
          }}
          onPress={() => navigation.navigate("foodmenu")}
          title="Go to food menu"
        >
          MENU
        </Text>

        {/*<QueryClientProvider client={queryClient}>*/}
        <Categories cats={hardcodedUsedCats} />

        <Text
          style={{
            textAlign: "center",
            marginTop: 12,
            letterSpacing: 4,
            marginBottom: 6,
            color: "gray",
          }}
        >
          РЕКОМЕНДУЄМО
        </Text>
        {/*<Noncense />*/}
        <Recommended nav={navigation} />
        <Text
          style={{
            textAlign: "center",
            marginTop: 12,
            letterSpacing: 4,
            marginBottom: 6,
            color: "gray",
          }}
        >
          ОСТАННИI ЗАМОВЛЕННЯ З САЙТУ
        </Text>
        <LastOrders nav={navigation} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={
              {
                // textAlign: "center",
                // marginTop: 24,
                // letterSpacing: 4,
                // marginBottom: 6,
                // color: "gray",
              }
            }
          >
            ❤️ 2024, Vse dla sushi{" "}
          </Text>
          {/*{savednonce != 0 && <Noncense />}*/}
          <Noncense />
        </View>
        {/*</QueryClientProvider>*/}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    color: "pink",
  },
});
