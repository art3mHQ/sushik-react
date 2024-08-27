import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchProducts = async () => {
	// Retrieve the stored Last-Modified timestamps and cached data
	// const savedLastModified = await AsyncStorage.getItem("lastModified");
	// const savedProducts = await AsyncStorage.getItem("products");
	// const savedLastModifiedPage2 = await AsyncStorage.getItem("lastModified2");
	// const savedProductsPage2 = await AsyncStorage.getItem("products2");

	// let data1 = null;
	// let data2 = null;

	// // Fetch data for page 1
	// const response1 = await fetch(
	// 	"https://dev.sushik.km.ua/wp-json/wc/store/v1/products?per_page=99&page=1",
	// 	{
	// 		headers: {
	// 			"If-Modified-Since": savedLastModified || "", // Send the Last-Modified timestamp to check if data is up-to-date
	// 		},
	// 	},
	// );

	// Fetch data for page 2
	// const response2 = await fetch(
	// 	"https://dev.sushik.km.ua/wp-json/wc/store/v1/products?per_page=99&page=2",
	// 	{
	// 		headers: {
	// 			"If-Modified-Since": savedLastModifiedPage2 || "", // Send the Last-Modified timestamp to check if data is up-to-date
	// 		},
	// 	},
	// );

	// console.log("response1.status", response1.status);
	// console.log("response2.status", response2.status);

	// console.log("savedLastModified-----", savedLastModified);
	// console.log("savedLastModifiedPage2", savedLastModifiedPage2);

	// // Handle response for page 1
	// if (response1.status === 304 && savedProducts) {
	// 	// Data hasn't changed, return cached products
	// 	data1 = JSON.parse(savedProducts);
	// } else if (response1.status === 200) {
	// 	// Data has changed, fetch new data
	// 	data1 = await response1.json();
	// 	const newLastModified = response1.headers.get("Last-Modified");

	// 	// Save new data and Last-Modified timestamp to AsyncStorage
	// 	await AsyncStorage.setItem("products", JSON.stringify(data1));
	// 	await AsyncStorage.setItem("lastModified", newLastModified);
	// } else {
	// 	// Handle other HTTP status codes (e.g., 404, 500) as needed
	// 	throw new Error("Failed to fetch products page 1");
	// }

	// // Handle response for page 2
	// if (response2.status === 304 && savedProductsPage2) {
	// 	// Data hasn't changed, return cached products
	// 	data2 = JSON.parse(savedProductsPage2);
	// } else if (response2.status === 200) {
	// 	// Data has changed, fetch new data
	// 	data2 = await response2.json();
	// 	// console.log("data2 from if status=200", data2);
	// 	const newLastModifiedPage2 = response2.headers.get("Last-Modified");

	// 	// Save new data and Last-Modified timestamp to AsyncStorage
	// 	await AsyncStorage.setItem("products2", JSON.stringify(data2));
	// 	await AsyncStorage.setItem("lastModified2", newLastModifiedPage2);
	// } else {
	// 	// Handle other HTTP status codes (e.g., 404, 500) as needed
	// 	throw new Error("Failed to fetch products page 2");
	// }

	// // Print the data after fetching and processing
	// // console.log("data1", data1);
	// // console.log("data2", data2);
	// console.log(
	// 	"Last-Modified from response1:",
	// 	response1.headers.get("Last-Modified"),
	// );
	// console.log(
	// 	"Last-Modified from response2:",
	// 	response2.headers.get("Last-Modified"),
	// );

	// // Combine the data from both pages and return it
	// return [...data1, ...data2];

	// Fetch data for page 1
	const response1 = await fetch(
		"https://dev.sushik.km.ua/wp-json/wc/store/v1/products?per_page=99&page=1",
	);

	// Fetch data for page 2
	const response2 = await fetch(
		"https://dev.sushik.km.ua/wp-json/wc/store/v1/products?per_page=99&page=2",
	);

	data1 = await response1.json();
	data2 = await response2.json();

	return [...data1, ...data2];
};

export default fetchProducts;
