import { useLazyQuery } from "@apollo/client";
import { useCallback } from "react";
import { useSelector } from "react-redux";

import { buildStudyPlanUrl } from "@screens/Home/StudyPlan/common/studyPlan.utils";

import { CHATBOT_INVOKE_ENDPOINT } from "@components/studyPlan/common/BottomTab/bottomTab.constants";
import {
	IChatBotRequest,
	IChatBotResponse,
	IShouldShowCertificateTab,
	IShowChatBot,
} from "@components/studyPlan/common/BottomTab/bottomTab.interface";

import getUserLearningPathCertificateCountQuery, {
	IUserLearningPathCertificateCountQuery,
	IUserLearningPathCertificateCountQueryVariables,
} from "@graphql/query/studyPlan/common/getUserLearningPathCertificateCountQuery";

import useGetTimezone from "@hooks/useGetTimezone";

import { sathiHttpClient } from "@utils/httpClientList";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

import { LearningPathType } from "@interface/app.interface";

const DEFAULT_CHATBOT_CONFIGURATION = {
	isEnabled: false,
	shouldOpenByDefault: false,
};

const useBottomTabModel = () => {
	const userId = useSelector((state: RootState) => state.user.user.id);

	const { firstName, lastName } = useSelector(
		(state: RootState) => state.user.user,
	);

	const userName = `${firstName || ""} ${lastName || ""}`;
	const { name: userTimezone } = useGetTimezone();

	const getChatBotConfiguration = useCallback(
		async ({
			learningPathCode,
			learningPathId,
			courseCode,
			moduleCode,
			sessionCode,
			segmentCode,
			trackCode,
			trackGroupCode,
			workshopId,
			learningPathName,
			assetType,
			assetCode,
			electiveCode,
			electiveGroupCode,
		}: IShowChatBot) => {
			const pageUrl = buildStudyPlanUrl({
				courseCode,
				moduleCode,
				sessionCode,
				segmentCode,
				assetCode,
				learningPathCode,
				trackGroupCode,
				trackCode,
				electiveGroupCode,
				electiveCode,
				learningPathId,
			});

			try {
				if (!userId) return DEFAULT_CHATBOT_CONFIGURATION;

				const { data } = await sathiHttpClient.post<
					IChatBotRequest,
					IChatBotResponse
				>(CHATBOT_INVOKE_ENDPOINT, {
					input: {
						user_id: userId,
						program_code: learningPathCode,
						meta_data: {
							asset: assetCode,
							level1: courseCode,
							level2: moduleCode,
							level3: sessionCode,
							level4: segmentCode,
							program_code: learningPathCode,
							program_id: learningPathId,
							program_name: learningPathName,
							timezone: userTimezone,
							user_name: userName,
							asset_type: assetType ? [assetType] : [],
							is_mobile: true,
							page_url: pageUrl,
							workshop_id: workshopId,
						},
					},
				});

				return {
					isEnabled: data?.output?.enabled || false,
					shouldOpenByDefault: data?.output?.is_default_open || false,
				};
			} catch (error) {
				return DEFAULT_CHATBOT_CONFIGURATION;
			}
		},
		[userId],
	);

	const [loadCertificateData] = useLazyQuery<
		IUserLearningPathCertificateCountQuery,
		IUserLearningPathCertificateCountQueryVariables
	>(getUserLearningPathCertificateCountQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const shouldShowCertificateTab = useCallback(
		async ({
			learningPathId,
			learningPathType,
		}: IShouldShowCertificateTab) => {
			if (!userId) return false;

			const isProgram = learningPathType === LearningPathType.PROGRAM;

			const where = {
				user: userId,
				...(isProgram
					? { userProgram: learningPathId }
					: { userCourse: learningPathId }),
			};

			const { data } = await loadCertificateData({
				variables: { where },
			});

			if (!data) return false;

			return data.userCourseCertificates.totalCount > 0;
		},
		[loadCertificateData, userId],
	);
	return {
		getChatBotConfiguration,
		shouldShowCertificateTab,
	};
};

export default useBottomTabModel;
