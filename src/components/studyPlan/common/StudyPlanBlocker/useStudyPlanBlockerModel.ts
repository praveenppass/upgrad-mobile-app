import { useMutation, useQuery } from "@apollo/client";

import {
	ISkipPendingFeedbackMutation,
	ISkipPendingFeedbackVariables,
	skipPendingFeedback,
} from "@graphql/mutation/microInteractions/skipFeedback";
import {
	IUpdateOnboardingForProgramMutation,
	IUpdateOnboardingForProgramVariables,
	updateOnboardingForProgram,
} from "@graphql/mutation/microInteractions/updateOnboardingForProgram";
import { updateUserCourse } from "@graphql/mutation/studyPlan/updateUserCourse";
import updateUserMilestoneCertificateQuery, {
	IUpdateUserMilestoneCertificateMutation,
	IUpdateUserMilestoneCertificateVariables,
} from "@graphql/mutation/studyPlan/updateUserMilestoneCertificate";
import {
	IUpdateUserProgramMutation,
	IUpdateUserProgramVariables,
	updateUserProgram,
} from "@graphql/mutation/studyPlan/updateUserProgram";
import blockerSurveyCompletionQuery, {
	IBlockerSurveyCompletionQuery,
	IBlockerSurveyCompletionQueryVariables,
} from "@graphql/mutation/surveyBlocker/blockerSurveyCompletion";
import GET_PROFILE_ENRICH_HISTORY_QUERY, {
	IGetProfileEnrichHistoryQuery,
} from "@graphql/query/profileBlocker/getProfileEnrichHistoryQuery";

import { client } from "@config/apollo";

export const useStudyPlanBlockerModel = () => {
	const [updateBlockSurveyCompletion] = useMutation<
		IBlockerSurveyCompletionQuery,
		IBlockerSurveyCompletionQueryVariables
	>(blockerSurveyCompletionQuery, { client, fetchPolicy: "no-cache" });

	const [updateUserProgramMutation] = useMutation<
		IUpdateUserProgramMutation,
		IUpdateUserProgramVariables
	>(updateUserProgram, {
		client,
	});

	const [updateUserCourseMutation] = useMutation<
		IUpdateUserProgramMutation,
		IUpdateUserProgramVariables
	>(updateUserCourse, {
		client,
	});

	const {
		data: profileEnrichHistoryData,
		loading: profileEnrichHistoryLoading,
	} = useQuery<IGetProfileEnrichHistoryQuery>(
		GET_PROFILE_ENRICH_HISTORY_QUERY,
		{
			client,
			fetchPolicy: "cache-and-network",
		},
	);
	const [updateUserMilestoneCertificateMutation] = useMutation<
		IUpdateUserMilestoneCertificateMutation,
		IUpdateUserMilestoneCertificateVariables
	>(updateUserMilestoneCertificateQuery, {
		client,
	});

	const [updateProgramOnboardingMutation] = useMutation<
		IUpdateOnboardingForProgramMutation,
		IUpdateOnboardingForProgramVariables
	>(updateOnboardingForProgram, {
		client,
		fetchPolicy: "no-cache",
	});

	const [skipPendingFeedbackMutation] = useMutation<
		ISkipPendingFeedbackMutation,
		ISkipPendingFeedbackVariables
	>(skipPendingFeedback, {
		client,
	});

	return {
		updateBlockSurveyCompletion,
		updateUserProgramMutation,
		updateUserCourseMutation,
		profileEnrichHistoryData,
		profileEnrichHistoryLoading,
		updateUserMilestoneCertificateMutation,
		updateProgramOnboardingMutation,
		skipPendingFeedbackMutation,
	};
};
