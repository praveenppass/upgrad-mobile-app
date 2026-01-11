import React, { forwardRef, memo, useImperativeHandle } from "react";
import { View } from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import {
	IBottomTab,
	IBottomTabRef,
} from "@components/studyPlan/common/BottomTab/bottomTab.interface";
import styles from "@components/studyPlan/common/BottomTab/bottomTab.styles";
import BottomTabInner from "@components/studyPlan/common/BottomTab/common/BottomTabInner";
import useBottomTabController from "@components/studyPlan/common/BottomTab/useBottomTabController";

const DefaultTabComponent = () => null;

const BottomTab = forwardRef<IBottomTabRef, IBottomTab>(
	(
		{
			learningPathCode,
			activeTab,
			setActiveTab,
			tabs,
			DefaultComponent = DefaultTabComponent,
			assetCode,
			assetType,
			courseCode,
			electiveCode,
			electiveGroupCode,
			learningPathId,
			learningPathName,
			learningPathType,
			moduleCode,
			segmentCode,
			sessionCode,
			trackCode,
			trackGroupCode,
			workshopId,
		},
		ref,
	) => {
		const {
			ActiveTabComponent,
			ActiveModalComponent,
			activeModalData,
			handleTabPress,
			loading,
			showActionModal,
			enabledTabs,
			handleCloseActionModal,
			handleOpenActionModal,
		} = useBottomTabController({
			tabs,
			activeTab,
			setActiveTab,
			DefaultComponent,
			learningPathCode,
			assetCode,
			assetType,
			courseCode,
			electiveCode,
			electiveGroupCode,
			learningPathType,
			learningPathId,
			learningPathName,
			moduleCode,
			segmentCode,
			sessionCode,
			trackCode,
			trackGroupCode,
			workshopId,
		});

		useImperativeHandle(ref, () => ({
			openModal: handleOpenActionModal,
		}));

		const activeModalProps = activeModalData?.modalProps;

		return (
			<>
				<ActiveTabComponent />
				<BottomTabInner
					activeTab={activeTab}
					tabs={enabledTabs}
					onTabPress={handleTabPress}
					loading={loading}
				/>
				<ActionModal
					isOpen={showActionModal}
					closeModal={handleCloseActionModal}
					style={styles.actionModalContainer}
					onBackPress={handleCloseActionModal}
					{...activeModalProps}
				>
					{!activeModalProps?.hideTopIndicator ? (
						<View style={styles.indicator} />
					) : null}
					<ActiveModalComponent onClose={handleCloseActionModal} />
				</ActionModal>
			</>
		);
	},
);

BottomTab.displayName = "BottomTab";

export default memo(BottomTab);
