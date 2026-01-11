import React, { memo, useCallback, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import DebugInfoModal from "@screens/NetworkErrorScreen/DebugInfoModal";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";

import WithWebHeader from "@hoc/withWebHeader";

import { ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";
import useAppRoute from "@navigation/useAppRoute";

import { horizontalScale, verticalScale } from "@utils/functions";

import { ENV } from "@config/env";

import { appSlice } from "@redux/slices/app.slice";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { IEnv } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { InfoCircleIcon } from "@assets/icons";
import { ClientError, NetworkError } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const { reg, semiBold, lightBold } = commonStyles.text;

const STRINGS = createStringConstants({
	CLIENT_ERROR_TITLE: "common.networkErrorScreen.clientError.title",
	CLIENT_ERROR_DESCRIPTION:
		"common.networkErrorScreen.clientError.description",
	NETWORK_LOST_TITLE: "common.networkErrorScreen.networkLost.title",
	NETWORK_LOST_DESCRIPTION:
		"common.networkErrorScreen.networkLost.description",
	TRY_AGAIN: "common.networkErrorScreen.tryAgain",
	VIEW_DEBUG_INFO: "common.networkErrorScreen.debugInfoModal.viewDebugInfo",
});

export const DISABLE_NETWORK_ERROR_SCREEN = false;

export const enum ErrorType {
	/** Network connectivity error (no internet, DNS failure, etc.) */
	NETWORK,
	/** Server-side error (5xx status codes) */
	SERVER,
	/** Client-side error (4xx status codes) */
	CLIENT,
	/** Unknown or unhandled error type */
	UNKNOWN,
}

/**
 * Error screen component that displays different error messages based on error type
 * Shows debug information in staging environment with copy functionality
 *
 * @component
 * @returns {JSX.Element} Error screen with retry button and optional debug info
 *
 * @example
 * Navigation to this screen:
 * ```typescript
 * navigation.navigate(ROOT_ROUTES.NetworkErrorScreen, {
 *   errorType: ErrorType.NETWORK,
 *   errorMessage: "Connection failed"
 * });
 * ```
 */
const NetworkErrorScreen = () => {
	const route = useAppRoute<typeof ROOT_ROUTES.NetworkErrorScreen>();
	const { errorType, errorDetails } = route.params;

	const isDebugBuild = ENV.environment === IEnv.stage || !!__DEV__;
	const [isDebugModalVisible, setIsDebugModalVisible] = useState(false);

	const dispatch = useDispatch();
	const navigation = useAppNavigation();

	const onRetry = useCallback(() => {
		const routes = navigation.getState()?.routes || [];
		const previousRoute = routes[routes.length - 2];

		if (previousRoute?.name === ROOT_ROUTES.SplashScreen) {
			navigation.reset({
				index: 0,
				routes: [{ name: ROOT_ROUTES.SplashScreen }],
			});
			dispatch(appSlice.actions.appStart());
		} else {
			navigation.goBack();
		}
	}, []);

	let title: string;
	let description: string;

	switch (errorType) {
		case ErrorType.SERVER:
		case ErrorType.UNKNOWN:
		case ErrorType.CLIENT:
			title = getString(STRINGS.CLIENT_ERROR_TITLE);
			description = getString(STRINGS.CLIENT_ERROR_DESCRIPTION);
			break;
		default:
			title = getString(STRINGS.NETWORK_LOST_TITLE);
			description = getString(STRINGS.NETWORK_LOST_DESCRIPTION);
	}

	return (
		<View style={styles.container}>
			<ImageComponent errorType={errorType} />
			<View style={styles.contentContainer}>
				<RNText title={title} style={styles.titleText} />
				<RNText title={description} style={styles.descriptionText} />
			</View>
			<CommonButton
				title={getString(STRINGS.TRY_AGAIN)}
				variant={IButtonVariant.Secondary}
				onPress={onRetry}
				style={styles.tryAgainButton}
			/>
			{isDebugBuild && (
				<Pressable
					style={styles.debugButton}
					onPress={() => setIsDebugModalVisible(true)}
				>
					<InfoCircleIcon
						width={16}
						height={16}
						color={colors.highlight.text_blue}
					/>
					<RNText
						title={getString(STRINGS.VIEW_DEBUG_INFO)}
						style={styles.debugButtonText}
					/>
				</Pressable>
			)}

			<DebugInfoModal
				isOpen={isDebugModalVisible}
				onClose={() => setIsDebugModalVisible(false)}
				errorDetails={errorDetails}
			/>
		</View>
	);
};

/**
 * Props interface for the ImageComponent
 * @interface IImageComponent
 */
interface IImageComponent {
	/** The type of error to display appropriate image for */
	errorType: ErrorType;
}

/**
 * Component that renders the appropriate error image based on error type
 *
 * @component
 * @param {IImageComponent} props - The component props
 * @param {ErrorType} props.errorType - The type of error to display image for
 *
 * @returns {JSX.Element} Image component showing either client error or network error illustration
 */
const ImageComponent = ({ errorType }: IImageComponent) => {
	if (errorType === ErrorType.CLIENT) {
		return <Image source={ClientError} style={styles.clientErrorImage} />;
	}

	return <Image source={NetworkError} style={styles.networkErrorImage} />;
};

const MemoizedNetworkErrorScreen = memo(NetworkErrorScreen);

export default () =>
	WithWebHeader({
		BodyComponent: MemoizedNetworkErrorScreen,
		isGuest: false,
	});

const styles = StyleSheet.create({
	clientErrorImage: {
		height: verticalScale(150),
		resizeMode: "contain",
		width: horizontalScale(175),
	},
	container: {
		alignItems: "center",
		backgroundColor: colors.neutral.white,
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: horizontalScale(24),
	},
	contentContainer: {
		alignItems: "center",
		gap: verticalScale(12),
		marginTop: verticalScale(10),
	},
	debugButton: {
		alignItems: "center",
		backgroundColor: colors.highlight.bg_blue,
		borderRadius: horizontalScale(20),
		flexDirection: "row",
		gap: horizontalScale(6),
		marginTop: verticalScale(16),
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(8),
	},
	debugButtonText: {
		...reg,
		...lightBold,
		color: colors.highlight.text_blue,
		fontSize: horizontalScale(13),
	},
	descriptionText: {
		...reg,
		...lightBold,
		color: colors.neutral.grey_07,
		lineHeight: verticalScale(20),
		textAlign: "center",
	},
	networkErrorImage: {
		height: verticalScale(200),
		resizeMode: "contain",
		width: horizontalScale(200),
	},
	titleText: {
		color: colors.primary.red_05,
		...reg,
		...semiBold,
		lineHeight: verticalScale(20),
	},
	tryAgainButton: {
		marginTop: verticalScale(30),
		width: "100%",
	},
});
