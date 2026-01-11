import React, { memo, useCallback, useMemo } from "react";
import { Linking, Platform, Pressable, StyleSheet } from "react-native";
import Share, { Social } from "react-native-share";

import RNText from "@components/Reusable/RNText";
import {
	IShareButton,
	IShareType,
} from "@components/Reusable/ShareButton/shareButton.interface";
import { getShareIcon } from "@components/Reusable/ShareButton/shareButton.utils";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral, cta } = colors;
const { semiBold, sm } = commonStyles.text;

const STRINGS = createStringConstants({
	shareOn: "common.shareOn",
});

const BASE_ICON_PROPS = {
	width: horizontalScale(16),
	height: verticalScale(16),
	color: neutral.white,
};

const LINKEDIN_SHARE_URL = "https://www.linkedin.com/sharing/share-offsite";

const shareToLinkedIn = async (url: string, text: string) => {
	const linkedinShareUrl = new URL(LINKEDIN_SHARE_URL);
	linkedinShareUrl.searchParams.append("url", url);
	linkedinShareUrl.searchParams.append("text", text);

	await Linking.openURL(linkedinShareUrl.toString());
};

const isIOS = Platform.OS === "ios";

const ShareButton = ({
	shareType,
	certificateUrl,
	shareText,
	style,
}: IShareButton) => {
	const baseShareOptions = useMemo(
		() => ({
			...(certificateUrl && { url: certificateUrl }),
			message: shareText,
			appId: "",
		}),
		[shareText, certificateUrl],
	);

	const isShareTypeLinkedIn = useMemo(
		() => shareType === IShareType.LINKEDIN,
		[shareType],
	);

	const linkedinShareOptions = useMemo(
		() => ({
			...baseShareOptions,
			social: Share.Social.LINKEDIN as Social,
		}),
		[baseShareOptions],
	);

	const xShareOptions = useMemo(
		() => ({
			...baseShareOptions,
			social: Share.Social.TWITTER as Social,
		}),
		[baseShareOptions],
	);

	const handlePress = useCallback(() => {
		if (!certificateUrl) return;

		if (isIOS && isShareTypeLinkedIn)
			return shareToLinkedIn(certificateUrl, shareText);

		const shareOptions = isShareTypeLinkedIn
			? linkedinShareOptions
			: xShareOptions;

		Share.shareSingle(shareOptions);
	}, [
		isShareTypeLinkedIn,
		linkedinShareOptions,
		xShareOptions,
		certificateUrl,
		shareText,
	]);

	return (
		<Pressable style={[styles.container, style]} onPress={handlePress}>
			<RNText style={styles.text}>{getString(STRINGS.shareOn)}</RNText>
			{getShareIcon({ ...BASE_ICON_PROPS, shareType })}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: cta.fill.watch_recording,
		borderRadius: horizontalScale(8),
		flexDirection: "row",
		gap: horizontalScale(8),
		justifyContent: "center",
		paddingHorizontal: horizontalScale(14),
		paddingVertical: verticalScale(12),
	},
	text: {
		color: neutral.white,
		...semiBold,
		...sm,
	},
});

export default memo(ShareButton);
