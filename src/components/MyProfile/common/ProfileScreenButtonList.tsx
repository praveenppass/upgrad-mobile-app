import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
	LayoutAnimation,
	Platform,
	ScrollView,
	StyleProp,
	StyleSheet,
	TextStyle,
	UIManager,
	ViewStyle,
} from "react-native";
import DeviceInfo from "react-native-device-info";

import { getTimezonePrefixOffset } from "@components/MyProfile/common/profile.util";
import ProfileScreenButton from "@components/MyProfile/common/ProfileScreenButton";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";
import useGetUserType from "@hooks/useGetUserType";

import { horizontalScale, verticalScale } from "@utils/functions";
import { handleOpenInAppBrowser } from "@utils/web.utils";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { PROFILE_SECTIONS } from "@constants/profile.constants";

import { colors } from "@assets/colors";
import {
	AbroadDashboardIcon,
	AppliedJobsIcon,
	ArrowDownSmIcon,
	ArrowUpSmIcon,
	CertificatesIcon,
	DeleteAccountIcon,
	HelpAndSupportIcon,
	LogOutIcon,
	MyAccountIcon,
	MyApplicationsIcon,
	WorldClockIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, highlight } = colors;
const { sm, regular } = commonStyles.text;

interface IProfileScreenConfig {
	title: string;
	icon?: React.ReactElement;
	extraText?: string;
	onPress: () => void;
	isDropdown?: boolean;
	subItems?: IProfileScreenConfig[];
	textStyle?: StyleProp<TextStyle>;
	testID?: string;
}
// Updated interface to support textStyle
const isPlatformIOS = Platform.OS === "ios";

if (!isPlatformIOS && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface IProfileScreenButtonList {
	onLogout: () => void;
	onDeleteAccount: () => void;
	saProfile: boolean;
	saToken: string;
	abroadDashboardUrl: string;
}
interface IDropdownIconProps {
	visible: boolean;
	expanded: boolean;
	style?: StyleProp<ViewStyle>;
}

const deviceVersion = DeviceInfo.getVersion();

const ProfileScreenButtonList = ({
	onLogout,
	onDeleteAccount,
	saProfile,
	saToken,
	abroadDashboardUrl,
}: IProfileScreenButtonList) => {
	const navigation = useNavigation<RootHomeStackList>();
	const { offset: timezoneOffset } = useGetTimezone();
	const { isLearnUser } = useGetUserType();
	const [isMyAccountExpanded, setIsMyAccountExpanded] = useState(false);

	const version = useMemo(() => {
		const _version = __COMMIT_ID__
			? `${deviceVersion} (${__COMMIT_ID__})`
			: deviceVersion;

		return `${strings.VERSION}${_version}`;
	}, [__COMMIT_ID__]);

	const toggleMyAccountDropdown = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		setIsMyAccountExpanded(!isMyAccountExpanded);
	};

	const myAccountSubItems: IProfileScreenConfig[] = useMemo(
		() => [
			{
				title: strings.PERSONAL_DETAILS,
				onPress: () =>
					navigation.navigate("ProfileWebView", {
						section: PROFILE_SECTIONS.PERSONAL_DETAILS,
						title: strings.PROFILE,
					}),
				textStyle: styles.subItemTextStyle,
				testID: "personal-details-button",
			},
			{
				title: strings.EDUCATION,
				onPress: () =>
					navigation.navigate("ProfileWebView", {
						section: PROFILE_SECTIONS.EDUCATIONAL_DETAILS,
						title: strings.PROFILE,
					}),
				textStyle: styles.subItemTextStyle,
				testID: "education-button",
			},
			{
				title: strings.PROFESSIONAL_EXPERIENCE,
				onPress: () =>
					navigation.navigate("ProfileWebView", {
						section: PROFILE_SECTIONS.PROFESSIONAL_EXPERIENCE,
						title: strings.PROFILE,
					}),
				textStyle: styles.subItemTextStyle,
				testID: "professional-experience-button",
			},
			{
				title: strings.ASPIRATIONS_AND_PREFERENCES,
				onPress: () =>
					navigation.navigate("ProfileWebView", {
						section: PROFILE_SECTIONS.ASPIRATIONS_AND_PREFERENCE,
						title: strings.PROFILE,
					}),
				textStyle: styles.subItemTextStyle,
				testID: "aspirations-preferences-button",
			},
		],
		[navigation],
	);

	const profileButtonConfig: IProfileScreenConfig[] = useMemo(
		() => [
			{
				title: strings.PROFILE,
				icon: <MyAccountIcon style={styles.iconStyle} />,
				onPress: toggleMyAccountDropdown,
				isDropdown: true,
				subItems: myAccountSubItems,
				testID: "my-account-button",
			},
			...(isLearnUser
				? [
						{
							title: strings.MY_TIMEZONE,
							icon: <WorldClockIcon style={styles.iconStyle} />,
							extraText: getTimezonePrefixOffset(timezoneOffset),
							onPress: () =>
								navigation.navigate("MyProfileTimezone"),
							testID: "my-timezone-button",
						},
					]
				: []),
			{
				title: strings.MY_APPLICATIONS,
				icon: <MyApplicationsIcon style={styles.subIconStyle} />,
				onPress: () =>
					navigation.navigate("ProfileWebView", {
						section: PROFILE_SECTIONS.MY_APPLICATIONS,
						title: strings.MY_APPLICATIONS,
					}),
				testID: "my-applications-button",
			},
			{
				title: strings.CERTIFICATES,
				icon: <CertificatesIcon style={styles.subIconStyle} />,
				onPress: () =>
					navigation.navigate("ProfileWebView", {
						section: PROFILE_SECTIONS.MY_CERTIFICATES,
						title: strings.CERTIFICATES,
					}),
				testID: "certificates-button",
			},
			{
				title: strings.APPLIED_JOBS,
				icon: <AppliedJobsIcon style={styles.subIconStyle} />,
				onPress: () =>
					navigation.navigate("ProfileWebView", {
						section: PROFILE_SECTIONS.APPLIED_JOBS,
						title: strings.APPLIED_JOBS,
					}),
				testID: "applied-jobs-button",
			},
			...(saProfile && saToken
				? [
						{
							title: strings.ABROAD_DASHBOARD,
							icon: (
								<AbroadDashboardIcon
									style={styles.subIconStyle}
								/>
							),
							onPress: () => {
								handleOpenInAppBrowser(abroadDashboardUrl);
							},
							testID: "abroad-dashboard-button",
						},
					]
				: []),
			...(isLearnUser
				? [
						{
							icon: (
								<HelpAndSupportIcon style={styles.iconStyle} />
							),
							title: strings.HELP_AND_SUPPORT,
							onPress: () => navigation.navigate("HelpSupport"),
							testID: "help-support-button",
						},
					]
				: []),
			...(isPlatformIOS
				? [
						{
							icon: (
								<DeleteAccountIcon style={styles.iconStyle} />
							),
							title: strings.DELETE_ACCOUNT,
							onPress: onDeleteAccount,
							testID: "delete-account-button",
						},
					]
				: []),
			{
				title: strings.LOG_OUT,
				icon: (
					<LogOutIcon style={[styles.iconStyle, styles.iconSize]} />
				),
				onPress: onLogout,
				testID: "logout-button",
			},
		],
		[
			myAccountSubItems,
			timezoneOffset,
			saProfile,
			abroadDashboardUrl,
			navigation,
			onDeleteAccount,
			onLogout,
			toggleMyAccountDropdown,
		],
	);
	const DropdownIcon = ({ visible, expanded, style }: IDropdownIconProps) => {
		if (!visible) return null;

		const Icon = expanded ? ArrowUpSmIcon : ArrowDownSmIcon;

		return <Icon style={[styles.dropdownIcon, style]} />;
	};

	return (
		<ScrollView
			style={styles.scrollViewStyle}
			bounces={false}
			showsVerticalScrollIndicator={false}
		>
			{profileButtonConfig.map(
				(
					{ onPress, title, extraText, icon, subItems, testID },
					index,
				) => {
					const isLastButton =
						index === profileButtonConfig.length - 1;
					const isMyProfileButton = title === strings.PROFILE;
					const shouldRenderSubItems =
						isMyProfileButton && isMyAccountExpanded && subItems;
					return (
						<React.Fragment key={title}>
							<ProfileScreenButton
								icon={icon}
								title={title}
								extraText={extraText ?? ""}
								onBtnHandler={onPress}
								withDivider={
									!isMyProfileButton ||
									(!isMyAccountExpanded && !isLastButton)
								}
								style={
									isLastButton &&
									!isMyProfileButton &&
									styles.profileBtnEnd
								}
								dropdownIcon={
									<DropdownIcon
										visible={isMyProfileButton}
										expanded={isMyAccountExpanded}
										style={styles.dropdownIcon}
									/>
								}
								testID={testID}
							/>
							{shouldRenderSubItems ? (
								<>
									{subItems.map((subItem, subIndex) => {
										const isLastSubItem =
											subIndex === subItems.length - 1;
										return (
											<ProfileScreenButton
												key={subItem.title}
												icon={subItem.icon}
												title={subItem.title}
												extraText={
													subItem.extraText ?? ""
												}
												onBtnHandler={subItem.onPress}
												withDivider={false}
												style={[
													styles.subItemStyle,
													isLastSubItem &&
														isLastButton &&
														styles.profileBtnEnd,
												]}
												textStyle={subItem.textStyle}
												hideIcon={true}
												testID={subItem.testID}
											/>
										);
									})}
								</>
							) : null}
						</React.Fragment>
					);
				},
			)}
			<RNText title={version} style={styles.versionTxt} />
		</ScrollView>
	);
};

export default ProfileScreenButtonList;

const styles = StyleSheet.create({
	dropdownIcon: {
		color: highlight.text_blue,
		height: horizontalScale(12),
		width: horizontalScale(12),
	},
	iconSize: {
		height: horizontalScale(12),
		width: horizontalScale(12),
	},
	iconStyle: {
		color: highlight.text_blue,
		height: horizontalScale(14),
		width: horizontalScale(14),
	},
	profileBtnEnd: {
		borderBottomEndRadius: horizontalScale(8),
		borderBottomStartRadius: horizontalScale(8),
	},
	scrollViewStyle: {
		backgroundColor: neutral.grey_02,
		borderBottomEndRadius: horizontalScale(8),
		borderBottomStartRadius: horizontalScale(8),
	},
	subIconStyle: {
		color: highlight.text_blue,
		height: horizontalScale(12),
		width: horizontalScale(12),
	},
	subItemStyle: {
		backgroundColor: neutral.white,
		paddingLeft: horizontalScale(52),
	},
	subItemTextStyle: {
		...sm,
		...regular,
		color: neutral.grey_07,
	},
	versionTxt: {
		color: neutral.grey_07,
		...sm,
		...regular,
		marginTop: verticalScale(14),
		textAlign: "center",
	},
	versionView: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: verticalScale(14),
	},
});
