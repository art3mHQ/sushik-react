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
import React from "react";
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

// import addProductToCartOnWc from "../scripts/addProductToCartOnWc";
import createOrder from "../scripts/createOrder";

const GreatSuccess = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const dispatch = useDispatch();

	const { delAdr, tel, time, comment, userName } = route.params;
	// const params = route?.params ?? {};

	console.log(delAdr);

	const [tabIndex, setTabIndex] = React.useState(0);

	// const navigation = useNavigation();

	// const params = useLocalSearchParams();
	// const router = useRouter();

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
		return <Text>Error: {error.message}</Text>;
	}

	let replay = newOrderData.data.result.responses;
	// let wcCart = newOrderData.data.wcCart;
	console.log("from GreatSuccess createOrder !REsPONsE! replay", replay);
	console.log("replay1", replay[replay.length - 1].status);
	console.log("replay2", newOrderData.data.result.responses);
	console.log("replay3", newOrderData.data.result.responses.length);
	console.log(
		"from GreatSuccess createOrder !REsPONsE! nonce",
		newOrderData.data.nonce,
	);
	console.log(
		"from GreatSuccess  --- cartToken !REsPONsE!  ---->",
		newOrderData.data.cartToken,
	);
	// console.log(
	// 	"from order GreatSuccess !REsPONsE! INFO -items-",
	// 	replay[replay.length - 1].body.items.length,
	// );

	// if (replay[replay.length - 1].status == "200") {
	// 	dispatch(emptyCart);
	// }

	// console.log(total);

	let replayStatus = replay[replay.length - 1].status;

	// replayStatus = 300;
	function emptyTheCartHandler() {
		if (replayStatus == "200") {
			console.log("wowaweewa from card emptier");
			dispatch(emptyCart());
		}
	}

	function submitHandler() {
		console.log("im from after after submitHandler");
		navigation.navigate("index");
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
				></View>
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
