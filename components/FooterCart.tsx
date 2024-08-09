import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";

// import { useQuery } from "@tanstack/react-query";

// // import Categories from "../../components/Categories";

// import Menu from "../../components/Menu";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function footerCart() {
	const cart = useSelector((state) => state.cart.cart);
	// const nonce = useSelector((state) => state.cart.nonce);
	const navigation = useNavigation();
	console.log("cart from footerCart", cart);
	const { top, bottom } = useSafeAreaInsets();

	// const idAndQuant = [];

	// let replay = "";

	const orderHandler = () => {
		navigation.navigate("order");
	};

	return (
		<View>
			<Pressable
				onPress={() => orderHandler()}
				style={{
					// flex: 1,
					flexDirection: "row",
					backgroundColor: "#fd5c63",
					paddingHorizontal: 12,
					paddingVertical: 12,
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				{/*{replay ? <Text>{replay}</Text> : null}*/}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Ionicons name="bag-handle" size={24} color="white" />
					<Text
						style={{
							textAlign: "center",
							color: "white",
							fontSize: 19,
							fontWeight: "500",
						}}
					>
						{" "}
						{cart.reduce((sum, item) => sum + item.quantity, 0)} тов.
					</Text>
				</View>
				<Text
					style={{
						textAlign: "center",
						color: "white",
						// marginTop: 5,
						fontSize: 20,
						fontWeight: "600",
					}}
				>
					{cart.reduce((sum, item) => sum + item.quantity * item.price, 0)} грн.
				</Text>
			</Pressable>
			<View
				style={{
					backgroundColor: "white",
					height: bottom,
				}}
			></View>
		</View>
	);
}

const styles = StyleSheet.create({
	gap: {
		backgroundColor: "white",
		// height: bottom,
	},
});
