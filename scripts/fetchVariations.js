const fetchVariations = async (var1, var2, var3) => {
	try {
		const response1 = await fetch(
			`https://dev.sushik.km.ua/wp-json/wc/store/v1/products/${var1}`,
		);

		const response2 = await fetch(
			`https://dev.sushik.km.ua/wp-json/wc/store/v1/products/${var2}`,
		);

		const response3 = await fetch(
			`https://dev.sushik.km.ua/wp-json/wc/store/v1/products/${var3}`,
		);

		const data1 = await response1.json();
		const data2 = await response2.json();
		const data3 = await response3.json();

		const accumulatedData = [data1, data2, data3];
		return accumulatedData;
	} catch (error) {
		console.error("Fetch error:", error);
		return accumulatedData; // Return accumulated data up to this point
	}
};

export default fetchVariations;
