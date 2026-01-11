import { useLazyQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

import rescheduleMentorshipSessionQuery, {
	IRescheduleMentorshipSessionQuery,
	IRescheduleMentorshipSessionQueryVariables,
} from "@graphql/mutation/academicPlanner/mentorship/rescheduleMentorshipSession";
import scheduleMentorshipSessionQuery, {
	IScheduleMentorshipSessionQuery,
	IScheduleMentorshipSessionQueryVariables,
} from "@graphql/mutation/academicPlanner/mentorship/scheduleMentorshipSession";
import getMentorshipAvailableSlotsQuery, {
	IGetMentorshipAvailableSlotsQuery,
	IGetMentorshipAvailableSlotsQueryVariables,
} from "@graphql/query/academicPlanner/mentorship/getMentorshipAvailableSlots";

import { client } from "@config/apollo";

const useMentorshipScheduleMeetingModalModel = () => {
	const [
		getMentorshipAvailableSlots,
		{
			loading: mentorshipAvailSlotsLoading,
			data: mentorshipAvailableSlots,
		},
	] = useLazyQuery<
		IGetMentorshipAvailableSlotsQuery,
		IGetMentorshipAvailableSlotsQueryVariables
	>(getMentorshipAvailableSlotsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [scheduleMentorshipSession] = useMutation<
		IScheduleMentorshipSessionQuery,
		IScheduleMentorshipSessionQueryVariables
	>(scheduleMentorshipSessionQuery, {
		client,
	});

	const [rescheduleMentorshipSession] = useMutation<
		IRescheduleMentorshipSessionQuery,
		IRescheduleMentorshipSessionQueryVariables
	>(rescheduleMentorshipSessionQuery, {
		client,
	});

	return {
		getMentorshipAvailableSlots,
		mentorshipAvailSlotsLoading,
		mentorshipAvailableSlots,

		scheduleMentorshipSession,
		rescheduleMentorshipSession,
	};
};

export default useMentorshipScheduleMeetingModalModel;
