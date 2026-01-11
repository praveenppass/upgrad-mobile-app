import React, { memo, useMemo } from "react";
import {
	Image,
	Pressable,
	StyleSheet,
	TextStyle,
	useWindowDimensions,
	View,
} from "react-native";
import { MixedStyleDeclaration } from "react-native-render-html";

import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { PinIcon } from "@assets/icons/svg/studyPlan";
import { commonStyles } from "@assets/styles";

const { semiBold, regular, sm, lightBold, xxSm } = commonStyles.text;
const { neutral, primary, state } = colors;

/**
 * NotificationCard - A reusable notification banner component for the study plan
 *
 * @constant {number} NOTIFICATION_CARD_WIDTH - Width ratio (0.9 = 90% of screen width)
 *
 * @enum {number} IBannerType - Banner types
 * @property {number} SPECIALIZATION - For upcoming specializations
 * @property {number} PRODUCTIVITY_GPT - For desktop login messages
 *
 * @param {function} onBannerPress - Callback when banner is pressed
 * @param {IBannerType} cardType - Required banner type (affects styling and content)
 * @param {number} specializationCount - Number for specialization count
 *
 * @returns {React.ReactElement} A pressable notification card with title, description and icon
 *
 */

export const NOTIFICATION_CARD_WIDTH = 0.9;

export enum IBannerType {
	SPECIALIZATION,
	PRODUCTIVITY_GPT,
}

export interface INotificationCard {
	onBannerPress: () => void;
	titleText: string;
	descriptionText?: string;
	secondaryText?: string;
	secondaryTextStyle?: TextStyle;
	disabled?: boolean;
	testID?: string;
	cardBGColor: string;
}

const NotificationCard = ({
	onBannerPress,
	titleText,
	descriptionText,
	secondaryText,
	secondaryTextStyle,
	disabled,
	testID,
	cardBGColor,
}: INotificationCard) => {
	const { width } = useWindowDimensions();

	const secondaryTextWrapped = useMemo(
		() => `<p>${secondaryText}</p>`,
		[secondaryText],
	);

	const secondaryMessageStyle = useMemo(
		() => ({
			p: {
				...styles.accessTime,
				...(secondaryTextStyle as unknown as Record<
					string,
					MixedStyleDeclaration
				>),
			},
		}),
		[secondaryTextStyle],
	);

	return (
		<Pressable
			style={[
				styles.container,
				{
					backgroundColor: cardBGColor,
					width: width * NOTIFICATION_CARD_WIDTH,
				},
			]}
			onPress={onBannerPress}
			disabled={disabled}
			testID={testID || "notification_card_pressable"}
		>
			<View style={styles.contentContainer}>
				<View style={styles.titleContainer}>
					<PinIcon
						width={horizontalScale(12)}
						height={verticalScale(12)}
						color={neutral.grey_08}
					/>
					<RNText title={titleText} style={styles.titleText} />
				</View>
				{descriptionText ? (
					<RNText
						title={descriptionText}
						style={styles.descriptionText}
						numberOfLines={3}
					/>
				) : null}
				{secondaryText ? (
					<RenderHtml
						content={secondaryTextWrapped}
						customStyles={secondaryMessageStyle}
					/>
				) : null}
			</View>
			<Image
				source={{ uri: IMAGE_URLS.DESKTOP_SPECIALIZATION_ICON }}
				style={styles.imageStyle}
			/>
		</Pressable>
	);
};

export default memo(NotificationCard);

const styles = StyleSheet.create({
	accessText: {
		...regular,
		color: neutral.grey_08,
		...sm,
		lineHeight: verticalScale(19),
	},
	accessTime: {
		...lightBold,
		...xxSm,
		color: primary.red_03,
		lineHeight: verticalScale(16),
	},
	container: {
		alignItems: "center",
		borderRadius: horizontalScale(8),
		boxShadow: `0 8px 14px 0 rgba(0, 0, 0, 0.04)`,
		flexDirection: "row",
		gap: horizontalScale(10),
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(16),
	},
	contentContainer: {
		flexShrink: 1,
		gap: verticalScale(4),
	},
	descriptionText: {
		...regular,
		color: neutral.grey_08,
		flex: 1,
		...sm,
		lineHeight: verticalScale(19),
	},
	expiredAccessMessage: {
		color: state.error_red,
	},
	imageStyle: {
		height: verticalScale(60),
		resizeMode: "contain",
		width: horizontalScale(60),
	},
	titleContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(4),
	},
	titleText: {
		...semiBold,
		color: neutral.grey_08,
		...sm,
		lineHeight: verticalScale(19),
	},
});
