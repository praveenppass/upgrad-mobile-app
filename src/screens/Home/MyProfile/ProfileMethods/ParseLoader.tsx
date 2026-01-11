import LottieView from "lottie-react-native";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import LinkedInLoader from "@assets/animations/linkedin-loader.json";
import ResumeLoader from "@assets/animations/resume-loader.json";
import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { md, medium } = commonStyles.text;

const STRINGS = createStringConstants({
	linkedinSync: "studyPlan.profileSetup.loader.linkedinSync",
	resumeParse: "studyPlan.profileSetup.loader.resumeParse",
});

enum IParseLoaderType {
	LINKEDIN,
	RESUME,
}

interface IParseLoaderProps {
	linkedinLoading: boolean;
	resumeLoading: boolean;
	hideText?: boolean;
}

const getLoaderType = (linkedinLoading: boolean, resumeLoading: boolean) => {
	if (linkedinLoading) return IParseLoaderType.LINKEDIN;
	if (resumeLoading) return IParseLoaderType.RESUME;
	return null;
};

const getLoaderText = (loaderType: IParseLoaderType | null) => {
	switch (loaderType) {
		case IParseLoaderType.LINKEDIN:
			return getString(STRINGS.linkedinSync);
		case IParseLoaderType.RESUME:
			return getString(STRINGS.resumeParse);
		default:
			return "";
	}
};

const getLoader = (loaderType: IParseLoaderType | null) => {
	if (loaderType === IParseLoaderType.LINKEDIN) return LinkedInLoader;
	return ResumeLoader;
};

const ParseLoader = ({
	linkedinLoading,
	resumeLoading,
	hideText = false,
}: IParseLoaderProps) => {
	const loaderType = getLoaderType(linkedinLoading, resumeLoading);
	const loaderText = getLoaderText(loaderType);
	const loader = getLoader(loaderType);

	return (
		<View style={styles.container}>
			<LottieView source={loader} autoPlay loop style={styles.loader} />
			{!hideText && (
				<RNText title={loaderText} style={styles.loaderText} />
			)}
		</View>
	);
};

export default memo(ParseLoader);

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	loader: {
		height: horizontalScale(70),
		width: horizontalScale(70),
	},
	loaderContainer: {
		backgroundColor: neutral.grey_05,
		borderRadius: 100,
		height: 100,
		width: 100,
	},
	loaderText: {
		...md,
		...medium,
		color: neutral.black,
		lineHeight: verticalScale(14),
		marginTop: verticalScale(10),
		textAlign: "center",
	},
});
