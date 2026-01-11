import {
	delayToast,
	getBase64FileSize,
	getBasicIssueDescription,
	getFileNameAndExtension,
	getHtmlDescription,
	getIssueDescription,
	getIssueSubject,
	getUploadFileData,
	htmlBWrapper,
	htmlDivWrapper,
	truncateString,
} from "@components/asset/common/ReportAnIssueModal/index.util";
import { ToastType } from "@components/Reusable/Toast";

import { LearningPathType } from "@interface/app.interface";

import { data } from "./index.data";

const {
	longString,
	shortString,
	content,
	title,
	value,
	assetName,
	learningPathName,
	fileUrl,
	base64String,
	showToast,
	base64string,
	issueDescription,
	sampleAsset,
	sampleLearningPath,
	sampleQuestion,
	sampleCourse,
	sampleModule,
	sampleSession,
	sampleSegment,
	issueType,
} = data;

jest.mock("@react-native-firebase/crashlytics", () => ({
	log: jest.fn(),
	recordError: jest.fn(),
	setUserId: jest.fn(),
	setAttributes: jest.fn(),
}));

describe("ReportAnIssueModal utility functions", () => {
	it("truncateString should truncate long strings", () => {
		expect(truncateString(longString)).toBe("a".repeat(47) + "...");
	});

	it("truncateString should not truncate short strings", () => {
		expect(truncateString(shortString)).toBe(shortString);
	});

	it("htmlDivWrapper should wrap content in a div", () => {
		expect(htmlDivWrapper(content)).toBe(
			`<div style="margin-top: 10px">${content}</div>`,
		);
	});

	it("htmlBWrapper should wrap content in bold tags", () => {
		expect(htmlBWrapper(content)).toBe(`<b>${content}</b>`);
	});

	it("getHtmlDescription should return formatted description", () => {
		expect(getHtmlDescription(title, value)).toBe(
			`<div style="margin-top: 10px">${title} - <b>${value}</b>.</div>`,
		);
	});

	it("getHtmlDescription should return empty string if value is empty", () => {
		expect(getHtmlDescription(title, "")).toBe("");
	});

	it("getIssueSubject should return correct issue subject", () => {
		const baseProps = {
			assetName,
			learningPathName,
		};
		expect(getIssueSubject({ isQuiz: true, ...baseProps })).toBe(
			`Issue with Assessment Engine Content - ${assetName} from ${learningPathName}`,
		);
		expect(getIssueSubject({ isQuiz: false, ...baseProps })).toBe(
			`Issue with Course content - ${assetName} from ${learningPathName}`,
		);
	});

	it("getFileNameAndExtension should return filename and extension", () => {
		expect(getFileNameAndExtension(fileUrl)).toEqual({
			filename: "file.txt",
			extension: "txt",
		});
	});

	it("getBase64FileSize should return correct file size in KB", () => {
		expect(getBase64FileSize(base64String)).toBe(3);
	});

	it("delayToast should call showToast after delay", () => {
		delayToast({ showToast, type: ToastType.SUCCESS });
		setTimeout(() => expect(showToast).toHaveBeenCalled(), 300);
	});

	it("getBasicIssueDescription should return correct description for non-quiz issue", () => {
		const description = getBasicIssueDescription({
			assetName: sampleAsset,
			isQuiz: false,
			learningPathName: sampleLearningPath,
			quizQuestionName: sampleQuestion,
		});
		expect(description).toContain("Issue with - ");

		expect(description).toContain(
			`${sampleAsset} from ${sampleLearningPath}`,
		);
	});

	it("getBasicIssueDescription should return correct description for quiz issue without quiz Question Name", () => {
		const description = getBasicIssueDescription({
			assetName: sampleAsset,
			isQuiz: true,
			learningPathName: sampleLearningPath,
			quizQuestionName: "",
		});
		expect(description).toContain(
			`${sampleAsset} from ${sampleLearningPath}`,
		);
	});

	it("getBasicIssueDescription should return correct description for quiz issue", () => {
		const description = getBasicIssueDescription({
			assetName: sampleAsset,
			isQuiz: true,
			learningPathName: sampleLearningPath,
			quizQuestionName: sampleQuestion,
		});
		expect(description).toContain("Issue with - Question Name");

		expect(description).toContain(
			`<b>${sampleQuestion}</b> from Recall Quiz Name <b>${sampleAsset}</b> from ${sampleLearningPath}`,
		);
	});

	it("getUploadFileData should return correct file data", () => {
		expect(getUploadFileData(base64string)).toEqual({
			file: {
				name: "user_feedback_screenshot.jpg",
				type: "image/jpeg",
				uri: `data:image/jpeg;base64,${base64string}`,
				size: base64string.length,
			},
		});
	});

	it("getIssueDescription should return correct description for course LearningPathType", () => {
		const description = getIssueDescription({
			issueType: issueType,
			issueDescription,
			assetName: sampleAsset,
			isQuiz: true,
			quizQuestionName: sampleQuestion,
			learningPathName: sampleLearningPath,
			learningPathType: LearningPathType.COURSE,
			courseName: sampleCourse,
			moduleName: sampleModule,
			sessionName: sampleSession,
			segmentName: sampleSegment,
		});

		expect(description).toContain(`Module Name - <b>${sampleCourse}</b>`);

		expect(description).toContain(`Topic Name - <b>${sampleModule}</b>`);
	});

	it("getIssueDescription should return correct description for non-course LearningPathType", () => {
		const description = getIssueDescription({
			issueType: issueType,
			issueDescription,
			assetName: sampleAsset,
			isQuiz: true,
			quizQuestionName: sampleQuestion,
			learningPathName: sampleLearningPath,
			learningPathType: LearningPathType.PROGRAM,
			courseName: sampleCourse,
			moduleName: sampleModule,
			sessionName: "",
			segmentName: sampleSegment,
		});
		expect(description).toContain(
			`Topic Name - <b>${sampleSegment}</b>`, //segmentDescription
		);

		expect(description).toContain(
			`Week No - <b>${sampleModule}</b>`, //moduleDescription
		);
	});

	it("getIssueDescription should return correct description for non-course LearningPathType if sessionName is not present", () => {
		const description = getIssueDescription({
			issueType: issueType,
			issueDescription,
			assetName: sampleAsset,
			isQuiz: true,
			quizQuestionName: sampleQuestion,
			learningPathName: sampleLearningPath,
			learningPathType: LearningPathType.PROGRAM,
			courseName: sampleCourse,
			moduleName: sampleModule,
			sessionName: "",
			segmentName: sampleSegment,
		});
		expect(description).toContain(
			`Milestone and Module Details - <b>${sampleAsset} from ${sampleCourse}</b>`,
		);
	});

	it("getIssueDescription should return correct description for non-course LearningPathType if assetName is not present", () => {
		const description = getIssueDescription({
			issueType: issueType,
			issueDescription,
			assetName: "",
			isQuiz: true,
			quizQuestionName: sampleQuestion,
			learningPathName: sampleLearningPath,
			learningPathType: LearningPathType.PROGRAM,
			courseName: sampleCourse,
			moduleName: sampleModule,
			sessionName: sampleSession,
			segmentName: sampleSegment,
		});

		expect(description).toContain(
			`Milestone and Module Details - <b>${sampleSession} from ${sampleCourse}</b>`,
		);
	});
});
