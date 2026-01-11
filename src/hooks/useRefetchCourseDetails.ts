import { useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import { getUserCourse } from "@graphql/query/drawerQuery/getCourseDetails";
import {
	getMilestoneListQuery,
	getMilestoneOnlyListQuery,
} from "@graphql/query/drawerQuery/getMilestoneListQuery";
import { getUserProgram } from "@graphql/query/drawerQuery/userProgram";
import { getUserCourseContainersQuery } from "@graphql/query/getUserCourseContainersQuery";
import { refetchHomeDetails } from "@graphql/query/refetchHomeDetails";

import { isProgram } from "@utils/courseDetailsUtils";

import { client } from "@config/apollo";

import { type RootState } from "@redux/store/root.reducer";

import { ICourseVariantEnum } from "@interface/app.interface";

const useRefetchCourseDetails = () => {
	const id = useSelector((state: RootState) => state.user?.user.id);
	const selectedCourseID =
		useSelector((state: RootState) => state.studyPlan?.selectedCourseID) ??
		"";
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
	const courseCode = selectedMilestone?.code;

	const variableWithCourse = {
		where: {
			id: selectedCourseID,
		},
	};
	const weekVariables = {
		where: {
			level1: courseCode,
			id: selectedCourseID,
			level2: selectedWeek?.code,
		},
	};
	const weekUpdateVariables = {
		where: {
			level1: courseCode,
			id: selectedCourseID,
		},
	};

	const [onRefetchFuc] = useLazyQuery(
		isProgramAsset ? getUserProgram : getUserCourse,
		{
			client,
			variables: variableWithCourse,
		},
	);

	const [onRefetchHomeDetails] = useLazyQuery(refetchHomeDetails, {
		client,
		fetchPolicy: "network-only",
		variables: {
			id,
			skip: 0,
			limit: 5,
		},
	});

	const [onFetchMileStoneList] = useLazyQuery(getMilestoneListQuery, {
		client,
	});

	const [onFetchMileStoneListOnly] = useLazyQuery(getMilestoneOnlyListQuery, {
		client,
	});

	const [onFetchCourseContainers] = useLazyQuery(
		getUserCourseContainersQuery,
		{
			client,
			fetchPolicy: "network-only",
		},
	);

	const onRefetchCourseDetails = () => {
		onRefetchFuc();
		if (isProgramAsset) {
			onFetchMileStoneList({ variables: variableWithCourse });
			if (weekVariables?.where?.level2) {
				onFetchMileStoneList({ variables: weekVariables });
			}
			if (weekUpdateVariables?.where?.level1) {
				onFetchMileStoneListOnly({ variables: weekUpdateVariables });
			}
		} else {
			onFetchCourseContainers({ variables: variableWithCourse });
			if (moduleCode) {
				onFetchCourseContainers({
					variables: {
						where: {
							level1: moduleCode,
							id: selectedCourseID,
						},
					},
				});
			}
		}
	};

	return { onRefetchHomeDetails, onRefetchCourseDetails };
};

export { useRefetchCourseDetails };
