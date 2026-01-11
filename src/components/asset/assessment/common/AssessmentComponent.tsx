import { useRoute } from "@react-navigation/native";
import React, { memo } from "react";
import { ScrollView, View } from "react-native";

import AssessmentDetailsController from "@components/asset/assessment/common/useAssessmentDetailsController";
import AssetPenalty from "@components/asset/AssetPenalty/AssetPenalty";
import AssetFrame from "@components/asset/common/AssetFrame";
import AssetInstructions from "@components/asset/common/AssetInstructions";
import AssetSkillsList from "@components/asset/common/AssetSkillsList";
import DeadlineExtension from "@components/asset/deadlineExtension";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import {
	IAssessmentDetailsControllerLxp,
	IAssessmentDetailsViewProps,
} from "@interface/assessment.interface";

import { strings } from "@assets/strings";

import { assessmentDetailsViewStyles as styles } from "./assessmentDetails.syles";

export const AssessmentComponent = ({
	assessmentData,
	assessmentProgramInfo,
	showUnderStandModal,
	attemptId,
	pageData,
	loader,
	assetType,
	submittedDate,
	learningPathCode,
	isProgram,
	refetch,
	totalExtensionsAllowed,
	dueDateExtensionMode,
	comboCurriculumCode,
}: IAssessmentDetailsViewProps) => {
	const {
		startAssessment,
		assessment,
		assementControllerData,
		proctored,
		penalties,
		loadingAssetPenalty,
		originalDueDate,
		extendedDueDate,
		revertedPenalties,
	} = AssessmentDetailsController({
		pageData,
		attemptId,
		assessmentProgramInfo,
		assessmentComponentData: assessmentData,
		learningPathCode,
		isProgram,
		comboCurriculumCode,
	});

	const route = useRoute();

	const courseId = (route as { params?: IAssessmentDetailsControllerLxp })
		?.params?.courseId;
	const moduleId = (route as { params?: IAssessmentDetailsControllerLxp })
		?.params?.moduleId;

	const learningPathId = (
		route as {
			params?: IAssessmentDetailsControllerLxp;
		}
	)?.params?.learningPathId;

	const { instruction, skills, subSkills } = assessment || {};
	const { isReportbtn, btnDisabled, buttonTitle, pageLoader } =
		assementControllerData;
	const _pageLoader = loader || pageLoader;
	return (
		<View style={styles.containerView}>
			<View style={styles.frameView}>
				<AssetFrame
					assetType={assetType}
					assestData={pageData}
					showUnderStandModal={showUnderStandModal}
					isReportbtn={isReportbtn}
					style={styles.frameStyle}
					loader={loader}
				/>
				{pageLoader || loader ? (
					<Skeleton style={styles.customButtonSkelton} dark />
				) : proctored && !btnDisabled ? (
					<View style={styles.proctorViewStyle}>
						<RNText
							style={styles.proctorTxtStyle}
							title={strings.PROCTOR_TXT}
						/>
					</View>
				) : (
					<CommonButton
						title={buttonTitle}
						onPress={startAssessment}
						isDisabled={btnDisabled}
						variant={IButtonVariant.Primary}
					/>
				)}
			</View>

			<ScrollView
				style={styles.scrollview}
				showsVerticalScrollIndicator={false}
			>
				<DeadlineExtension
					extendedDueDate={extendedDueDate}
					originalDueDate={originalDueDate}
					extensionRequests={assessmentData?.extensionRequests ?? []}
					courseId={courseId ?? ""}
					moduleId={moduleId ?? ""}
					learningPathId={learningPathId ?? ""}
					dueDateExtensionMode={dueDateExtensionMode || null}
					totalExtensionsAllowed={totalExtensionsAllowed || null}
					totalExtensionsTaken={
						assessmentData?.userProgram?.totalExtensionsTaken ||
						null
					}
					submittedDate={submittedDate ?? ""}
					style={styles.extensionSpacing}
					isExtensionRegained={
						assessmentData?.isExtensionRegained ?? false
					}
					onSubmit={refetch}
					penalties={revertedPenalties}
					loading={_pageLoader}
				/>
				<AssetPenalty
					penalties={penalties}
					loading={loadingAssetPenalty}
					style={styles.penaltySpacing}
				/>
				<AssetInstructions
					html={instruction ?? ""}
					loading={_pageLoader}
					style={styles.component}
				/>

				<AssetSkillsList
					data={(skills as any) ?? []}
					title={strings.SKILLS}
					loading={_pageLoader ?? false}
					style={styles.component}
				/>

				<AssetSkillsList
					data={(subSkills as any) ?? []}
					title={strings.SUB_SKILLS}
					loading={_pageLoader ?? false}
					style={styles.component}
				/>
			</ScrollView>
		</View>
	);
};

export default memo(AssessmentComponent);
