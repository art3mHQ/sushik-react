import React, { useRef, useState } from "react";

// import { PatternFormat, NumericFormat } from "react-number-format";

import {
	View,
	Text,
	TextInput,
	InputAccessoryView,
	Button,
	StyleSheet,
	Dimensions,
	Keyboard,
	Platform,
} from "react-native";

import Input from "./Input";

import phoneFormater from "../../scripts/phoneFormater";

// import RNPickerSelect from "react-native-picker-select";
// import { SelectList } from "react-native-dropdown-select-list";
// import DateTimePicker from '@react-native-community/datetimepicker';

function DeliveryForm(props) {
	// const nextFieldRef = useRef(null);

	// const ref_input2 = useRef();
	// const ref_input3 = useRef();

	const handleTelChange = (value) => {
		const formatedPhoneValue = phoneFormater(value);
		props.setTel({
			...props.tel,
			value: formatedPhoneValue,
			isValid: true,
		});
	};

	// 	  function handleMyClick() {
	//   nextFieldRef.current.focus();
	// }

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
				label="Вулиця, будинок, підїзд, квартира*"
				textInputConfig={{
					// keyboardType: "decimal-pad",
					// ref: { nextFieldRef },
					value: props.delAdr.value,
					onChangeText: (text) =>
						props.setDelAdr({
							...props.delAdr,
							value: text,
							isValid: true,
						}),
					inputAccessoryViewID: "Done",
				}}
				invalid={!props.delAdr.isValid}
			/>

			<View
				style={{
					flexDirection: "row",
					marginHorizontal: 2,
					marginVertical: 2,
				}}
			>
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
					additionContStyle={{ flex: 2 }}
				/>
				<Input
					label="Час"
					textInputConfig={{
						keyboardType: "decimal-pad",
						value: props.time,
						onChangeText: (text) => props.setTime(text),
						inputAccessoryViewID: "Done",
					}}
					additionContStyle={{ flex: 1 }}
				/>
			</View>

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
			{/*<InputAccessoryView nativeID="Next">
				<View style={styles.accessory}>
					<Button onPress={() => nextFieldRef.current?.focus()} title="Next" />
					<Button onPress={() => Keyboard.dismiss()} title="Done" />
				</View>
			</InputAccessoryView>*/}
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

export default DeliveryForm;

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
