import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SectionList,
  Platform,
} from "react-native";

import React from "react";

import { useQuery, useQueries } from "@tanstack/react-query";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import fetchOrders from "../scripts/fetchOrders";
import timeAgo from "../scripts/timeAgo";

const LastOrders = () => {
  const lastOrdersList = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (lastOrdersList.isPending) {
    return <Text>Ordered Prods Loading...</Text>;
  }

  if (lastOrdersList.error) {
    return <Text>Oh no ...</Text>;
  }

  const lastOrdersLs = lastOrdersList.data;

  // console.log("lastOrdersLs from LastOrders:", lastOrdersLs);

  return (
    <View>
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

      <View style={{ marginHorizontal: 8 }}>
        {/*we grab products form last orders*/}
        {lastOrdersLs.map((proditem) => (
          <View
            key={proditem.id + "recent_orders"}
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
              source={{ uri: proditem?.image }}
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#E52850",
                  borderRadius: 4,
                  paddingHorizontal: 6,
                  paddingVertical: 7,
                  marginRight: 10,
                  gap: 3,
                }}
              >
                <MaterialCommunityIcons name="leaf" size={20} color="white" />
                <Text style={{ textAlign: "center", color: "white" }}>
                  я теж хочу
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default LastOrders;

const styles = StyleSheet.create({});
