import { PatternFormat, NumericFormat } from "react-number-format";
import React, { useState } from "react";

import { Text, View, StyleSheet, TextInput } from "react-native";

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
				}}
			/>
		</View>
	);
}

export default PickUpForm;
