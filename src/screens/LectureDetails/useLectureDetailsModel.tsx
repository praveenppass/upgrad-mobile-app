import { useLazyQuery } from "@apollo/client";

import getUserEventsQuery, {
	IUserEventQueryVariables,
	IUserEventsResponse,
} from "@graphql/query/academicPlanner/getUserEvents";

import { client } from "@config/apollo";

const useLectureDetailsModel = () => {
	const [
		getUserEvents,
		{
			data: userEventsData,
			loading: userEventsLoading,
			refetch: refetchUserEvents,
			fetchMore,
		},
	] = useLazyQuery<IUserEventsResponse, IUserEventQueryVariables>(
		getUserEventsQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	return {
		getUserEvents,
		userEventsData,
		userEventsLoading,
		refetchUserEvents,
		fetchMore,
	};
};

export default useLectureDetailsModel;
