export interface IUserCertificates {
	userCourseCertificates?: UserCourseCertificates;
}

export interface UserCourseCertificates {
	totalCount?: number;
	result?: CertificatesResult[];
}

export interface CertificatesResult {
	id?: string;
	uid?: string;
	userCourse?: UserCourse;
	userProgram?: UserCourse;
	courseCertificateTemplate?: CourseCertificateTemplate;
	imageUrl?: string;
	name?: string;
	issuingAuthority?: string;
	issuesAt?: string;
	expiresAt?: string;
	isExpiration?: string;
	certificateCredential?: string;
	skills?: string;
	isExternal?: string;
	createdAt?: Date;
}

export interface CourseCertificateTemplate {
	name?: string;
	displayName?: string;
}

export interface UserCourse {
	course?: Course;
}

export interface Course {
	name?: string;
}
