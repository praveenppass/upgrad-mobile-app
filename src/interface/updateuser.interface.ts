import { IWorkExperience, IEducation } from "./user.interface";

export interface IUpdateUser {
	data: IUpdateUserData;
	where: Where;
}

export interface IUpdateUserData {
	workExperiences?: WorkExperienceUpdate[] | IWorkExperience[];
	educations?: EducationUpdate[] | IEducation[];
	professionType?: string;
	codingRequired?: string;
	experience?: ExperienceUpdate;
}

export interface ExperienceUpdate {
	year?: number;
}

export interface WorkExperienceUpdate {
	startsAt?: Date;
	endsAt?: Date;
	designation?: string;
	organization?: string;
	industry?: string;
	isWorking?: boolean;
}

export interface EducationUpdate {
	university?: string;
	degree?: string;
	field?: string;
	fromYear?: number;
	toYear?: number;
	percentage?: number | string;
}

export interface Where {
	id?: string;
}
