import { useLazyQuery, useMutation } from "@apollo/client";

import getAssessmentDetailsQueryForCourses, {
	IGetAssessmentDetailsQueryForCourses,
	IGetAssessmentDetailsQueryForCoursesQueryVariables,
} from "@graphql/query/asset/assessment/assessmentDetailsForCourses";
import getAssessmentDetailsQueryForProgram, {
	IGetAssessmentDetailsQueryForProgram,
	IGetAssessmentDetailsQueryForProgramQueryVariables,
} from "@graphql/query/asset/assessment/assessmentDetailsForProgram";
import createAssessmentDetailsQueryForProgram, {
	ICreateAssessmentDetailsQueryForProgram,
	ICreateAssessmentDetailsQueryForProgramQueryVariables,
} from "@graphql/query/asset/assessment/createassessmentProgram";

import { assessmentHttpClient } from "@utils/httpClientList";

import { client, customLinkClient } from "@config/apollo";

const AssessmentModel = () => {
	const [
		getAssessmentDetailsForCourses,
		{ data: assessmentCourseData, loading: assessmentLoadingCourse },
	] = useLazyQuery<
		IGetAssessmentDetailsQueryForCourses,
		IGetAssessmentDetailsQueryForCoursesQueryVariables
	>(getAssessmentDetailsQueryForCourses, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getAssessmentDetailsForProgram,
		{ data: assessmentProgramData, loading: assessmentLoadingProgram },
	] = useLazyQuery<
		IGetAssessmentDetailsQueryForProgram,
		IGetAssessmentDetailsQueryForProgramQueryVariables
	>(getAssessmentDetailsQueryForProgram, {
		client,
		fetchPolicy: "no-cache",
	});

	const fetchData = async (attemptId?: string, assessmentCode?: string) => {
		const res = await assessmentHttpClient.get(
			`/api/assessment-attempt/${attemptId}?deliveryId=${assessmentCode}`,
		);
		return res.data;
	};

	const [createAssementProgram, { data: createAssementData }] = useMutation<
		ICreateAssessmentDetailsQueryForProgram,
		ICreateAssessmentDetailsQueryForProgramQueryVariables
	>(createAssessmentDetailsQueryForProgram, {
		client: customLinkClient,
	});

	return {
		getAssessmentDetailsForCourses,
		assessmentCourseData,
		assessmentLoadingCourse,
		getAssessmentDetailsForProgram,
		assessmentProgramData,
		assessmentLoadingProgram,
		fetchData,
		createAssementProgram,
	};
};

export default AssessmentModel;
