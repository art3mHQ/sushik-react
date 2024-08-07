function phoneFormater(num) {
	if (!num) return num;
	// console.log("num length", num.length);
	const phoneNumber = num.replace(/\D/g, "");
	const phoneNumberLength = phoneNumber.length;
	// console.log("phoneNumberLength is", phoneNumberLength);
	// console.log(phoneNumber);
	if (phoneNumberLength < 4) return phoneNumber;
	// if (phoneNumberLength < 4) return `(${phoneNumber})`;
	if (phoneNumber < 7 || num.length <= 9) {
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
	}
	// console.log("hay");
	return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

export default phoneFormater;
