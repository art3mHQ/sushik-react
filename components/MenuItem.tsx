import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, memo } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
	addToCart,
	decrementQuantity,
	incrementQuantity,
	removeFromCart,
} from "../redux/CartReducer";

import { useNavigation } from "@react-navigation/native";

const MenuItem = (props) => {
	const navigation = useNavigation();
	const item = props.prod.item;
	// console.log("item:", item?.description.replace(/<\/?p>/g, ""));
	// console.log("item:", item);
	const [addeditems, setAddItems] = useState(0);
	const [selected, setSelected] = useState(false);
	const dispatch = useDispatch();

	const blurhash = "LTJs,@s9}r%2ofn4X8WqFeWBxbax";

	function showProductHandler() {
		navigation.navigate("singleProductScreen", {
			product: item,
		});
	}

	return (
		<View>
			<Pressable
				onPress={showProductHandler}
				style={({ pressed }) => [styles.cardStyle, pressed && styles.pressed]}
			>
				<View>
					<Text style={{ fontSize: 18, fontWeight: "500", width: 220 }}>
						{item?.name}
					</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "flex-end",
						}}
					>
						<Text
							style={{
								marginTop: 4,
								fontSize: 14,
								fontWeight: "500",
								color: "#008000",
							}}
						>
							₴
						</Text>
						<Text
							style={{
								marginTop: 4,
								fontSize: 17,
								fontWeight: "500",
								color: "#006400",
							}}
						>
							{item.variations.length > 0
								? item.prices.price_range.min_amount +
									"-" +
									item.prices.price_range.max_amount
								: item?.prices.price}
						</Text>
					</View>

					<Text
						style={{ width: 250, marginTop: 8, color: "gray", fontSize: 14 }}
					>
						{item.description
							.replace(/\)?<\/?p>\(?/g, "")
							.replace(/(\r\n|\n|\r)/gm, " ")
							.replace(/\s+/g, " ")
							.replace(/,(?!\s)/g, ", ")
							.trim().length > 62
							? item.description
									.replace(/\)?<\/?p>\(?/g, "")
									.replace(/(\r\n|\n|\r)/gm, " ")
									.replace(/\s+/g, " ")
									.replace(/,(?!\s)/g, ", ")
									.trim()
									.substr(0, 58) + "..."
							: item.description
									.replace(/\)?<\/?p>\(?/g, "")
									.replace(/(\r\n|\n|\r)/gm, " ")
									.replace(/\s+/g, " ")
									.replace(/,(?!\s)/g, ", ")
									.trim()}
					</Text>
				</View>

				<Pressable style={{ marginRight: 6 }}>
					<Image
						style={{ width: 98, height: 98, borderRadius: 8 }}
						source={{ uri: item?.images[0].thumbnail }}
						placeholder={{ blurhash }}
					/>
					{selected ? (
						<Pressable
							style={{
								position: "absolute",
								top: 76,
								left: 6,
								backgroundColor: "#fd5c63",
								flexDirection: "row",
								paddingHorizontal: 10,
								// paddingVertical: 4,
								alignItems: "center",
								borderRadius: 3,
							}}
						>
							<Pressable
								onPress={() => {
									if (addeditems == 1) {
										dispatch(removeFromCart(item));
										setAddItems(0);
										setSelected(false);
										return;
									}
									setAddItems((c) => c - 1);
									dispatch(decrementQuantity(item));
								}}
							>
								<Text
									style={{
										fontSize: 28,
										color: "white",
										paddingHorizontal: 6,
									}}
								>
									-
								</Text>
							</Pressable>

							<Pressable>
								<Text
									style={{
										color: "lightgreen",
										paddingHorizontal: 6,
										fontSize: 19,
									}}
								>
									{addeditems}
								</Text>
							</Pressable>

							<Pressable
								onPress={() => {
									setAddItems((c) => c + 1);
									dispatch(incrementQuantity(item));
								}}
							>
								<Text
									style={{
										fontSize: 20,
										color: "white",
										paddingHorizontal: 6,
									}}
								>
									+
								</Text>
							</Pressable>
						</Pressable>
					) : (
						<Pressable
							onPress={() => {
								if (item.variations.length > 0) {
									showProductHandler();
								} else {
									setSelected(true);
									if (addeditems == 0) {
										setAddItems((c) => c + 1);
									}
									dispatch(addToCart(item));
								}
							}}
							style={{
								position: "absolute",
								top: 76,
								left: 6,
								borderColor: "#E32636",
								borderWidth: 1,
								flexDirection: "row",
								paddingHorizontal: 9,
								paddingVertical: 4,
								alignItems: "center",
								backgroundColor: "white",
								borderRadius: 3,
							}}
						>
							<Ionicons name="cart-outline" size={16} color="#E32636" />
							<Text style={{ fontSize: 13, fontWeight: "500", color: "green" }}>
								&nbsp;додати
							</Text>
						</Pressable>
					)}
				</Pressable>
			</Pressable>
		</View>
	);
};

export default memo(MenuItem);

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.75,
	},
	cardStyle: {
		margin: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 9,
	},
});
