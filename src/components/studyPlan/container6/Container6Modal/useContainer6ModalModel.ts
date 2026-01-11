import { useLazyQuery } from "@apollo/client";

import getContainer3CourseQuery, {
	IGetContainer3CourseQueryData,
	IGetContainer3CourseQueryVariables,
} from "@graphql/query/studyPlan/container3/getContainer3CourseQuery";
import getContainer3ProgramCardListQuery, {
	IGetContainer3ProgramCardListQueryData,
	IGetContainer3ProgramCardListQueryVariables,
} from "@graphql/query/studyPlan/container3/getContainer3ProgramCardListQuery";
import getContainer3SessionQuery, {
	IGetContainer3SessionQueryData,
	IGetContainer3SessionQueryVariables,
} from "@graphql/query/studyPlan/container3/getContainer3SessionQuery";
import getContainer6ProgramQuery, {
	IGetContainer6ProgramQueryData,
	IGetContainer6ProgramQueryVariables,
} from "@graphql/query/studyPlan/container6/getContainer6ProgramQuery";

import { client } from "@config/apollo";

const useContainer6Model = () => {
	const [
		getContainer6ProgramQueryData,
		{ data: container6ProgramData, loading: container6ProgramDataLoading },
	] = useLazyQuery<
		IGetContainer6ProgramQueryData,
		IGetContainer6ProgramQueryVariables
	>(getContainer6ProgramQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getContainer3CourseQueryData,
		{
			data: container3CourseData,
			loading: container3CourseDataLoading,
			refetch: refetchContainer3CourseQueryData,
		},
	] = useLazyQuery<
		IGetContainer3CourseQueryData,
		IGetContainer3CourseQueryVariables
	>(getContainer3CourseQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getContainer3ProgramCardListData,
		{
			data: container3ProgramCardListData,
			loading: container3ProgramCardListDataLoading,
		},
	] = useLazyQuery<
		IGetContainer3ProgramCardListQueryData,
		IGetContainer3ProgramCardListQueryVariables
	>(getContainer3ProgramCardListQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		getContainer3SessionData,
		{ data: container3SessionData, loading: container3SessionDataLoading },
	] = useLazyQuery<
		IGetContainer3SessionQueryData,
		IGetContainer3SessionQueryVariables
	>(getContainer3SessionQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		getContainer6ProgramQueryData,
		container6ProgramData,
		container6ProgramDataLoading,
		getContainer3ProgramCardListData,
		container3ProgramCardListData,
		container3ProgramCardListDataLoading,
		getContainer3SessionData,
		container3SessionData,
		container3SessionDataLoading,
		getContainer3CourseQueryData,
		container3CourseData,
		container3CourseDataLoading,
		refetchContainer3CourseQueryData,
	};
};

export default useContainer6Model;
