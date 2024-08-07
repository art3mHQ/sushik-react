const fetchCats = async () => {
	const res = await fetch(
		"https://dev.sushik.km.ua/wp-json/wc/store/v1/products/categories",
	);
	return res.json();
};

export default fetchCats;

// "https://dev.sushik.km.ua/wp-json/wc/store/v1/products/categories?per_page=20",
