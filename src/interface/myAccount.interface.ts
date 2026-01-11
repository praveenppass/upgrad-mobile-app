export enum IProfileComponentType {
	PERSONAL_INFO,
	PROFESSIONAL_INFO,
	CERTIFICATE,
}
export enum INaviagtionType {
	ADD_EDIT,
	VIEW_MORE,
}

export interface IProfileData {
	type: IProfileComponentType;
	title: string;
	Icon: React.FC;
	data: (ICertificate | IPersonalInformation | IProfessionalInformation)[];
	SkeletonComp: React.FC;
	skeletonCount: number;
	viewScreen?: boolean;
	onPressViewNavigate?: () => void;
	onPressAddEditNavigate?: () => void;
	navigationType: INaviagtionType;
	showCount?: boolean;
}
export interface ICertificate {
	imageUrl: string;
	title: string;
	subTitle: string;
	downloadUrl: string;
	downloadCertificate: () => void;
	certificateDownloadingId: string;
}

export interface IProfessionalInformation {
	text: string;
	subText: string;
	description?: string | number;
}

export interface IPersonalInformation {
	text: string;
	subText: string;
	description?: string;
}

export interface IPersonalDetails {
	dateOfBirth: string;
	address: string;
	pincode: string;
}

export type IProfileType =
	| ICertificate
	| IProfessionalInformation
	| IPersonalInformation;

export interface IProfileDetailsCard {
	Icon: React.FC;
	title: string;
	profileDataItem: IProfileType[];
	type: IProfileComponentType;
	loading: boolean;
	SkeletonComp: React.FC;
	skeletonCount: number;
	navigationType: INaviagtionType;
	showCount?: boolean;
	onPressViewNavigate?: () => void;
	onPressAddEditNavigate?: () => void;
	viewScreen?: boolean;
}
