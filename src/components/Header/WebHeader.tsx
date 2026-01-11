import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ProfilePicture, {
	IProfilePictureType,
} from "@components/Reusable/ProfilePicture";
import RNText from "@components/Reusable/RNText";

import { AUTH_ROUTES, HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { horizontalScale, verticalScale } from "@utils/functions";

import { storage } from "@config/mmkvStorage";

import StorageKeys from "@constants/storage.constants";

import { colors } from "@assets/colors";
import { ArrowLeft, UpGradLogo } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { md, semiBold, mid, medium } = commonStyles.text;

const { neutral } = colors;

interface IWebHeader {
	isGuest: boolean;
	showBack?: boolean;
	title?: string;
	showCourses?: boolean;
	toggleMegaMenu?: () => void;
	centerLogo?: boolean;
	showRightSection?: boolean;
}

interface IHeaderLeft {
	showBack?: boolean;
	title?: string;
	centerLogo?: boolean;
}

interface IHeaderRight {
	isGuest: boolean;
	showCourses?: boolean;
	toggleMegaMenu?: () => void;
}

interface IBackNavigationSection {
	title?: string;
}

interface IUserMenuSection {
	showCourses?: boolean;
	toggleMegaMenu?: () => void;
}

const WebHeader = ({
	isGuest,
	showBack,
	title,
	showCourses,
	toggleMegaMenu,
	centerLogo,
	showRightSection,
}: IWebHeader) => (
	<View style={styles.container}>
		<HeaderLeft showBack={showBack} title={title} centerLogo={centerLogo} />
		{showRightSection ? (
			<HeaderRight
				isGuest={isGuest}
				showCourses={showCourses}
				toggleMegaMenu={toggleMegaMenu}
			/>
		) : (
			<></>
		)}
	</View>
);

const Logo = () => (
	<UpGradLogo
		height={verticalScale(24)}
		width={horizontalScale(76)}
		color={colors.icon.default_red}
	/>
);

const HeaderLeft = ({ showBack, title, centerLogo }: IHeaderLeft) => {
	if (showBack && centerLogo)
		return (
			<View style={styles.leftHeaderContainer}>
				<BackNavigationSection title={title} />
				<Logo />
				<View style={styles.rightDummyView} />
			</View>
		);

	if (centerLogo)
		return (
			<View style={styles.leftHeaderContainer}>
				<Logo />
			</View>
		);

	if (showBack) return <BackNavigationSection title={title} />;

	return <Logo />;
};

const HeaderRight = ({
	isGuest,
	showCourses,
	toggleMegaMenu,
}: IHeaderRight) => {
	const navigation = useAppNavigation();

	const handleGuestSignUp = () => {
		storage.delete(StorageKeys.IS_GUEST);

		navigation.push(ROOT_ROUTES.AuthStack, {
			screen: AUTH_ROUTES.WebLogin,
		});
	};

	if (isGuest)
		return (
			<CommonButton
				title={strings.SIGN_IN}
				variant={IButtonVariant.Primary}
				onPress={handleGuestSignUp}
				style={{
					paddingHorizontal: horizontalScale(10),
					height: verticalScale(32),
				}}
			/>
		);

	return (
		<UserMenuSection
			showCourses={showCourses}
			toggleMegaMenu={toggleMegaMenu}
		/>
	);
};

const BackNavigationSection = ({ title }: IBackNavigationSection) => {
	const { goBack } = useAppNavigation();
	return (
		<View style={styles.showBackContainer}>
			<Pressable onPress={() => goBack()} hitSlop={horizontalScale(10)}>
				<ArrowLeft
					height={verticalScale(16)}
					width={horizontalScale(9)}
					color={neutral.black}
				/>
			</Pressable>
			{title ? (
				<RNText
					title={title}
					numberOfLines={1}
					style={styles.titleStyle}
				/>
			) : null}
		</View>
	);
};

const UserMenuSection = ({ showCourses, toggleMegaMenu }: IUserMenuSection) => {
	const { navigate } = useAppNavigation();
	return (
		<View style={styles.loggedInHeaderRightContainer}>
			{showCourses ? (
				<Pressable onPress={toggleMegaMenu} style={styles.coursesBtn}>
					<RNText
						title={strings.COURSES}
						style={styles.coursesBtnText}
					/>
				</Pressable>
			) : null}
			<Pressable
				onPress={() =>
					navigate(ROOT_ROUTES.HomeStack, {
						screen: HOME_ROUTES.MyProfileScreen,
					})
				}
			>
				<ProfilePicture type={IProfilePictureType.SMALL} />
			</Pressable>
		</View>
	);
};

export default WebHeader;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: neutral.white,
		boxShadow: "2px 6px 8px 0px rgba(0, 0, 0, 0.04)",
		flexDirection: "row",
		height: verticalScale(60),
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(16),
		position: "relative",
		zIndex: 9,
	},
	coursesBtn: {
		alignItems: "center",
		borderColor: neutral.black,
		borderRadius: horizontalScale(6),
		borderWidth: 0.5,
		flexDirection: "row",
		gap: horizontalScale(4),
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(5),
	},
	coursesBtnText: {
		...md,
		...semiBold,
		color: neutral.black,
	},
	leftHeaderContainer: {
		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	loggedInHeaderRightContainer: {
		flexDirection: "row",
		gap: horizontalScale(10),
	},
	rightDummyView: {
		width: horizontalScale(54),
	},
	showBackContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(12),
		paddingLeft: horizontalScale(8),
		paddingRight: horizontalScale(46),
	},
	titleStyle: {
		...medium,
		...mid,
		color: neutral.black,
		lineHeight: verticalScale(22),
	},
});
