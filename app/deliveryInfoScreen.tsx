import React from "react";
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Linking,
	TouchableOpacity,
} from "react-native";

import { Image } from "expo-image";

const deliveryInfoScreen = () => {
	return (
		<ScrollView>
			<Text style={styles.title}> Доставка</Text>
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				<Image
					style={styles.imagediv}
					source={require("../assets/images/fff.png")}
					contentFit="contain"
					// placeholder={{ blurhash }}
				/>
			</View>
			<View style={styles.textdiv}>
				<Text>
					1. Доставка здійснюється по м.Хмельницькому до під’їзду або будинку.
				</Text>
				<Text>Час доставки від 60 до 90 хвилин. Зазвичай до 60 хвилин.</Text>
				<Text>
					2. Замовлення можна здійснити з 10:00 до 21:55 на сайті ( Для
					підтвердження замовлення Вам повинні перетелефонувати. Якщо Вам не
					зателефонували, то, скоріше за все, сталася технічна помилка і Вам
					краще зателефонувати!) або за телефонами (096) 410-70-70; (097)
					913-70-70.
				</Text>
				<Text>
					3. Ви можете скористатись послугою “Доставка на певну годину”,
					здійснивши замовлення на зручний для Вас час.
				</Text>
				<Text>
					4. Доставка безкоштовна при вартості замовлення від 500грн. При
					вартості замовлення до 500грн., вартість доставки складає 80грн.
					Мінімальна сума замовлення на доставку 200грн.
				</Text>
				<Text>
					5. При замовленні доставки на віддалені райони , а саме с.Лісові
					Гринівці (Центральна зупинка),с.Ружичанка(Нова
					Пошта),с.Копистин(Сільська рада),с.Олешин(Пам’ятник) вартість доставки
					складає 150грн. за умови замовлення більше 500грн.
				</Text>
				<View style={styles.phone}>
					<Text
						style={{
							textAlign: "center",
							// justifyContent: "center",
						}}
					>
						Зателефонувати
					</Text>
					<TouchableOpacity
						onPress={() => Linking.openURL("tel:+380964107070")}
					>
						<Text
							style={{
								textAlign: "center",
								fontSize: 16,
								// justifyContent: "center",
							}}
						>
							(096) 410-70-70
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

export default deliveryInfoScreen;

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
		paddingTop: 10,
	},
});
