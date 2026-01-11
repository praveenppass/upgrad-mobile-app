import { useCallback, useEffect, useMemo, useState } from "react";

import {
	IBottomTab,
	IBottomTabItem,
	IBottomTabType,
	IBottomTabViewType,
} from "@components/studyPlan/common/BottomTab/bottomTab.interface";
import useBottomTabModel from "@components/studyPlan/common/BottomTab/useBottomTabModel";

import { IAssetType } from "@interface/asset.interface";

const DefaultTabComponent = () => null;

const useBottomTabController = ({
	tabs,
	activeTab,
	setActiveTab,
	DefaultComponent,
	learningPathCode,
	learningPathId,
	learningPathName,
	learningPathType,
	courseCode,
	assetType,
	assetCode,
	moduleCode,
	sessionCode,
	segmentCode,
	trackCode,
	trackGroupCode,
	workshopId,
	electiveCode,
	electiveGroupCode,
}: IBottomTab) => {
	const { getChatBotConfiguration, shouldShowCertificateTab } =
		useBottomTabModel();

	const [loading, setLoading] = useState(true);
	const [isChatBotEnabled, setIsChatBotEnabled] = useState(false);
	const [isCertificateEnabled, setIsCertificateEnabled] = useState(false);

	const [showActionModal, setShowActionModal] = useState(false);
	const [activeModal, setActiveModal] = useState<IBottomTabType | null>(null);

	const tabsHasCertificate = tabs.some(
		(tab) => tab.id === IBottomTabType.CERTIFICATE,
	);
	const tabsHasChatBot = tabs.some(
		(tab) => tab.id === IBottomTabType.CHATBOT,
	);

	useEffect(() => {
		const checkBottomTabConfigurations = async () => {
			if (!learningPathCode || !learningPathId) return setLoading(false);

			if (tabsHasChatBot) {
				const { isEnabled, shouldOpenByDefault } =
					await getChatBotConfiguration({
						learningPathCode,
						learningPathId,
						learningPathName,
						courseCode,
						assetType,
						assetCode,
						moduleCode,
						sessionCode,
						segmentCode,
						trackCode,
						trackGroupCode,
						workshopId,
						electiveCode,
						electiveGroupCode,
					});
				setIsChatBotEnabled(isEnabled);

				if (shouldOpenByDefault) {
					setActiveModal(IBottomTabType.CHATBOT);
					setShowActionModal(true);
				}
			}

			if (tabsHasCertificate) {
				const isEnabled = await shouldShowCertificateTab({
					learningPathId,
					learningPathType,
				});

				setIsCertificateEnabled(isEnabled);
			}
			setLoading(false);
		};
		checkBottomTabConfigurations();
	}, [learningPathCode, learningPathId]);

	const enabledTabs = useMemo(
		() =>
			tabs.filter((tab) => {
				if (tab.id === IBottomTabType.CHATBOT) return isChatBotEnabled;

				if (tab.id === IBottomTabType.REPORT)
					return assetType !== IAssetType.RECALL_QUIZ;

				if (tab.id === IBottomTabType.CERTIFICATE)
					return isCertificateEnabled;

				return true;
			}),
		[tabs, isChatBotEnabled, assetType, isCertificateEnabled],
	);

	const ActiveTabComponent = useMemo(() => {
		const activeTabData = tabs.find((tab) => tab.id === activeTab);
		return (
			activeTabData?.Component || DefaultComponent || DefaultTabComponent
		);
	}, [activeTab, tabs, DefaultComponent]);

	const handleTabPress = useCallback(
		(tab: IBottomTabItem) => {
			if (tab.type === IBottomTabViewType.PRESSABLE) return tab.onPress();

			if (tab.type === IBottomTabViewType.MODAL) {
				setShowActionModal(true);
				return setActiveModal(tab.id);
			}

			setActiveTab(tab.id);
			setActiveModal(null);
		},
		[setActiveTab, setShowActionModal],
	);

	const activeModalData = useMemo(() => {
		return tabs.find((tab) => tab.id === activeModal);
	}, [activeModal, tabs]);

	const ActiveModalComponent = useMemo(() => {
		return activeModalData?.Component || DefaultTabComponent;
	}, [activeModalData, tabs]);

	const handleCloseActionModal = () => {
		setShowActionModal(false);
	};

	const handleOpenActionModal = useCallback(
		(tabId: IBottomTabType) => {
			const tab = tabs.find((t) => t.id === tabId);
			if (tab && tab.type === IBottomTabViewType.MODAL) {
				setShowActionModal(true);
				setActiveModal(tabId);
			}
		},
		[tabs],
	);

	return {
		ActiveTabComponent,
		ActiveModalComponent,
		handleTabPress,
		loading,
		showActionModal,
		enabledTabs,
		activeModalData,
		handleCloseActionModal,
		handleOpenActionModal,
	};
};

export default useBottomTabController;
