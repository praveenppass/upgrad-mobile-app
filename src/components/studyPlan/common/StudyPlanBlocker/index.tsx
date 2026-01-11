import React, { memo, useState } from "react";
import { View } from "react-native";

import CourseCompletionModal from "@components/microInteractions/CourseCompletionModal";
import FirstAssetCompletionModal from "@components/microInteractions/FirstAssetCompletionModal";
import OnboardingModal, {
	IOnboardingMicroInteractionModalType,
} from "@components/microInteractions/OnboardingModal";
import ModuleFeedbackModal from "@components/studyPlan/common/ModuleFeedbackModal";
import ProfileBlocker from "@components/studyPlan/common/StudyPlanBlocker/ProfileBlocker";
import ProgramUpgradedModal from "@components/studyPlan/common/StudyPlanBlocker/ProgramUpgradedModal";
import { IStudyPlanBlocker } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";
import SurveyBlocker from "@components/studyPlan/common/StudyPlanBlocker/SurveyBlocker";
import SurveyBlockerSuccessModal from "@components/studyPlan/common/StudyPlanBlocker/SurveyBlocker/SurveyBlockerSuccessModal";
import useStudyPlanBlockerController from "@components/studyPlan/common/StudyPlanBlocker/useStudyPlanBlockerController";

const StudyPlanBlocker = (props: IStudyPlanBlocker) => {
	const {
		surveyBlockerData,
		learningPathType,
		learningPathId,
		courseId,
		moduleId,
		feedbackData,
	} = props;

	const {
		isSurveyBlockerVisible,
		isProfileBlockerVisible,
		isSuccessModalVisible,
		profileConfigList,
		handleSurveyBlockerSubmit,
		handleSurveyBlockerClose,
		handleSuccessModalClose,
		handleNavigateToProfileSection,
		handleProfileBlockerClose,
		isProgramUpgradedModalVisible,
		handleProgramUpgradedModalClose,
		isCertificateModalVisible,
		handleCertificateModalClose,
		notNotifiedCertificate,
		isFirstAssetCompletionModalVisible,
		handleFirstAssetCompletionModalClose,

		isOnboardingModalVisible,
		handleOnboardingModalClose,
		isModuleFeedbackModalVisible,
		handleModuleFeedbackModalClose,
	} = useStudyPlanBlockerController(props);

	return (
		<View>
			<SurveyBlocker
				isVisible={isSurveyBlockerVisible}
				formId={surveyBlockerData?.formId ?? ""}
				onSubmit={handleSurveyBlockerSubmit}
				onClose={handleSurveyBlockerClose}
				userProgramId={surveyBlockerData?.id ?? ""}
			/>

			<ProfileBlocker
				isVisible={isProfileBlockerVisible}
				profileConfigList={profileConfigList}
				onClose={handleProfileBlockerClose}
				onNavigateToProfileSection={handleNavigateToProfileSection}
			/>

			<SurveyBlockerSuccessModal
				showModal={isSuccessModalVisible}
				onClose={handleSuccessModalClose}
			/>

			<ProgramUpgradedModal
				visible={isProgramUpgradedModalVisible}
				handleUpdateUserProgram={handleProgramUpgradedModalClose}
			/>
			<CourseCompletionModal
				isVisible={isCertificateModalVisible}
				onClose={handleCertificateModalClose}
				courseName={notNotifiedCertificate?.courseName ?? ""}
				certificateUrl={notNotifiedCertificate?.certificate ?? ""}
			/>
			<FirstAssetCompletionModal
				isOpen={isFirstAssetCompletionModalVisible}
				closeModal={handleFirstAssetCompletionModalClose}
			/>

			<OnboardingModal
				isOpen={isOnboardingModalVisible}
				closeModal={handleOnboardingModalClose}
				modalType={IOnboardingMicroInteractionModalType.Onboarding}
			/>

			{feedbackData?.hasPendingFeedback ? (
				<ModuleFeedbackModal
					level1={courseId ?? ""}
					level2={moduleId ?? ""}
					learningPathId={learningPathId}
					learningPathType={learningPathType}
					isOpen={isModuleFeedbackModalVisible}
					closeModal={handleModuleFeedbackModalClose}
				/>
			) : null}
		</View>
	);
};

export default memo(StudyPlanBlocker);
