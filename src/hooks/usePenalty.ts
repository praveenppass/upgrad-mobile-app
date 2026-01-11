import { ApolloError, useMutation } from "@apollo/client";
import crashlytics from "@react-native-firebase/crashlytics";
import { useDispatch, useSelector } from "react-redux";

import { cancelExtensionDueDate } from "@graphql/mutation/cancelExtensiondueDate";
import { updateUserAssetDueDate } from "@graphql/mutation/updateUserAssetDueDate";
import { getUserCourse } from "@graphql/query/drawerQuery/getCourseDetails";
import {
	getMilestoneListQuery,
	getMilestoneOnlyListQuery,
} from "@graphql/query/drawerQuery/getMilestoneListQuery";
import { getUserProgram } from "@graphql/query/drawerQuery/userProgram";

import { useRefetchCourseDetails } from "@hooks/useRefetchCourseDetails";

import { isProgram } from "@utils/courseDetailsUtils";

import { client } from "@config/apollo";

import { snackSlice } from "@redux/slices/snack.slice";
import { RootState } from "@redux/store/root.reducer";

import { ICourseVariantEnum, ISnackType } from "@interface/app.interface";

import { strings } from "@assets/strings";

import useUpdateAsset from "./useUpdateAsset";

interface IPenaltyTypes {
	assetCode?: string | number;
	level2?: string | number | null;
	level3?: string | number | null;
	level4?: string | number | null;
	moduleCode?: string | number | null;
	pullDownToRefresh?: any;
}

const usePenalty = ({
	assetCode,
	level2,
	level3,
	level4,
	moduleCode,
	pullDownToRefresh,
}: IPenaltyTypes) => {
	const dispatch = useDispatch();
	const { onRefetchCourseDetails } = useRefetchCourseDetails();
	const { getMilestoneQuery, getRefetchData } = useUpdateAsset();

	const courseVariant = useSelector(
		(state: RootState) => state.studyPlan?.courseVariant,
	);
	const isCourseProgram = isProgram(courseVariant as ICourseVariantEnum);

	const selectedMilestone = useSelector(
		(state: RootState) => state.studyPlan?.selectedMilestone,
	);
	const selectedCourseID = useSelector(
		(state: RootState) => state.studyPlan?.selectedCourseID,
	);
	const selectedWeek = useSelector(
		(state: RootState) => state.studyPlan?.selectedWeek,
	);

	const onError = (error: ApolloError) => {
		crashlytics().recordError(error);
		dispatch(
			snackSlice.actions.showAlert({
				type: ISnackType.error,
				message: error.message,
			}),
		);
		return;
	};

	const getRefetchQuery = () => {
		let variables;
		if (isCourseProgram) {
			variables = {
				where: {
					id: selectedCourseID ?? "",
					level1: selectedMilestone?.code,
					level2: selectedWeek?.code,
					level3: moduleCode,
				},
			};
		}
		return variables;
	};

	const variableWithCourse = {
		where: {
			id: selectedCourseID,
		},
	};

	const refetchQueries = [
		{
			query: getMilestoneListQuery,
			variables: getRefetchQuery(),
		},
		{
			query: getMilestoneOnlyListQuery,
			variables: getRefetchQuery(),
		},
		{
			query: isCourseProgram ? getUserProgram : getUserCourse,
			variables: variableWithCourse,
		},
	];

	const variables = {
		where: {
			asset: assetCode,
			userProgram: selectedCourseID ?? "",
			level1: selectedMilestone?.code,
			level2: level2,
			level3: level3,
			level4: level4,
		},
	};

	const onComplete = (message: string) => {
		if (pullDownToRefresh) {
			pullDownToRefresh();
		}
		onRefetchCourseDetails();
		getRefetchData();
		getMilestoneQuery();
		dispatch(
			snackSlice.actions.showAlert({
				message,
				type: ISnackType.success,
			}),
		);
	};

	// Need Extension
	const [onExtend] = useMutation(updateUserAssetDueDate, {
		client,
		onError,
		variables,
		refetchQueries,
	});

	// Cancel Extension
	const [onCancelExtension] = useMutation(cancelExtensionDueDate, {
		client,
		onError,
		variables,
		refetchQueries,
	});

	const onExtensionHandler = (cb?: () => void) => {
		onExtend({
			onCompleted: () => {
				if (cb) {
					cb();
				}
				onComplete(strings.DUE_DATE_EXTENDED_SUCCESSFULLY);
			},
		});
	};

	const onCancelExtensionHandler = (cb?: () => void) => {
		onCancelExtension({
			onCompleted: () => {
				if (cb) {
					cb();
				}
				onComplete(strings.CANCELLED_EXTENDED_SUCCESSFULLY);
			},
		});
	};

	return {
		onExtensionHandler,
		onCancelExtensionHandler,
	};
};

export default usePenalty;
