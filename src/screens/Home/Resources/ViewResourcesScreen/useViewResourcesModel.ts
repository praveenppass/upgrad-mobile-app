import { useLazyQuery } from "@apollo/client";

import getSessionResourcesQuery, {
	ISessionResources,
	ISessionResourcesQueryVariables,
} from "@graphql/query/session/resources/getSessionResourcesQuery";
import getWorkshopSessionResourcesQuery, {
	IWorkshopSessionResources,
	IWorkshopSessionResourcesQueryVariables,
} from "@graphql/query/session/resources/getWorkshopSessionResourcesQuery";

import { client } from "@config/apollo";

const useViewResourcesModel = () => {
	const [
		getSessionResources,
		{ data: sessionResourcesData, loading: sessionResourcesLoading },
	] = useLazyQuery<ISessionResources, ISessionResourcesQueryVariables>(
		getSessionResourcesQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [
		getWorkshopSessionResources,
		{
			data: workshopSessionResourcesData,
			loading: workshopSessionResourcesLoading,
		},
	] = useLazyQuery<
		IWorkshopSessionResources,
		IWorkshopSessionResourcesQueryVariables
	>(getWorkshopSessionResourcesQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	return {
		getSessionResources,
		getWorkshopSessionResources,
		sessionResourcesData,
		workshopSessionResourcesData,
		sessionResourcesLoading,
		workshopSessionResourcesLoading,
	};
};

export default useViewResourcesModel;
