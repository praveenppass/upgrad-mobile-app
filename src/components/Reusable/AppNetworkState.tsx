import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";

import { horizontalScale } from "@utils/functions";
import measures from "@utils/measures";

import { type RootState } from "@redux/store/root.reducer";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { ErrorIcon } from "@assets/icons";
import { NetworkError } from "@assets/icons/img";

import RNText from "./RNText";

interface INetworkStateModalProps {
	onRetryCallback?: () => void;
}

const {
	strings,
	themes: { primary },
	commonStyles: {
		align: { itemsCenter, flex1 },
		spacing: { g12 },
		text: { bold, clrBlack, md, reg, clrGray, txtCenter },
	},
} = C;

const DATA = {
	error: {
		title: strings.ERROR,
		desc: strings.ERROR_DESC,
		icon: <ErrorIcon />,
	},
	network: {
		desc: strings.NETWORK_LOST_DESC,
		title: strings.NETWORK_LOST_TITLE,
		icon: <NetworkError />,
	},
};

const AppNetworkState = ({ onRetryCallback }: INetworkStateModalProps) => {
	const {
		appNetworkStateModal: { type, tryAgainFunc },
	} = useSelector((state: RootState) => state.modal);

	const networkStateData = DATA.network;

	const onRetryHandler = () => {
		if (type === "network" && tryAgainFunc) {
			tryAgainFunc();
		}
		if (onRetryCallback) {
			onRetryCallback();
		}
	};

	return (
		<View style={[flex1, itemsCenter, g12]}>
			<>
				<Image
					source={NetworkError}
					resizeMode="contain"
					style={styles.imgStyle}
				/>
			</>
			<RNText
				style={[{ color: colors?.primary.red_05 }, reg]}
				title={networkStateData?.title}
			/>
			<RNText
				style={[clrGray, md, txtCenter, styles.descTxt]}
				title={networkStateData?.desc}
			/>
			{tryAgainFunc ? (
				<CommonButton
					title={strings.TRY_AGAIN}
					variant={IButtonVariant.Primary}
					onPress={onRetryHandler}
					style={styles.retryBtn}
				/>
			) : null}
		</View>
	);
};

export default memo(AppNetworkState);

const styles = StyleSheet.create({
	descTxt: {
		lineHeight: horizontalScale(18),
		marginBottom: horizontalScale(10),
		maxWidth: "80%",
	},
	imgStyle: {
		height: horizontalScale(170),
		width: horizontalScale(200),
	},
	modalBg: {
		backgroundColor: primary.color2,
	},
	retryBtn: {
		borderRadius: measures.BORDER.b8,
		width: "80%",
	},
});
