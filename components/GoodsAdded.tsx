import React, { useState } from "react";

import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	Pressable,
	TextInput,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
	emptyCart,
	decrementQuantity,
	incrementQuantity,
	saveNonce,
	saveToken,
} from "../redux/CartReducer";

function GoodsAdded(props) {
	const cart = useSelector((state) => state.cart.cart);
	let nonce = useSelector((state) => state.cart.nonce);
	let cartToken = useSelector((state) => state.cart.cartToken);

	const dispatch = useDispatch();

	const total = props.total;

	let deliveryFee = props.deliveryFee;

	return (
		<>
			<View style={{ marginVertical: 12 }}>
				<Text
					style={{
						textAlign: "center",
						letterSpacing: 3,
						fontSize: 15,
						color: "gray",
					}}
				>
					ДОДАНІ ТОВАРИ
				</Text>
			</View>
			<View>
				<View
					style={{
						backgroundColor: "white",
						padding: 10,
						borderRadius: 6,
					}}
				>
					{cart?.map((item, index) => (
						<Pressable key={index + "order" + "_items"}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									marginVertical: 6,
								}}
							>
								<Text style={{ width: 220, fontSize: 16, fontWeight: "600" }}>
									{item?.name} {item.variation}
									{item.variation ? "см" : ""}
								</Text>
								<Pressable
									style={{
										flexDirection: "row",
										paddingHorizontal: 10,
										paddingVertical: 5,
										alignItems: "center",
										borderColor: "#BEBEBE",
										borderWidth: 0.5,
										borderRadius: 8,
									}}
								>
									<Pressable
										onPress={() => {
											dispatch(decrementQuantity(item));
										}}
									>
										<Text
											style={{
												fontSize: 20,
												color: "green",
												paddingHorizontal: 6,
												fontWeight: "600",
											}}
										>
											-
										</Text>
									</Pressable>

									<Pressable>
										<Text
											style={{
												fontSize: 19,
												color: "green",
												paddingHorizontal: 8,
												fontWeight: "600",
											}}
										>
											{item.quantity}
										</Text>
									</Pressable>

									<Pressable
										onPress={() => {
											dispatch(incrementQuantity(item));
										}}
									>
										<Text
											style={{
												fontSize: 20,
												color: "green",
												paddingHorizontal: 6,
												fontWeight: "600",
											}}
										>
											+
										</Text>
									</Pressable>
								</Pressable>
							</View>

							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Text
									style={{ fontSize: 16, fontWeight: "bold", marginTop: -20 }}
								>
									₴{item.price * item.quantity}
								</Text>
								<Text
									style={{
										fontSize: 15,
										fontWeight: "500",
										color: "#696969",
									}}
								>
									Quantity : {item?.quantity}
								</Text>
							</View>
						</Pressable>
					))}
					<View
						style={{
							marginTop: 15,
							flexDirection: "row",
							alignItems: "center",

							justifyContent: "center",
						}}
					>
						<Text style={{ fontSize: 13, fontWeight: "500", color: "#696969" }}>
							Кількість товарів в кошику :
						</Text>
						<Text style={{ fontSize: 14, fontWeight: "500", color: "#696969" }}>
							{" "}
							{cart.reduce((sum, item) => sum + item.quantity, 0)}
						</Text>
					</View>
					<View
						style={{
							marginTop: 4,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Text style={{ fontSize: 15, fontWeight: "500" }}>
							Сума за всі позиції :
						</Text>
						<Text style={{ fontSize: 16, fontWeight: "500" }}>
							{total} грн.
						</Text>
					</View>
					<Text style={{ fontSize: 10, color: "gray", paddingTop: 6 }}>
						* При замовленні на суму більше 500 грн доставка безкоштовна
					</Text>
				</View>
			</View>
		</>
	);
}

export default GoodsAdded;
