import { useDispatch, useSelector } from "react-redux";

import useAppState from "@hooks/useAppState";
import useGetUserType from "@hooks/useGetUserType";

import { requestUserPersonalDetails } from "@redux/slices/personalDetails.slice";
import { RootState } from "@redux/store/root.reducer";

export const useSyncUserTimezone = () => {
	const dispatch = useDispatch();
	const { isLearnUser } = useGetUserType();

	const { id } = useSelector((state: RootState) => state.user.user);

	const handleForeground = () => {
		if (id && isLearnUser) dispatch(requestUserPersonalDetails);
	};

	useAppState({ handleForeground });
};
