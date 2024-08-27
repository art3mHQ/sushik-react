import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SectionList,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";

import React from "react";

import { useQuery, useQueries } from "@tanstack/react-query";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import fetchOrders from "../scripts/fetchOrders";
import timeAgo from "../scripts/timeAgo";

const LastOrders = (props) => {
  const lastOrdersList = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (lastOrdersList.isPending) {
    return <ActivityIndicator style={styles.safecontainer} />;
  }

  if (lastOrdersList.error) {
    return <Text>Oh no ...</Text>;
  }

  const lastOrdersLs = lastOrdersList.data;

  // const seen = new Set();
  // const uniqueJsonArray = lastOrdersLs.filter((item) => {
  //   const duplicate = seen.has(item.id);
  //   seen.add(item.id);
  //   return !duplicate;
  // });

  // console.log("lastOrdersLs from LastOrders:", lastOrdersLs);

  return (
    <View>
      <View style={{ marginHorizontal: 8 }}>
        {/*we grab products form last orders*/}
        {lastOrdersLs.map((proditem) => (
          <View
            key={
              proditem.id +
              proditem.parent +
              proditem.order_date +
              "_recent_orders"
            }
            style={{
              marginHorizontal: 6,
              marginVertical: 12,
              borderRadius: 20,
              backgroundColor: "white",
            }}
          >
            <Image
              style={{
                width: "100%",
                aspectRatio: 6 / 4,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
              }}
              source={{ uri: proditem?.images[0].src }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    marginTop: 10,
                    fontSize: 15,
                    fontWeight: "400",
                  }}
                >
                  {proditem?.name}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    paddingBottom: 13,
                    marginTop: 3,
                    fontSize: 14,
                    fontWeight: "300",
                    color: "gray",
                  }}
                >
                  ordered {timeAgo(proditem.order_date)} тому
                </Text>
              </View>
              <Pressable
                // style={styles.buttonStyle}
                style={({ pressed }) => [
                  styles.buttonStyle,
                  pressed && styles.pressed,
                ]}
                onPress={() =>
                  props.nav.navigate("singleProductScreen", {
                    product: proditem,
                  })
                }
              >
                <MaterialCommunityIcons name="leaf" size={20} color="white" />
                <Text style={{ textAlign: "center", color: "white" }}>
                  я теж хочу
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default LastOrders;

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    height: 200,
    // paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6666",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 7,
    marginRight: 10,
    gap: 3,
  },
  pressed: {
    opacity: 0.65,
  },
});
