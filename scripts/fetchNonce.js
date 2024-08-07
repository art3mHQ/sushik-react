const fetchNonce = async () => {
	try {
		const res = await fetch(
			"https://dev.sushik.km.ua/wp-json/wc/store/v1/cart",
			{
				method: "GET",
			},
		);

		const nonce = res.headers.get("nonce");
		const cartToken = res.headers.get("cart-token");
		// const nonce = "nonce micci";
		// console.log("from fetchNonce", res);
		// console.log("nonce from fetchNonce", nonce);
		// console.log("cart-token from fetchNonce", cartToken);

		const nonceData = { nonce: nonce, cartToken: cartToken };

		return nonceData;
	} catch (error) {
		console.error("Error fetching nonce:", error);
		throw error;
	}
};

export default fetchNonce;
