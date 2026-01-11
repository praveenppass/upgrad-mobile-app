import { IAssetPenaltyItem } from "@hooks/assetPenalty/assetPenalty.interface";

interface IExtensionModalBaseProps {
	moduleName: string;
	totalCompletedGradableAssetsCount: number;
	totalGradableAssetsCount: number;
	onClose: () => void;
	isVisible: boolean;
	onAccept: () => void;
}
export interface IModuleExtensionController {
	moduleId: string;
	courseId: string;
	learningPathId: string;
	totalCompletedGradableAssets?: number;
	totalGradableAssets?: number;
	moduleName?: string; //can be derived either from props or from API
	onSubmit: () => void;
	penalties: IAssetPenaltyItem[];
	isExtensionApplied: boolean;
	setVisible: (value: boolean) => void;
	isVisible: boolean;
}
export interface IExtendDeadlineModal extends IExtensionModalBaseProps {
	extendedDueDate: string;
	penaltyPercentage: number;
}
export interface ICancelExtensionModal extends IExtensionModalBaseProps {
	initialDueDate: string;
	penaltyInfo: IAssetPenaltyItem[];
}
export interface IPenaltyDetails {
	penaltyInfo: IAssetPenaltyItem[];
	togglePenaltyDetails: () => void;
}
export interface IExtensionModalInfo {
	moduleName: string;
	totalCompletedGradableAssetsCount: number;
	totalGradableAssetsCount: number;
	dueDate: string;
	isExtended?: boolean;
}
export interface IExtensionModalButtons {
	acceptHandler: () => void;
	rejectHandler: () => void;
}

export interface IModuleExtensionModal extends IModuleExtensionController {
	initialDueDate: string;
	extendedDueDate: string;
}
