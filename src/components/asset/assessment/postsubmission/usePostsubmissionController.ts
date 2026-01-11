import { useEffect, useState } from "react";

import PostsubmissionModel from "@components/asset/assessment/postsubmission/PostsubmissionModel";

import {
	IAssessmentDetailsControllerLxp,
	PageData,
	PostsubmissionStatus,
} from "@interface/assessment.interface";

import { strings } from "@assets/strings";

const UsepostSubmissionController = ({
	pageData,
	assetCode,
	learningPathId,
	isProgram,
	courseId,
	moduleId,
	sessionId,
	segmentId,
}: IAssessmentDetailsControllerLxp) => {
	const timeTaken = pageData?.attempt?.result?.timeSpent;
	const [pageLoader, setPageLoader] = useState(true);
	const [
		isFullMarksAssessmentsModalOpen,
		setIsFullMarksAssessmentsModalOpen,
	] = useState(false);
	const { retakeAssessments, onUpdateAsset, onUpdateAssetCourse } =
		PostsubmissionModel({
			assetCode,
			learningPathId,
			isProgram,
			timeTaken,
			courseId,
			moduleId,
			sessionId,
			segmentId,
		});
	const [postsubmissionData, setpostsubmissionData] = useState<{
		retakeBtnDisabled: boolean;
		timeSpent: number;
		correctPercentage: number;
		submissionStatus: string;
		enableDetailedReport: boolean;
		passPercentage: number;
		headerMessage: string;
		headerDiscription: string;
		showScore: boolean;
		showTimeTaken: boolean;
	}>({
		submissionStatus: "",
		enableDetailedReport: false,
		passPercentage: 0,
		headerMessage: "",
		headerDiscription: "",
		showScore: false,
		showTimeTaken: false,
		correctPercentage: 0,
		timeSpent: 0,
		retakeBtnDisabled: false,
	});
	const submissionData: PageData = pageData || {};
	const attemptLevel =
		submissionData?.settings?.generalSettings?.attemptLevel ==
		strings.ATTEMPT_LEVEL;

	useEffect(() => {
		const submissionStatus = submissionData?.attempt?.result?.status || "";
		const enableDetailedReport =
			submissionData?.settings?.reportSettings?.enableDetailedReport ||
			false;
		const passPercentage =
			submissionData?.settings?.generalSettings?.passPercentage || 0;
		const showScore =
			submissionData?.settings?.afterTakingSettings?.showScore || false;
		const showTimeTaken =
			submissionData?.settings?.afterTakingSettings?.showTimeTaken ||
			false;
		const correctPercentage =
			submissionData?.attempt?.result?.correctPercentage || 0;
		const timeSpent = submissionData?.attempt?.result?.timeSpent || 0;
		const attemptNumber = submissionData?.attempt?.attemptNumber || 0;
		const limit: any =
			submissionData?.settings?.generalSettings?.attemptLimit;
		let retakeBtnDisabled: boolean = attemptNumber === limit;
		if (attemptLevel && submissionData?.attempt?.attemptedAllQuestions) {
			retakeBtnDisabled = true;
		} else if (!attemptLevel && limit == null) {
			retakeBtnDisabled = false;
		}

		let headerMessage =
			submissionData?.settings?.afterTakingSettings?.header || "";
		let headerDiscription =
			submissionData?.settings?.afterTakingSettings?.description || "";
		if (
			passPercentage > 0 &&
			submissionStatus === PostsubmissionStatus?.PASS
		) {
			headerMessage =
				submissionData?.settings?.afterTakingSettings
					?.passedMessageHeader || "";
			headerDiscription =
				submissionData?.settings?.afterTakingSettings
					?.passedMessageDescription || "";
		} else if (
			passPercentage > 0 &&
			submissionStatus === PostsubmissionStatus?.FAIL
		) {
			headerMessage =
				submissionData?.settings?.afterTakingSettings
					?.failedMessageHeader || "";
			headerDiscription =
				submissionData?.settings?.afterTakingSettings
					?.failedMessageDescription || "";
		}
		setpostsubmissionData({
			retakeBtnDisabled,
			timeSpent,
			submissionStatus,
			enableDetailedReport,
			passPercentage,
			headerMessage,
			headerDiscription,
			showScore,
			showTimeTaken,
			correctPercentage,
		});

		if (correctPercentage === 100) setIsFullMarksAssessmentsModalOpen(true);

		if (isProgram) {
			onUpdateAsset();
		} else {
			onUpdateAssetCourse();
		}
	}, [pageData]);

	useEffect(() => {
		if (isProgram) {
			onUpdateAsset();
		} else {
			onUpdateAssetCourse();
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setPageLoader(false);
		}, 1000);
	}, [postsubmissionData]);

	return {
		pageLoader,
		postsubmissionData,
		retakeAssessments,
		isFullMarksAssessmentsModalOpen,
		setIsFullMarksAssessmentsModalOpen,
	};
};
export default UsepostSubmissionController;
