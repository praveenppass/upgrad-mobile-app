import React from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import ModuleExtension from "@components/moduleExtension";
import RNText from "@components/Reusable/RNText";
import useExtendDueDateController from "@components/studyPlan/container3/ExtendDueDate/useExtendDueDateController";

import {
	IAssetPenaltyConfiguration,
	IDeadlineExtensionMode,
} from "@graphql/query/studyPlan/container3/getContainer3ProgramQuery";

import { verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { sm, bold } = commonStyles.text;

interface IExtendDueDate {
	courseCode: string | null;
	moduleCode: string | null;
	learningPathId: string | null;
	onSubmit: () => void;
	style?: StyleProp<ViewStyle>;
	penaltyConfigurationData?: IAssetPenaltyConfiguration[];
	totalGradableAssets: number;
	dueDateExtensionMode?: IDeadlineExtensionMode | null;
	dueDate: string;
	hardDeadlineDays: number;
	isDueDateExtended: boolean;
	totalCompletedGradableAssets: number;
	moduleName: string;
	totalExtensionsTaken: number;
	totalExtensionsAllowed: number;
	status: string;
}

const ExtendDueDate = ({
	courseCode,
	moduleCode,
	learningPathId,
	dueDateExtensionMode,
	penaltyConfigurationData,
	style,
	onSubmit,
	dueDate,
	hardDeadlineDays,
	isDueDateExtended,
	totalGradableAssets,
	totalCompletedGradableAssets,
	moduleName,
	totalExtensionsTaken,
	totalExtensionsAllowed,
	status,
}: IExtendDueDate) => {
	const {
		isModuleExtensionModalVisible,
		setModuleExtensionModalVisibility,
		revertedPenalties,
		ctaText,
		originalDueDate,
		extendedDueDate,
		showExtensionButton,
	} = useExtendDueDateController({
		penaltyConfigurationData,
		dueDate,
		hardDeadlineDays,
		isDueDateExtended,
		dueDateExtensionMode,
		totalExtensionsTaken,
		totalExtensionsAllowed,
		status,
	});

	if (!totalGradableAssets || !showExtensionButton) return null;

	return (
		<View style={[styles.main, style]}>
			<View>
				<Pressable
					onPress={() => setModuleExtensionModalVisibility(true)}
					style={styles.extendButton}
					hitSlop={5}
					testID="container3_description_extend_due_date_button"
				>
					<RNText style={styles.extendButtonText}>{ctaText}</RNText>
				</Pressable>
			</View>

			<ModuleExtension
				courseId={courseCode ?? ""}
				initialDueDate={originalDueDate ?? ""}
				extendedDueDate={extendedDueDate ?? ""}
				moduleId={moduleCode ?? ""}
				learningPathId={learningPathId ?? ""}
				isVisible={isModuleExtensionModalVisible}
				setVisible={setModuleExtensionModalVisibility}
				penalties={revertedPenalties}
				isExtensionApplied={isDueDateExtended}
				onSubmit={onSubmit}
				totalCompletedGradableAssets={totalCompletedGradableAssets}
				totalGradableAssets={totalGradableAssets}
				moduleName={moduleName}
			/>
		</View>
	);
};

export default ExtendDueDate;

const styles = StyleSheet.create({
	extendButton: {
		alignSelf: "flex-start",
		marginTop: verticalScale(8),
	},

	extendButtonText: {
		color: colors.neutral.black,
		...bold,
		...sm,
		lineHeight: verticalScale(18),
		textDecorationLine: "underline",
	},

	main: {
		// backgroundColor: "red",
	},
});
