import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";
import { IContainer3Data } from "@components/studyPlan/container3/Container3Component/container3Component.interface";
import ModuleDetailsCard from "@components/studyPlan/container3/ModuleDetailsCard";
import ModuleTabs from "@components/studyPlan/container3/ModuleTabs";

import {
	IAssetPenaltyConfiguration,
	IDeadlineExtensionMode,
} from "@graphql/query/studyPlan/container3/getContainer3ProgramQuery";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";

import { LearningPathType } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { reg, semiBold, sm, regular } = commonStyles.text;

interface IGetLabelString {
	isOptional: boolean;
	elective: string;
	track: string;
}

const getLabelString = ({ isOptional, elective, track }: IGetLabelString) => {
	if (isOptional) return getString("common.optional");
	if (elective) return getString("common.elective");
	if (track) return getString("common.track");
	return "";
};

interface IContainer3ListHeader {
	isOptional?: boolean;
	elective?: string;
	track?: string;
	courseName: string;
	selectedModuleIndex: number;
	onModuleCtaPress: (index: number) => void;
	moduleTabsData: IContainer3Data[];
	learningPathType: LearningPathType;
	hardDeadlineDays: number;
	dueDateExtensionMode?: IDeadlineExtensionMode;
	learningPathId: string;
	courseCode: string;
	penaltyConfigurationData?: IAssetPenaltyConfiguration[];
	refetchContainer3Data: () => void;
	totalExtensionsTaken: number;
	totalExtensionsAllowed: number;
}

const Container3ListHeader = ({
	isOptional,
	elective,
	track,
	courseName,
	selectedModuleIndex,
	onModuleCtaPress,
	moduleTabsData,
	learningPathType,
	hardDeadlineDays,
	dueDateExtensionMode,
	learningPathId,
	courseCode,
	penaltyConfigurationData,
	refetchContainer3Data,
	totalExtensionsTaken,
	totalExtensionsAllowed,
}: IContainer3ListHeader) => {
	const labelString = useMemo(
		() =>
			getLabelString({
				isOptional: isOptional || false,
				elective: elective || "",
				track: track || "",
			}),
		[isOptional, elective, track],
	);

	const selectedModule = moduleTabsData[selectedModuleIndex];

	const {
		dueAt = "",
		isExtended = false,
		isOptional: isOptionalModule = false,
		name = "",
		progress = 0,
		timeLeft = "",
		totalCompletedGradableAssets = 0,
		totalGradableAssets = 0,
		isLocked,
		status,
	} = selectedModule || {};

	return (
		<>
			<View style={styles.titleContainer}>
				{labelString ? (
					<RNText
						title={labelString}
						style={styles.title}
						numberOfLines={1}
						testID="container3_label"
					/>
				) : null}
				<RNText
					title={courseName}
					style={styles.courseName}
					numberOfLines={2}
				/>
			</View>
			<ModuleTabs
				moduleList={moduleTabsData}
				selectedModuleIndex={selectedModuleIndex}
				onModulePress={onModuleCtaPress}
			/>
			<ModuleDetailsCard
				title={name}
				timeLeft={timeLeft}
				totalGradableAssetsCount={totalGradableAssets}
				completedGradableAssetsCount={totalCompletedGradableAssets}
				progress={progress}
				isOptional={isOptionalModule}
				learningPathType={learningPathType}
				dueAt={dueAt}
				hardDeadlineDays={hardDeadlineDays}
				isDueDateExtended={isExtended}
				dueDateExtensionMode={dueDateExtensionMode}
				penaltyConfigurationData={penaltyConfigurationData}
				learningPathId={learningPathId}
				courseCode={courseCode}
				moduleCode={selectedModule?.code}
				isLocked={isLocked}
				refetchContainer3Data={refetchContainer3Data}
				totalExtensionsTaken={totalExtensionsTaken}
				totalExtensionsAllowed={totalExtensionsAllowed}
				status={status || ""}
			/>
		</>
	);
};

export default memo(Container3ListHeader);

const styles = StyleSheet.create({
	courseName: {
		...reg,
		...semiBold,
		lineHeight: verticalScale(22),
	},
	title: {
		...sm,
		...regular,
		color: neutral.grey_07,
		lineHeight: verticalScale(19),
	},
	titleContainer: {
		gap: verticalScale(4),
		marginBottom: verticalScale(16),
		paddingHorizontal: horizontalScale(16),
	},
});
