import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
	getCourseProgramList,
	IGetCourseProgramListResponse,
	IUserCourseListInputVariables,
} from "@graphql/query/getCourseProgramList";
import { getTicketCardQuery } from "@graphql/query/getTicketCardQuery";
import { getTicketSummaryQuery } from "@graphql/query/getTicketSummaryQuery";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

import {
	HELP_SUPPORT_ENUM,
	ITicketData,
	ITicketSummaryData,
} from "@interface/helpSupport.interface";

const TicketViewModel = ({ tabName }: { tabName?: string }) => {
	const { id } = useSelector((state: RootState) => state.user.user);
	const [allTicketLoading, setAllTicketLoading] = useState(false);
	const [
		getTicketSummary,
		{ data: ticketSummaryData, loading: ticketSummaryLoading, refetch },
	] = useLazyQuery<ITicketSummaryData>(getTicketSummaryQuery, {
		client,
		variables: {},
		fetchPolicy: "network-only",
	});

	const [
		getTicketCard,
		{
			data: TicketListData,
			loading: ticketLoading,
			refetch: refetchCard,
			fetchMore,
		},
	] = useLazyQuery<ITicketData>(getTicketCardQuery, {
		client,
	});

	const [getCourseList] = useLazyQuery<
		IGetCourseProgramListResponse,
		IUserCourseListInputVariables
	>(getCourseProgramList, {
		client,
		fetchPolicy: "network-only",
		variables: {
			where: {
				user: id ?? "",
			},
		},
	});

	const createTicketListVariables = (skip: number) => {
		let statusValues;
		if (tabName == HELP_SUPPORT_ENUM.open) {
			statusValues = ["OPEN", "PENDING"];
		} else if (tabName == HELP_SUPPORT_ENUM.closed) {
			statusValues = ["RESOLVED", "CLOSED"];
		}

		const variables = {
			where: {
				status: {
					_in: statusValues,
				},
			},
			skip,
			limit: 10,
			sort: {
				updatedAt: "desc",
			},
			resetTickets: true,
		};
		return variables;
	};

	async function getUserTicketList() {
		const variables = createTicketListVariables(0);
		await getTicketCard({
			variables,
		});
	}

	function ticketApiRecall() {
		getUserTicketList();
		getTicketSummary();
		refetch();
		refetchCard();
	}

	useEffect(() => {
		if (ticketLoading || ticketSummaryLoading) {
			setAllTicketLoading(true);
		} else {
			setAllTicketLoading(false);
		}
	}, [ticketLoading, ticketSummaryLoading]);

	return {
		getTicketSummary,
		getTicketCard,
		ticketLoading,
		allTicketLoading,
		TicketListData,
		refetch,
		fetchMore,
		ticketSummaryLoading,
		refetchCard,
		ticketSummaryData,
		getUserTicketList,
		ticketApiRecall,
		createTicketListVariables,
		getCourseList,
	};
};

export default TicketViewModel;
