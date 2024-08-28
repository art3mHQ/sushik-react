const fetchOrderStatus = async (orderId, orderKey) => {
	try {
		const eMail = "guest@GUEST.com";
		const response1 = await fetch(
			`https://dev.sushik.km.ua/wp-json/wc/store/v1/order/${orderId}?key=${orderKey}&billing_email=${eMail}`,
		);

		const data1 = await response1.json();

		return data1;
	} catch (error) {
		console.error("Fetch error:", error);
		return data1; // Return accumulated data up to this point
	}
};

export default fetchOrderStatus;
