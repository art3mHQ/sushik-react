import React from "react";
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Linking,
	TouchableOpacity,
	Platform,
	Pressable,
} from "react-native";

import { Image } from "expo-image";

const contactsScreen = () => {
	const lat = 49.42599163635823;
	const lng = 26.986951890287433;
	const scheme = Platform.select({
		ios: "maps://0,0?q=",
		android: "geo:0,0?q=",
	});
	const latLng = `${lat},${lng}`;
	const label = "Vse dla Sushi";
	const url = Platform.select({
		ios: `${scheme}${label}@${latLng}`,
		android: `${scheme}${latLng}(${label})`,
	});

	return (
		<ScrollView>
			<Text style={styles.title}> Контакти</Text>
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<Image
					style={styles.imagediv}
					source={require("../assets/images/fff.png")}
					contentFit="contain"
					// placeholder={{ blurhash }}
				/>
			</View>
			<View style={styles.textdiv}>
				<Text style={styles.textdiv}>
					Наша адреса: м. Хмельницький, вул. Подiльська, 66
				</Text>
				<Pressable
					style={{ justifyContent: "center", alignItems: "center" }}
					onPress={() => Linking.openURL(url)}
				>
					<Image
						style={styles.image}
						source={require("../assets/images/adr-screenshot.png")}
						contentFit="contain"
						// placeholder={{ blurhash }}
					/>
				</Pressable>

				<View style={styles.phone}>
					<Text
						style={{
							textAlign: "center",
							// justifyContent: "center",
						}}
					>
						Наши телефони
					</Text>
					<TouchableOpacity
						onPress={() => Linking.openURL("tel:+380964107070")}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 16,
								paddingVertical: 5,
								// justifyContent: "center",
							}}
						>
							(096) 410-70-70
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => Linking.openURL("tel:+380979137070")}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 16,
								paddingVertical: 5,
								// justifyContent: "center",
							}}
						>
							097 913 70 70
						</Text>
					</TouchableOpacity>
				</View>
				<Text
					style={{
						// textAlign: "center",
						// fontSize: 16,
						paddingVertical: 5,
						// justifyContent: "center",
					}}
				>
					Ми працюємо з 10:00 до 22:00 (в неділю з 11:00 до 22:00)
				</Text>
				<Text
					style={{
						// textAlign: "center",
						// fontSize: 16,
						paddingVertical: 5,
						// justifyContent: "center",
					}}
				>
					Наша крамниця «Все для суші» – це можливість замовити улюблені суші,
					роли та піцу з доставкою до дому (офісу) або оформити замовлення та
					забрати його в магазині.
				</Text>
			</View>
		</ScrollView>
	);
};

export default contactsScreen;

const styles = StyleSheet.create({
	imagediv: {
		// justifyContent: "center",
		// paddingTop: 20,
		// marginVertical: 10,
		width: 160,
		height: 25,
		// marginBottom: 8,
		// aspectRatio: 1,
	},
	image: {
		// justifyContent: "center",
		// padding: 16,
		marginVertical: 10,
		width: "90%",
		// height: 25,
		// marginBottom: 8,
		aspectRatio: 2,
	},
	title: {
		textAlign: "center",
		marginTop: 12,
		letterSpacing: 4,
		marginBottom: 6,
		color: "gray",
		fontSize: 20,
	},
	textdiv: {
		padding: 18,
	},
	phone: {
		padding: 18,
	},
});
