// import { Image } from "expo-image";
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

import { SvgUri, Svg } from "react-native-svg";

import React, { useRef, useState } from "react";

import { useQuery, useQueries } from "@tanstack/react-query";

import fetchCats from "../scripts/fetchCats";
import fetchProducts from "../scripts/fetchProducts";
import fetchProdsOfCat from "../scripts/fetchProdsOfCat";

import { useNavigation } from "@react-navigation/native";

const Categories = (props) => {
  const navigation = useNavigation();
  const sectionListRef = props.relatedList;

  const cats = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCats,
  });

  if (cats.isPending) {
    return <ActivityIndicator />;
  }

  if (cats.isError) {
    return <Text>Error: {error.message}</Text>;
  }

  // console.log("sectionListRef:", sectionListRef);

  const catsArray = props.cats;
  // console.log("cats.data:", cats.data);
  // that means leave only cats that has not null cat.image value (also are in precalculated list)
  const catsShorten = cats.data.filter((cat) => catsArray.includes(cat.id));

  // sorting by incrementing id
  catsShorten.sort((a, b) => a.name.localeCompare(b.name));
  catsShorten.reverse();

  // console.log("catsReduced:", catsReduced);

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {catsShorten?.map((item, index) => (
          <Pressable
            key={item.id + "uniqKeyCategories"}
            onPress={() => {
              sectionListRef
                ? sectionListRef.current.scrollToLocation({
                    sectionIndex: index,
                    itemIndex: 1,
                    // viewPosition: 0.5, // Scroll to the middle of the view
                    animated: true,
                  })
                : navigation.navigate("foodmenu", { gotoId: item.id });
            }}
          >
            <View
              style={{
                width: 74,
                borderColor: "#E0E0E0",
                borderWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 1,
                borderRadius: 5,
                marginHorizontal: 4,
                marginVertical: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                  display: Platform.OS === "ios" ? "none" : "block",
                }}
                source={item.image.src}
              />

              {Platform.OS === "ios" && (
                <SvgUri width="30" height="30" uri={item?.image?.src} />
              )}

              <Text style={{ fontSize: 13, fontWeight: "500", marginTop: 6 }}>
                {item?.name}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

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
