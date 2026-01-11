import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

import {
	IReportAnErrorGetBasicIssueDescription,
	IReportAnIssueDelayToast,
	IReportAnIssueGetIssueSubject,
	IReportAnIssueModalGetDescription,
} from "@components/asset/common/ReportAnIssueModal/index.interface";
import { IRadioValue } from "@components/Inputs/RadioInput";
import { ToastType } from "@components/Reusable/Toast";

import { LearningPathType } from "@interface/app.interface";

import { strings } from "@assets/strings";

export const truncateString = (str: string, maxLength = 50) =>
	str?.length > maxLength ? str.slice(0, maxLength - 3) + "..." : str;

export const htmlDivWrapper = (content: string) =>
	`<div style="margin-top: 10px">${content}</div>`;

export const htmlBWrapper = (content: string) => `<b>${content}</b>`;

export const getHtmlDescription = (title: string, value: string) => {
	if (!value) return "";

	return htmlDivWrapper(`${title} - ${htmlBWrapper(value)}.`);
};

export const REPORT_ERROR_ISSUE_TYPES: IRadioValue[] = [
	{ label: strings.TECHNICAL_ERROR, value: strings.TECHNICAL_ERROR },
	{
		label: strings.OVERALL_CONTENT_ERROR,
		value: strings.OVERALL_CONTENT_ERROR,
	},
];

export const getIssueSubject = ({
	isQuiz,
	assetName,
	learningPathName,
}: IReportAnIssueGetIssueSubject) => {
	const issueSubjectContent = isQuiz
		? strings.ASSESSMENT_CONTENT
		: strings.COURSE_CONTENT;

	return `${strings.ASSET_NAME} ${issueSubjectContent} - ${assetName} from ${learningPathName}`;
};

export const getBasicIssueDescription = ({
	assetName,
	isQuiz,
	learningPathName,
	quizQuestionName,
}: IReportAnErrorGetBasicIssueDescription) => {
	const truncatedAssetName = truncateString(assetName);

	if (!isQuiz || !quizQuestionName)
		return getHtmlDescription(
			strings.ASSET_NAME,
			`${truncatedAssetName} from ${learningPathName}`,
		);

	return htmlDivWrapper(
		`${strings.ASSET_NAME} - ${strings.QUESTION_NAME} ${htmlBWrapper(quizQuestionName)} from ${strings.RECALL_QUIZ_NAME} ${htmlBWrapper(truncatedAssetName)} from ${learningPathName}.`,
	);
};

export const getIssueDescription = ({
	issueType,
	issueDescription,
	assetName,
	isQuiz,
	quizQuestionName,
	learningPathName,
	learningPathType,
	courseName,
	moduleName,
	sessionName,
	segmentName,
	buildPath,
}: IReportAnIssueModalGetDescription) => {
	const feedback = `
		${getHtmlDescription(strings.USER_FEEDBACK, issueType)}
		${htmlDivWrapper(issueDescription)}
	`;

	let desc = getBasicIssueDescription({
		assetName,
		isQuiz,
		learningPathName,
		quizQuestionName,
	});

	if (learningPathType === LearningPathType.COURSE) {
		const courseDescription = getHtmlDescription(
			strings.MODULE_NAME,
			courseName,
		);

		const moduleDescription = getHtmlDescription(
			strings.TOPIC_NAME,
			moduleName,
		);

		desc += moduleDescription;
		desc += courseDescription;
	} else {
		const courseDescription = getHtmlDescription(
			strings.COURSE_NAME,
			courseName,
		);

		const moduleDescription = getHtmlDescription(
			strings.MODULE_NAME,
			moduleName,
		);

		const sessionDescription = getHtmlDescription(
			strings.SESSION_NAME,
			sessionName,
		);

		const segmentDescription = getHtmlDescription(
			strings.SEGMENT_NAME,
			segmentName,
		);

		desc += courseDescription;
		desc += moduleDescription;
		desc += sessionDescription;
		desc += segmentDescription;
	}

	const appVersion = getHtmlDescription(
		strings.APP_VERSION,
		DeviceInfo.getVersion(),
	);

	const devicePlatform = getHtmlDescription(
		strings.DEVICE_PLATFORM,
		Platform.OS.toLowerCase(),
	);

	const platformVersion = getHtmlDescription(
		strings.PLATFORM_VERSION,
		DeviceInfo.getSystemVersion(),
	);

	const deviceName = getHtmlDescription(
		strings.DEVICE_NAME,
		`${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`,
	);

	desc += appVersion;
	desc += devicePlatform;
	desc += platformVersion;
	desc += deviceName;
	desc += htmlDivWrapper(buildPath);
	desc += feedback;
	return desc;
};

export const getFileNameAndExtension = (fileUrl: string) => {
	const filename = fileUrl.split("/").pop() || "";
	const extension = filename.split(".").pop();

	return {
		filename,
		extension,
	};
};

export const getBase64FileSize = (base64String: string) => {
	const padding = (base64String.match(/[=]/g) || []).length;
	const fileSizeInBytes = (base64String.length * 3) / 4 - padding;

	return Math.round(fileSizeInBytes / 1024);
};

export const delayToast = ({ showToast, type }: IReportAnIssueDelayToast) => {
	setTimeout(
		() =>
			showToast({
				message:
					type === ToastType.SUCCESS
						? strings.REPORT_SUBMIT_SUCCESS
						: strings.REPORT_SUBMIT_FAILED,
				type,
				duration: 1000,
			}),
		200,
	);
};

export const getUploadFileData = (base64string: string) => ({
	file: {
		name: "user_feedback_screenshot.jpg",
		type: "image/jpeg",
		uri: `data:image/jpeg;base64,${base64string}`,
		size: base64string.length,
	},
});

export const REPORT_AN_ISSUE_INPUT_FIELD_RULES = {
	required: strings.THIS_FIELD_IS_REQUIRED,
};
