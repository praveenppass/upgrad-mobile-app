import React from "react";
import { View } from "react-native";

import DeadlineExtensionButton from "@components/asset/deadlineExtension/common/DeadlineExtensionButton";
import DeadlineExtensionCount from "@components/asset/deadlineExtension/common/DeadlineExtensionCount";
import DeadlineExtensionDeadlineDate from "@components/asset/deadlineExtension/common/DeadlineExtensionDeadlineDate";
import DeadlineExtensionSkeleton from "@components/asset/deadlineExtension/common/DeadlineExtensionSkeleton";
import DeadlineExtensionText from "@components/asset/deadlineExtension/common/DeadlineExtensionText";
import { IDeadlineExtension } from "@components/asset/deadlineExtension/deadlineExtension.interface";
import styles from "@components/asset/deadlineExtension/deadlineExtension.styles";
import useDeadlineExtensionController from "@components/asset/deadlineExtension/useDeadlineExtensionController";
import ModuleExtension from "@components/moduleExtension";

const DeadlineExtension = ({
	originalDueDate,
	extendedDueDate,
	extensionRequests,
	courseId,
	moduleId,
	learningPathId,
	dueDateExtensionMode,
	totalExtensionsAllowed,
	totalExtensionsTaken,
	loading,
	submittedDate,
	penalties,
	style,
	isExtensionRegained,
	onSubmit,
}: IDeadlineExtension) => {
	const {
		availableExtensions,
		deadlineExtensionConfig,
		isModuleExtensionModalVisible,
		setModuleExtensionModalVisibility,
	} = useDeadlineExtensionController({
		originalDueDate,
		extendedDueDate,
		extensionRequests,
		dueDateExtensionMode,
		totalExtensionsAllowed,
		totalExtensionsTaken,
		submittedDate,
		isExtensionRegained,
	});

	if (loading) return <DeadlineExtensionSkeleton style={style} />;
	if (!deadlineExtensionConfig) return <></>;
	const isExtensionApplied = !!extensionRequests?.length;

	const {
		deadlineDate,
		extensionText,
		ctaText,
		ctaDisabled,
		showExtensions,
		ctaPress,
	} = deadlineExtensionConfig;

	return (
		<View style={[styles.main, style]}>
			<DeadlineExtensionDeadlineDate deadlineDate={deadlineDate} />
			<View>
				<DeadlineExtensionText extensionText={extensionText} />
				<DeadlineExtensionButton
					ctaText={ctaText}
					ctaPress={() => ctaPress?.()}
					ctaDisabled={ctaDisabled}
				/>

				<DeadlineExtensionCount
					showExtensions={showExtensions}
					availableExtensions={availableExtensions}
					totalExtensionsAllowed={totalExtensionsAllowed || 0}
				/>
			</View>

			<ModuleExtension
				courseId={courseId ?? ""}
				initialDueDate={originalDueDate ?? ""}
				extendedDueDate={extendedDueDate ?? ""}
				moduleId={moduleId ?? ""}
				learningPathId={learningPathId ?? ""}
				isVisible={isModuleExtensionModalVisible}
				setVisible={setModuleExtensionModalVisibility}
				penalties={penalties}
				isExtensionApplied={isExtensionApplied}
				onSubmit={onSubmit}
			/>
		</View>
	);
};

export default DeadlineExtension;
