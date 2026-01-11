import React, { useCallback } from "react";
import { Image, StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";

import { HOME_ROUTES, HOME_TAB_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { NotEnrolledUserImage } from "@assets/icons/img";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { sm, regular } = commonStyles.text;

interface WebUserNotEnrolledProps {
	title: string;
	showButton?: boolean;
}

const { neutral } = colors;

const WebUserNotEnrolled = React.memo(function WebUserNotEnrolled({
	title,
	showButton = false,
}: WebUserNotEnrolledProps) {
	const navigation = useAppNavigation();

	const handleExplorePress = useCallback(() => {
		navigation.navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.MainTabs,
			params: {
				screen: HOME_TAB_ROUTES.WebExploreCourses,
			},
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Image
				source={NotEnrolledUserImage}
				style={styles.notEnrolledImageStyle}
				resizeMode="contain"
			/>
			<RNText title={title} style={styles.signInText} />
			{showButton ? (
				<CommonButton
					title={strings.EXPLORE_NOW}
					onPress={handleExplorePress}
					variant={IButtonVariant.Primary}
					style={styles.buttonStyle}
				/>
			) : (
				<></>
			)}
		</View>
	);
});

export default WebUserNotEnrolled;

const styles = StyleSheet.create({
	buttonStyle: {
		borderRadius: horizontalScale(6),
		height: verticalScale(37),
		width: horizontalScale(119),
	},
	container: {
		alignItems: "center",
		backgroundColor: neutral.white,
		flex: 1,
		gap: verticalScale(12),
		justifyContent: "center",
	},
	notEnrolledImageStyle: {
		height: verticalScale(136),
		width: horizontalScale(132),
	},
	signInText: {
		...sm,
		...regular,
		color: neutral.grey_07,
		lineHeight: verticalScale(16),
		textAlign: "center",
		width: horizontalScale(288),
	},
});
