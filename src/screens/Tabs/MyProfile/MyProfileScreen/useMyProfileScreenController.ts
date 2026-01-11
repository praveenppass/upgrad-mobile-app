import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useMyProfileScreenModel from "@screens/Tabs/MyProfile/MyProfileScreen/useMyProfileScreenModel";

import { deleteAccountRequest } from "@services/auth";
import { getUserProfileWithSaToken } from "@services/cpsService";

import useGetUserType from "@hooks/useGetUserType";

import { ENV } from "@config/env";
import { storage } from "@config/mmkvStorage";

import { authSlice } from "@redux/slices/auth.slice";
import { requestUserPersonalDetails } from "@redux/slices/personalDetails.slice";
import { RootState } from "@redux/store/root.reducer";

import StorageKeys from "@constants/storage.constants";

const useMyProfileScreenController = () => {
	const {
		userCompletionData,
		getCompletionPercentage,
		completionPercentageLoading,
	} = useMyProfileScreenModel();

	const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] =
		useState(false);
	const [saProfile, setSaProfile] = useState(false);
	const [saToken, setSaToken] = useState("");
	const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
	const dispatch = useDispatch();

	const { isLearnUser } = useGetUserType();

	const toggleLogoutModal = useCallback(() => {
		setLogoutModalVisible((prev) => !prev);
	}, []);

	const completionPercentage =
		userCompletionData?.userProfileCompletionStatus?.completionPercentage;

	useFocusEffect(
		useCallback(() => {
			if (!isLearnUser) return;

			getCompletionPercentage();
		}, []),
	);

	const handleLogout = () => {
		storage.delete(StorageKeys.SEARCH_HISTORY);
		storage.delete(StorageKeys.LEARNING_PATH_ID);

		dispatch(authSlice.actions.logout());
	};

	useFocusEffect(
		useCallback(() => {
			if (isLearnUser) dispatch(requestUserPersonalDetails);
		}, []),
	);
	const { email, firstName, lastName, profilePicture } = useSelector(
		(state: RootState) => state.personalDetails.basicDetails,
	);

	const initials = firstName?.[0] || "G";

	const userDetails = {
		email,
		initials,
		firstName,
		lastName,
		image: profilePicture,
	};

	const toggleDeleteAccountModal = () => {
		setIsDeleteAccountModalVisible((prev) => !prev);
	};

	const handleDeleteAccount = async () => {
		toggleDeleteAccountModal();
		await deleteAccountRequest();
		handleLogout();
	};

	const abroadDashboardUrl = useMemo(() => {
		if (!saToken) return "";

		try {
			const tokenData = JSON.parse(saToken);
			const authToken = tokenData?.access_token;
			if (!authToken) return "";

			const baseUrl = ENV.abroadDashboardUrl;
			const domain = baseUrl.replace("/study-abroad/auto-login", "");
			const redirectUrl = `${domain}/study-abroad/profile/dashboard/`;

			return `${baseUrl}?token=${authToken}&redirectUrl=${encodeURIComponent(redirectUrl)}`;
		} catch {
			return "";
		}
	}, [saToken]);

	useEffect(() => {
		const fetchSaToken = async () => {
			try {
				const res = await getUserProfileWithSaToken();
				setSaProfile(res?.saProfile ?? false);
				setSaToken(res?.saToken ?? "");
			} catch {
				setSaProfile(false);
				setSaToken("");
			}
		};

		fetchSaToken();
	}, []);

	return {
		userCompletionData,
		getCompletionPercentage,
		completionPercentage,
		userDetails,
		loading: completionPercentageLoading,
		handleLogout,
		handleDeleteAccount,
		toggleDeleteAccountModal,
		isDeleteAccountModalVisible,
		saProfile,
		saToken,
		abroadDashboardUrl,
		isLogoutModalVisible,
		toggleLogoutModal,
	};
};

export default useMyProfileScreenController;
