import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import RNText from "@components/Reusable/RNText";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import {
	ArrowBackIcon,
	ArrowForwardIcon,
	ListIcon,
	NotesIcon,
	ReportIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

interface IAssetNavigation {
	onPrevAssetPress?: () => void;
	onNextAssetPress?: () => void;
	hidePrevAsset?: boolean;
	hideNextAsset?: boolean;
	onModuleListPress?: () => void;
	onReportAnErrorPress?: () => void;
	onNotesPress?: () => void;
	loading?: boolean;
	totalNotes: number;
	disableNotes?: boolean;
	disableReport?: boolean;
	disableModuleList?: boolean;
}

const { neutral } = colors;
const { md, bold } = commonStyles.text;

const renderIconColor = (disable?: boolean) => {
	return disable ? neutral.grey_05 : neutral.grey_07;
};

const AssetNavigation = ({
	onPrevAssetPress,
	onNextAssetPress,
	hidePrevAsset,
	hideNextAsset,
	onModuleListPress,
	onReportAnErrorPress,
	onNotesPress,
	loading,
	totalNotes,
	disableNotes,
	disableReport,
	disableModuleList,
}: IAssetNavigation) => (
	<View>
		<LinearGradient
			style={styles.changeAssetContainer}
			colors={[
				`${neutral.white}00`,
				neutral.white,
				neutral.white,
				neutral.white,
			]}
		>
			<View style={styles.prevNextButtonsContainer}>
				<Pressable
					style={styles.changeAsset}
					onPress={() => {
						!loading && onPrevAssetPress?.();
					}}
					testID="prevAssetPressable"
				>
					<ArrowBackIcon
						height={verticalScale(13)}
						width={horizontalScale(8)}
						color={
							!loading && hidePrevAsset
								? colors.neutral.grey_04
								: colors.neutral.grey_07
						}
					/>
					<RNText
						style={[
							styles.buttonText,
							!loading &&
								hidePrevAsset &&
								styles.buttonTextDisabled,
						]}
						title={strings.PREV}
					/>
				</Pressable>

				<Pressable
					style={styles.changeAsset}
					onPress={() => {
						!loading && onNextAssetPress?.();
					}}
					testID="nextAssetPressable"
				>
					<RNText
						style={[
							styles.buttonText,
							!loading &&
								hideNextAsset &&
								styles.buttonTextDisabled,
						]}
						title={strings.NEXT}
					/>
					<ArrowForwardIcon
						height={verticalScale(13)}
						width={horizontalScale(8)}
						color={
							!loading && hideNextAsset
								? colors.neutral.grey_04
								: colors.neutral.grey_07
						}
					/>
				</Pressable>
			</View>
		</LinearGradient>

		<View style={styles.viewContainer}>
			<Pressable
				onPress={onModuleListPress}
				disabled={disableModuleList}
				style={styles.navigationItem}
				testID="moduleListPressable"
			>
				<ListIcon
					width={horizontalScale(25)}
					height={horizontalScale(25)}
					color={renderIconColor(disableModuleList)}
				/>
			</Pressable>
			<Pressable
				style={styles.navigationItem}
				disabled={disableNotes}
				onPress={onNotesPress}
				testID="notesPressable"
			>
				<View>
					<NotesIcon
						width={horizontalScale(25)}
						height={horizontalScale(25)}
						color={renderIconColor(disableNotes)}
					/>
					<View style={styles.notesIconContainer}>
						<RNText
							title={totalNotes > 0 ? totalNotes : `+`}
							style={styles.countTxt}
						/>
					</View>
				</View>
			</Pressable>
			<Pressable
				style={styles.navigationItem}
				disabled={disableReport}
				onPress={onReportAnErrorPress}
				testID="reportPressable"
			>
				<ReportIcon
					width={horizontalScale(25)}
					height={horizontalScale(25)}
					color={renderIconColor(disableReport)}
				/>
			</Pressable>
		</View>
	</View>
);

const styles = StyleSheet.create({
	buttonText: {
		...md,
		...bold,
		color: neutral.grey_07,
	},
	buttonTextDisabled: {
		color: colors.neutral.grey_04,
	},
	changeAsset: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(6),
		paddingHorizontal: horizontalScale(8),
	},
	changeAssetContainer: {
		flexDirection: "row",
		height: verticalScale(60),
		justifyContent: "space-between",
		position: "absolute",
		top: -verticalScale(60),
	},
	countTxt: {
		color: neutral.white,
		...bold,
		fontSize: moderateScale(6),
		lineHeight: verticalScale(6),
	},
	navigationItem: {
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: neutral.white,
		flex: 1,
		justifyContent: "center",
	},
	notesIconContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(12),
		bottom: 0,
		height: horizontalScale(12),
		justifyContent: "center",
		position: "absolute",
		right: 0,
		width: horizontalScale(12),
	},
	prevNextButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(24),
		width: "100%",
	},
	shadowContainer: {
		backgroundColor: neutral.white,
		flexDirection: "row",
		height: verticalScale(62),
	},
	viewContainer: {
		backgroundColor: neutral.white,
		boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
		flexDirection: "row",
		paddingBottom: verticalScale(10),
		paddingTop: verticalScale(20),
	},
});

export default AssetNavigation;
