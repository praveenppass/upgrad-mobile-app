import { AssetTranslationProvider } from "@contexts/AssetTranslationContext";
import React, { memo } from "react";
import { Pressable, ScrollView, View } from "react-native";

import AssetHeader from "@components/asset/common/AssetHeader";
import AssetLanguageSelector from "@components/asset/common/AssetLanguageSelector";
import AssetLocked from "@components/asset/common/AssetLocked";
import AssetMetaInfo from "@components/asset/common/AssetMetaInfo";
import LanguageSwitchConfirmationModal from "@components/asset/common/LanguageSwitchConfirmationModal";
import LastAssetCompletionModal from "@components/microInteractions/LastAssetCompletionModal";
import RNText from "@components/Reusable/RNText";
import StudyPlanBlocker from "@components/studyPlan/common/StudyPlanBlocker";
import { IUseContainer6Component } from "@components/studyPlan/container6/Container6Component/container6Component.interface";
import assetStyles from "@components/studyPlan/container6/Container6Component/container6Component.styles";
import { renderAllAssets } from "@components/studyPlan/container6/Container6Component/container6Component.utils";
import useContainer6ComponentController from "@components/studyPlan/container6/Container6Component/useContainer6ComponentController";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { ArrowBackIcon, ArrowForwardIcon } from "@assets/icons";

const { neutral } = colors;

const STRINGS = createStringConstants({
	PREV: "studyPlan.container6.prev",
	NEXT: "studyPlan.container6.next",
});

const Container6Component = (props: IUseContainer6Component) => {
	const {
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		learningPathType,
		learningPathId,
		isPostSubmission,
		assetBasicDetailsLoading,
		learningPathCode,
		refetchAssetBasicDetails,
		workshopId,
		surveyBlockerData,
		profileBlockerData,
		shouldShowFirstAssetCompletionModal,
		attemptID,
		feedbackData,
	} = props;

	const {
		recallQuizCode,
		assessmentCode,
		assetLocked,
		assetLockedDate,
		assetLockedType,
		isBookmarked,
		handleBookmarkPress,
		assetTitle,
		isOptional,
		assetType,
		handleNextAssetPress,
		handlePrevAssetPress,
		hidePrevAsset,
		learningPathStartDate,
		isLastAssetCompletionModalVisible,
		handleLastAssetCompletionModalClose,
		handleNavigateToStudyPlan,
		// Translation
		translationData,
		languageSwitcher,
	} = useContainer6ComponentController(props);

	const commonProps = {
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		learningPathType,
		learningPathId,
		recallQuizCode,
		assessmentCode,
		ispostSubmission: isPostSubmission,
		attemptID,
	};

	return (
		<AssetTranslationProvider
			translationEnabled={translationData?.enableTranslation ?? false}
			availableLanguages={translationData?.languages ?? []}
			selectedLanguage={translationData?.translationLanguage ?? null}
			defaultLanguage={translationData?.languages?.[0] ?? null}
			currentAssetType={assetType}
		>
			<View style={assetStyles.container}>
				{assetLocked ? (
					<AssetLocked
						assetLockType={assetLockedType}
						date={assetLockedDate}
					/>
				) : (
					<ScrollView
						contentContainerStyle={assetStyles.scrollContainer}
						showsVerticalScrollIndicator={false}
					>
						{/* Combined Optional Tag and Language Switcher */}
						<AssetMetaInfo
							isOptional={isOptional}
							showLanguageSwitcher={
								!!(
									languageSwitcher &&
									languageSwitcher.multilingualEnabled
								)
							}
							selectedLanguage={
								languageSwitcher?.selectedLanguage ?? null
							}
							defaultLanguage={
								languageSwitcher?.defaultLanguage ?? null
							}
							onLanguageSwitcherPress={() => {
								languageSwitcher?.openLanguageSelector();
							}}
							currentAssetType={assetType}
						/>
						<AssetHeader
							isBookmarked={!!isBookmarked}
							onBookmarkPress={handleBookmarkPress}
							title={assetTitle || ""}
							loading={assetBasicDetailsLoading}
						/>

						{!assetBasicDetailsLoading
							? renderAllAssets({
									type: assetType,
									props: commonProps,
								})
							: null}
					</ScrollView>
				)}
				<View style={assetStyles.prevNextButtonsContainer}>
					<Pressable
						style={assetStyles.changeAsset}
						onPress={() => {
							!assetBasicDetailsLoading &&
								handlePrevAssetPress?.();
						}}
					>
						<ArrowBackIcon
							height={verticalScale(13)}
							width={horizontalScale(8)}
							color={
								!assetBasicDetailsLoading && hidePrevAsset
									? neutral.grey_04
									: neutral.grey_07
							}
						/>
						<RNText
							style={[
								assetStyles.buttonText,
								!assetBasicDetailsLoading &&
									hidePrevAsset &&
									assetStyles.buttonTextDisabled,
							]}
							title={getString(STRINGS.PREV)}
						/>
					</Pressable>

					<Pressable
						style={assetStyles.changeAsset}
						onPress={() => {
							!assetBasicDetailsLoading &&
								handleNextAssetPress?.();
						}}
					>
						<RNText
							style={assetStyles.buttonText}
							title={getString(STRINGS.NEXT)}
						/>
						<ArrowForwardIcon
							height={verticalScale(13)}
							width={horizontalScale(8)}
							color={neutral.grey_07}
						/>
					</Pressable>
				</View>

				<StudyPlanBlocker
					learningPathStartDate={learningPathStartDate}
					learningPathType={learningPathType}
					learningPathId={learningPathId}
					learningPathCode={learningPathCode}
					workshopId={workshopId ?? ""}
					surveyBlockerData={surveyBlockerData}
					profileBlockerData={profileBlockerData}
					refetchLearningPathData={refetchAssetBasicDetails}
					isLearningPathUpgraded={false}
					shouldShowFirstAssetCompletionModal={
						shouldShowFirstAssetCompletionModal
					}
					feedbackData={feedbackData}
					courseId={courseId ?? ""}
					moduleId={moduleId ?? ""}
				/>

				{/* TODO: 4189 pickachu */}
				{/* <LastAssetCompletionModal
				isVisible={isLastAssetCompletionModalVisible}
				onClose={handleLastAssetCompletionModalClose}
				onNavigateToStudyPlan={handleNavigateToStudyPlan}
			/> */}

				{/* Language Selection Modals */}
				{languageSwitcher && (
					<>
						<AssetLanguageSelector
							isVisible={
								languageSwitcher.isLanguageSelectorVisible
							}
							languages={languageSwitcher.languages}
							selectedLanguageId={
								languageSwitcher.selectedLanguage?.id ?? null
							}
							defaultLanguageId={
								languageSwitcher.defaultLanguage?.id ?? null
							}
							onSelectLanguage={
								languageSwitcher.handleLanguageSelect
							}
							onClose={languageSwitcher.closeLanguageSelector}
						/>

						<LanguageSwitchConfirmationModal
							isVisible={languageSwitcher.isConfirmationVisible}
							selectedLanguage={languageSwitcher.pendingLanguage}
							onConfirm={
								languageSwitcher.handleConfirmLanguageSwitch
							}
							onCancel={
								languageSwitcher.handleCancelLanguageSwitch
							}
						/>
					</>
				)}
			</View>
		</AssetTranslationProvider>
	);
};

export default memo(Container6Component);
