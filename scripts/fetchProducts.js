const fetchProducts = async () => {
	const response1 = await fetch(
		"https://dev.sushik.km.ua/wp-json/wc/store/v1/products?per_page=99&page=1",
	);

	const response2 = await fetch(
		"https://dev.sushik.km.ua/wp-json/wc/store/v1/products?per_page=99&page=2",
	);

	const data1 = await response1.json();
	const data2 = await response2.json();

	return [...data1, ...data2];
};

// const fetchProducts = [...fetchProducts1, ...fetchProducts2];

export default fetchProducts;
