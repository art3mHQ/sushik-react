import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SectionList,
  ActivityIndicator,
} from "react-native";

// import { SvgUri, Svg } from "react-native-svg";

import React, { useRef } from "react";

import { useQuery, useQueries } from "@tanstack/react-query";

// import fetchCats from "../scripts/fetchCats";
import fetchProducts from "../scripts/fetchProducts";
// import fetchProdsOfCat from "../scripts/fetchProdsOfCat";

import Categories from "./Categories";
import MenuItem from "./MenuItem";

import sectionListGetItemLayout from "react-native-section-list-get-item-layout";

import { useFocusEffect } from "@react-navigation/native";

const Menu = (props) => {
  const sectionListRef = useRef(null);

  const prod_list = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (prod_list.isPending) {
    return <ActivityIndicator size="large" />;
  }

  const productsList = prod_list.data;
  // console.log("prod_list:", productsList);

  // get list of used categories
  const catsArray = props.cats;
  console.log(props.cats);

  const filtredProdList = productsList.filter((prod) =>
    catsArray.includes(prod.categories[0]?.id),
  );

  // console.log("filtredProdList:", filtredProdList);

  // acc means accumulator (storage for values)
  let grouped = filtredProdList.reduce((acc, item) => {
    if (!acc[item.categories[0].name]) {
      acc[item.categories[0].name] = [];
    }
    acc[item.categories[0].name].push(item);
    return acc;
  }, {});

  let DATA = Object.keys(grouped).map((key) => {
    return {
      title: key,
      data: grouped[key],
    };
  });

  DATA.sort((a, b) => a.title.localeCompare(b.title));
  DATA.reverse();

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <MenuItem prod={{ item }} />
    </View>
  );

  const _getItemLayout = sectionListGetItemLayout({
    // The height of the row with rowData at the given sectionIndex and rowIndex
    getItemHeight: (rowData, sectionIndex, rowIndex) =>
      sectionIndex === 0 ? 120 : 120,

    // These three properties are optional
    getSeparatorHeight: () => 0, // The height of your separators
    getSectionHeaderHeight: () => 42, // The height of your section headers
    getSectionFooterHeight: () => 0, // The height of your section footers
  });

  const onScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      if (sectionListRef.current) {
        sectionListRef.current.scrollToLocation({
          sectionIndex: info.index,
          itemIndex: 0,
          animated: true,
        });
      }
    });
  };

  const scrollToSection = (sectionIndex, itemIndex) => {
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex: sectionIndex,
        itemIndex: itemIndex,
        viewPosition: 0, // 0 = top, 0.5 = center, 1 = bottom
        // viewOffset: 43,
        animated: true, // Optional: Enable animation
      });
    }
  };

  console.log("go to the card No", props.scrollto);

  // get index of category id
  // const goToCategory = props.scrollto ? cats.indexOf(props.scrollto) : 1;

  // if (props.scrollto) {
  //   useFocusEffect(
  //     React.useCallback(() => {
  //       scrollToSection(
  //         catsArray
  //           .reduce((acc, item) => [item].concat(acc), [])
  //           .indexOf(props.scrollto),
  //         0,
  //       );
  //     }, [scrollToSection]),
  //   );
  // }

  return (
    <View
      style={{ height: "100%" }}
      onLayout={() => {
        if (props.scrollto) {
          // Reversing array cos category component uses revesed cat list
          scrollToSection(
            catsArray
              .reduce((acc, item) => [item].concat(acc), [])
              .indexOf(props.scrollto),
            0,
          );
        }
      }}
    >
      <Categories cats={catsArray} relatedList={sectionListRef} />
      <SectionList
        ref={sectionListRef}
        initialNumToRender="9"
        // ListHeaderComponent={}
        // stickyHeaderComponent={<Categories cats={catsArray} />}
        // stickyHeaderIndices={[0]}
        sections={DATA}
        keyExtractor={(item, index) => item.slug + "allprods"}
        renderItem={renderItem}
        onScrollToIndexFailed={onScrollToIndexFailed}
        getItemLayout={_getItemLayout}
        renderSectionHeader={({ section: { title, data } }) => (
          <Text style={styles.header}>
            {title} ({data.length})
          </Text>
        )}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
  },
  item: {
    height: 116,
    backgroundColor: "snow",
    padding: 2,
    marginVertical: 2,
  },
  header: {
    // height: 80,
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#fff",
    padding: 8,
  },
});
