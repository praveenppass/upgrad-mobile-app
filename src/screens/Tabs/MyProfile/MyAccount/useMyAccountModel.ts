import { useLazyQuery, useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import manageProfileResume, {
	IManageProfileResumeResponse,
} from "@graphql/mutation/myProfile/myAccount/manageUserResumes";
import updateMyAccountDetails, {
	IUpdateUserResponse,
} from "@graphql/mutation/myProfile/myAccount/updateUser";
import getAccountCertificatesQuery, {
	IGetAccountCeriticates,
} from "@graphql/query/myProfile/myAccount/getAccountCertificates";
import getAspirationDetails, {
	IAspirationDetails, // IAspirations,
} from "@graphql/query/myProfile/myAccount/getAspirationDetails";
import getDownloadCertificatesQuery, {
	IDownloadCertificateResponse,
} from "@graphql/query/myProfile/myAccount/getDownloadCertificatesQuery";
import getProfileCompletionPercentageQuery, {
	IProfileCompletionPercentage,
} from "@graphql/query/myProfile/myAccount/getProfileCompletionPercentageQuery";
import getUserPersonalDetailsQuery, {
	IGetUserPersonalDetailsQuery,
	IGetUserPersonalDetailsQueryVariables,
} from "@graphql/query/myProfile/personalDetails/getUserPersonalDetails";

import {
	getUserProfile,
	IUserProfileResponse,
	PartialAccountDetails,
	updateMyAccountProfileDetails,
} from "@services/cpsService";

import { client } from "@config/apollo";

import { RootState } from "@redux/store/root.reducer";

const useMyAccountModel = () => {
	const [myAccountData, setMyAccountData] =
		useState<IUserProfileResponse | null>(null);
	const [myAccountLoading, setMyAccountLoading] = useState(false);
	const id = useSelector((state: RootState) => state.user.user.id) || "";

	const getMyAccountMainData = useCallback(async () => {
		setMyAccountLoading(true);
		try {
			const data = await getUserProfile();
			setMyAccountData(data);
		} catch (error) {
			setMyAccountData(null);
		} finally {
			setMyAccountLoading(false);
		}
	}, []);

	const [
		getUserPersonalDetailsResume,
		{
			data: userPersonalDetailsResume,
			loading: userPersonalDetailsResumeLoading,
		},
	] = useLazyQuery<
		IGetUserPersonalDetailsQuery,
		IGetUserPersonalDetailsQueryVariables
	>(getUserPersonalDetailsQuery, {
		client,
		variables: { where: { id } },
		fetchPolicy: "no-cache",
	});

	const refetchMyAccountMainData = useCallback(async () => {
		await getMyAccountMainData();
	}, [getMyAccountMainData]);

	const [
		getMyAccountCompletionPercentage,
		{
			data: userCompletionData,
			loading: percentageLoading,
			refetch: refetchMyAccountCompletionPercentage,
		},
	] = useLazyQuery<IProfileCompletionPercentage>(
		getProfileCompletionPercentageQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [getAspirationsMainData, { data: aspirationsData }] =
		useLazyQuery<IAspirationDetails>(getAspirationDetails, {
			client,
			fetchPolicy: "no-cache",
		});

	const [getCertificatesData, { data: certificatesData }] =
		useLazyQuery<IGetAccountCeriticates>(getAccountCertificatesQuery, {
			client,
			fetchPolicy: "no-cache",
		});

	const [downloadCertificates] = useLazyQuery<IDownloadCertificateResponse>(
		getDownloadCertificatesQuery,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [onUpdateMyAcountDetails] = useMutation<IUpdateUserResponse>(
		updateMyAccountDetails,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [
		updateUserProfileDetailsLoading,
		setUpdateUserProfileDetailsLoading,
	] = useState(false);

	const updateUserProfileDetails = async (
		accountData: PartialAccountDetails,
	) => {
		setUpdateUserProfileDetailsLoading(true);
		await updateMyAccountProfileDetails(accountData);
		setUpdateUserProfileDetailsLoading(false);
	};

	const [onManageProfileResume] = useMutation<IManageProfileResumeResponse>(
		manageProfileResume,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	const [onUpdateResume] = useMutation<IUpdateUserResponse>(
		updateMyAccountDetails,
		{
			client,
			fetchPolicy: "no-cache",
		},
	);

	return {
		myAccountData,
		myAccountLoading,
		aspirationsData,
		certificatesData,
		downloadCertificates,
		onUpdateMyAcountDetails,
		onUpdateResume,
		getMyAccountMainData,
		getMyAccountCompletionPercentage,
		refetchMyAccountCompletionPercentage,
		getAspirationsMainData,
		getCertificatesData,
		percentageLoading,
		userCompletionData,
		refetchMyAccountMainData,
		onManageProfileResume,
		updateUserProfileDetails,
		updateUserProfileDetailsLoading,
		getUserPersonalDetailsResume,
		userPersonalDetailsResume,
		userPersonalDetailsResumeLoading,
	};
};
export default useMyAccountModel;
