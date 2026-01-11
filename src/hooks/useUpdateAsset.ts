import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import {
	updateAssetUserCourse,
	updateAssetUserProgram,
} from "@graphql/mutation/updateAssetCompletion";
import { getUserCourse } from "@graphql/query/drawerQuery/getCourseDetails";
import {
	getMilestoneListQuery,
	getMilestoneOnlyListQuery,
} from "@graphql/query/drawerQuery/getMilestoneListQuery";
import { getUserProgram } from "@graphql/query/drawerQuery/userProgram";
import { getUserCourseContainersQuery } from "@graphql/query/getUserCourseContainersQuery";

import {
	currentMileStone,
	isProgram,
	reloadSelectedWeek,
} from "@utils/courseDetailsUtils";

import { client } from "@config/apollo";

import { studyPlanSlice } from "@redux/slices/studyplan.slice";
import { type RootState } from "@redux/store/root.reducer";

import { ICourseVariantEnum } from "@interface/app.interface";
import {
	type IUpdateAssetForUserProgramData,
	type IUpdateAssetVariables,
} from "@interface/asset.interface";
import { IMilestoneType } from "@interface/milestonetype.interface";

const useUpdateAsset = () => {
	const selectedCourseID =
		useSelector((state: RootState) => state.studyPlan?.selectedCourseID) ??
		"";
	const dispatch = useDispatch();

	const moduleCode = useSelector(
		(state: RootState) => state.studyPlan?.moduleCode,
	);
	const courseVariant = useSelector(
		(state: RootState) =>
			state.studyPlan?.courseVariant as ICourseVariantEnum,
	);
	const selectedMilestone = useSelector(
		(state: RootState) => state.studyPlan?.selectedMilestone,
	);
	const selectedWeek = useSelector(
		(state: RootState) => state.studyPlan?.selectedWeek,
	);

	const isProgramAsset = isProgram(courseVariant);

	const variableWithCourse = {
		where: {
			id: selectedCourseID,
		},
	};

	const [getMilestoneQuery] = useLazyQuery<IMilestoneType>(
		getMilestoneListQuery,
		{
			client,
			variables: variableWithCourse,
			fetchPolicy: "no-cache",
			onCompleted(data) {
				if (data) {
					dispatch(
						studyPlanSlice.actions.setMileStoneList(
							data?.userProgramContainers,
						),
					);
					const mileStone = currentMileStone(data);
					//* Update Selected MileStone
					if (mileStone) {
						dispatch(
							studyPlanSlice.actions.selectMilestone({
								...mileStone,
							}),
						);
						let variables = {
							where: {
								id: selectedCourseID ?? "",
								level1: selectedMilestone?.code,
							},
						};
						getMilestoneWeeksFunc({
							variables,
						});
					}
				}
				//* In Case of Week is Selected Update Week State
				if (selectedWeek !== null) {
					let variables = {
						where: {
							id: selectedCourseID ?? "",
							level1: selectedMilestone?.code,
						},
					};
					getMilestoneWeeksFunc({
						variables,
					});
					//* Update Course Details
					getCourseDetails();
				}
			},
		},
	);

	const QUERY = isProgram(courseVariant) ? getUserProgram : getUserCourse;

	const [getCourseDetails] = useLazyQuery(QUERY, {
		client,
		variables: variableWithCourse,
		fetchPolicy: "no-cache",
		onCompleted(data) {
			dispatch(
				studyPlanSlice.actions.selectedCourseDetailsAction({
					selectedCourseDetails: data,
				}),
			);
		},
	});

	const [getMilestoneWeeksFunc] = useLazyQuery<IMilestoneType>(
		getMilestoneOnlyListQuery,
		{
			client,
			fetchPolicy: "no-cache",
			onCompleted(data) {
				if (
					selectedWeek !== null &&
					data?.userProgramContainers?.length
				) {
					let updatedWeek = reloadSelectedWeek(
						data?.userProgramContainers,
						selectedWeek!,
					);
					if (updatedWeek) {
						dispatch(
							studyPlanSlice.actions.selectMilestoneWeek(
								updatedWeek,
							),
						);
					}
				}
			},
		},
	);

	const getRefetchData = () => {
		let variables = {
			where: {
				id: selectedCourseID ?? "",
				level1: selectedMilestone?.code,
			},
		};
		getMilestoneWeeksFunc({ variables });
	};

	const updateAssetFun = async (
		updateAssetVar: IUpdateAssetVariables,
		cb?: () => void,
	) => {
		await onUpdateAsset({
			variables: updateAssetVar,
			onCompleted: () => {
				if (isProgramAsset) {
					//* In order update redux State of MileStone
					getMilestoneQuery();
				}
				if (cb) {
					// calling callback func if its available
					cb();
				}
			},
		});
	};

	const weekVariables = {
		where: {
			id: selectedCourseID,
			level2: selectedWeek?.code,
			level1: selectedMilestone?.code,
		},
	};

	const weekUpdateVariables = {
		where: {
			id: selectedCourseID,
			level1: selectedMilestone?.code,
		},
	};

	const refetchQueries = [
		{
			query: isProgramAsset ? getUserProgram : getUserCourse,
			variables: variableWithCourse,
		},
	];

	if (isProgramAsset) {
		refetchQueries.push({
			query: getMilestoneListQuery,
			variables: variableWithCourse,
		});
	} else {
		refetchQueries.push({
			query: getUserCourseContainersQuery,
			variables: variableWithCourse,
		});
	}

	if (weekVariables?.where?.level1) {
		refetchQueries.push({
			variables: weekVariables,
			query: getMilestoneListQuery,
		});
	}
	if (weekUpdateVariables?.where?.level1) {
		refetchQueries.push({
			variables: weekUpdateVariables,
			query: getMilestoneOnlyListQuery,
		});
	}

	if (moduleCode && !isProgramAsset) {
		refetchQueries.push({
			query: getUserCourseContainersQuery,
			variables: {
				where: {
					// @ts-ignore unknown type issue on level1 variable
					level1: moduleCode,
					id: selectedCourseID,
				},
			},
		});
	}

	const [onUpdateAsset, { loading: updateAssetLoading }] =
		useMutation<IUpdateAssetForUserProgramData>(
			isProgram(courseVariant)
				? updateAssetUserProgram
				: updateAssetUserCourse,
			{
				client,
				refetchQueries,
			},
		);
	return {
		updateAssetLoading,
		updateAssetFun,
		getMilestoneQuery,
		getCourseDetails,
		getRefetchData,
	};
};

export default useUpdateAsset;
