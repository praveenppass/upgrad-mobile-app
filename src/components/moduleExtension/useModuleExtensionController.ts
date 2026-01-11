import { useEffect } from "react";

import { IModuleExtensionController } from "@components/moduleExtension/common/index.interface";
import useModuleExtensionModel from "@components/moduleExtension/useModuleExtensionModel";

const useModuleExtensionController = ({
	moduleId,
	courseId,
	learningPathId,
	setVisible,
	moduleName,
	totalCompletedGradableAssets,
	totalGradableAssets,
	onSubmit,
	penalties,
	isExtensionApplied,
	isVisible,
}: IModuleExtensionController) => {
	const {
		onProgramModuleCancelExtension,
		onProgramModuleExtend,
		getProgramModuleDetails,
		programModulesDetails,
	} = useModuleExtensionModel();

	const extensionVariables = {
		where: {
			userProgram: learningPathId,
			level1: courseId,
			level2: moduleId,
		},
	};

	const closeModal = () => setVisible(false);

	const onCompleted = () => {
		closeModal();
		onSubmit();
	};

	const acceptExtension = () => {
		onProgramModuleExtend({
			variables: extensionVariables,
			onCompleted,
		});
	};

	const acceptCancelExtension = () => {
		onProgramModuleCancelExtension({
			variables: extensionVariables,
			onCompleted,
		});
	};

	useEffect(() => {
		if (totalGradableAssets && moduleName) return;

		getProgramModuleDetails({
			variables: {
				where: {
					id: learningPathId,
					level1: courseId,
					level2: moduleId,
				},
			},
		});
	}, []);

	const penaltiesLength = penalties.length || 0;
	const penaltyPercentage = penaltiesLength
		? penalties[penaltiesLength - 1].percentage
		: 100;
	const isExtionsionModalVisible = !isExtensionApplied && isVisible;
	const isCancelExtensionModalVisible = isExtensionApplied && isVisible;
	const moduleDetails = programModulesDetails?.userProgramContainer;
	const moduleDetailsActivity = moduleDetails?.activity;

	const {
		totalCompletedGradableAssets:
			totalCompletedGradableAssetsCountFromApi = 0,
		totalGradableAssets: totalGradableAssetsCountFromApi = 0,
	} = moduleDetailsActivity || {};

	const totalCompletedGradableAssetsCount =
		totalCompletedGradableAssets ||
		totalCompletedGradableAssetsCountFromApi ||
		0;

	const totalGradableAssetsCount =
		totalGradableAssets || totalGradableAssetsCountFromApi || 0;

	const absoluteModuleName = moduleName || moduleDetails?.name || "";

	return {
		acceptExtension,
		acceptCancelExtension,
		totalCompletedGradableAssetsCount,
		totalGradableAssetsCount,
		absoluteModuleName,
		penaltyPercentage,
		isExtionsionModalVisible,
		isCancelExtensionModalVisible,
		closeModal,
	};
};

export default useModuleExtensionController;
