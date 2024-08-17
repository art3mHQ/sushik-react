const createOrder = async (
	nonce,
	cartToken,
	cartSortly,
	delAdr,
	tel,
	time,
	comment,
	userName,
	payOnline,
) => {
	// console.log("createOrder!-nonce-!!!!", `${nonce}`);
	// console.log("createOrder!-cartToken-!!!!", `${cartToken}`);
	console.log("createOrder!----cartSortly", `${cartSortly}`);
	console.log("createOrder!----payOnline", `${payOnline}`);

	const productsData = cartSortly.map((item) => ({
		path: "/wc/store/v1/cart/add-item",
		method: "POST",
		cache: "no-store",
		body: {
			id: item.id,
			quantity: item.quantity,
			variation: [
				{
					attribute: "дiаметр",
					value: item.variation.toString(),
				},
			],
		},
		headers: {
			Nonce: nonce,
		},
	}));

	console.log("createOrder!!--productsData--", `${productsData}`);

	const orderData = {
		path: "/wc/store/v1/checkout",
		method: "POST",
		cache: "no-store",
		body: {
			billing_address: {
				first_name: userName,
				last_name: "",
				// company: "",
				address_1: delAdr,
				// address_2: "Corner Penthouse Spook Central",
				// city: "New York",
				// state: "NY",
				// postcode: "10023",
				// country: "US",
				email: "guest@GUEST.com",
				phone: tel,
			},
			payment_method: payOnline ? "liqpay" : "cod",
			set_paid: false,
			customer_note: "Комментар: " + comment + "\n" + " Час:" + "&nbsp;" + time,
		},
		headers: {
			Nonce: nonce,
		},
	};

	const data = {
		requests: [...productsData, orderData],
	};

	console.log("data", data);

	try {
		const res = await fetch(
			"https://dev.sushik.km.ua/wp-json/wc/store/v1/batch",
			{
				method: "post",

				headers: {
					"Content-Type": "application/json",
					nonce: `${nonce}`,
					"cart-token": `${cartToken}`,
				},
				body: JSON.stringify(data),
			},
		);

		const result = await res.json();

		let fetchedNonce = res.headers.get("nonce");
		// let fetchedCartToken = res.headers.get("Cart-Token");

		const fetchedCartToken =
			result.responses[result.responses.length - 1].headers["Cart-Token"];

		const fetchedCartFromWC = result.responses[result.responses.length - 1];

		// console.log("from inside createOrder nonce", fetchedNonce);
		// console.log("from inside createOrder cartToken", fetchedCartToken);
		// console.log("from inside createOrder status", res.status);

		const orderData = {
			nonce: fetchedNonce,
			cartToken: fetchedCartToken,
			result: result,

			// confirmed: confirmStatus,
		};

		return orderData;
	} catch (error) {
		console.error("Error from inside createOrder:", error);
		throw error;
	}
};

export default createOrder;
