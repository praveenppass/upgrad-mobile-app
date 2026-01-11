import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import TimerComponent from "@components/asset/assessment/common/TimerComponent";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { BottomButton } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";

import { C } from "@assets/constants";
import { ArrowLeft } from "@assets/icons";
import { strings } from "@assets/strings";

const {
	commonStyles: {
		spacing: { pr8 },
		align: { itemsCenter },
	},
	colors: { neutral },
} = C;

interface IAssetQuizHeader {
	assetType: string;
	questionHandler: (data: string) => void;
	assessmentTimer?: number | undefined;
	isLastQuestion: boolean;
	previewMode?: boolean;
	loading?: boolean;
	slowNetworkLoader?: boolean;
}

const AssetQuizheader = ({
	assetType,
	questionHandler,
	assessmentTimer,
	isLastQuestion,
	previewMode,
	loading,
	slowNetworkLoader,
}: IAssetQuizHeader) => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={styles.headerContent}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					style={[styles.backButton, itemsCenter]}
				>
					<ArrowLeft color={neutral.black} />
				</TouchableOpacity>

				<View style={styles.rightContainer}>
					{assetType === IAssetType.ASSESSMENT && (
						<TimerComponent
							duration={assessmentTimer * 60}
							type="assessmentTimer"
							onTimesUp={() =>
								questionHandler(BottomButton.TIMES_UP)
							}
						/>
					)}
					{isLastQuestion ? (
						<></>
					) : (
						<CommonButton
							variant={IButtonVariant.Primary}
							onPress={() => {
								questionHandler(
									previewMode
										? BottomButton.CLOSE
										: BottomButton.FINISH,
								);
							}}
							title={
								previewMode
									? strings.CLOSE
									: strings.FINISH_QUIZ
							}
							isLoading={loading || slowNetworkLoader}
							style={styles.finishButton}
						/>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	backButton: {
		height: verticalScale(40),
		width: horizontalScale(40),
	},
	container: {
		height: Platform.OS === "android" ? verticalScale(90) : "auto",
		marginBottom: horizontalScale(7),
		paddingHorizontal: horizontalScale(8), // Explicit height for the header
	},
	finishButton: {
		borderRadius: 6,
		height: verticalScale(40),
		width: horizontalScale(70),
	},
	headerContent: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between", // Centers items vertically
	},
	rightContainer: {
		alignItems: "center",
		alignSelf: "flex-end",
		flexDirection: "row",
		justifyContent: "space-between",
		...pr8,
		marginBottom: moderateScale(5),
	},
});

export default memo(AssetQuizheader);
