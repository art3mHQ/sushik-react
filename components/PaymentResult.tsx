import React from "react";
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
} from "react-native";

// import { WebView } from "react-native-webview";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

import { useQuery } from "@tanstack/react-query";

import fetchOrderStatus from "../scripts/fetchOrderStatus";

import { emptyCart } from "../redux/CartReducer";
import { useDispatch } from "react-redux";

const PaymentResult = ({ orderId, orderKey }) => {
	const navigation = useNavigation();
	// const route = useRoute();
	// let { paymentStatus, orderId, orderKey } = route.params;

	const dispatch = useDispatch();

	const orderStatus = useQuery({
		queryKey: ["orderStatus"],
		queryFn: () => fetchOrderStatus(orderId, orderKey),
		staleTime: 1000,
	});

	if (orderStatus.isPending) {
		return (
			<View style={styles.safecontainer}>
				<ActivityIndicator
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						alignItems: "center",
						justifyContent: "center",
					}}
				/>
			</View>
		);
	}

	if (orderStatus.isError) {
		return <Text>Error: {Error.message}</Text>;
	}

	let replay = orderStatus.data.status;
	// let wcCart = newOrderData.data.wcCart;
	console.log("from PaymentResult replay", replay);

	// function anotherEmptyTheCartHandler() {
	if (replay == "processing") {
		console.log("wowaweewa from paymentResult card emptier");
		// emptyTheCart();
		// dispatch(emptyCart());
	}
	// }
	console.log("orderId", orderId);
	// console.log("paymentStatus", paymentStatus);

	function updateNavHeader() {
		navigation.setOptions({
			headerShown: false,
		});
	}

	function submitHandler() {
		console.log("im from after after submitHandler");
		navigation.navigate("index");
	}

	return (
		<SafeAreaView style={styles.safecontainer}>
			<ScrollView style={{ padding: 30, flex: 1, backgroundColor: "#F0F8FF" }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 12,
						padding: 10,
					}}
				>
					<View
						style={{ alignItems: "center", gap: 8 }}
						onLayout={() => {
							updateNavHeader();
						}}
					>
						<Ionicons
							name="arrow-back"
							size={24}
							color="black"
							onPress={() => submitHandler()}
						/>
						{replay == "processing" ? (
							<Text
								style={styles.replayStyle}
								onLayout={() => {
									console.log("hi from success onLayout");

									dispatch(emptyCart());
								}}
							>
								Дякуемо за замовлення та оплату ми повинни Вам зателефонувати!
								❤️
							</Text>
						) : (
							<Text style={styles.replayStyle}>Щось пiйшло не так :,(</Text>
						)}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PaymentResult;

const styles = StyleSheet.create({
	safecontainer: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		justifyContent: "center",
	},
	replayStyle: {
		textAlign: "center",
		marginTop: 12,
		letterSpacing: 2,
		margin: 30,
		fontWeight: "800",
		color: "gray",
	},
});
