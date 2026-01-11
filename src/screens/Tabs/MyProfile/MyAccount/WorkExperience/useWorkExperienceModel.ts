import { useCallback, useState } from "react";

import {
	getWorkExperienceDetails,
	ICPSWorkExperienceDetails,
} from "@services/cpsService";

const useWorkExperienceModel = () => {
	const [myWorkExperienceData, setMyWorkExperienceData] =
		useState<ICPSWorkExperienceDetails | null>(null);

	const getWorkExperienceData = useCallback(async () => {
		const data = await getWorkExperienceDetails();
		setMyWorkExperienceData(data);
	}, []);

	return {
		getWorkExperienceData,
		myWorkExperienceData,
	};
};

export default useWorkExperienceModel;
