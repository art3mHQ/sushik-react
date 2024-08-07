import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";

// import { useQuery } from "@tanstack/react-query";

import {
	addToCart,
	// decrementQuantity,
	incrementQuantity,
} from "../redux/CartReducer";

// // import Categories from "../../components/Categories";

// import Menu from "../../components/Menu";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";

export default function footerProduct(props) {
	const cart = useSelector((state) => state.cart.cart);
	// const nonce = useSelector((state) => state.cart.nonce);
	const navigation = useNavigation();
	// console.log("cart from footerCart", cart);

	const dispatch = useDispatch();

	const [quantityToAdd, setQuantityToAdd] = useState(1);

	function increment() {
		setQuantityToAdd((a) => a + 1);
	}

	function decrement() {
		if (quantityToAdd > 1) {
			setQuantityToAdd((a) => a - 1);
		}
	}

	console.log("props.variations", props.variations);
	console.log("props.selectedPrice", props.selectedPrice);

	function addToCartHandler() {
		let productToAddToCart = props.product;
		const isVars = props.variations.length > 0;
		console.log("props.variations.length > 0", isVars);
		console.log("props.selectedSize size", props.selectedSize.size);
		if (props.variations.length > 0) {
			console.log("hi from var handl");
			productToAddToCart = props.variations.find(
				// in premalink thereis diametr value which we can easily obtain
				(item) => item.permalink.slice(-2) == props.selectedSize.size,
			);
		}
		console.log("var prod from handl", productToAddToCart);
		dispatch(addToCart(productToAddToCart));
		if (quantityToAdd > 1) {
			for (let i = 0; i < quantityToAdd - 1; i++) {
				// выведет 0, затем 1, затем 2
				dispatch(incrementQuantity(productToAddToCart));
			}
			// dispatch(incrementQuantity(item));
		}
		props.goBackHandler();
	}

	return (
		// <Link replace href="/order">
		<Pressable
			// onPress={() => orderHandler()}
			style={{
				// flex: 1,
				flexDirection: "row",
				// backgroundColor: "#fd5c63",
				backgroundColor: "#fd5c63",
				paddingHorizontal: 12,
				paddingVertical: 0,
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Pressable>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginVertical: 6,
					}}
				>
					<Pressable
						style={{
							flexDirection: "row",
							paddingHorizontal: 10,
							paddingVertical: 5,
							alignItems: "center",
							// borderColor: "#BEBEBE",
							// borderWidth: 0.5,
							// borderRadius: 8,
						}}
					>
						<Pressable
							onPress={() => {
								decrement();
							}}
						>
							<Text
								style={{
									fontSize: 25,
									color: "#F0F8FF",
									paddingRight: 10,
									fontWeight: "600",
								}}
							>
								-
							</Text>
						</Pressable>

						<Pressable>
							<Text
								style={{
									fontSize: 21,
									color: "#F0F8FF",
									paddingHorizontal: 12,
									fontWeight: "600",
								}}
							>
								{quantityToAdd}
							</Text>
						</Pressable>

						<Pressable
							onPress={() => {
								increment();
							}}
						>
							<Text
								style={{
									fontSize: 23,
									color: "#F0F8FF",
									paddingLeft: 10,
									fontWeight: "600",
								}}
							>
								+
							</Text>
						</Pressable>
					</Pressable>
				</View>
			</Pressable>
			<Pressable
				onPress={() => {
					addToCartHandler();
				}}
				style={{
					flexDirection: "row",
					alignItems: "center",
					padding: 8,
					borderColor: "#BEBEBE",
					borderWidth: 0.5,
					borderRadius: 8,
				}}
			>
				<Ionicons name="cart-outline" size={24} color="#F0F8FF" />
				<Text
					style={{
						textAlign: "center",
						color: "white",
						fontSize: 19,
						fontWeight: "500",
					}}
				>
					{" "}
					додати
				</Text>
			</Pressable>
			<View>
				<Text
					style={{
						textAlign: "center",
						color: "white",
						// marginTop: 5,
						fontSize: 20,
						fontWeight: "600",
					}}
				>
					{props.variations.length == 0
						? props.product.prices.price * quantityToAdd
						: props.selectedPrice * quantityToAdd}{" "}
					грн.
				</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({});
