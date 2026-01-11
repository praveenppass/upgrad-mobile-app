import { useLazyQuery } from "@apollo/client";

import { getOnboardingOptionsQuery } from "@graphql/query/getOnboardingOptionsQuery";

import { client } from "@config/apollo";

const useGetOnboardingOptionsQuery = () => {
	const [getData, { data: listing, loading, refetch }] = useLazyQuery(
		getOnboardingOptionsQuery,
		{
			client,
			fetchPolicy: "network-only",
		},
	);

	const getOptions = (variables: any) => {
		getData(variables);
	};

	return { getOptions, listing, loading, refetch };
};

export default useGetOnboardingOptionsQuery;
