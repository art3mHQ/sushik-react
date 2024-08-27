import { PatternFormat, NumericFormat } from "react-number-format";
import React, { useState } from "react";

import {
	Text,
	View,
	StyleSheet,
	InputAccessoryView,
	Keyboard,
	Platform,
	Dimensions,
	Button,
} from "react-native";

import Input from "./Input";

import phoneFormater from "../../scripts/phoneFormater";

function PickUpForm(props) {
	// Work around to set delivery address to "SAMOVIVEZENNYA" added in order component

	// console.log("tel", props.tel);

	// const [newtel, setNewTel] = useState("");

	const handleTelChange = (value) => {
		const formatedPhoneValue = phoneFormater(value);
		props.setTel({
			...props.tel,
			value: formatedPhoneValue,
			isValid: true,
		});
	};

	return (
		<View>
			<Input
				label="Ім'я*"
				textInputConfig={{
					value: props.userName.value,
					onChangeText: (text) =>
						props.setUserName({
							...props.userName,
							value: text,
							isValid: true,
						}),
					inputAccessoryViewID: "Done",
				}}
				invalid={!props.userName.isValid}
			/>

			<Input
				label="Телефон*"
				textInputConfig={{
					keyboardType: "decimal-pad",
					placeholder: "(099)000-00-00",
					maxLength: 14,
					value: props.tel.value,
					onChangeText: (text) => handleTelChange(text),
					inputAccessoryViewID: "Done",
				}}
				invalid={!props.tel.isValid}
			/>
			{/*<Text
				style={{
					fontSize: 12,
					marginBottom: 4,
				}}
			>
				Телефон
			</Text>*/}
			<Input
				label="Час"
				textInputConfig={{
					keyboardType: "decimal-pad",
					value: props.time,
					onChangeText: (text) => props.setTime(text),
					inputAccessoryViewID: "Done",
				}}
				// additionContStyle={{ flex: 1 }}
			/>
			<Input
				label="Коментар"
				textInputConfig={{
					multiline: true,
					// autoCapitalize: 'none'
					// autoCorrect: false // default is true
					value: props.comment,
					onChangeText: (text) => props.setComment(text),
					inputAccessoryViewID: "Done",
				}}
			/>
			{Platform.OS !== "web" && (
				<InputAccessoryView nativeID="Done">
					<View style={styles.accessory}>
						{/*<Text>You could have different sets of buttons -> </Text>*/}
						<Button onPress={() => Keyboard.dismiss()} title="Done" />
					</View>
				</InputAccessoryView>
			)}
		</View>
	);
}

export default PickUpForm;

const styles = StyleSheet.create({
	accessory: {
		width: Dimensions.get("window").width,
		height: 36,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: "#F8F8F8",
		paddingHorizontal: 8,
	},
});
