import { useEffect, useMemo } from "react";

import useViewResourcesModel from "@screens/Home/Resources/ViewResourcesScreen/useViewResourcesModel";

import { ISessionResource } from "@graphql/query/session/resources/sessionResources.interface";

import { IEventType } from "@interface/components/academicPlanner/events.interface";

interface IUseViewResourcesController {
	eventType: IEventType;
	sessionId: string;
}

const useViewResourcesController = ({
	eventType,
	sessionId,
}: IUseViewResourcesController) => {
	const {
		getSessionResources,
		getWorkshopSessionResources,
		sessionResourcesData,
		workshopSessionResourcesData,
		sessionResourcesLoading,
		workshopSessionResourcesLoading,
	} = useViewResourcesModel();

	const isWorkshopSession = eventType === IEventType.LECTURE;

	useEffect(() => {
		if (!sessionId) return;

		const variables = { where: { session: sessionId } };

		if (isWorkshopSession) getWorkshopSessionResources({ variables });
		else getSessionResources({ variables });
	}, [
		sessionId,
		eventType,
		isWorkshopSession,
		getSessionResources,
		getWorkshopSessionResources,
	]);

	const resources: ISessionResource[] = useMemo(() => {
		const resourcesData = isWorkshopSession
			? workshopSessionResourcesData?.resourcesForWorkshopSession
			: sessionResourcesData?.resourcesForSession;

		return resourcesData?.result || [];
	}, [isWorkshopSession, workshopSessionResourcesData, sessionResourcesData]);

	const loading = isWorkshopSession
		? workshopSessionResourcesLoading
		: sessionResourcesLoading;

	return {
		resources,
		loading,
		totalCount: resources.length,
	};
};

export default useViewResourcesController;
