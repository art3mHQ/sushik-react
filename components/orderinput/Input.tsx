import { Text, TextInput, View, StyleSheet } from "react-native";
import { forwardRef } from "react";

function Input({ label, invalid, additionContStyle, textInputConfig }) {
  // workaround for MULTILINE property
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidBackground);
  }
  return (
    <View style={[styles.inputContainer, additionContStyle]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    // color: "",
    marginBottom: 4,
  },
  input: {
    borderWidth: 0.6,
    borderColor: "#696969",
    // color: "",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "#ff0000",
  },
  invalidBackground: {
    backgroundColor: "#ffb3b3",
  },
});
