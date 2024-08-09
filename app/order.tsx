import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Pressable,
	TextInput,
	SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
	emptyCart,
	decrementQuantity,
	incrementQuantity,
	saveNonce,
	saveToken,
} from "../redux/CartReducer";
import DeliveryForm from "../components/orderinput/DeliveryForm";
import PickUpForm from "../components/orderinput/PickUpForm";
import GoodsAdded from "../components/GoodsAdded";
// import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { Tab, TabView } from "@rneui/themed";

import { useQuery } from "@tanstack/react-query";

// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import createGuestOrder from "../scripts/createGuestOrder";

import addProductToCartOnWc from "../scripts/addProductToCartOnWc";
import createOrder from "../scripts/createOrder";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Order = () => {
	const [tabIndex, setTabIndex] = useState(0);

	const navigation = useNavigation();

	// const params = useLocalSearchParams();
	// const router = useRouter();

	const cart = useSelector((state) => state.cart.cart);
	let nonce = useSelector((state) => state.cart.nonce);
	let cartToken = useSelector((state) => state.cart.cartToken);

	// Handle user address and name and etc...
	const [delAdr, setDelAdr] = useState({ value: "", isValid: true });
	const [tel, setTel] = useState({ value: "", isValid: true });
	const [time, setTime] = useState("");
	const [comment, setComment] = useState("");
	const [userName, setUserName] = useState({ value: "", isValid: true });

	const dispatch = useDispatch();

	const instructions = [
		{
			id: "0",
			name: "Не дзвонити до двері",
			iconName: "bell",
		},
		{
			id: "1",
			name: "Залишити на респшенi",
			iconName: "door-open",
		},
		{
			id: "3",
			name: "Не телефонувати",
			iconName: "phone-alt",
		},
	];

	// console.log("wooowwowowowowwowaweeeewa");
	// Saving user data to persistent storage
	const getUserData = async () => {
		try {
			const savedUserData = await AsyncStorage.getItem("userdata");
			const currentUserData = JSON.parse(savedUserData);
			console.log(
				"------currentUserData--fromStorage!-------",
				currentUserData,
			);
			console.log(
				"------currentUserData--fromStorage!--name-----",
				currentUserData.name,
			);
			if (currentUserData.name)
				setUserName({
					...userName,
					value: currentUserData.name,
				});
			if (currentUserData.tel)
				setTel({
					...tel,
					value: currentUserData.tel,
				});
			if (currentUserData.adr)
				setDelAdr({
					...delAdr,
					value: currentUserData.adr,
				});
			console.log("name name name", userName);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	// storing data
	const storeUserData = async (userValues) => {
		try {
			await AsyncStorage.setItem("userdata", JSON.stringify(userValues));
		} catch (error) {
			console.log(error);
		}
	};
	// let cartSortly = cart.map((item) => ({
	// 	id: item.id,
	// 	quantity: item.quantity,
	// }));

	// console.log("via Order from REDUX Nonce", nonce);
	// console.log("via Order from REDUX cartToken", cartToken);
	// console.log("via Order from VIA REDUX cartSortly", cartSortly);

	const total = cart
		?.map((item) => item.quantity * item.price)
		.reduce((curr, prev) => curr + prev, 0);

	let deliveryFee = total > 500 ? 0 : 80;

	// let isSamovivezennya = tabIndex == 1;

	let realTotal = total + (tabIndex == 1 ? 0 : deliveryFee);

	// let deliveryCost

	// console.log("tel.length", tel.length);

	// let addressIsThere = true;
	// let telIsValid = true;
	// let userNameIsThere = true;

	const anotherOrderHandler = () => {
		// setDelAdr("-fuck u fuc u fuk u-");

		// console.log("DelAdr", delAdr);
		// if (tabIndex) {
		// 	setDelAdr("-САМОВИВЕЗЕННЯ-");
		// 	console.log("delAdr", delAdr);
		// }
		// console.log("tabIndex", tabIndex);
		// console.log("hihihihihihi");
		// dispatch(saveNonce(wcCartData.data.nonce));
		// console.log("hahahhaahahaha");
		// dispatch(saveToken(wcCartData.data.cartToken));
		// dispatch(emptyCart());
		const adrToSend = tabIndex ? "-САМОВИВЕЗЕННЯ-" : delAdr.value;

		let addressIsThere = adrToSend.length > 0;
		let telIsValid = tel.value.length == 14;
		let userNameIsThere = userName.value.length > 0;

		if (!addressIsThere || !telIsValid || !userNameIsThere) {
			// console.log("addressIsTher", addressIsThere);
			console.log("hey input not ok");
			setUserName({
				...userName,
				isValid: userNameIsThere,
			});
			setTel({
				...tel,
				isValid: telIsValid,
			});
			setDelAdr({
				...delAdr,
				isValid: addressIsThere,
			});
			console.log("userName valid  ?", userName.isValid);

			return;
		}

		// preparing data
		const userValues = {
			name: userName.value,
			tel: tel.value,
			adr: delAdr.value,
		};

		console.log("userValues", userValues);

		// storing data
		storeUserData(userValues);

		navigation.navigate("greatsuccess", {
			delAdr: adrToSend,
			tel: tel.value,
			time: time,
			comment: comment,
			userName: userName.value,
		});

		// let formInvalid;
	};
	// ----------------------------------!!!!!!!!!!!!!!!--------------------------------------------
	return (
		<SafeAreaView style={styles.safecontainer}>
			<ScrollView
				style={{ padding: 10, flex: 1, backgroundColor: "#F0F8FF" }}
				keyboardDismissMode="interactive"
			>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
					<Ionicons
						name="arrow-back"
						size={24}
						color="black"
						onPress={() => navigation.goBack()}
					/>
					<Text>ЗАМОВЛЕННЯ</Text>
				</View>

				<View
					style={{
						backgroundColor: "white",
						padding: 8,
						marginTop: 15,
						borderRadius: 6,
					}}
				>
					<Text>
						Доставка за{" "}
						<Text style={{ fontWeight: "500" }}>35 - 40 хвилин</Text>
					</Text>
				</View>

				<GoodsAdded total={total} deliveryFee={deliveryFee} />

				<View>
					<View
						style={{
							marginVertical: 10,
							// borderTopLeftRadius: 8,
							// borderTopRightRadius: 8,
							// backgroundColor: "white",
						}}
					>
						<>
							{/*Tabsssssssss!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}

							<Tab
								value={tabIndex}
								onChange={(e) => setTabIndex(e)}
								indicatorStyle={{
									backgroundColor: "#556B2F",
									height: 4,
								}}
							>
								<Tab.Item
									title={
										// это чуть чуть не правильно (когда сумма больше
										// 500 и выбран самовывоз кнопка показывает 80)
										// воркэраунд сделать это оповещение не на кнопке
										// а внутри таба например (это будут 2 разных места)
										deliveryFee
											? "Доставка кур'єром (80 грн)"
											: "Доставка (безкоштовно)"
									}
									titleStyle={(active) => ({
										fontSize: 14,
										opacity: active ? "1" : "0.7",
									})}
									containerStyle={(active) => ({
										backgroundColor: active ? "#FFFFFF" : "#F0F8FF",
										borderTopLeftRadius: 8,
										// height: 70,
									})}
								/>
								<Tab.Item
									title="Забрати самому"
									containerStyle={(active) => ({
										backgroundColor: active ? "#FFFFFF" : "#F0F8FF",
										borderTopRightRadius: 8,
										fontsize: 17,
										// height: 70,
									})}
									titleStyle={(active) => ({
										fontSize: 15,
										opacity: active ? "1" : "0.7",
									})}
								/>
							</Tab>

							<TabView
								value={tabIndex}
								onChange={setTabIndex}
								animationType="timing"
								tabItemContainerStyle={{
									flex: 1,
									height: 325,
									// borderBottomLeftRadius: 7,
								}}
								disableTransition
							>
								<TabView.Item
									style={{
										flex: 1,
										backgroundColor: "white",
										width: "100%",
										borderBottomLeftRadius: 7,
										borderBottomRightRadius: 7,
										padding: 10,
									}}
								>
									<DeliveryForm
										delAdr={delAdr}
										tel={tel}
										time={time}
										comment={comment}
										userName={userName}
										setUserName={setUserName}
										setDelAdr={setDelAdr}
										setComment={setComment}
										setTime={setTime}
										setTel={setTel}
										// addressIsThere={addressIsThere}
										// telIsValid={telIsValid}
										// userNameIsThere={userNameIsThere}
									/>
								</TabView.Item>
								<TabView.Item
									style={{
										flex: 1,
										backgroundColor: "#FFFFFF",
										width: "100%",
										borderBottomLeftRadius: 7,
										borderBottomRightRadius: 7,
										padding: 10,
									}}
								>
									<PickUpForm
										tel={tel}
										time={time}
										comment={comment}
										userName={userName}
										setUserName={setUserName}
										setComment={setComment}
										setTime={setTime}
										setTel={setTel}
									/>
								</TabView.Item>
							</TabView>
						</>
						{/*end of tabview !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-----------------*/}
					</View>

					<View style={{ marginVertical: 10, marginTop: 325 }}>
						<Text style={{ fontSize: 16, fontWeight: "600" }}>
							Інструкції з доставки
						</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{instructions?.map((item, index) => (
								<Pressable
									key={index + "instructions"}
									style={{
										margin: 10,
										borderRadius: 10,
										padding: 10,
										backgroundColor: "white",
									}}
								>
									<View
										style={{ justifyContent: "center", alignItems: "center" }}
									>
										<FontAwesome5
											name={item?.iconName}
											size={22}
											color={"gray"}
										/>
										<Text
											style={{
												width: 108,
												fontSize: 13,
												color: "#383838",
												paddingTop: 10,
												textAlign: "center",
											}}
										>
											{item?.name}
										</Text>
									</View>
								</Pressable>
							))}
						</ScrollView>
					</View>
					<View>
						<View
							style={{
								padding: 10,
								backgroundColor: "white",
								marginVertical: 10,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Text>Допомогти детям</Text>
								<AntDesign name="checksquare" size={24} color="#fd5c63" />
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									marginTop: 10,
								}}
							>
								<Text style={{ color: "gray" }}>
									Working towards a malnutrition-free India
								</Text>
								<Text>₴ 3</Text>
							</View>
						</View>
					</View>

					<View style={{ marginVertical: 10 }}>
						<Text style={{ fontSize: 16, fontWeight: "bold" }}>
							Billing Details
						</Text>

						<View
							style={{
								backgroundColor: "white",
								borderRadius: 7,
								padding: 10,
								marginTop: 14,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Text
									style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
								>
									Товари всього
								</Text>
								<Text
									style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
								>
									₴{total}
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									marginVertical: 8,
								}}
							>
								<Text
									style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
								>
									Доставка
								</Text>
								<Text
									style={{ fontSize: 15, fontWeight: "400", color: "#505050" }}
								>
									₴{tabIndex === 1 ? "0" : deliveryFee}.00
								</Text>
							</View>

							<View>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
										marginVertical: 8,
									}}
								>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: 15,
											color: "#556B2F",
										}}
									>
										До сплати
									</Text>
									<Text
										style={{
											fontWeight: "bold",
											fontSize: 15,
											color: "#556B2F",
										}}
									>
										₴{realTotal}
									</Text>
								</View>
							</View>
						</View>
					</View>
					<View>
						<View
							style={{
								padding: 10,
								backgroundColor: "white",
								marginVertical: 8,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Text>Сплатити онлайн(qr,apple-pay,g-pay,карта)</Text>
								<MaterialIcons
									name="check-box-outline-blank"
									size={24}
									color="#fd5c63"
								/>
								{/*<AntDesign name="checksquare" size={24} color="#fd5c63" />*/}
							</View>
						</View>
					</View>
				</View>
			</ScrollView>

			{total === 0 ? null : (
				<Pressable
					style={{
						flexDirection: "row",
						alignItems: "center",
						padding: 18,
						justifyContent: "space-between",
						backgroundColor: "F0F8FB",
						// borderWidth: 0.7,
					}}
				>
					<View>
						<Text style={{ fontSize: 16, fontWeight: "600" }}>
							Оплата готівкою
						</Text>
						<Text style={{ marginTop: 7, fontSize: 14 }}>
							кур'єру при отриманні
						</Text>
					</View>

					<Pressable
						onPress={() => {
							// router.replace({
							// 	pathname: "/order",
							// 	params: {
							// 		name: params?.name,
							// 	},
							// });
							anotherOrderHandler();
							// dispatch(emptyCart());
						}}
						style={{
							backgroundColor: "#fd5c63",
							padding: 10,
							width: 180,
							borderRadius: 6,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 10,
						}}
					>
						<Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
							Замовити
						</Text>
						<View>
							<Text
								style={{
									fontSize: 14,
									color: "white",
									fontWeight: "400",
									marginTop: 3,
								}}
							>
								До сплати:
							</Text>
							<Text
								style={{
									color: "white",
									fontSize: 15,
									fontWeight: "bold",
									direction: "rtl",
									paddingTop: 4,
								}}
							>
								{realTotal}
								&nbsp;{"грн"}
							</Text>
						</View>
					</Pressable>
				</Pressable>
			)}
		</SafeAreaView>
	);
};

export default Order;

const styles = StyleSheet.create({
	safecontainer: {
		flex: 1,
		// paddingTop: StatusBar.currentHeight,
	},
});
