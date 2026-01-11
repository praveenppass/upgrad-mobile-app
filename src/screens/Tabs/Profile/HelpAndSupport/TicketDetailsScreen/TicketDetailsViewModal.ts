import { useMutation, useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";

import { createConversationForTicket } from "@graphql/mutation/createConversationForTicket";
import { getTicketConversations } from "@graphql/query/getTicketConversations";
import { getTicketDetails } from "@graphql/query/getTicketDetails";

import { formatDate } from "@utils/functions";

import { client } from "@config/apollo";

import { IDateFormat } from "@interface/app.interface";
import { ITicketConversation } from "@interface/helpSupport.interface";
import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

export const TicketDetailsViewModal = () => {
	const route = useRoute<RootHomeStackRouteProps<"TicketDetails">>();
	const id = route?.params?.id;
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [ticketData, setTicketData] = useState<
		(ITicketConversation | string)[]
	>([]);

	const [createConversationFunc, { loading: createConLoader }] = useMutation(
		createConversationForTicket,
	);

	const {
		data: ticketDetails,
		loading: ticketDetailsLoading,
		refetch: refetchTicketDetails,
	} = useQuery(getTicketDetails, {
		client,
		fetchPolicy: "network-only",
		variables: {
			where: {
				id,
			},
		},
	});

	const { data: conversationData, loading: ticketConversationsLoading } =
		useQuery(getTicketConversations, {
			client,
			fetchPolicy: "network-only",
			variables: {
				where: {
					id,
				},
			},
		});

	const constructChatArr = (tempArr: ITicketConversation[]) => {
		const organizedData: Record<string, (ITicketConversation | string)[]> =
			tempArr
				?.filter((data) => data?.createdAt !== undefined)
				?.sort((a, b) => {
					const startsAtA = new Date(a?.createdAt);
					const startsAtB = new Date(b?.createdAt);
					// @ts-ignore
					return startsAtA - startsAtB;
				})
				?.reduce(
					(
						acc: Record<string, (ITicketConversation | string)[]>,
						session: ITicketConversation,
					) => {
						const startsAt = session?.createdAt;
						const dateKey = formatDate(startsAt, IDateFormat.date);
						if (dateKey) {
							acc[dateKey] = acc[dateKey] || [];
							acc[dateKey].push(session);
						}
						return acc;
					},
					{},
				);
		const resultArray: (ITicketConversation | string)[] = Object.entries(
			organizedData,
		).flatMap(([dateKey, sessions]) => [dateKey, ...sessions]);
		return resultArray;
	};

	useEffect(() => {
		if (!ticketDetails && !conversationData?.ticketConversations) {
			return;
		}
		setIsLoading(true);
		const ticketInfo = ticketDetails?.ticket;
		const primaryData: ITicketConversation = {
			createdAt: ticketInfo?.createdAt,
			createdBy: ticketInfo?.createdBy,
			description: ticketInfo?.description,
			attachments: ticketInfo?.attachments ?? [],
		};
		const tempArr = [primaryData];

		if (conversationData?.ticketConversations) {
			tempArr.push(...conversationData?.ticketConversations);
		}
		const organizedData = constructChatArr(tempArr);
		setTicketData(organizedData);
		setIsLoading(false);
	}, [ticketDetails, conversationData]);

	const onSend = (
		description: string,
		attachments: unknown[],
		cb: () => void,
	) => {
		createConversationFunc({
			client,
			variables: {
				data: {
					description,
					attachments,
				},
				where: {
					id,
				},
			},
			onCompleted: (data) => {
				cb();
				const organizedData = constructChatArr([
					...ticketData,
					data?.createConversationForTicket,
				]);
				setTicketData(organizedData);
			},
		});
	};

	return {
		onSend,
		isLoading,
		ticketData,
		ticketDetails,
		createConLoader,
		refetchTicketDetails,
		ticketDetailsLoading,
		ticketConversationsLoading,
	};
};
