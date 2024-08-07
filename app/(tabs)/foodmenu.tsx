import React from "react";
import { Text, StyleSheet, View, Pressable, StatusBar } from "react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import Categories from "../../components/Categories";
import Menu from "../../components/Menu";
import FooterCart from "../../components/FooterCart";

import Noncense from "../../components/Noncense";

import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { useRoute } from "@react-navigation/native";

export default function foodMenu() {
	const route = useRoute();
	// const { gotoId } = route?.params;
	const gotoId = route?.params?.gotoId ?? "1";
	console.log("gotoId", gotoId);

	const hardcodedUsedCats = [21, 23, 22, 16, 24, 19, 35];

	const cart = useSelector((state) => state.cart.cart);
	// console.log("cart", cart);
	// const savednonce = useSelector((state) => state.cart.nonce);
	// console.log("savednonce", savednonce);

	return (
		<>
			<View
				style={{
					flex: 1,
					height: "100%",
					backgroundColor: "#f8f8f8",
					paddingTop: StatusBar.currentHeight,
				}}
			>
				<Menu cats={hardcodedUsedCats} scrollto={gotoId} />

				{/*<Noncense />*/}
				<Text
					style={{
						textAlign: "center",
						marginTop: 24,
						letterSpacing: 4,
						marginBottom: 6,
						color: "gray",
					}}
				>
					MENU ❤️ 2024, Vse dla sushi,
				</Text>
			</View>
			{/*FooterCart menu for those who cant see it !!!!!!!!!!!!!!!!!!!!!!*/}
			{cart?.length > 0 && <FooterCart />}
		</>
	);
}

const styles = StyleSheet.create({});
