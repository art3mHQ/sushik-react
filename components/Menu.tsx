import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SectionList,
  ActivityIndicator,
  StatusBar,
} from "react-native";

// import { SvgUri, Svg } from "react-native-svg";

import React, { useRef, useEffect, useMemo } from "react";

import { useQuery, useQueries } from "@tanstack/react-query";

// import fetchCats from "../scripts/fetchCats";
import fetchProducts from "../scripts/fetchProducts";
// import fetchProdsOfCat from "../scripts/fetchProdsOfCat";

import Categories from "./Categories";
import MenuItem from "./MenuItem";

import sectionListGetItemLayout from "react-native-section-list-get-item-layout";

import { useFocusEffect } from "@react-navigation/native";

const Menu = ({ scrollto, cats }) => {
  const sectionListRef = useRef(null);
  // const scrollto = props.scrollto;
  // console.log("scrollto", scrollto);
  // get list of used categories
  const catsArray = cats;

  if (scrollto.constructor === Object) {
    let scrollto = 0;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Process sections data
  const sections = useMemo(() => {
    if (data) {
      // const productsList = prod_list.data;

      const filtredProdList = data.filter((prod) =>
        catsArray.includes(prod.categories[0]?.id),
      );

      // acc means accumulator (storage for values)
      let grouped = filtredProdList.reduce((acc, item) => {
        if (!acc[item.categories[0].name]) {
          acc[item.categories[0].name] = [];
        }
        acc[item.categories[0].name].push(item);
        return acc;
      }, {});

      let DATAset = Object.keys(grouped).map((key) => {
        return {
          title: key,
          data: grouped[key],
        };
      });

      DATAset.sort((a, b) => a.title.localeCompare(b.title));
      DATAset.reverse();

      // console.log("DATAset", DATAset);

      // Perform any logic or transformation on the sections here
      return DATAset;
    }
    return [];
  }, [data]);

  console.log("sections.length", sections.length);
  console.log("scrollto", scrollto);
  console.log("Object.keys scrollto.length", Object.keys(scrollto).length);

  useEffect(() => {
    // this scrollto &&s crollto.constructor != Object check is needed cos we do not need scroll
    // on top after each rerender so if scrollto not passed from parent component
    if (
      sections.length > 0 &&
      scrollto &&
      scrollto.constructor != Object &&
      sectionListRef.current
    ) {
      // console.log("sections from useEffect", sections);
      // const index = sections.findIndex(
      //   (section) => section.title === scrollto,
      // );
      // console.log("index from useEffect", index);
      // console.log("scrollto from useEffect", scrollto);
      // if (index !== -1) {
      const index = catsArray
        .reduce((acc, item) => [item].concat(acc), [])
        .indexOf(scrollto);

      console.log("index", index);
      setTimeout(() => {
        sectionListRef.current.scrollToLocation({
          sectionIndex: index,
          itemIndex: 0,
          viewPosition: 0, // 0 = top, 0.5 = center, 1 = bottom
          animated: true, // Optional: Enable animation
        });
      }, 300);
      // }
    }
  }, [sections, scrollto]);

  if (isLoading) {
    return <ActivityIndicator style={styles.safecontainer} />;
  }

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

  // const scrollToSection = (sectionIndex, itemIndex) => {
  //   if (sectionListRef.current) {
  //     sectionListRef.current.scrollToLocation({
  //       sectionIndex: sectionIndex,
  //       itemIndex: itemIndex,
  //       viewPosition: 0, // 0 = top, 0.5 = center, 1 = bottom
  //       // viewOffset: 43,
  //       animated: true, // Optional: Enable animation
  //     });
  //   }
  // };

  console.log("go to the card No", scrollto);

  return (
    <View
      style={{ height: "100%" }}
      // onLayout={() => {
      //   if (props.scrollto) {
      //     // Reversing array cos category component uses revesed cat list
      //     scrollToSection(
      //       catsArray
      //         .reduce((acc, item) => [item].concat(acc), [])
      //         .indexOf(props.scrollto),
      //       0,
      //     );
      //   }
      // }}
    >
      <Categories cats={catsArray} relatedList={sectionListRef} />
      <SectionList
        ref={sectionListRef}
        initialNumToRender="9"
        // ListHeaderComponent={}
        // stickyHeaderComponent={<Categories cats={catsArray} />}
        // stickyHeaderIndices={[0]}
        sections={sections}
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
  safecontainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
  },
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
