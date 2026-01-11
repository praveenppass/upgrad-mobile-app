import { useLazyQuery } from "@apollo/client";

import getAssetPenaltyConfigurationsQuery, {
	IAssetPenaltyConfigurationsQuery,
	IGetAssetPenaltyConfigurationsQueryVariables,
} from "@graphql/query/assetPenalty/getAssetPenaltyConfiguration";

import { client } from "@config/apollo";

const useAssetPenaltyModel = () => {
	const [
		getAssetPenalty,
		{
			data: penaltyConfigurationData,
			loading: loadingAssetPenalty,
			refetch: refetchAssetPenalty,
		},
	] = useLazyQuery<
		IAssetPenaltyConfigurationsQuery,
		IGetAssetPenaltyConfigurationsQueryVariables
	>(getAssetPenaltyConfigurationsQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		getAssetPenalty,
		penaltyConfigurationData,
		loadingAssetPenalty,
		refetchAssetPenalty,
	};
};

export default useAssetPenaltyModel;
