import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
	name: "cart",
	initialState: {
		cart: [],
		nonce: 0,
		cartToken: 0,
	},
	reducers: {
		addToCart: (state, action) => {
			// console.log("action.payload",action.payload)
			const itemPresent = state.cart.find(
				(item) => item.id === action.payload.id,
			);

			if (itemPresent) {
				itemPresent.quantity++;
			} else {
				const originalObject = action.payload;

				console.log("originalObject.variation", originalObject.variation);

				const filteredObject = {
					id: originalObject.id,
					// add_to_cart: originalObject.add_to_cart,
					price: originalObject.prices.price,
					name: originalObject.name,
					slug: originalObject.slug,
					type: originalObject.type,
					variation: originalObject.variation.match(/\d+/g),
					parent: originalObject.parent,
				};

				// console.log(filteredObject);
				state.cart.push({ ...filteredObject, quantity: 1 });
			}
		},
		removeFromCart: (state, action) => {
			const removeItem = state.cart.filter(
				(item) => item.id !== action.payload.id,
			);
			state.cart = removeItem;
		},
		incrementQuantity: (state, action) => {
			const itemPresent = state.cart.find(
				(item) => item.id === action.payload.id,
			);
			itemPresent.quantity++;
		},
		decrementQuantity: (state, action) => {
			const itemPresent = state.cart.find(
				(item) => item.id === action.payload.id,
			);
			if (itemPresent.quantity === 1) {
				const removeItem = state.cart.filter(
					(item) => item.id !== action.payload.id,
				);
				state.cart = removeItem;
			} else {
				itemPresent.quantity--;
			}
		},
		emptyCart: (state) => {
			state.cart = [];
		},
		saveNonce: (state, action) => {
			state.nonce = action.payload;
		},
		saveToken: (state, action) => {
			state.cartToken = action.payload;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	incrementQuantity,
	decrementQuantity,
	emptyCart,
	saveNonce,
	saveToken,
} = CartSlice.actions;

export default CartSlice.reducer;
