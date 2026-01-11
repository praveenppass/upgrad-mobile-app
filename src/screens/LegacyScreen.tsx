import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";
import SafeImage from "@components/Reusable/SafeImage";

import WithWebHeader from "@hoc/withWebHeader";

import useGetUserType from "@hooks/useGetUserType";

import {
	AUTH_ROUTES,
	HOME_ROUTES,
	HOME_TAB_ROUTES,
	ROOT_ROUTES,
} from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { handleDownloadStudentApp } from "@utils/app.utils";
import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { UpGradLegacy } from "@assets/icons/img";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { reg, medium } = commonStyles.text;

/**
 * LegacyScreen - A screen that prompts users to download the new student app
 *
 * This screen is displayed to users who are still using the legacy version of the app.
 * It provides:
 * - A visual prompt with the new app image
 * - A download button to get the new student app
 * - A "Later" option to continue using the current app
 *
 * Navigation behavior:
 * - If user is logged in: Navigates to HomePage (if they have courses) or Explore (if no courses)
 * - If user is not logged in: Navigates to HomeStack (if auth was skipped) or AuthStack (if auth is required)
 *
 * @returns {JSX.Element} The rendered LegacyScreen component
 */

const LegacyScreen = () => {
	const { hasLearnCourses, hasUgCourses, isLoggedIn, isAuthSkipped } =
		useGetUserType();

	const navigation = useAppNavigation();

	const hasCourses = hasLearnCourses || hasUgCourses;

	const handlePress = useCallback(() => {
		if (isLoggedIn) {
			navigation.replace(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.MainTabs,
				params: {
					screen: hasCourses
						? HOME_TAB_ROUTES.MyPrograms
						: HOME_TAB_ROUTES.WebExploreCourses,
				},
			});
		} else {
			if (isAuthSkipped) {
				navigation.replace(ROOT_ROUTES.HomeStack, {
					screen: HOME_ROUTES.MainTabs,
					params: {
						screen: HOME_TAB_ROUTES.WebExploreCourses,
					},
				});
			} else {
				navigation.replace(ROOT_ROUTES.AuthStack, {
					screen: AUTH_ROUTES.WelcomeScreen,
				});
			}
		}
	}, []);

	return (
		<View style={styles.container}>
			<SafeImage source={UpGradLegacy} imageStyle={styles.image} />
			<RNText
				title={strings.LEGACY_BETTER_APP_AWAITS}
				style={styles.title}
			/>
			<RNText
				title={strings.LEGACY_RETIRE_SOON}
				style={styles.subtitle}
			/>
			<CommonButton
				title={strings.LEGACY_DOWNLOAD_NOW}
				variant={IButtonVariant.Primary}
				style={styles.downloadBtn}
				onPress={handleDownloadStudentApp}
			/>
			<Pressable hitSlop={horizontalScale(5)} onPress={handlePress}>
				<RNText
					title={strings.LEGACY_LATER}
					style={styles.laterBtnText}
				/>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: colors.neutral.white,
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: horizontalScale(24),
	},
	downloadBtn: {
		marginBottom: verticalScale(16),
		width: "100%",
	},
	image: {
		height: verticalScale(230),
		marginBottom: verticalScale(16),
		resizeMode: "contain",
		width: horizontalScale(230),
	},
	laterBtnText: {
		color: colors.neutral.grey_07,
		...reg,
		...medium,
	},
	subtitle: {
		...reg,
		...medium,
		color: colors.neutral.grey_07,
		marginBottom: verticalScale(40),
		paddingHorizontal: horizontalScale(12),
		textAlign: "center",
	},
	title: {
		color: colors.primary.red_05,
		marginBottom: verticalScale(16),
		...reg,
		textAlign: "center",
		...medium,
		...reg,
	},
});

const MemoizedLegacyScreen = React.memo(LegacyScreen);

export default () =>
	WithWebHeader({ BodyComponent: MemoizedLegacyScreen, isGuest: true });
