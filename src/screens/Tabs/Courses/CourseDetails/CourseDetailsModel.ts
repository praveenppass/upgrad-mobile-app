import { useLazyQuery, useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserCourse } from "@graphql/query/drawerQuery/getCourseDetails";
import { getMilestoneListQuery } from "@graphql/query/drawerQuery/getMilestoneListQuery";
import { getUserProgram } from "@graphql/query/drawerQuery/userProgram";
import { getUserDetails } from "@graphql/query/getUserDetails";

import { HOME_ROUTES } from "@navigation/routes";
import useAppRoute from "@navigation/useAppRoute";

import {
	currentMileStone,
	isMileStone,
	isProgram,
} from "@utils/courseDetailsUtils";

import { client } from "@config/apollo";

import { appSlice } from "@redux/slices/app.slice";
import { studyPlanSlice } from "@redux/slices/studyplan.slice";
import { userSlice } from "@redux/slices/user.slice";
import { RootState } from "@redux/store/root.reducer";

import { ICourseVariantEnum } from "@interface/app.interface";
import { IMilestoneType } from "@interface/milestonetype.interface";

interface IVariables {
	where: { id: string };
}

export const useCourseDetailsModelLxp = () => {
	const route = useAppRoute<typeof HOME_ROUTES.CourseDetailsScreen>();
	const { courseID, courseVariant, isSpecialization } = route.params;
	const dispatch = useDispatch();
	const { id } = useSelector((state: RootState) => state.user?.user);
	const triggerReload = useSelector(
		(state: RootState) => state.studyPlan?.triggerReload,
	);
	const isNetworkBack = useSelector(
		(state: RootState) => state.app.isNetworkBack,
	);

	const QUERY = isProgram(courseVariant) ? getUserProgram : getUserCourse;

	const variables: IVariables = {
		where: {
			id: courseID,
		},
	};

	async function getMilestone() {
		if (!isMileStone(courseVariant)) {
			return;
		}
		await getMilestoneQuery({
			variables,
		});
	}

	const refetchCourse = async () => {
		await getCoursesDetails().catch(() => {
			//
		});
		await getMilestone().catch(() => {
			//
		});
	};

	useEffect(() => {
		refetchCourse();
	}, [triggerReload]);

	useEffect(() => {
		if (isNetworkBack) {
			refetchCourse();
			dispatch(appSlice.actions.changeNetworkStatus());
		}
	}, [isNetworkBack]);

	const [getData, { data: coursesDetails, loading: coursesDetailsLoading }] =
		useLazyQuery(QUERY, {
			client,
			variables,
			fetchPolicy: "no-cache",
		});

	const [
		getMilestoneQuery,
		{ data: milestoneDetailsData, loading: moduleLoading },
	] = useLazyQuery<IMilestoneType>(getMilestoneListQuery, {
		client,
		variables,
		fetchPolicy: "no-cache",
		onCompleted(data) {
			if (data) {
				dispatch(
					studyPlanSlice.actions.setMileStoneList(
						data?.userProgramContainers,
					),
				);
				const mileStone = currentMileStone(data);
				if (mileStone) {
					dispatch(studyPlanSlice.actions.selectMilestone(mileStone));
				}
			}
		},
	});

	async function getCoursesDetails() {
		await getData({
			variables,
		});
	}

	const { data: userData } = useQuery(getUserDetails, {
		client,
		fetchPolicy: "no-cache",
		variables: {
			where: {
				id,
			},
		},
		onCompleted(data) {
			dispatch(userSlice.actions.setUser(data?.user));
		},
	});

	return {
		getData,
		coursesDetails,
		coursesDetailsLoading,
		userData,
		milestoneDetailsData,
		moduleLoading,
		courseID,
		courseVariant,
		isSpecialization,
	};
};
