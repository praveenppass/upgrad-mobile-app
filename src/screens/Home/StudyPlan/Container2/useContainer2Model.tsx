import { useLazyQuery } from "@apollo/client";

import getProgramScoreCardQuery, {
	IGetProgramScoreCardQuery,
	IGetProgramScoreCardQueryVariables,
} from "@graphql/query/studyPlan/container2/getProgramScoreCardQuery";

import { client } from "@config/apollo";

const useContainer2Model = () => {
	const [getProgramScoreCard] = useLazyQuery<
		IGetProgramScoreCardQuery,
		IGetProgramScoreCardQueryVariables
	>(getProgramScoreCardQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return { getProgramScoreCard };
};

export default useContainer2Model;
