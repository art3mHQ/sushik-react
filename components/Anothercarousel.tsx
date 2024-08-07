// import { Image } from "expo-image";
import {
	Image,
	FlatList,
	StyleSheet,
	Text,
	View,
	Dimensions,
	// LogBox,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const Carousel = () => {
	const flatlistRef = useRef();
	// Get Dimesnions
	const screenWidth = Dimensions.get("window").width;
	const [activeIndex, setActiveIndex] = useState(0);

	// Auto Scroll

	useEffect(() => {
		let interval = setInterval(() => {
			if (activeIndex === carouselData.length - 1) {
				flatlistRef.current.scrollToIndex({
					index: 0,
					animation: true,
				});
			} else {
				flatlistRef.current.scrollToIndex({
					index: activeIndex + 1,
					animation: true,
				});
			}
		}, 3000);

		return () => clearInterval(interval);
	});

	const getItemLayout = (data, index) => ({
		length: screenWidth,
		offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
		index: index,
	});
	// Data for carousel
	const carouselData = [
		{
			id: "01",
			image: require("../assets/images/2.file-lososweb-650x240.jpg"),
			blurhash: "LQOnN^39E3}?D.IrEOR7R+n~R%RQ",
		},
		{
			id: "02",
			image: require("../assets/images/carousel1.jpeg"),
			blurhash: "LcI;0HMz%3p0~9V?WrS7njskogRk",
		},
		{
			id: "03",
			image: require("../assets/images/carousel2.jpeg"),
			blurhash: "LTJs,@s9}r%2ofn4X8WqFeWBxbax",
		},
		{
			id: "04",
			image: require("../assets/images/carousel3.jpeg"),
			blurhash: "L6EyPfXV009E00Io}hjK9uWBN2%L",
		},
	];

	// console.log("carouselData", carouselData);

	//  Display Images // UI
	const renderItem = ({ item, index }) => {
		return (
			<View key={index + "carousel"}>
				<Image
					source={item.image}
					style={{
						height: 200,
						width: screenWidth - 16,
						borderRadius: 8,
						marginHorizontal: 8,
					}}
					// placeholder={item.blurhash}
				/>
			</View>
		);
	};

	// Handle Scroll
	const handleScroll = (event) => {
		// Get the scroll position
		const scrollPosition = event.nativeEvent.contentOffset.x;
		// console.log({ scrollPosition });
		// Get the index of current active item

		const index = Math.round(scrollPosition / screenWidth);

		// console.log({ index });
		// Update the index

		setActiveIndex(index);
	};

	// Render Dot Indicators
	const renderDotIndicators = () => {
		return carouselData.map((dot, index) => {
			// if the active index === index

			if (activeIndex === index) {
				return (
					<View
						key={index}
						style={{
							backgroundColor: "green",
							height: 10,
							width: 10,
							borderRadius: 5,
							marginHorizontal: 6,
						}}
					></View>
				);
			} else {
				return (
					<View
						key={index}
						style={{
							backgroundColor: "red",
							height: 10,
							width: 10,
							borderRadius: 5,
							marginHorizontal: 6,
						}}
					></View>
				);
			}
		});
	};

	return (
		<View>
			<FlatList
				showsHorizontalScrollIndicator={false}
				data={carouselData}
				ref={flatlistRef}
				getItemLayout={getItemLayout}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}
				pagingEnabled={true}
				onScroll={handleScroll}
			/>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					marginTop: -20,
				}}
			>
				{renderDotIndicators()}
			</View>
		</View>
	);
};

export default Carousel;

const styles = StyleSheet.create({});
