import { StyleProp, ViewStyle } from "react-native";

import { LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";

export enum IBottomTabViewType {
	MODAL,
	COMPONENT,
	PRESSABLE,
}

interface IBottomTabComponentProps {
	onClose?: () => void;
}

interface IBottomTabModalProps {
	disableCloseOnSwipeDown?: boolean;
	style?: StyleProp<ViewStyle>;
	hideTopIndicator?: boolean;
}

interface IBottomTabBaseItem {
	id: IBottomTabType;
	order: number;
}

interface IBottomTabPressableItem extends IBottomTabBaseItem {
	type: IBottomTabViewType.PRESSABLE;
	onPress: () => void;
	Component?: undefined;
	modalProps?: undefined;
}

interface IBottomTabModalItem extends IBottomTabBaseItem {
	type: IBottomTabViewType.MODAL;
	Component: (props: IBottomTabComponentProps) => React.ReactNode;
	modalProps: IBottomTabModalProps;
	onPress?: undefined;
}

interface IBottomTabComponentItem extends IBottomTabBaseItem {
	type: IBottomTabViewType.COMPONENT;
	Component: (props: IBottomTabComponentProps) => React.ReactNode;
	modalProps?: undefined;
	onPress?: undefined;
}

export type IBottomTabItem =
	| IBottomTabPressableItem
	| IBottomTabModalItem
	| IBottomTabComponentItem;

export interface IBottomTab {
	activeTab: IBottomTabType | null;
	setActiveTab: (tab: IBottomTabType) => void;
	tabs: IBottomTabItem[];
	DefaultComponent?: () => React.ReactNode;
	learningPathCode: string;
	learningPathId: string;
	learningPathName: string;
	learningPathType: LearningPathType;
	courseCode?: string;
	assetType?: IAssetType;
	assetCode?: string;
	moduleCode?: string;
	sessionCode?: string;
	segmentCode?: string;
	trackCode?: string;
	trackGroupCode?: string;
	electiveCode?: string;
	electiveGroupCode?: string;
	workshopId?: string;
}

export enum IBottomTabType {
	CONTAINER2,
	CONTAINER3,
	CONTAINER6,
	PLANNER,
	NOTES,
	ADD_NOTE,
	BOOKMARKS,
	CHATBOT,
	REPORT,
	SCORECARD,
	CERTIFICATE,
}

export interface IChatBotResponse {
	output: {
		enabled: boolean;
		is_default_open: boolean;
	} | null;
}

export interface IChatBotRequest {
	input: {
		user_id: string;
		program_code: string;
		meta_data: {
			asset?: string;
			asset_type?: IAssetType[];
			is_mobile: boolean;
			page_url: string;
			level1?: string;
			level2?: string;
			level3?: string;
			level4?: string;
			program_code: string;
			program_id: string;
			program_name: string;
			timezone: string;
			user_name: string;
			workshop_id?: string;
		};
	};
}

export interface IBottomTabRef {
	openModal: (tabId: IBottomTabType) => void;
}

export interface IShowChatBot {
	learningPathCode: string;
	learningPathId: string;
	courseCode?: string;
	moduleCode?: string;
	sessionCode?: string;
	segmentCode?: string;
	workshopId?: string;
	learningPathName: string;
	assetType?: IAssetType;
	assetCode?: string;
	track?: string;
	electiveCode?: string;
	electiveGroupCode?: string;
	trackCode?: string;
	trackGroupCode?: string;
}

export interface IShouldShowCertificateTab {
	learningPathId: string;
	learningPathType: LearningPathType;
}
