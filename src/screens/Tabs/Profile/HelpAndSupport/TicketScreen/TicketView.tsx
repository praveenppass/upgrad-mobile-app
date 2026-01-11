import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

import FloatingButton from "@components/Reusable/Buttons/FloatingButton";
import EmptyCard from "@components/Reusable/EmptyCard";
import TicketCard from "@components/Reusable/Ticket/TicketCard";

import { ILearnerCourse } from "@graphql/query/getCourseProgramList";

import { useHelpSupportEvents } from "@hooks/useHelpSupportEvents";
import { useRefresh } from "@hooks/useRefresh";

import { moderateScale } from "@utils/functions";

import { IEntranceAnimation } from "@interface/app.interface";
import {
	HELP_AND_SUPPORT_DETAILS,
	HELP_SUPPORT_ENUM,
	ITicket,
} from "@interface/helpSupport.interface";

import { C } from "@assets/constants";
import { OpenCloseTicket, PlusIcon } from "@assets/icons";
import { strings } from "@assets/strings";

import { TicketScreenStyle as styles } from "./TicketScreenStyles";
import TicketViewModel from "./TicketViewModel";

const {
	themes: { primary },
	commonStyles: {
		text: { reg, w600, clrDarkBlack },
		spacing: { mv100, mv10, pb100 },
		align: { flex1 },
	},
} = C;

const EXPLORE_ICON_SIZE = {
	width: moderateScale(200),
	height: moderateScale(200),
};

const ARROW_DIMENSION = {
	width: 13,
	height: 13,
};

const TicketView = ({ tabName }: { tabName: string }) => {
	const supportRef = useRef(null);
	const lastScrollPosition = useRef(0);
	const [allLearnerCourses, setAllLearnerCourses] = useState<
		ILearnerCourse[]
	>([]);

	const navigation = useNavigation();
	const [hideCreateTicketButton, setHideCreateTicketButton] = useState(false);

	const {
		ticketSummaryData,
		refetchCard,
		TicketListData,
		fetchMore,
		ticketApiRecall,
		createTicketListVariables,
		getCourseList,
	} = TicketViewModel({
		tabName: tabName,
	});

	useEffect(() => {
		const fetchData = async () => {
			const data = await getCourseList();
			setAllLearnerCourses(data?.data?.allLearnerCourses ?? []);
		};
		fetchData();
	}, []);

	const shouldDisableRaiseRequest =
		allLearnerCourses.length === 1
			? allLearnerCourses[0]?.workshop?.disableRaiseRequest === true
			: !allLearnerCourses.some(
					(item) =>
						item?.workshop?.disableRaiseRequest == null ||
						item?.workshop?.disableRaiseRequest === false,
				);

	const { isRefreshing, onRefresh } = useRefresh(refetchCard);

	const { onCreateNewTicketClicked } = useHelpSupportEvents();

	useEffect(() => {
		ticketApiRecall();
	}, []);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const currentScrollPosition = event.nativeEvent.contentOffset.y;
		if (currentScrollPosition < 10) {
			lastScrollPosition.current = currentScrollPosition;
			setHideCreateTicketButton(false);
			return;
		}

		if (currentScrollPosition > lastScrollPosition.current) {
			setHideCreateTicketButton(true);
		} else {
			setHideCreateTicketButton(false);
		}
		lastScrollPosition.current = currentScrollPosition;
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			ticketApiRecall();
		});
		return unsubscribe;
	}, [navigation]);

	const currentTab =
		tabName == HELP_SUPPORT_ENUM.open
			? HELP_AND_SUPPORT_DETAILS?.open_ticket
			: HELP_AND_SUPPORT_DETAILS?.closed_ticket;

	const onCreateNewTicket = () => {
		onCreateNewTicketClicked(currentTab);
		navigation.navigate("RaiseATicketView");
	};

	const loadMore = () => {
		const resultCount = TicketListData?.tickets?.length ?? 0;
		let loadMoreVariables = createTicketListVariables(resultCount);
		if (
			ticketSummaryData?.ticketSummary?.[tabName?.toLowerCase()] ===
			resultCount
		) {
			return null;
		}

		loadMoreVariables = {
			...loadMoreVariables,
			skip: resultCount,
		};

		fetchMore({
			variables: loadMoreVariables,
			updateQuery: (previousQueryResult, { fetchMoreResult }) => {
				const newResults = fetchMoreResult?.tickets;
				const prevResults = previousQueryResult?.tickets;
				if (
					!fetchMoreResult ||
					fetchMoreResult?.tickets?.length === 0
				) {
					return previousQueryResult;
				}
				const result = [...(prevResults ?? []), ...(newResults ?? [])];
				return { tickets: result };
			},
		});
	};

	const renderItem = useCallback(
		({ item }: { item: ITicket }) => (
			<TicketCard tabName={tabName} {...item} />
		),
		[],
	);

	const tickets =
		tabName === HELP_SUPPORT_ENUM.open
			? TicketListData?.tickets?.filter(
					(ticket) => ticket.status === "OPEN",
				)
			: TicketListData?.tickets?.filter(
					(ticket) => ticket.status === "CLOSED",
				);

	if (!tickets || tickets.length === 0) {
		return (
			<>
				<View style={styles.emptyStateContainer}>
					<EmptyCard
						desc={
							tabName == HELP_SUPPORT_ENUM.open
								? strings.OPEN_STATE
								: strings.CLOSED_STATE
						}
						descStyle={styles.desc}
						title={strings.CAUGHT_UP_TXT}
						titleStyle={[reg, clrDarkBlack, w600]}
						icon={<OpenCloseTicket {...EXPLORE_ICON_SIZE} />}
						containerStyle={mv100}
					/>
				</View>
			</>
		);
	}

	return (
		<>
			<View style={flex1}>
				<View style={mv10}>
					<FlatList
						showsVerticalScrollIndicator={false}
						data={TicketListData?.tickets}
						ref={supportRef}
						renderItem={renderItem}
						onScroll={handleScroll}
						scrollEventThrottle={1400}
						contentContainerStyle={pb100}
						keyExtractor={(_, index) => `${index}`}
						refreshControl={
							<RefreshControl
								onRefresh={onRefresh}
								refreshing={isRefreshing}
								tintColor={primary.color3}
							/>
						}
						onEndReachedThreshold={0.5}
						onEndReached={loadMore}
					/>
				</View>
			</View>
			{!shouldDisableRaiseRequest ? (
				<FloatingButton
					onFabPress={onCreateNewTicket}
					animation={
						hideCreateTicketButton
							? IEntranceAnimation.SlideDown
							: IEntranceAnimation.SlideInUp
					}
					title={strings.TICKET}
					rightChildren={
						<PlusIcon
							{...ARROW_DIMENSION}
							color={primary.color2}
							style={styles.plusIcon}
						/>
					}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export default TicketView;
