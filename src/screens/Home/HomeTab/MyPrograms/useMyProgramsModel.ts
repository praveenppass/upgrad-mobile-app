import { useMutation, useQuery } from "@apollo/client";
import moment from "moment-timezone";
import { useSelector } from "react-redux";

import {
	IJoinWorkshopSessionResponse,
	IJoinWorkshopSessionVariables,
	joinWorkShopSession,
} from "@graphql/mutation/joinWorkShopSession";
import {
	IUpdateLastLoginUserDetailsQuery,
	IUpdateLastLoginUserDetailsQueryVariables,
	updateLastLogin,
} from "@graphql/mutation/microInteractions/updateLastLogin";
import { getHomeLastAccessedAsset } from "@graphql/query/getHomeLastAccessedAsset";
import { getHomeLearnerCourses } from "@graphql/query/getHomeLearnerCourses";
import { getHomeUserSession } from "@graphql/query/getHomeUserSession";

import useGetTimezone from "@hooks/useGetTimezone";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

import { IEventKeys } from "@interface/calendar.interface";
import {
	IHomeLearnerAsset,
	IHomeLearnerCourses,
	IHomeLearnerCoursesVariables,
	IHomeLearnerSession,
	IHomeLearnerSessionVariables,
	IHomeSessionStatus,
} from "@interface/myPrograms.interface";

const startsAt = moment().subtract(1, "day");
const endsAt = moment().add(1, "day");

const useMyProgramsModel = () => {
	const {
		user: { id },
	} = useSelector((state: RootState) => state.user);
	const { name: userTimezone } = useGetTimezone();

	const {
		data: sessionsData,
		loading: sessionsLoading,
		refetch: getRefetchSession,
	} = useQuery<IHomeLearnerSession, IHomeLearnerSessionVariables>(
		getHomeUserSession,
		{
			client,
			variables: {
				where: {
					_and: [
						{ user: id },
						{
							type: {
								_in: [
									IEventKeys.buddyConnect,
									IEventKeys.careerCounselling,
									IEventKeys.dailydoubtResolution,
									IEventKeys.other,
									IEventKeys.problemSolving,
									// IEventKeys.group,
									IEventKeys.training,
									IEventKeys.liveSession,
									IEventKeys.careerPrep,
								],
							},
						},
						{
							startsAt: {
								_gte: startsAt.tz(userTimezone).toISOString(),
							},
						},
						{
							endsAt: {
								_lte: endsAt.tz(userTimezone).toISOString(),
							},
						},
					],
				},
				sort: { endsAt: "asc" },
				limit: 20,
			},
			fetchPolicy: "no-cache",
		},
	);

	const {
		data: assetData,
		loading: assetLoading,
		refetch: getHomeLastAsset,
	} = useQuery<IHomeLearnerAsset>(getHomeLastAccessedAsset, {
		client,
		fetchPolicy: "no-cache",
	});

	const {
		data: ongoingCourses,
		loading: ongoingCourseLoading,
		fetchMore: fetchMoreOngoingCourses,
		refetch: getOngoingCourse,
	} = useQuery<IHomeLearnerCourses, IHomeLearnerCoursesVariables>(
		getHomeLearnerCourses,
		{
			client,
			variables: {
				where: {
					progressStatus: {
						_in: [
							IHomeSessionStatus.IN_PROGRESS,
							IHomeSessionStatus.NOT_STARTED,
						],
					},
				},
				limit: 20,
				skip: 0,
			},
			fetchPolicy: "no-cache",
		},
	);

	const {
		data: completedCourses,
		loading: completedCoursesLoading,
		fetchMore: fetchMoreCompletedCourses,
		refetch: completedRefetchCourse,
	} = useQuery<IHomeLearnerCourses, IHomeLearnerCoursesVariables>(
		getHomeLearnerCourses,
		{
			client,
			variables: {
				where: {
					progressStatus: { _in: [IHomeSessionStatus.COMPLETED] },
				},
				limit: 20,
				skip: 0,
			},
			fetchPolicy: "no-cache",
		},
	);
	const [markAttendanceForWorkShopSession] = useMutation<
		IJoinWorkshopSessionResponse,
		IJoinWorkshopSessionVariables
	>(joinWorkShopSession, { client });

	const [updateLastLoginUserDetails] = useMutation<
		IUpdateLastLoginUserDetailsQuery,
		IUpdateLastLoginUserDetailsQueryVariables
	>(updateLastLogin, { client });

	return {
		sessionsData,
		sessionsLoading,
		assetData,
		assetLoading,
		ongoingCourses,
		completedCourses,
		ongoingCourseLoading,
		completedCoursesLoading,
		fetchMoreCompletedCourses,
		fetchMoreOngoingCourses,
		getRefetchSession,
		getHomeLastAsset,
		getOngoingCourse,
		completedRefetchCourse,
		markAttendanceForWorkShopSession,
		updateLastLoginUserDetails,
	};
};

export default useMyProgramsModel;
