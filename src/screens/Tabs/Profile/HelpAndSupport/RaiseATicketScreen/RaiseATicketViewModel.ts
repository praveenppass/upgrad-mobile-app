import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createTicketQuery } from "@graphql/mutation/createTicket";
import {
	getCourseProgramList,
	IGetCourseProgramListResponse,
	IUserCourseListInputVariables,
} from "@graphql/query/getCourseProgramList";
import { getTicketCardQuery } from "@graphql/query/getTicketCardQuery";
import { getTicketCategory } from "@graphql/query/getTicketCategory";
import { getTicketSummaryQuery } from "@graphql/query/getTicketSummaryQuery";
import { IGetDegreeListQuery } from "@graphql/query/myProfile/educationDetails/getDegreeList";

import { useHelpSupportEvents } from "@hooks/useHelpSupportEvents";

import { client } from "@config/apollo";

import { snackSlice } from "@redux/slices/snack.slice";
import { RootState } from "@redux/store/root.reducer";

import { ISnackType } from "@interface/app.interface";
import {
	IAllTicketCategoryList,
	IUserCourseList,
} from "@interface/courseList.interface";
import { ICreateTicketData } from "@interface/helpSupport.interface";

import { strings } from "@assets/strings";

export const RAISE_ISSUE_DESCRIPTION_MAX_LENGTH = 300;
export const RAISE_ISSUE_SUBJECT_MAX_LENGTH = 80;

const RaiseATicketViewModel = () => {
	const dispatch = useDispatch();
	const { OnSubmitClicked } = useHelpSupportEvents();
	const id = useSelector((state: RootState) => state.user.user.id);

	const [getCourseList, { data: courseList, loading: courseLoading }] =
		useLazyQuery<
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

	//* Get CategoryList List
	const [getCategory, { data: categoryList, loading: categoryLoading }] =
		useLazyQuery<IAllTicketCategoryList>(getTicketCategory, {
			client,
			fetchPolicy: "network-only",
		});

	const refetchTicketVariables = {
		where: {
			status: {
				_in: ["OPEN", "PENDING"],
			},
		},
		skip: 0,
		limit: 10,
		sort: {
			updatedAt: "desc",
		},
		resetTickets: true,
	};

	const refetchTicketList = {
		query: getTicketCardQuery,
		variables: refetchTicketVariables,
	};
	const refetchTicketSummary = {
		query: getTicketSummaryQuery,
	};

	const [createTicketFunction, { loading: createTicketLoading }] =
		useMutation(createTicketQuery, {
			client,
			refetchQueries: [refetchTicketList, refetchTicketSummary],
		});

	const createTicket = (postData: ICreateTicketData) => {
		const mutationAction = new Promise((resolve, reject) => {
			if (createTicketLoading) return;
			createTicketFunction({
				variables: postData,
				onCompleted: (data) => {
					OnSubmitClicked(
						courseList?.allLearnerCourses[0]?.program?.name ?? "NA",
						data?.createTicket?.category ?? "NA",
						data.createTicket?.id,
					);
					dispatch(
						snackSlice.actions.showAlert({
							type: ISnackType.success,
							message: strings.NEW_TICKET_CREATED_SUCCESSFULLY,
						}),
					);
					resolve(data);
				},
				onError: (error) => {
					reject(error);
				},
			});
		});
		return mutationAction;
	};

	return {
		courseListData: {
			loading: courseLoading,
			getCourseList,
			data: courseList,
		},
		categoryListData: {
			loading: categoryLoading,
			data: categoryList,
			getCategory,
		},
		isDropDownItemLoading: courseLoading || categoryLoading || false,
		createTicket,
	};
};

export default RaiseATicketViewModel;
