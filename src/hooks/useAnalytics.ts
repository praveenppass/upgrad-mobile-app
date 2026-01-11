import NetInfo from "@react-native-community/netinfo";
import rudderClient from "@rudderstack/rudder-sdk-react-native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { shallowEqual, useSelector } from "react-redux";

import { generateSessionCode } from "@utils/functions";
import measures from "@utils/measures";

import { RootState } from "@redux/store/root.reducer";

import { strings } from "@assets/strings";

interface ITrackEventParams {
	eventName: string;
	eventData?: Record<string, unknown>;
}

const { SCREEN_WIDTH, SCREEN_HEIGHT } = measures;

export const useAnalytics = () => {
	const [network_type, setNetworkType] = useState("");
	const {
		sessionDetails,
		user: { email, id },
	} = useSelector((state: RootState) => state.user, shallowEqual);
	const ipInfo = useSelector(
		(state: RootState) => state.app.ipInfo,
		shallowEqual,
	);
	const selectedCourseID = useSelector(
		(state: RootState) => state.studyPlan?.selectedCourseID,
		shallowEqual,
	);

	const resolution = SCREEN_HEIGHT + "  *  " + SCREEN_WIDTH;

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setNetworkType(state.type);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const trackEvent = ({ eventName, eventData }: ITrackEventParams) => {
		const device_name = DeviceInfo.getModel();
		const app_version = DeviceInfo.getVersion();
		const platform_agent = DeviceInfo.getBrand();
		const device_type = DeviceInfo.getDeviceType();
		const platform_version = DeviceInfo.getSystemVersion();

		const session_id = () => {
			if (sessionDetails) {
				const updatedAtDate: Date = new Date(sessionDetails?.updatedAt);

				// Get the current date and time
				const currentDate: Date = new Date();

				// Calculate the time difference in milliseconds
				const timeDifference: number =
					currentDate.getTime() - updatedAtDate.getTime();

				// Convert the time difference to minutes
				const minutesDifference: number = timeDifference / (1000 * 60);

				if (minutesDifference >= 30) {
					return generateSessionCode();
				} else {
					return sessionDetails?.sessionId;
				}
			} else {
				return generateSessionCode();
			}
		};

		const defaultAttributes = {
			app_version,
			device_type,
			device_name,
			platform_agent,
			platform_version,
			user_id: id ?? null,
			email_id: email ?? null,
			session_id: session_id(),
			city: ipInfo?.city ?? null,
			user_role: strings.LEARNER,
			country: ipInfo?.country ?? null,
			network_type, //wifi,cellular,etc
			state: ipInfo?.regionName ?? null,
			platform_os: Platform.OS, //android|ios
			course_id: selectedCourseID ?? null,
			screen_resolution: resolution, // You can set this dynamically based on the actual screen resolution
		};

		let updateEventData = {
			...eventData,
		};

		if (updateEventData?.course_type) {
			const updatedCourseType = replaceDashWithUnderscore(
				updateEventData?.course_type as string,
			);
			updateEventData = {
				...updateEventData,
				course_type: updatedCourseType,
			};
		}

		if (updateEventData?.course_category) {
			const updatedCourseCategory = replaceDashWithUnderscore(
				updateEventData?.course_category as string,
			);
			updateEventData = {
				...updateEventData,
				course_category: updatedCourseCategory,
			};
		}

		const properties = {
			...defaultAttributes,
			...updateEventData,
		};

		rudderClient.track(eventName, properties);
	};
	return {
		trackEvent,
	};
};
