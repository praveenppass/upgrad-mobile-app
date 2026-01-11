import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

import AssessmentDetailsModel from "@components/asset/assessment/common/useAssessmentDetailsModel";

import useAssetPenalty from "@hooks/assetPenalty/useAssetPenalty";

import { calculateDueDates } from "@utils/functions";

import {
	Assessment,
	AssestQuiz,
	IAssessmentDetailsControllerLxp,
	PageData,
} from "@interface/assessment.interface";
import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

const AssessmentDetailsController = ({
	attemptId,
	pageData,
	assessmentComponentData,
	assessmentProgramInfo,
	isProgram,
	learningPathCode,
	comboCurriculumCode,
}: IAssessmentDetailsControllerLxp) => {
	const [assementControllerData, setAssesmentcontrollerData] = useState<{
		pageLoader: boolean;
		isReportbtn: boolean;
		btnDisabled: boolean;
		buttonTitle: string;
	}>({
		pageLoader: true,
		isReportbtn: false,
		btnDisabled: false,
		buttonTitle: "",
	});

	const { startCall } = AssessmentDetailsModel();
	const navigation = useNavigation();
	const route = useRoute<RootHomeStackRouteProps<"Container6Screen">>();
	const assessmentData: PageData = pageData || {}; // Default empty object if no pageData
	const { assessment = {} as Assessment } = assessmentData || {}; // Default to empty object if assessment is undefined

	const attemptLevel =
		assessmentData?.settings?.generalSettings?.attemptLevel ===
		strings.ATTEMPT_LEVEL;
	const proctored =
		assessmentData?.settings?.proctoringSettings?.enableBrowserFullScreen;
	const status: string = assessmentData?.attempt?.status || "";
	const attemptNumber: number = assessmentData?.attempt?.attemptNumber || 0;
	const startAssessment = async () => {
		try {
			if (status !== AssestQuiz.IN_PROGRESS) {
				await startCall(attemptId);
			}
		} catch (err) {
			console.log("Error in api call:", err);
		} finally {
			navigation.setParams({ ispostSubmission: false });
			navigation.navigate("AssessmentQuizScreen", {
				...route?.params,
				attemptId: attemptId,
				assessmentID: assessment?.code,
				comboCurriculumCode,
			});
		}
	};
	const currentAttempt =
		[AssestQuiz.IN_PROGRESS, AssestQuiz.NOT_STARTED].includes(status) &&
		attemptNumber > 0
			? attemptNumber - 1
			: [AssestQuiz.COMPLETED].includes(status)
				? attemptNumber
				: 0;
	const _btnDisabled = () => {
		const limit: any =
			assessmentData?.settings?.generalSettings?.attemptLimit;
		if (attemptLevel && assessmentData?.attempt?.attemptedAllQuestions)
			return true;
		else if (!attemptLevel && limit == null) return false;
		return limit != null && currentAttempt >= limit;
	};

	const printBtnTitle = () => {
		let btnTitle = "";
		if (_btnDisabled()) {
			btnTitle = strings.NO_ATTEMPT_AVAILABLE;
		} else if ([AssestQuiz.IN_PROGRESS].includes(status)) {
			btnTitle = strings.RESUME_ASSESSMENT;
		} else if (currentAttempt > 0) {
			btnTitle = strings.RETAKE_ASSESSMENT;
		} else {
			btnTitle = strings.START_ASSESSMENT;
		}
		return btnTitle;
	};

	useEffect(() => {
		async function load() {
			const buttonTitle: string = printBtnTitle() || "";
			const isReportbtn: boolean =
				assessmentData?.settings?.reportSettings
					?.enableDetailedReport && attemptNumber > 1;
			const btnDisabled = await _btnDisabled();
			await setAssesmentcontrollerData({
				pageLoader: false,
				buttonTitle,
				isReportbtn,
				btnDisabled,
			});
		}
		load();
	}, [assessmentData]);

	const isDueDateExtended =
		!!assessmentComponentData?.extensionRequests?.length;

	const { extendedDueDate, originalDueDate } = calculateDueDates({
		dueDate: assessmentComponentData?.endsAt || "",
		hardDeadlineDays: assessmentProgramInfo?.hardDeadlineDays || 0,
		isDueDateExtended,
	});

	const { loadingAssetPenalty, penalties, revertedPenalties } =
		useAssetPenalty({
			dueDate: originalDueDate,
			extendedDueDate,
			isDueDateExtended,
			isProgram: isProgram || false,
			learningPathCode: learningPathCode ?? "",
		});

	return {
		startAssessment,
		pageData,
		assessmentData,
		assessment,
		assementControllerData,
		proctored,
		loadingAssetPenalty,
		penalties,
		extendedDueDate,
		originalDueDate,
		revertedPenalties,
	};
};

export default AssessmentDetailsController;
