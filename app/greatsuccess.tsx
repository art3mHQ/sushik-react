import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Pressable,
	TextInput,
	SafeAreaView,
	StatusBar,
	ActivityIndicator,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redux/CartReducer";
// import DeliveryForm from "../components/orderinput/DeliveryForm";
// import PickUpForm from "../components/orderinput/PickUpForm";
// import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

import { Tab, TabView } from "@rneui/themed";

import { useQuery } from "@tanstack/react-query";

// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// import createGuestOrder from "../scripts/createGuestOrder";

// import { LiqpayCheckoutBase64 } from "react-native-liqpay";

import { WebView } from "react-native-webview";

// import addProductToCartOnWc from "../scripts/addProductToCartOnWc";
import createOrder from "../scripts/createOrder";
import getQueryParams from "../scripts/getQueryParams";

const GreatSuccess = () => {
	// let screenLiqpay = (
	// 	<WebView
	// 		ref={ref}
	// 		source={{ uri: redirectString }}
	// 		onNavigationStateChange={handleWebViewNavigationStateChange}
	// 	/>
	// );
	const navigation = useNavigation();
	const route = useRoute();
	const dispatch = useDispatch();

	const { delAdr, tel, time, comment, userName, payOnline } = route.params;

	const cart = useSelector((state) => state.cart.cart);
	let nonce = useSelector((state) => state.cart.nonce);
	let cartToken = useSelector((state) => state.cart.cartToken);

	let cartSortly = cart.map((item) => {
		if (item.variation) {
			// Do something if item.variation is true
			return {
				id: item.parent,
				quantity: item.quantity,
				variation: item.variation,
			};
		} else {
			// Do something if item.variation is false or undefined
			return {
				id: item.id,
				quantity: item.quantity,
				variation: "",
			};
		}
	});

	// console.log(
	// 	"via GreatSuccess from VIA REDUX (calc from cart) cartSortly",
	// 	cartSortly,
	// );

	const newOrderData = useQuery({
		queryKey: ["orderFromWoo"],
		queryFn: () =>
			createOrder(
				nonce,
				cartToken,
				cartSortly,
				delAdr,
				tel,
				time,
				comment,
				userName,
				payOnline,
			),
		staleTime: 1 * 1000,
	});

	if (newOrderData.isPending) {
		return (
			<View style={styles.safecontainer}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (newOrderData.isError) {
		return <Text>Error: {Error.message}</Text>;
	}

	let replay = newOrderData.data.result.responses;
	// let wcCart = newOrderData.data.wcCart;
	console.log("from GreatSuccess createOrder !REsPONsE! replay", replay);
	console.log("replay1", replay[replay.length - 1].status);
	console.log("replay", newOrderData.data.result.responses);
	console.log("replay3", newOrderData.data.result.responses.length);
	console.log(
		"from GreatSuccess createOrder !REsPONsE! nonce",
		newOrderData.data.nonce,
	);
	console.log(
		"from GreatSuccess  --- cartToken !REsPONsE!  ---->",
		newOrderData.data.cartToken,
	);

	let resultReply = replay[replay.length - 1];

	console.log("resultReply", resultReply);

	let replayStatus = resultReply.status;

	console.log("payment_method", resultReply.body.payment_method);

	let paymentMethod = resultReply.body.payment_method;
	let redirectString = resultReply.body.payment_result.payment_details[1].value;

	let orderId = resultReply.body.order_id;
	let orderKey = resultReply.body.order_key;

	console.log("redirectString", redirectString);

	// const queryParams = getQueryParams(redirectString);

	// console.log("data:", queryParams.data);
	// console.log("signature:", queryParams.signature);
	// let webview = null;

	// useEffect(() => {
	if (paymentMethod == "liqpay") {
		console.log("wowaweewa");
		setTimeout(() => {
			navigation.navigate("liqpayScreen", {
				payurl: redirectString,
				orderId: orderId,
				orderKey: orderKey,
			});
		}, 100);
	}
	// }, [paymentMethod]);

	// replayStatus = 300;
	function emptyTheCartHandler() {
		if (replayStatus == "200" && paymentMethod != "liqpay") {
			console.log("wowaweewa from card emptier");
			dispatch(emptyCart());
		}
	}

	function submitHandler() {
		console.log("im from after after submitHandler");
		navigation.navigate("index");
	}

	if (paymentMethod == "liqpay") {
		return (
			<View style={styles.safecontainer}>
				<ActivityIndicator />
			</View>
		);
	}
	// ----------------------------------!!!!!!!!!!!!!!!--------------------------------------------

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
							emptyTheCartHandler();
						}}
					>
						<Ionicons
							name="arrow-back"
							size={24}
							color="black"
							onPress={() => submitHandler()}
						/>
						{replayStatus == 200 ? (
							<Text style={styles.replayStyle}>
								Дякуемо за замовлення ми повинни Вам зателефонувати! ❤️
							</Text>
						) : (
							<Text>Сумно але щось пiйшло не так :,(</Text>
						)}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default GreatSuccess;

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
