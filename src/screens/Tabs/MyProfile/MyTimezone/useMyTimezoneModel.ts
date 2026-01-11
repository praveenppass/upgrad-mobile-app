import { useState } from "react";

import { PartialMyTimezone, updateUserMyTimezone } from "@services/cpsService";

const useMyTimezoneModel = () => {
	const [updateMyTimezoneLoading, setUpdateMyTimezoneLoading] =
		useState(false);

	const updateMyTimezone = async (timezoneData: PartialMyTimezone) => {
		setUpdateMyTimezoneLoading(true);

		await updateUserMyTimezone(timezoneData);

		setUpdateMyTimezoneLoading(false);
	};

	return {
		updateMyTimezone,
		updateMyTimezoneLoading,
	};
};

export default useMyTimezoneModel;
