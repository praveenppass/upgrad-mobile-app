import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import TimerComponent from "@components/asset/assessment/common/TimerComponent";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { BottomButton } from "@interface/app.interface";
import { AssetModulepopup } from "@interface/assessment.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { AssetInfoIcon, AssetOverviewIcon } from "@assets/icons";

interface IAssestName {
	assestName?: string;
	isOverviewHide?: boolean;
	enableQuestionLevelTimer?: boolean;
	assestModel?: (data: string) => void;
	loader?: boolean;
	enableMoveOnlyForward?: boolean;
	openAssessmentModalData?: (data: string) => void;
	questionTimer?: number;
	questionHandler?: (data: string) => void;
	isLastQuestion?: boolean;
}

const ICON_SIZE = {
	width: moderateScale(20),
	height: moderateScale(20),
};

const { neutral } = colors;
const {
	commonStyles: {
		text: { regular, sm, lg },
	},
} = C;

const AssestName: React.FC<IAssestName> = ({
	enableQuestionLevelTimer,
	loader,
	assestName,
	isOverviewHide = false,
	assestModel,
	enableMoveOnlyForward,
	openAssessmentModalData,
	questionTimer,
	questionHandler,
	isLastQuestion,
}) => {
	const timesupHandler = () => {
		const level = isLastQuestion
			? BottomButton.TIMES_UP
			: BottomButton.NEXT;
		questionHandler(level);
	};
	return (
		<>
			<View style={styles.container}>
				<View style={styles.leftColumn}>
					{loader ? (
						<Skeleton dark style={styles.title} />
					) : (
						<RNText style={styles.title} title={assestName}>
							&nbsp;{" "}
							<TouchableOpacity
								onPress={() =>
									assestModel(AssetModulepopup.ASSET_INFO)
								}
								style={styles.iconButton}
							>
								<AssetInfoIcon
									{...ICON_SIZE}
									color={neutral.black}
									style={{ transform: [{ translateY: 5 }] }}
								/>
							</TouchableOpacity>
						</RNText>
					)}
				</View>
				{!isOverviewHide && !enableMoveOnlyForward && (
					<View style={styles.rightColumn}>
						<TouchableOpacity
							onPress={() => {
								openAssessmentModalData(
									AssetModulepopup.ASSET_OVERVIEW,
								);
							}}
						>
							<AssetOverviewIcon
								color={neutral.black}
								{...ICON_SIZE}
							/>
						</TouchableOpacity>
					</View>
				)}
			</View>
			{enableQuestionLevelTimer && (
				<View style={styles.timerComtainer}>
					<RNText
						style={styles.attemptText}
						title="Attempt this question in"
					/>
					<TimerComponent
						duration={questionTimer}
						type="question"
						onTimesUp={timesupHandler}
					/>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	attemptText: {
		...sm,
		...regular,
		lineHeight: verticalScale(17),
	},
	container: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: moderateScale(20),
		paddingVertical: moderateScale(10),
	},
	iconButton: {
		paddingRight: horizontalScale(10),
	},
	leftColumn: {
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
	},
	rightColumn: {
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: moderateScale(8),
	},
	timerComtainer: {
		alignItems: "flex-start",

		flexDirection: "row",
		gap: moderateScale(5),
		paddingHorizontal: horizontalScale(20),
	},
	title: {
		color: neutral.black,
		...lg,
		fontWeight: "bold",
		marginRight: moderateScale(4),
	},
});

export default React.memo(AssestName);
