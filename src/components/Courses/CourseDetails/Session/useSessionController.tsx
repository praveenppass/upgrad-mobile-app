import { useIsFocused } from "@react-navigation/native";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import extractEventCardData, {
	getSortOrderBasedOnType,
} from "@screens/Home/HomeTab/AcademicPlanner/academicPlanner.utils";

import { IEventCardProps } from "@components/academicPlanner/cards/eventCard/eventCard.interfaces";
import {
	ICarrerStatusType,
	IFilterSessionEvents,
	ILearningOrCareerStatusType,
	ILearningType,
	IPrepartionType,
	ISessionFilterType,
	ISessionScheduledType,
	ISessionType,
} from "@components/Courses/CourseDetails/Session/index.interface";
import SessionModel from "@components/Courses/CourseDetails/Session/useSessionModel";
import { ISortType } from "@components/Reusable/SortModal";

import { ISessionUrgentQueryVariables } from "@graphql/query/academicPlanner/getUrgentUserEvents";
import {
	IUserEventQueryVariables,
	IUserEventStatusType,
} from "@graphql/query/academicPlanner/getUserEvents";

import useAppState from "@hooks/useAppState";
import useGetTimezone from "@hooks/useGetTimezone";

import { RootState } from "@redux/store/root.reducer";

const DEFAULT_LIMIT = 10;
const LIST = "list";
const ALL_EVENT_TYPES = Object.values(ISessionType);

interface ISessionProps {
	courseId: string;
}

export const useSessionController = ({ courseId }: ISessionProps) => {
	const {
		user: { id },
	} = useSelector((state: RootState) => state.user);

	const {
		getUrgentUsertEvents,
		getEvents,
		getLiveSessionCourses,
		urgentUserEventsData,
		userEventsData,
		liveSessionCoursesData,
		urgentLoading,
		loading,
		liveSessionCoursesLoading,
	} = SessionModel();
	const [eventStatus, setEventStatus] = useState(
		IPrepartionType.LIVE_LEARNING,
	);
	const { name: userTimezone } = useGetTimezone();

	const [isFilterModalOpen, setOpenFilterModal] = useState(false);
	const [isSortModalOpen, setOpenSortModal] = useState(false);
	const [filterState, setFilterState] = useState<IFilterSessionEvents>({
		[ISessionFilterType.STATUS]: [],
		[ISessionFilterType.TYPE]: [],
	});

	const [eventCardData, setEventCardData] = useState<IEventCardProps[]>([]);

	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [skip, setSkip] = useState(0);

	const startDate = moment().tz(userTimezone).toISOString();

	const [sortType, setSortType] = useState<ISortType>(ISortType.Default);

	const [selectedEvent, setSelectedEvent] =
		useState<ILearningOrCareerStatusType>(ILearningType.UPCOMING);

	const isEventLearning = eventStatus === IPrepartionType.LIVE_LEARNING;

	const isEventPrep = eventStatus === IPrepartionType.CAREER_PREP;

	const isCoursesTabSelected =
		isEventLearning && selectedEvent === ILearningType.COURSES;
	const overallLoading = isCoursesTabSelected
		? liveSessionCoursesLoading
		: urgentLoading || (!isFetchingMore && loading);

	const handleEventStatus = (val: IPrepartionType) => {
		setEventStatus(val);
	};

	const toggleFilterModal = () => {
		setOpenFilterModal(!isFilterModalOpen);
	};

	const toggleSortModal = () => {
		setOpenSortModal(!isSortModalOpen);
	};

	const urgentEventQueryVariables = {
		where: {
			user: id,
			type: { _in: [ISessionScheduledType.MENTORSHIP] },
			status: { _in: [ISessionScheduledType.PENDING] },
			userProgram: {
				_in: [courseId],
			},
		},
	};

	const getUrgentEvents = () => {
		getUrgentUsertEvents({
			variables:
				urgentEventQueryVariables as ISessionUrgentQueryVariables,
			fetchPolicy: "no-cache",
		});
	};

	const getUserEvents = (variables: IUserEventQueryVariables) =>
		getEvents({
			variables: variables,
			fetchPolicy: "no-cache",
		});

	const onGetEvents = () => {
		// If Courses tab is selected, call liveSessionCourses API
		if (isEventLearning && selectedEvent === ILearningType.COURSES) {
			return getLiveSessionCourses({
				variables: {
					where: {
						id: courseId,
					},
				},
				fetchPolicy: "no-cache",
			});
		}

		if (isEventPrep && selectedEvent === ICarrerStatusType.TO_BE_SCHEDULED)
			return getUrgentEvents();

		const baseVariables = {
			limit: DEFAULT_LIMIT,
			skip,
		};

		const baseWhereVariables = {
			viewType: LIST,
			user: id,
			userProgram: { _in: [courseId] },
		};

		let userEventsVariables: IUserEventQueryVariables;

		if (isEventPrep) {
			const isExpired = selectedEvent === ICarrerStatusType.EXPIRED;
			const isScheduled = selectedEvent === ICarrerStatusType.SCHEDULED;
			const expiredStatusArray = [ISessionScheduledType.EXPIRED];

			let status: IUserEventStatusType | undefined;
			if (isExpired) status = { _in: expiredStatusArray };
			else if (isScheduled) status = { _nin: expiredStatusArray };

			const type = {
				_in: [
					ISessionScheduledType.PERSONALISED_INDUSTRY,
					ISessionScheduledType.MENTORSHIP,
				],
			};

			userEventsVariables = {
				...baseVariables,
				where: {
					...baseWhereVariables,
					...(status && { status }),
					type,
				},
			};
		} else {
			const type = {
				_in: filterState[ISessionFilterType.TYPE].length
					? filterState[ISessionFilterType.TYPE]
					: ALL_EVENT_TYPES,
			};

			const status = filterState[ISessionFilterType.STATUS].length
				? { _in: filterState[ISessionFilterType.STATUS] }
				: undefined;

			const endsAt =
				selectedEvent === ILearningType.UPCOMING
					? { _gte: startDate }
					: { _lt: startDate };

			userEventsVariables = {
				...baseVariables,
				sort: { endsAt: getSortOrderBasedOnType(sortType) },
				where: {
					...baseWhereVariables,
					...(status && { status }),
					endsAt,
					type,
				},
			};
		}

		return getUserEvents(userEventsVariables);
	};

	const handleForeground = () => {
		setSkip(0);
		setEventCardData([]);
		onGetEvents();
	};
	useAppState({ handleForeground });

	const isFocused = useIsFocused();

	useEffect(() => {
		if (!isFocused) return;

		setSkip(0);
		setEventCardData([]);
		onGetEvents();
	}, [isFocused, eventStatus, selectedEvent, filterState, sortType]);

	useEffect(() => {
		onGetEvents();
	}, [skip]);

	useEffect(() => {
		if (!userEventsData) return;

		const extractedData = extractEventCardData(
			userEventsData.userEvents?.result,
		);

		setEventCardData((prev) => [...prev, ...extractedData]);
		setIsFetchingMore(false);
	}, [userEventsData]);

	const isResultEmpty = !eventCardData?.length;

	useEffect(() => {
		if (!urgentUserEventsData) return;

		const extractedData = extractEventCardData(
			urgentUserEventsData?.urgentUserEvents?.result,
		);

		setEventCardData([...extractedData]);
		setIsFetchingMore(false);
	}, [urgentUserEventsData]);

	const loadMore = () => {
		const totalCount = userEventsData?.userEvents?.totalCount || 0;
		const hasMoreEvents = eventCardData.length < totalCount;
		if (!isFetchingMore && hasMoreEvents) {
			setIsFetchingMore(true);
			setSkip(skip + DEFAULT_LIMIT);
		}
	};

	const handleRefetchEvents = () => {
		if (isCoursesTabSelected) {
			getLiveSessionCourses({
				variables: {
					where: {
						id: courseId,
					},
				},
				fetchPolicy: "no-cache",
			});
			return;
		}
		setEventCardData([]);
		skip !== 0 ? setSkip(0) : onGetEvents();
	};

	const coursesData =
		liveSessionCoursesData?.liveSessionCourses?.result || [];

	return {
		eventStatus,
		eventCardData,
		isFilterModalOpen,
		isSortModalOpen,
		sortType,
		filterState,
		selectedEvent,
		overallLoading,
		isEventLearning,
		isCoursesTabSelected,
		coursesData,
		setSelectedEvent,
		setFilterState,
		setSortType,
		toggleFilterModal,
		toggleSortModal,
		handleEventStatus,
		loadMore,
		isFetchingMore,
		isResultEmpty,
		handleRefetchEvents,
	};
};

export default useSessionController;
