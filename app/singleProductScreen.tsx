import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	ActivityIndicator,
	StatusBar,
	Button,
} from "react-native";

import { Stack } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";

import AntDesign from "@expo/vector-icons/AntDesign";

import { useQuery } from "@tanstack/react-query";

import fetchVariations from "../scripts/fetchVariations";

import FooterProduct from "../components/FooterProduct";

const singleProduct = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const { product } = route.params;

	const [selectedSize, setSelectedSize] = useState({
		size: "40",
		variationId: "",
	});
	// const prodId = route.params.productId;

	console.log("productId from singleProductSc", product);

	const defaultPizzaImage = require("../assets/images/2.file-lososweb-650x240.jpg");

	const sizes = product.variations.map((item) => item.attributes[0].value);

	let variations = [];

	let sizeVariationSet = [];

	if (product.variations.length > 0) {
		// const sizes = ["S", "M", "XL"];
		const variationsIds = product.variations.map((item) => item.id);

		sizeVariationSet = sizes.map((size, index) => ({
			size: size,
			variationId: variationsIds[index],
		}));

		// setSelectedSize({ variationId: variationsIds[2] });

		// console.log("vars", sizeVariationSet);
		// console.log("selectedSize", selectedSize);

		const fetchedVars = useQuery({
			queryKey: [`${product.id}_prodVariations`],
			// queryFn: () => fetchVariations(sizes[0], sizes[1], sizes[2]),
			queryFn: () => fetchVariations(...variationsIds),
		});

		if (fetchedVars.isPending) {
			return <Text>Vars Loading...</Text>;
		}

		if (fetchedVars.isError) {
			return <Text>Vars Error: {error.message}</Text>;
		}

		// console.log("fetchedVars", fetchedVars.data);

		variations = fetchedVars.data;
	}
	// const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

	// if (isLoading) {
	// 	return <ActivityIndicator />;
	// }

	const selectedPrice = variations.find(
		(element) => element.permalink.slice(-2) === selectedSize.size,
	)?.prices.price;

	// if (error) {
	// 	return <Text>Failed to fetch products</Text>;
	// }
	function selectedSizeHandler(size) {
		const varSizePair = sizeVariationSet.find(
			(element) => element.size === size,
		);
		setSelectedSize({ size: size, variationId: varSizePair.variationId });
	}

	function goBackHandler() {
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={{ uri: product?.images[0].src }}
				// placeholder={{ blurhash }}
			/>
			<AntDesign
				name="close"
				size={26}
				color="#F0F8FF"
				style={{
					position: "absolute",
					left: 20,
					right: 0,
					top: 20,
					bottom: 0,
				}}
				onPress={() => navigation.goBack()}
			/>

			<View style={styles.innercont}>
				{product.variations.length == 0 ? null : (
					<View style={styles.sizes}>
						<Text
							style={{
								alignItems: "center",
								justifyContent: "center",
								marginTop: 8,
								textDecorationLine: "underline",
							}}
						>
							дiаметр
						</Text>
						{sizes.map((size) => (
							<Pressable
								onPress={() => {
									selectedSizeHandler(size);
								}}
								style={[
									styles.size,
									{
										backgroundColor:
											selectedSize.size === size ? "#fd5c63" : "white",
										borderColor:
											selectedSize.size === size ? "#009900" : "white",
										borderWidth: selectedSize.size === size ? 1 : 0,
									},
								]}
								key={size}
							>
								<Text
									style={[
										styles.sizeText,
										{
											color: selectedSize.size === size ? "white" : "#A9A9A9",
										},
									]}
								>
									{size}
								</Text>
							</Pressable>
						))}
					</View>
				)}
				<View>
					<Text style={styles.nameStyle}>{product.name}</Text>
					<Text style={styles.price}>
						₴
						{product.variations.length == 0
							? product.prices.price
							: selectedPrice}
					</Text>
					<Text
						style={{
							marginTop: 8,
							// paddingTop: 4,
							color: "#404040",
						}}
					>
						{product.description
							.replace(/\)?<\/?p>\(?/g, "")
							.replace(/(\r\n|\n|\r)/gm, " ")
							.replace(/\s+/g, " ")
							.replace(/,(?!\s)/g, ", ")}
					</Text>
				</View>
			</View>

			<FooterProduct
				product={product}
				goBackHandler={goBackHandler}
				variations={variations}
				selectedPrice={selectedPrice}
				selectedSize={selectedSize}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	safecontainer: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
	container: {
		backgroundColor: "white",
		flex: 1,
		// padding: 10,
	},
	innercont: {
		flex: 1,
		padding: 14,
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
	nameStyle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 8,
		color: "#006400",
	},

	sizes: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginVertical: 2,
		paddingHorizontal: 42,
	},
	size: {
		backgroundColor: "#3CB371",
		width: 36,
		aspectRatio: 1,
		borderRadius: 18,
		alignItems: "center",
		justifyContent: "center",
	},
	sizeText: {
		fontSize: 16,
		fontWeight: "400",
	},
});

export default singleProduct;
