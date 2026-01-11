import { ICourseVariantEnum } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";
import { IHomeLearnerAssetProgressStatusType } from "@interface/myPrograms.interface";

export enum IHomeBannerType {
	ASSET = "ASSET",
	SESSION = "SESSION",
}

export interface IHomeBannerAsset {
	type: IHomeBannerType;
	courseName: string;
	courseId: string;
	assetName: string;
	progress: number;
	progressStatus: IHomeLearnerAssetProgressStatusType;
	assetType: IAssetType;
	assetCode: string;
	assetId: string;
	assetAliasName?: string | null;
	courseVariant: ICourseVariantEnum;
	universityPartnerName: string;
	workshopId: string;
	programCode: string;
	workshopCode: string;
	userProgramId?: string;
	assetActivity: {
		level1?: string;
		level2?: string;
		level3?: string;
		level4?: string;
		status?: string;
		track?: string;
		trackGroup?: string;
		elective?: string;
		electiveGroup?: string;
	};
}

export interface IHomeBannerSession {
	type: IHomeBannerType;
	endsAt: string;
	startsAt: string;
	title: string;
	zoomUrl?: string;
	appZoomUrl?: string;
	workshopSession?: string;
	openZoomLink: (zoomUrl?: string, workshopSession?: string) => void;
}

export type IHomeBannerItem = IHomeBannerAsset | IHomeBannerSession;

export interface IHomeBanner {
	loading: boolean;
	bannerItems: IHomeBannerItem[];
}
