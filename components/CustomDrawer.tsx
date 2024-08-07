import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";

import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";

import React from "react";
import { Image } from "expo-image";
import {
	View,
	Text,
	StyleSheet,
	Linking,
	TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomDrawer(props) {
	const navigation = useNavigation();
	const { top, bottom } = useSafeAreaInsets();
	// console.log("props", props);
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "space-between",
				backgroundColor: "white",
			}}
		>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					marginTop: 20 + top,
				}}
			>
				<Image
					style={styles.image}
					source={require("../assets/images/logo-black.svg")}
					contentFit="contain"
					// placeholder={{ blurhash }}
				/>
			</View>
			<View style={{ flex: 2, paddingBottom: 10 }}>
				<DrawerContentScrollView {...props} scrollEnabled={false}>
					<DrawerItemList {...props} />
				</DrawerContentScrollView>
			</View>
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Image
					style={styles.imagediv}
					source={require("../assets/images/fff.png")}
					contentFit="contain"
					// placeholder={{ blurhash }}
				/>
			</View>
			<View style={{ flex: 3, marginTop: 12 }}>
				{/*<Text style={styles.submenu}> Новини</Text>*/}
				<Text
					style={styles.submenu}
					onPress={() => navigation.navigate("deliveryInfoScreen")}
				>
					{" "}
					Доставка
				</Text>
				<Text
					style={styles.submenu}
					onPress={() => navigation.navigate("contactsScreen")}
				>
					{" "}
					Контакти
				</Text>
				<TouchableOpacity
					onPress={() =>
						Linking.openURL("https://sushik.km.ua/refund_returns/")
					}
				>
					<Text style={styles.submenu}> Договор офферти</Text>
				</TouchableOpacity>
			</View>

			<View>
				<View style={styles.address}>
					<Text>Наша адреса: </Text>
					<Text>м. Хмельницький, </Text>
					<Text>вул. Подiльська, 66</Text>
					<TouchableOpacity
						onPress={() => Linking.openURL("tel:+380964107070")}
					>
						<Text>(096) 410-70-70</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						flexDirection: "row",
						padding: 20,
						paddingBottom: 20 + bottom,
						justifyContent: "center",
					}}
				>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL("https://www.facebook.com/vse.dlia.sushi")
						}
					>
						<Text style={styles.social}>
							<Ionicons name="logo-facebook" size={24} color="black" />
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL("https://www.instagram.com/vse_dlia_sushi/")
						}
					>
						<Text style={styles.social}>
							<Ionicons name="logo-instagram" size={24} color="black" />
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		// justifyContent: "center",
		width: 90,
		height: 70,
		// aspectRatio: 1,
	},
	imagediv: {
		// justifyContent: "center",
		// paddingTop: 20,
		// marginVertical: 10,
		width: 160,
		height: 25,
		// marginBottom: 8,
		// aspectRatio: 1,
	},
	submenu: { padding: 8, paddingLeft: 42, color: "#595959" },
	address: { padding: 25, color: "gray", justifyContent: "center" },
	social: {
		paddingHorizontal: 10,
	},
});
