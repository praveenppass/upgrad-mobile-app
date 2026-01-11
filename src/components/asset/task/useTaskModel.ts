import { useLazyQuery, useMutation } from "@apollo/client";

import createAssignmentAttemptQuery, {
	ICreateAssignmentAttemptQuery,
	ICreateAssignmentAttemptQueryVariables,
} from "@graphql/mutation/asset/task/createAssignmentAttempt";
import createProjectAttemptQuery, {
	ICreateProjectAttemptQuery,
	ICreateProjectAttemptQueryVariables,
} from "@graphql/mutation/asset/task/createProjectAttempt";
import requestRevaluationProjectAttemptQuery, {
	IRequestRevaluationProjectQuery,
	IRequestRevaluationProjectQueryVariables,
} from "@graphql/mutation/asset/task/requestReValuationProjectAttempt";
import requestRevaluationAssignmentAttemptQuery, {
	IRequestRevaluationAssignmentAttemptQuery,
	IRequestRevaluationAssignmentAttemptQueryVariables,
} from "@graphql/mutation/asset/task/requestRevalutionAssignmentAttemptTask";
import reuploadAnswerFileForAssignmentQuery, {
	IReuploadAnswerFileAssignmentAttemptResponse,
	IReuploadAnswerFileAssignmentAttemptVariables,
} from "@graphql/mutation/asset/task/reuploadAnswerFileForAssignmentAttempt";
import reuploadAnswerFileForProjectAttemptQuery from "@graphql/mutation/asset/task/reuploadAnswerFileForProjectAttempt";
import getTaskCourseDetails, {
	IGetTaskCourseDetailsQuery,
	IGetTaskCourseDetailsQueryVariables,
} from "@graphql/query/asset/task/getTaskCourseDetails";
import getTaskGroupSubmissionQuery, {
	IGetTaskGroupSubmissionQuery,
	IGetTaskGroupSubmissionQueryVariables,
} from "@graphql/query/asset/task/getTaskGroupSubmission";
import getTaskProgramDetails, {
	IGetTaskProgramDetailsQuery,
	IGetTaskProgramDetailsQueryVariables,
} from "@graphql/query/asset/task/getTaskProgramDetails";

import { client } from "@config/apollo";

const useTaskModel = () => {
	//Course Task
	const [
		getCourseTask,
		{
			data: taskCourseDetail,
			loading: loadingCourse,
			refetch: refetchCourseTask,
		},
	] = useLazyQuery<
		IGetTaskCourseDetailsQuery,
		IGetTaskCourseDetailsQueryVariables
	>(getTaskCourseDetails, {
		client,
		fetchPolicy: "no-cache",
	});

	// Program Task
	const [
		getProgramTask,
		{
			data: taskProgramDetail,
			loading: loadingProgram,
			refetch: refetchProgramTask,
		},
	] = useLazyQuery<
		IGetTaskProgramDetailsQuery,
		IGetTaskProgramDetailsQueryVariables
	>(getTaskProgramDetails, {
		client,
		fetchPolicy: "no-cache",
	});

	// Submit Assignment
	const [createAssignmentAttempt] = useMutation<
		ICreateAssignmentAttemptQuery,
		ICreateAssignmentAttemptQueryVariables
	>(createAssignmentAttemptQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	// Submit Project
	const [createProjectAttempt] = useMutation<
		ICreateProjectAttemptQuery,
		ICreateProjectAttemptQueryVariables
	>(createProjectAttemptQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	// submit ReEvaluation
	const [requestAssignmentRevaluation] = useMutation<
		IRequestRevaluationAssignmentAttemptQuery,
		IRequestRevaluationAssignmentAttemptQueryVariables
	>(requestRevaluationAssignmentAttemptQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [requestProjectRevaluation] = useMutation<
		IRequestRevaluationProjectQuery,
		IRequestRevaluationProjectQueryVariables
	>(requestRevaluationProjectAttemptQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	// Group Submission
	const [
		getTaskGroupSubmission,
		{
			data: groupSubmissionData,
			loading: groupSubmissionLoading,
			refetch: refetchGroupSubmission,
		},
	] = useLazyQuery<
		IGetTaskGroupSubmissionQuery,
		IGetTaskGroupSubmissionQueryVariables
	>(getTaskGroupSubmissionQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	// Reupload Answer File for assignment
	const [reuploadAnswerFileForAssignmentAttempt] = useMutation<
		IReuploadAnswerFileAssignmentAttemptResponse,
		IReuploadAnswerFileAssignmentAttemptVariables
	>(reuploadAnswerFileForAssignmentQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	// Reupload Answer File for project
	const [reuploadAnswerFileForProjectAttempt] = useMutation<
		IReuploadAnswerFileAssignmentAttemptResponse,
		IReuploadAnswerFileAssignmentAttemptVariables
	>(reuploadAnswerFileForProjectAttemptQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		getCourseTask,
		getProgramTask,
		taskProgramDetail,
		taskCourseDetail,
		loadingProgram,
		loadingCourse,
		refetchCourseTask,
		refetchProgramTask,
		createAssignmentAttempt,
		createProjectAttempt,
		getTaskGroupSubmission,
		groupSubmissionData,
		groupSubmissionLoading,
		refetchGroupSubmission,
		requestAssignmentRevaluation,
		requestProjectRevaluation,
		reuploadAnswerFileForAssignmentAttempt,
		reuploadAnswerFileForProjectAttempt,
	};
};
export default useTaskModel;
