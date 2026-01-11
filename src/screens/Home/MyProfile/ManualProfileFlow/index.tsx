import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { colors } from "@assets/colors";

import EditDetailsComponent from "./components/EditDetailsComponent";
import OverdueWarningModal from "./components/OverdueWarningModal";
import StepperComponent from "./components/StepperComponent";
import useManualFlowController from "./useManualFlowController";

const { neutral } = colors;

const BodyComponent = () => {
	const {
		steps,
		sections,
		currentStep,
		currentSectionIndex,
		methods,
		handleSubmit,
		handleError,
		handleStepPress,
		handleSectionPress,
		handlePrev,
		handleNext,
		totalSections,
		isNextButtonDisabled,
		isEffectivelyLastSection,
		visibleSectionsCount,
		visibleSectionIndex,
		isSaving,
		parseModalConfig,
		setParseModalConfig,
		handleFileUploaded,
		showOverdueWarningModal,
		setShowOverdueWarningModal,
		handleCompleteOverdue,
	} = useManualFlowController({});

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<StepperComponent
					steps={steps}
					currentStep={currentStep}
					onStepPress={handleStepPress}
					showDueDate={true}
				/>
				<EditDetailsComponent
					loading={false}
					sections={sections}
					sectionIndex={currentSectionIndex}
					methods={methods}
					onError={handleError}
					onSubmit={handleSubmit}
					onSectionPress={handleSectionPress}
					onPrev={handlePrev}
					onNext={handleNext}
					totalSections={totalSections}
					visibleSectionsCount={visibleSectionsCount}
					visibleSectionIndex={visibleSectionIndex}
					isNextButtonDisabled={isNextButtonDisabled}
					isEffectivelyLastSection={isEffectivelyLastSection}
					isSaving={isSaving}
					parseModalConfig={parseModalConfig}
					setParseModalConfig={setParseModalConfig}
					handleFileUploaded={handleFileUploaded}
				/>
			</View>
			<OverdueWarningModal
				visible={showOverdueWarningModal}
				onClose={() => setShowOverdueWarningModal(false)}
				onCompleteNow={handleCompleteOverdue}
			/>
		</View>
	);
};

const ManualProfileFlow = () => (
	<WithHeaderLxp BodyComponent={BodyComponent} showBack />
);

export default memo(ManualProfileFlow);

const styles = StyleSheet.create({
	container: {
		backgroundColor: neutral.grey_02,
		flex: 1,
	},
	contentContainer: {
		backgroundColor: neutral.white,
		flex: 1,
	},
});
