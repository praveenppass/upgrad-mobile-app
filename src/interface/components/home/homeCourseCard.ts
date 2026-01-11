import { ICourseVariantEnum } from "@interface/app.interface";

export interface IHomeCourseCard {
	title: string;
	duration: number;
	progress: number;
	imageUrl: string;
	id: string;
	universityPartnerName: string;
	variant: ICourseVariantEnum;
	specializationsCount: number;
	toggleSpecialization: (count: number) => void;
	isSpecializationScreen: boolean;
	workshopId: string;
	workshopCode: string;
	userProgramId?: string;
	code: string;
}
