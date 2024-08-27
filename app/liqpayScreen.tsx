import React, { useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	SafeAreaView,
	ActivityIndicator,
} from "react-native";

import { WebView } from "react-native-webview";

import { useNavigation, useRoute } from "@react-navigation/native";

const liqpayScreen = () => {
	const ref = useRef<WebView>(null);

	const navigation = useNavigation();
	const route = useRoute();
	let { payurl } = route.params;
	console.log("payurl", payurl);

	const handleWebViewMessage = (event) => {
		// Handle messages received from the WebView
		const message = event.nativeEvent.data;
		if (message === "successWordFound") {
			console.log("Success word found in WebView!");
			// Perform any actions you need based on this event
		}
		if (message === "classFound") {
			console.log('Class "container__block__confirm__success__text" found!');
			// Perform any actions you need based on this event
		}
	};

	// const simpleScript = `
	//   document.body.style.backgroundColor = 'red';
	//   true;
	// `;

	// const injectedJavaScript = `
	// 	console.log('hey hey hey heeeyyyyyyy from injectedJavaScript');
	//     // Function to check for the "success" word on the page
	//     function checkForSuccessWord() {
	//       const successWord = ' The payment is successfully sent.'; // Change this to your target word
	//       const successWord2 = ' The payment is successfully sent.'; // Change this to your target word
	//       const bodyText = document.body.innerText || document.body.textContent;

	//       if (bodyText.includes(successWord)) {
	//         window.ReactNativeWebView.postMessage('successWordFound');
	//       }

	//   	const elements = document.getElementsByClassName('container__block__confirm__success__text');

	//     if (elements.length > 0) {
	//         window.ReactNativeWebView.postMessage('classFound');
	//       }
	//     }

	//     // Observe changes in the DOM
	//     const observer = new MutationObserver(checkForSuccessWord);

	//     // Start observing the entire document
	//     observer.observe(document.body, {
	//       childList: true, // Observe direct children
	//       subtree: true, // Observe all descendants
	//       characterData: true, // Observe text changes
	//     });

	//     // Initial check for the word when the page loads
	//     checkForSuccessWord();

	//     true; // This is required to signal completion to React Native WebView
	// `;

	function handleWebViewNavigationStateChange(newNavState) {
		console.log("wowaweewa from handleWebViewNavigationStateChange");
		// newNavState looks something like this:
		// {
		//   url?: string;
		//   title?: string;
		//   loading?: boolean;
		//   canGoBack?: boolean;
		//   canGoForward?: boolean;
		// }
		const { url, loading, navigationType } = newNavState;
		console.log(
			"from handleWebViewNavigationStateChange navigationType",
			navigationType,
		);
		if (loading == false) {
			console.log("url from loading == false", url);
		}
		// if (!url) return;
		console.log("url", url);

		// one way to handle a successful form submit is via query strings  || url.includes("checkout/checkout")
		if (url.includes("success")) {
			console.log("hey heeeyyyyyyy");
			ref.current?.stopLoading();
			// let paymentMethod = "";
			// maybe close this view?
			navigation.navigate("paymentResult", { paymentStatus: "success" });
		}
	}
	const renderLoading = () => {
		return <ActivityIndicator />;
	};

	return (
		<SafeAreaView style={styles.safecontainer}>
			<WebView
				originWhitelist={["http://", "https://", "about:"]}
				// injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
				// injectedJavaScript={simpleScript}
				// onMessage={handleWebViewMessage}
				onNavigationStateChange={handleWebViewNavigationStateChange}
				// onLoadProgress={({ nativeEvent }) => {
				// 	console.log("onLoadProgress url", nativeEvent.url);
				// 	if (nativeEvent.url.includes("success")) {
				// 		//NAVIGATE TO SOME SCREEN
				// 		console.log("hey heeeyyyyyyy from onLoadProgress");
				// 		ref.current?.stopLoading();
				// 		navigation.navigate("paymentResult", { paymentStatus: "success" });
				// 	}
				// }}
				enableApplePay={true}
				// automaticallyAdjustContentInsets={false}
				// useWebKit={true}
				ref={ref}
				source={{ uri: payurl }}
				renderLoading={renderLoading}
				startInLoadingState
			/>
		</SafeAreaView>
	);
};

export default liqpayScreen;

const styles = StyleSheet.create({
	safecontainer: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		justifyContent: "center",
	},
});
