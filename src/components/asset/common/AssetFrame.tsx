import React, { memo } from "react";
import {
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";

import AssetFrameController from "@components/asset/common/useAssetFrameController";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import {
	AttemptsIcon,
	PercentageIcon,
	QuestionMarkRed,
	TimerLeftIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";

const {
	themes: { text },
	commonStyles: {
		spacing: { mt6 },
		text: { med, semiBold },
	},
} = C;

interface IAssessmentFrameProps {
	assestData: object | undefined;
	style: StyleProp<ViewStyle>;
	isReportbtn?: boolean;
	showUnderStandModal?: () => void;
	assetType?: string;
	loader?: boolean;
}

const ICON_SIZE_16 = {
	width: moderateScale(16),
	height: moderateScale(16),
};
const ICON_SIZE_24 = {
	width: moderateScale(24),
	height: moderateScale(24),
};

const AssetFrame = ({
	assestData,
	showUnderStandModal,
	isReportbtn,
	assetType,
	loader = true,
}: IAssessmentFrameProps) => {
	const { assetFrameData } = AssetFrameController({ assestData, assetType });
	const { totalQuestion, duration, passPercentage, titleText } =
		assetFrameData;
	const viewsData = [
		{
			icon: (
				<View style={styles.percentageView}>
					<PercentageIcon {...ICON_SIZE_16} />
				</View>
			),
			text: passPercentage && `${passPercentage}% to Pass`,
		},
		{
			icon: <QuestionMarkRed {...ICON_SIZE_24} />,
			text: totalQuestion && `${totalQuestion} Questions`,
		},
		{
			icon: <TimerLeftIcon {...ICON_SIZE_24} />,
			text: duration && `${duration} Mins`,
		},
		{
			icon: <AttemptsIcon {...ICON_SIZE_24} />,
			text: titleText && titleText,
			showReport: isReportbtn,
		},
	].filter((item) => item.text);

	return (
		<View style={styles.container}>
			{loader
				? [...Array(4)].map((_, index) => (
						<View key={index} style={styles.itemContainer}>
							<Skeleton style={{ ...ICON_SIZE_24 }} dark />
							<Skeleton style={styles.textSkelton} dark />
						</View>
					))
				: viewsData.map((view, index) => (
						<View key={index} style={styles.itemContainer}>
							{view.icon}
							<RNText
								title={view.text}
								style={[med, mt6, semiBold, styles.txtCenter]}
							/>
							{view.showReport && (
								<TouchableOpacity
									style={styles.report}
									onPress={() => showUnderStandModal?.()}
								>
									<RNText style={styles.viewReport}>
										{strings.VIEW_REPORT}
									</RNText>
								</TouchableOpacity>
							)}
						</View>
					))}
		</View>
	);
};

export default memo(AssetFrame);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		justifyContent: "space-between",
	},
	itemContainer: {
		alignItems: "center",
		borderRadius: 8,
		padding: moderateScale(10),
		width: "48%",
	},
	percentageView: {
		alignItems: "center",
		backgroundColor: "#EFF8FF", //waiting for figma change
		borderRadius: moderateScale(15),
		height: verticalScale(24),
		justifyContent: "center",
		width: horizontalScale(24),
	},
	report: {
		alignItems: "flex-end",
		display: "flex",
		justifyContent: "center",
	},
	textSkelton: {
		height: verticalScale(15),
		marginTop: verticalScale(10),
		width: horizontalScale(110),
	},
	txtCenter: {
		color: text.dark,
		textAlign: "center",
	},
	viewReport: {
		color: colors.neutral.grey_07,
		textDecorationLine: "underline",
	},
});
