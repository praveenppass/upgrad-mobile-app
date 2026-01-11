import { useLazyQuery } from "@apollo/client";

import getAspirationDetails, {
	IAspirationDetails,
} from "@graphql/query/myProfile/myAccount/getAspirationDetails";

import { client } from "@config/apollo";

const useAspirationsModel = () => {
	const [
		getAspirationsData,
		{ data: aspirationsData, refetch: refetchMyAspirationsData },
	] = useLazyQuery<IAspirationDetails>(getAspirationDetails, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		aspirationsData,
		getAspirationsData,
		refetchMyAspirationsData,
	};
};
export default useAspirationsModel;
