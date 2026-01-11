import { useQuery } from "@apollo/client";

import { getHomeLearnerCourses } from "@graphql/query/getHomeLearnerCourses";

import { client } from "@config/apollo";

import { IHomeLearnerCourses } from "@interface/myPrograms.interface";

const useSearchCourseModel = () => {
	const { data, loading } = useQuery<IHomeLearnerCourses>(
		getHomeLearnerCourses,
		{
			client,
			fetchPolicy: "no-cache",
			variables: {
				where: {
					course: {
						_exists: false,
					},
				},
			},
		},
	);

	return {
		data: data,
		loading: loading,
	};
};

export default useSearchCourseModel;
