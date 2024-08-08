import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SectionList,
  Platform,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import React from "react";

import { useQuery, useQueries } from "@tanstack/react-query";

import fetchProdsOfCat from "../scripts/fetchProdsOfCat";

const Recommended = (props) => {
  const recProdList = useQuery({
    queryKey: ["products_of_cat", 28],
    queryFn: () => fetchProdsOfCat(28),
  });

  if (recProdList.isPending) {
    return <Text>Prods Loading...</Text>;
  }

  if (recProdList.isError) {
    return <Text>Error: {error.message}</Text>;
  }

  const recommended = recProdList.data;
  console.log("recProdList:", recommended);

  // const testImg =
  //   "https://dev.sushik.km.ua/wp-content/uploads/2019/10/DSC_5817-scaled.jpg";

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  // function showProductHandler() {
  //   navigation.navigate("singleProductScreen", {
  //     product: item,
  //   });
  // }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {recommended?.map((item, index) => (
        <Pressable
          key={"item_recommended" + index}
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            margin: 10,
            borderRadius: 8,
            maxWidth: 340,
          }}
          onPress={() =>
            props.nav.navigate("singleProductScreen", {
              product: item,
            })
          }
        >
          <View>
            <Image
              style={{
                width: 102,
                height: 102,
                contentFit: "cover",
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 7,
              }}
              source={{ uri: item?.images[0].src }}
              placeholder={{ blurhash }}
            />
          </View>

          <View style={{ padding: 10, flexDirection: "column" }}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              {item?.name.length > 26
                ? item.name.substr(0, 23) + "..."
                : item.name}
            </Text>
            <Text
              style={{
                flex: 1,
                marginTop: 3,
                color: "gray",
                fontWeight: "500",
                maxWidth: 200,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item?.short_description.replace(/<\/?p>/g, "")}
            </Text>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Ionicons name="pricetag-outline" size={24} color="green" />
              <Text>{item?.prices.price} грн</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Recommended;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 6,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    backgroundColor: "#fff",
    padding: 8,
  },
});
