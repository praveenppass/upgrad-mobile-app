import { useLazyQuery } from "@apollo/client";

import getLiveSessionCoursesQuery, {
	ILiveSessionCoursesResponse,
	ILiveSessionCoursesVariables,
} from "@graphql/query/academicPlanner/getLiveSessionCourses";
import getUrgentUserEventsQuery, {
	ISessionUrgentQueryVariables,
	IUrgentUserEventsResponse,
} from "@graphql/query/academicPlanner/getUrgentUserEvents";
import getUserEventsQuery, {
	IUserEventQueryVariables,
	IUserEventsResponse,
} from "@graphql/query/academicPlanner/getUserEvents";

import { client } from "@config/apollo";

const SessionModel = () => {
	const [
		getEvents,
		{ fetchMore, data: userEventsData, loading, refetch: refetchEvents },
	] = useLazyQuery<IUserEventsResponse, IUserEventQueryVariables>(
		getUserEventsQuery,
		{
			client,
		},
	);

	const [
		getUrgentUsertEvents,
		{
			data: urgentUserEventsData,
			loading: urgentLoading,
			refetch: refetchUrgentEvents,
		},
	] = useLazyQuery<IUrgentUserEventsResponse, ISessionUrgentQueryVariables>(
		getUrgentUserEventsQuery,
		{
			client,
		},
	);

	const [
		getLiveSessionCourses,
		{
			data: liveSessionCoursesData,
			loading: liveSessionCoursesLoading,
			refetch: refetchLiveSessionCourses,
		},
	] = useLazyQuery<ILiveSessionCoursesResponse, ILiveSessionCoursesVariables>(
		getLiveSessionCoursesQuery,
		{
			client,
		},
	);

	return {
		getEvents,
		getUrgentUsertEvents,
		getLiveSessionCourses,
		userEventsData,
		urgentLoading,
		urgentUserEventsData,
		liveSessionCoursesData,
		liveSessionCoursesLoading,
		fetchMore,
		loading,
		refetchEvents,
		refetchUrgentEvents,
		refetchLiveSessionCourses,
	};
};

export default SessionModel;
