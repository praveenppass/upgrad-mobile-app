import { assessmentHttpClient } from "@utils/httpClientList";

const AssessmentDetailsModel = () => {
	const startCall = async (attemptId?: string) => {
		if (attemptId) {
			await assessmentHttpClient.post(
				`/api/assessment-attempt/${attemptId}/start`,
			);
		}
	};

	return {
		startCall,
	};
};

export default AssessmentDetailsModel;
