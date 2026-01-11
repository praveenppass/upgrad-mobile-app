import { IGetScaledHeight } from "@components/studyPlan/common/Certificates/certificates.interface";
import { ICertificate } from "@components/studyPlan/common/Certificates/certificates.interface";

import { IUserCourseCertificate } from "@graphql/query/studyPlan/common/getUserCourseCertificate";
import { IUserProgramCertificate } from "@graphql/query/studyPlan/common/getUserProgramCertificate";

export const getScaledHeight = ({
	imageDimensions,
	width,
}: IGetScaledHeight) => {
	if (!imageDimensions) return 0;

	const aspectRatio =
		(imageDimensions.width || 1) / (imageDimensions.height || 1);

	const scaledHeight = width / aspectRatio;
	return scaledHeight;
};

export const mapUserProgramCertificate = (
	certificate: IUserProgramCertificate,
): ICertificate => {
	const { userProgram, courseCertificateTemplate, imageUrl } = certificate;

	const { program, courseInfo } = userProgram || {};
	const { linkedInShareText, xShareText, displayName } =
		courseCertificateTemplate || {};

	return {
		certificateUrl: imageUrl,
		certificateName: displayName,
		linkedInShareText: linkedInShareText,
		xShareText: xShareText,
		learningPathName: courseInfo?.name || program.name,
	};
};

export const mapUserCourseCertificate = (
	certificate: IUserCourseCertificate,
): ICertificate => {
	const { userCourse, courseCertificateTemplate, imageUrl } = certificate;

	const { course, courseInfo } = userCourse || {};
	const { linkedInShareText, xShareText, displayName } =
		courseCertificateTemplate || {};

	return {
		certificateUrl: imageUrl,
		certificateName: displayName,
		linkedInShareText: linkedInShareText,
		xShareText: xShareText,
		learningPathName: courseInfo?.name || course.name,
	};
};
