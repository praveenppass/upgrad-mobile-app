import { useLazyQuery } from "@apollo/client";

import getLearningCoursesQuery, {
	ILearningCourses,
	ILearningCourseVariables,
} from "@graphql/query/academicPlanner/getLearningCoursesQuery";
import getUrgentUserEventsQuery, {
	IUrgentUserEventsResponse,
} from "@graphql/query/academicPlanner/getUrgentUserEvents";
import getUserEventsQuery, {
	IUserEventsResponse,
} from "@graphql/query/academicPlanner/getUserEvents";

import { client } from "@config/apollo";

const useAcademicPlannerModel = () => {
	const [
		getUrgentUserEvents,
		{
			data: urgentUserEventsData,
			loading: urgentEventsLoading,
			refetch: refetchUrgentEvents,
		},
	] = useLazyQuery<IUrgentUserEventsResponse>(getUrgentUserEventsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getEvents,
		{
			fetchMore,
			data: userEventsData,
			loading: eventsLoading,
			refetch: refetchEvents,
		},
	] = useLazyQuery<IUserEventsResponse>(getUserEventsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [getLearningCourses, { data: userCourses }] = useLazyQuery<
		ILearningCourses,
		ILearningCourseVariables
	>(getLearningCoursesQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		getEvents,
		getUrgentUserEvents,
		userEventsData,
		urgentUserEventsData,
		fetchMore,
		eventsLoading,
		urgentEventsLoading,
		refetchEvents,
		refetchUrgentEvents,
		getLearningCourses,
		userCourses,
	};
};

export default useAcademicPlannerModel;
