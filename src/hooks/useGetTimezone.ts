import { useSelector } from "react-redux";

import { RootState } from "@redux/store/root.reducer";

const useGetTimezone = () => {
	const timezoneData = useSelector(
		(state: RootState) => state.personalDetails.timezone,
	);
	return timezoneData;
};

export default useGetTimezone;
