import { useSelector } from "react-redux";

import { storage } from "@config/mmkvStorage";

import { type RootState } from "@redux/store/root.reducer";

import { IUserType } from "@interface/web.interface";

import StorageKeys from "@constants/storage.constants";

const useGetUserType = () => {
	const {
		token: { access_token },
		userType,
		omsAuthToken,
	} = useSelector((state: RootState) => state.user);

	const { hasLearnCourses, hasUgCourses } = useSelector(
		(state: RootState) => state.personalDetails.basicDetails,
	);

	const isLearnUser = userType === IUserType.LEARN_USER;

	const isAuthSkipped = storage.getString(StorageKeys.IS_GUEST) === "true";

	return {
		isLoggedIn: !!access_token || !!omsAuthToken,
		hasLearnCourses,
		userType,
		isLearnUser,
		hasUgCourses,
		isAuthSkipped,
	};
};

export default useGetUserType;
