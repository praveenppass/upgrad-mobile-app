import { LearningPathType } from "@interface/app.interface";

export interface ICertificate {
	certificateUrl: string;
	certificateName: string;
	linkedInShareText: string;
	xShareText: string;
	learningPathName: string;
}

export interface IGetScaledHeight {
	imageDimensions: IImageDimensions | null;
	width: number;
}

export interface ICertificatesComponent {
	learningPathId: string;
	learningPathType: LearningPathType;
}

export interface ICertificateData {
	certificates: ICertificate[];
	loading: boolean;
	certificateCount: number;
	hasCertificates: boolean;
	refetchCertificates: () => void;
}

export interface ICertificateDownloadState {
	certificateDownloadingId: string | null;
	setCertificateDownloadingId: (id: string | null) => void;
}

export interface IImageDimensions {
	width: number;
	height: number;
}

export interface IImageDimensionsState {
	loading: boolean;
	imageDimensions: IImageDimensions | null;
}
