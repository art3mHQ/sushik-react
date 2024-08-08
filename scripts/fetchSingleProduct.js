const fetchSingleProduct = async (var1) => {
	try {
		const response1 = await fetch(
			`https://dev.sushik.km.ua/wp-json/wc/store/v1/products/${var1}`,
		);

		const data1 = await response1.json();

		return data1;
	} catch (error) {
		console.error("Fetch error:", error);
		return data1; // Return accumulated data up to this point
	}
};

export default fetchSingleProduct;
