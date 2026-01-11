/**
 * A component that handles module extension functionality.
 * It renders modals for extending deadlines and canceling extensions.
 *
 * @param {Object} props - Component props
 * @param {string} props.initialDueDate - The soft due date for the module
 * @param {string} props.extendedDueDate - The hard due date if an extension is applied
 * @param {boolean} props.isExtensionApplied - Indicates if an extension is currently applied
 * @param {Array} props.penalties - Information about penalties for late submissions
 * @param {string} props.learningPathId - ID of the learning path
 * @param {string} props.courseId - ID of the course
 * @param {string} props.moduleId - ID of the module
 * @param {number} props.gradableContentCount - Number of gradable content/Assessment items in the module. can be derived either from props or from API
 * @param {string} props.moduleName - Name of the module. Can be derived either from props or from API
 * @param {boolean} props.isVisible - Controls visibility of the extension modals
 * @param {Function} props.setVisible - Function to set the visibility state
 * @param {Function} props.onSubmit - Callback function that is called after extension is Submitted
 * @returns {JSX.Element} The module extension component with modals
 */
import React from "react";

import CancelExtensionModal from "@components/moduleExtension/common/CancelExtensionModal";
import ExtendDeadlineModal from "@components/moduleExtension/common/ExtendDeadlineModal";
import { IModuleExtensionModal } from "@components/moduleExtension/common/index.interface";
import useModuleExtensionController from "@components/moduleExtension/useModuleExtensionController";

const ModuleExtension = ({
	initialDueDate,
	extendedDueDate,
	isExtensionApplied,
	penalties,
	learningPathId,
	courseId,
	moduleId,
	totalCompletedGradableAssets,
	totalGradableAssets,
	moduleName,
	isVisible,
	setVisible,
	onSubmit,
}: IModuleExtensionModal) => {
	const {
		acceptExtension,
		acceptCancelExtension,
		totalCompletedGradableAssetsCount,
		totalGradableAssetsCount,
		absoluteModuleName,
		penaltyPercentage,
		isExtionsionModalVisible,
		isCancelExtensionModalVisible,
		closeModal,
	} = useModuleExtensionController({
		moduleId,
		courseId,
		learningPathId,
		totalCompletedGradableAssets,
		totalGradableAssets,
		moduleName,
		setVisible,
		onSubmit,
		penalties,
		isExtensionApplied,
		isVisible,
	});

	return (
		<>
			<ExtendDeadlineModal
				moduleName={absoluteModuleName}
				totalCompletedGradableAssetsCount={
					totalCompletedGradableAssetsCount
				}
				totalGradableAssetsCount={totalGradableAssetsCount}
				extendedDueDate={extendedDueDate}
				penaltyPercentage={penaltyPercentage}
				onAccept={acceptExtension}
				onClose={closeModal}
				isVisible={isExtionsionModalVisible}
			/>

			<CancelExtensionModal
				moduleName={absoluteModuleName}
				totalCompletedGradableAssetsCount={
					totalCompletedGradableAssetsCount
				}
				totalGradableAssetsCount={totalGradableAssetsCount}
				initialDueDate={initialDueDate}
				penaltyInfo={penalties}
				onClose={closeModal}
				onAccept={acceptCancelExtension}
				isVisible={isCancelExtensionModalVisible}
			/>
		</>
	);
};

export default ModuleExtension;
