import React from "react";
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	SafeAreaView,
	ScrollView,
} from "react-native";

import { WebView } from "react-native-webview";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

const paymentResult = () => {
	const navigation = useNavigation();
	const route = useRoute();
	let { paymentStatus } = route.params;

	// function emptyTheCartHandler() {
	// 	if (replayStatus == "200") {
	// 		console.log("wowaweewa from card emptier");
	// 		dispatch(emptyCart());
	// 	}
	// }

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
						// onLayout={() => {
						// 	emptyTheCartHandler();
						// }}
					>
						<Ionicons
							name="arrow-back"
							size={24}
							color="black"
							onPress={() => submitHandler()}
						/>
						{paymentStatus == "success" ? (
							<Text style={styles.replayStyle}>
								Дякуемо за замовлення та оплату ми повинни Вам зателефонувати!
								❤️
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

export default paymentResult;

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
