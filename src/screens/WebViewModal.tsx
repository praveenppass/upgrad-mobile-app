import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import WebView from "@components/Reusable/Webview";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { ROOT_ROUTES } from "@navigation/routes";
import useAppRoute from "@navigation/useAppRoute";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

interface IWebViewModalBodyComponent {
	url: string;
}

const BodyComponent = ({ url }: IWebViewModalBodyComponent) => (
	<View style={styles.webContainer}>
		<WebView url={url} />
	</View>
);
const MemoizedBodyComponent = memo(BodyComponent);

const WebViewModal = () => {
	const route = useAppRoute<typeof ROOT_ROUTES.WebViewModal>();

	const { name, url } = route.params;

	return (
		<WithHeaderLxp
			BodyComponent={() => <MemoizedBodyComponent url={url || ""} />}
			title={name || ""}
			showDismiss
		/>
	);
};

export default WebViewModal;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: neutral.white,
		bottom: 0,
		justifyContent: "center",
		left: 0,
		paddingHorizontal: horizontalScale(40),
		position: "absolute",
		right: 0,
		top: 0,
	},
	description: {
		marginBottom: verticalScale(24),
		textAlign: "center",
	},
	parentContainer: {
		flex: 1,
	},
	webContainer: {
		backgroundColor: neutral.white,
		flex: 1,
		marginTop: verticalScale(20),
	},
});
