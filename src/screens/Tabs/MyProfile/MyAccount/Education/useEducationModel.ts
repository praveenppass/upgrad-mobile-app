import { useState } from "react";

import {
	getEducationDetails,
	ICPSEducationDetails,
} from "@services/cpsService";

const useEducationModel = () => {
	const [educationDataLoading, setEducationDataLoading] = useState(false);
	const [myEducationData, setMyEducationData] = useState<
		ICPSEducationDetails[] | null
	>(null);

	const getEducationData = async () => {
		setEducationDataLoading(true);

		const response = await getEducationDetails();

		if (!response) return setEducationDataLoading(false);

		setMyEducationData(response);
		setEducationDataLoading(false);
	};

	const refetchMyEducationData = async () => {
		const response = await getEducationDetails();
		if (!response) return;
		setMyEducationData(response);
	};

	return {
		educationDataLoading,
		getEducationData,
		myEducationData,
		refetchMyEducationData,
	};
};
export default useEducationModel;
