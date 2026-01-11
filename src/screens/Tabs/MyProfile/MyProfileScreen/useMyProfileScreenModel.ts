import { useLazyQuery } from "@apollo/client";

import getMyAccountDetails, {
	IMyAccountQueryResponse,
	IMyAccountQueryVariables,
} from "@graphql/query/myProfile/myAccount/getMyAccountDetails";
import getProfileCompletionPercentageQuery, {
	IProfileCompletionPercentage,
} from "@graphql/query/myProfile/myAccount/getProfileCompletionPercentageQuery";

import { client } from "@config/apollo";

const useMyProfileScreenModel = () => {
	const [
		getMyAccountMainData,
		{ data: myAccountData, loading: myAccountloading },
	] = useLazyQuery<IMyAccountQueryResponse, IMyAccountQueryVariables>(
		getMyAccountDetails,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [
		getCompletionPercentage,
		{ data: userCompletionData, loading: completionPercentageLoading },
	] = useLazyQuery<IProfileCompletionPercentage>(
		getProfileCompletionPercentageQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	return {
		myAccountData,
		myAccountloading,
		getMyAccountMainData,
		userCompletionData,
		getCompletionPercentage,
		completionPercentageLoading,
	};
};

export default useMyProfileScreenModel;
