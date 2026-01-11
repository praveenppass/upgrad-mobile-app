import { useLazyQuery } from "@apollo/client";

import getSpecializationProgramQuery, {
	ISpecializationProgramQuery,
	ISpecializationProgramVariables,
} from "@graphql/query/studyPlan/container1/getSpecializationProgram";

import { client } from "@config/apollo";

const useContainer1Model = () => {
	const [
		getSpecializationProgram,
		{ data: specializationList, loading: specializationListLoading },
	] = useLazyQuery<
		ISpecializationProgramQuery,
		ISpecializationProgramVariables
	>(getSpecializationProgramQuery, {
		client,
		fetchPolicy: "no-cache",
	});
	return {
		getSpecializationProgram,
		specializationList,
		specializationListLoading,
	};
};

export default useContainer1Model;
