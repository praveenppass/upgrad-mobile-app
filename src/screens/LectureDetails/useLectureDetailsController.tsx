import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import extractEventCardData, {
	getSortOrderBasedOnType,
} from "@screens/Home/HomeTab/AcademicPlanner/academicPlanner.utils";
import useLectureDetailsModel from "@screens/LectureDetails/useLectureDetailsModel";

import {
	IFilterSessionEvents,
	ISessionFilterType,
} from "@components/Courses/CourseDetails/Session/index.interface";
import { ISortType } from "@components/Reusable/SortModal";

import { IUserEventQueryVariables } from "@graphql/query/academicPlanner/getUserEvents";

import { RootState } from "@redux/store/root.reducer";

import { IEventType } from "@interface/components/academicPlanner/events.interface";

interface ILectureDetailsControllerProps {
	userProgramId: string;
	level1Id: string;
}

interface IHandleGetUserEventsVariables {
	sortType?: ISortType;
	filterState?: IFilterSessionEvents;
}

const DEFAULT_FILTERS: IFilterSessionEvents = {
	[ISessionFilterType.STATUS]: [],
	[ISessionFilterType.TYPE]: [],
};

const ALL_EVENT_TYPES = Object.values(IEventType);

const DEFAULT_LIMIT = 10;

const useLectureDetailsController = ({
	userProgramId,
	level1Id,
}: ILectureDetailsControllerProps) => {
	const {
		user: { id: userId },
	} = useSelector((state: RootState) => state.user);

	const { getUserEvents, userEventsData, userEventsLoading, fetchMore } =
		useLectureDetailsModel();

	const isFocused = useIsFocused();

	const [isFilterModalOpen, setOpenFilterModal] = useState(false);
	const [isSortModalOpen, setOpenSortModal] = useState(false);
	const [filterState, setFilterState] =
		useState<IFilterSessionEvents>(DEFAULT_FILTERS);

	const [sortType, setSortType] = useState<ISortType>(ISortType.Default);

	const toggleFilterModal = useCallback(() => {
		setOpenFilterModal(!isFilterModalOpen);
	}, [isFilterModalOpen]);

	const toggleSortModal = useCallback(() => {
		setOpenSortModal(!isSortModalOpen);
	}, [isSortModalOpen]);

	const handleGetUserEvents = useCallback(
		(variables?: IHandleGetUserEventsVariables) => {
			if (!userProgramId || !userId || !level1Id) return;

			const filters = variables?.filterState || filterState;
			const sortOrder = getSortOrderBasedOnType(
				variables?.sortType || sortType,
			);

			const commonVariables: IUserEventQueryVariables = {
				sort: {
					endsAt: sortOrder,
				},
				where: {
					user: userId,
					viewType: "list",
					level1: { _in: [level1Id] },
					userProgram: { _in: [userProgramId] },
					type: {
						_in: filters[ISessionFilterType.TYPE]?.length
							? filters[ISessionFilterType.TYPE]
							: ALL_EVENT_TYPES,
					},
					...(filters[ISessionFilterType.STATUS]?.length && {
						status: { _in: filters[ISessionFilterType.STATUS] },
					}),
				},
				skip: 0,
				limit: DEFAULT_LIMIT,
			};

			getUserEvents({ variables: commonVariables });
		},
		[userProgramId, userId, level1Id, filterState, sortType],
	);
	useEffect(() => {
		if (!isFocused) return;

		handleGetUserEvents();
	}, [isFocused]);

	const eventCardData = useMemo(() => {
		return extractEventCardData(userEventsData?.userEvents?.result || []);
	}, [userEventsData]);

	const loadMore = useCallback(() => {
		const totalCount = userEventsData?.userEvents.totalCount || 0;
		const hasMoreEvents = eventCardData.length < totalCount;

		if (!hasMoreEvents) return;

		fetchMore({
			variables: {
				skip: eventCardData.length,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				return {
					userEvents: {
						...prev.userEvents,
						result: [
							...prev.userEvents.result,
							...fetchMoreResult.userEvents.result,
						],
					},
				};
			},
		});
	}, [eventCardData, fetchMore, userEventsData]);

	const handleRefetchEvents = useCallback(() => {
		handleGetUserEvents();
	}, [handleGetUserEvents]);

	const handleSortTypeChange = useCallback(
		(type: ISortType) => {
			setSortType(type);
			handleGetUserEvents({
				sortType: type,
			});
		},
		[handleGetUserEvents],
	);

	const handleFilterStateChange = useCallback(
		(filter: IFilterSessionEvents) => {
			setFilterState(filter);
			handleGetUserEvents({
				filterState: filter,
			});
		},
		[handleGetUserEvents],
	);

	const isResultEmpty = !eventCardData?.length && !userEventsLoading;

	return {
		eventCardData,
		loading: userEventsLoading,
		isResultEmpty,
		loadMore,
		handleRefetchEvents,
		isFilterModalOpen,
		isSortModalOpen,
		filterState,
		setFilterState,
		toggleFilterModal,
		toggleSortModal,
		sortType,
		setSortType,
		handleSortTypeChange,
		handleFilterStateChange,
	};
};

export default useLectureDetailsController;
