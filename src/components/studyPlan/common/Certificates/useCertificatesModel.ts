import { useLazyQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import getUserCourseCertificateQuery, {
	IUserCourseCertificateQuery,
	IUserCourseCertificateQueryVariables,
} from "@graphql/query/studyPlan/common/getUserCourseCertificate";
import getUserProgramCertificateQuery, {
	IUserProgramCertificateQuery,
	IUserProgramCertificateQueryVariables,
} from "@graphql/query/studyPlan/common/getUserProgramCertificate";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

const useCertificatesModel = () => {
	const { id: userId } = useSelector((state: RootState) => state.user.user);

	const [
		loadCourseCertificateData,
		{ data: courseCertificateData, loading: courseCertificateDataLoading },
	] = useLazyQuery<
		IUserCourseCertificateQuery,
		IUserCourseCertificateQueryVariables
	>(getUserCourseCertificateQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const [
		loadProgramCertificateData,
		{
			data: programCertificateData,
			loading: programCertificateDataLoading,
		},
	] = useLazyQuery<
		IUserProgramCertificateQuery,
		IUserProgramCertificateQueryVariables
	>(getUserProgramCertificateQuery, {
		client,
		fetchPolicy: "no-cache",
	});

	const getCourseCertificateData = (learningPathId: string) => {
		const variables = {
			where: {
				userCourse: learningPathId,
				user: userId || "",
			},
		};

		return loadCourseCertificateData({ variables });
	};

	const getProgramCertificateData = (learningPathId: string) => {
		const variables = {
			where: {
				userProgram: learningPathId,
				user: userId || "",
			},
		};

		return loadProgramCertificateData({ variables });
	};

	return {
		getCourseCertificateData,
		courseCertificateData,

		getProgramCertificateData,
		programCertificateData,

		loading: courseCertificateDataLoading || programCertificateDataLoading,
	};
};

export default useCertificatesModel;
