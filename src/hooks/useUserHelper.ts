import crashlytics from "@react-native-firebase/crashlytics";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { snackSlice } from "@redux/slices/snack.slice";
import { userSlice } from "@redux/slices/user.slice";
import { type RootState } from "@redux/store/root.reducer";

import { ISnackType } from "@interface/app.interface";

import { C } from "@assets/constants";

const { strings } = C;

const useUserHelper = () => {
	const dispatch = useDispatch();
	const userDetails = useSelector(
		(state: RootState) => state.app.userDetails,
		shallowEqual,
	);
	const token = useSelector((state: RootState) => state.user.token);

	const [isPaidUser, setisPaidUser] = useState(false);
	const userType = userDetails?.me?.userType;
	const totalCourses = userDetails?.me?.totalCourses || 0;

	const decodeToken = () => {
		try {
			const decoded = jwtDecode(token?.access_token ?? "");
			if (decoded?.deleteRequestedAt) {
				dispatch(
					snackSlice.actions.showAlert({
						type: ISnackType.handsUp,
						message: strings.YOUR_BACK_MESSAGE,
					}),
				);
			}
		} catch (error) {
			crashlytics().recordError(error);
		}
	};

	useEffect(() => {
		setisPaidUser(userType === "paid" || totalCourses > 0);
	}, [userType, totalCourses]);

	const getUserName =
		userDetails?.me?.username || userDetails?.me?.firstName || null;

	const upDateUserDetails = () => {
		dispatch(
			userSlice.actions.getUser({
				isDisableNavigation: true,
			}),
		);
	};

	return { isPaidUser, getUserName, upDateUserDetails, decodeToken };
};

export default useUserHelper;
