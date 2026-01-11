import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import ProfilePicture, {
	IProfilePictureType,
} from "@components/Reusable/ProfilePicture";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { useAnalytics } from "@hooks/useAnalytics";

import { HOME_ROUTES, HOME_TAB_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IEventName } from "@interface/events.interface";

import { colors } from "@assets/colors";
import { ArrowLeft, DismissIcon, HomeIcon, UpGradLogo } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { reg, medium } = commonStyles.text;

const { neutral, transparent } = colors;

export interface IHeaderProps {
	eventsParams?: Record<string, unknown>;
	showBack?: boolean;
	title?: string;
	showDismiss?: boolean;
	showProfile?: boolean;
	showHome?: boolean;
	dark?: boolean;
	loading?: boolean;
	rightIcon?: React.ReactElement;
	onRightIconPress?: () => void;
	removeBackground?: boolean;
	showBottomShadow?: boolean;
}

const HeaderComponent = ({
	showBack,
	eventsParams,
	title,
	showDismiss,
	showProfile,
	showHome,
	dark,
	loading,
	rightIcon,
	onRightIconPress,
	removeBackground,
	showBottomShadow = true,
}: IHeaderProps) => {
	const { trackEvent } = useAnalytics();

	const navigation = useAppNavigation();

	const handleGoBack = () => {
		navigation.goBack();
		trackEvent({
			eventName: IEventName.BACK_BUTTON,
			eventData: eventsParams,
		});
	};

	const handleGoToHome = () => {
		navigation.navigate(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.MainTabs,
			params: {
				screen: HOME_TAB_ROUTES.MyPrograms,
			},
		});
	};

	const iconColor = dark ? neutral.white : neutral.black;

	const renderRightItem = () => {
		if (showProfile)
			return (
				<Pressable
					onPress={() => {
						navigation.navigate(ROOT_ROUTES.HomeStack, {
							screen: HOME_ROUTES.MyProfileScreen,
						});
					}}
					testID="profile_picture_press"
				>
					<ProfilePicture type={IProfilePictureType.SMALL} />
				</Pressable>
			);
		if (showHome)
			return (
				<Pressable onPress={handleGoToHome}>
					<HomeIcon
						color={iconColor}
						height={verticalScale(24)}
						width={horizontalScale(24)}
					/>
				</Pressable>
			);
		if (rightIcon)
			return (
				<Pressable onPress={onRightIconPress}>{rightIcon}</Pressable>
			);

		return <></>;
	};

	return (
		<View
			style={[
				styles.container,
				removeBackground && styles.removeBackground,
				dark && styles.dark,
				showBottomShadow && styles.shadow,
			]}
		>
			<View style={styles.iconTitleContainer}>
				{showBack || showDismiss ? (
					<Pressable
						onPress={handleGoBack}
						style={styles.titleContainer}
						testID="onBackPressClick"
					>
						{showBack ? (
							<ArrowLeft
								height={verticalScale(16)}
								width={horizontalScale(9)}
								color={iconColor}
							/>
						) : (
							<DismissIcon
								height={verticalScale(16)}
								width={horizontalScale(16)}
								color={iconColor}
							/>
						)}
						{loading ? (
							<Skeleton style={styles.skeletonTitle} />
						) : title ? (
							<RNText
								numberOfLines={1}
								title={title}
								style={[styles.title, dark && styles.titleDark]}
							/>
						) : null}
					</Pressable>
				) : title ? (
					<View style={styles.titleContainer}>
						<RNText
							numberOfLines={1}
							title={title}
							style={[styles.title, dark && styles.titleDark]}
						/>
					</View>
				) : (
					<UpGradLogo
						height={verticalScale(24)}
						width={horizontalScale(76)}
						color={colors.icon.default_red}
					/>
				)}
			</View>
			{renderRightItem()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: neutral.white,
		flexDirection: "row",
		height: verticalScale(60),
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(16),
		position: "relative",
		zIndex: 9,
	},
	dark: {
		backgroundColor: neutral.black,
	},
	iconTitleContainer: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
	},
	removeBackground: {
		backgroundColor: transparent,
	},
	shadow: {
		boxShadow: "2px 6px 8px 0px rgba(0, 0, 0, 0.04)",
	},
	skeletonTitle: {
		height: verticalScale(16),
		width: horizontalScale(200),
	},
	title: {
		...reg,
		...medium,
		color: neutral.black,
		lineHeight: verticalScale(22),
	},
	titleContainer: {
		alignItems: "center",
		flexDirection: "row",
		flexShrink: 1,
		gap: horizontalScale(12),
		paddingLeft: horizontalScale(8),
		paddingRight: horizontalScale(46),
	},
	titleDark: {
		color: neutral.white,
	},
});

export default memo(HeaderComponent);
