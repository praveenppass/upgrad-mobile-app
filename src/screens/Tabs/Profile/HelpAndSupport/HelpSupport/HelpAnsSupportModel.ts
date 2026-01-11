import { useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import {
	getCourseProgramList,
	IGetCourseProgramListResponse,
	IUserCourseListInputVariables,
} from "@graphql/query/getCourseProgramList";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

const HelpAnsSupportModel = () => {
	const { id } = useSelector((state: RootState) => state.user.user);

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

	return {
		getCourseList,
	};
};

export default HelpAnsSupportModel;
