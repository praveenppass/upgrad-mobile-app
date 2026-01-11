import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import {
	handleRemindLater,
	handleUpdateNow,
} from "@screens/AppUpdateScreen/appUpdate.util";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IAppUpdateState } from "@interface/appUpdate.interface";
import { RootStackRouteProps } from "@interface/types/rootStack.type";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, cta, content, bg } = colors;

const { medium, reg } = commonStyles.text;

const BodyComponent = () => {
	const route = useRoute<RootStackRouteProps<"AppUpdateScreen">>();

	const { appUpdateState } = route.params;

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: IMAGE_URLS.UPDATE_ICON }}
				style={styles.image}
				resizeMode="contain"
			/>
			<View style={styles.textContainer}>
				<RNText
					title={strings.ITS_TIME_TO_UPDATE}
					style={styles.timeStyle}
				/>
				<RNText
					title={strings.GET_THE_LATEST}
					style={styles.desStyle}
				/>
				<CommonButton
					title={strings.UPDATE_NOW}
					variant={IButtonVariant.Primary}
					onPress={handleUpdateNow}
					style={styles.ctaContainerParent}
				/>
				{appUpdateState !== IAppUpdateState.FORCE_UPDATE ? (
					<Pressable onPress={handleRemindLater}>
						<RNText
							title={strings.REMIND_ME_LATER}
							style={styles.remindText}
						/>
					</Pressable>
				) : (
					<></>
				)}
			</View>
		</View>
	);
};

const AppUpdateScreen = () =>
	WithHeaderLxp({
		BodyComponent,
		showProfile: false,
		backgroundColor: bg.fill.bg_default,
	});

const styles = StyleSheet.create({
	container: { flex: 1 },
	ctaContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(4),
		justifyContent: "center",
		paddingVertical: verticalScale(16),
		width: "100%",
	},
	ctaContainerParent: {
		marginTop: verticalScale(40),
		width: "100%",
	},
	desStyle: {
		color: neutral.grey_07,
		...reg,
		...medium,
		marginTop: verticalScale(12),
		textAlign: "center",
	},
	image: {
		height: verticalScale(344),
		marginTop: verticalScale(75),
		width: "100%",
	},
	remindText: {
		color: neutral.grey_07,
		...reg,
		...medium,
		lineHeight: verticalScale(19),
		marginTop: verticalScale(12),
		textAlign: "center",
	},
	textContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginEnd: horizontalScale(11),
		marginStart: horizontalScale(16),
		marginTop: -verticalScale(70),
		paddingHorizontal: horizontalScale(17),
	},
	textWhite: {
		color: cta.text.default_primary,
		...reg,
		...medium,
		lineHeight: verticalScale(19),
		textAlign: "center",
	},
	timeStyle: {
		color: content.text.default_red_primary,
		...reg,
		...medium,
		lineHeight: verticalScale(19),
		textAlign: "center",
	},
});

export default AppUpdateScreen;
