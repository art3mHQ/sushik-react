import { Text, View } from "react-native";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { saveNonce, saveToken } from "../redux/CartReducer";

import { useQuery } from "@tanstack/react-query";

import fethNonce from "../scripts/fetchNonce";

const Noncense = () => {
	// const [nonce, setNonce] = useState(0);
	const dispatch = useDispatch();

	const wcNonce = useQuery({
		queryKey: ["nonce"],
		queryFn: fethNonce,
		staleTime: 5 * 60 * 1000,
	});

	if (wcNonce.isPending) {
		return <Text>wcNonce Loading...</Text>;
	}

	if (wcNonce.isError) {
		return <Text>Error: {error.message}</Text>;
	}

	let nonceOnLoad = wcNonce.data.nonce;
	let cartTokenOnLoad = wcNonce.data.cartToken;
	// dispatch(savenonce(sosi));

	return (
		<View
			onLayout={() => {
				dispatch(saveNonce(nonceOnLoad));
				dispatch(saveToken(cartTokenOnLoad));
				console.log("sosiii from onLayout");
			}}
		>
			<Text
				onPress={() => {
					dispatch(saveNonce(nonceOnLoad));
					dispatch(saveToken(cartTokenOnLoad));
					// console.log("sosiii");
				}}
			>
				{nonceOnLoad}
			</Text>
		</View>
	);
};

export default Noncense;
