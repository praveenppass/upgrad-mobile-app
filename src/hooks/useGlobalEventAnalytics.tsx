import { useRoute } from "@react-navigation/native";

import {
	IComponentName,
	IEventName,
	IPageCategory,
	ISection,
	IUserType,
} from "@interface/events.interface";

import { useAnalytics } from "./useAnalytics";
import useUserHelper from "./useUserHelper";

const getLabelName = (name: string) => {
	if (name && name.length && name.includes("-")) {
		return name?.split("-")[0];
	}
	return name;
};

const getPageCategory = (name: string) => {
	const screenName = name?.split("-")[0];

	switch (screenName) {
		case "HomePage":
			return "home_page";
		case "CoursesPage":
			return "course_listing_page";
		case "ProfilePage":
			return "profile_page";
		case "CalendarPage":
			return "calendar_page";
		case "LibraryPage":
			return "library_page";
		default:
			return ""; // Handle the case when the screenName doesn't match any of the cases
	}
};

const createPageCategory = (route: string) => {
	let pageCategory: IPageCategory;
	switch (route) {
		case "HomePage":
			pageCategory = IPageCategory.HOME_PAGE;
			break;
		case "LibraryPage":
			pageCategory = IPageCategory.LIBRARY_PAGE;
			break;
		default:
			pageCategory = IPageCategory.COURSE_LISTING_PAGE;
	}
	return pageCategory;
};

export type IOnPresTab = {
	component_name: string;
	label: string;
};

export const useGlobalEventAnalytics = () => {
	const { trackEvent } = useAnalytics();
	const { isPaidUser } = useUserHelper();

	const route = useRoute();
	//* Bottom Tab Event Start

	const homeScreeTapEvent = (event: IOnPresTab) => {
		trackEvent({
			eventName: IEventName.NAVIGATION_CLICK,
			eventData: {
				page_category: getPageCategory(event.component_name ?? "NA"),
				section: ISection.LOWER_NAVIGATION,
				component_name: IComponentName.LOWER_NAV_HOME,
				label: getLabelName(event.label ?? "NA"),
				...(!isPaidUser
					? { user_type: IUserType.FREE }
					: { user_type: IUserType.PAID }),
			},
		});
	};

	const courseScreeTapEvent = (event: IOnPresTab) => {
		trackEvent({
			eventName: IEventName.NAVIGATION_CLICK,
			eventData: {
				page_category: getPageCategory(event.component_name ?? "NA"),
				section: ISection.LOWER_NAVIGATION,
				component_name: IComponentName.LOWER_NAV_COURSES,
				label: getLabelName(event.label ?? "NA"),
				...(!isPaidUser
					? { user_type: IUserType.FREE }
					: { user_type: IUserType.PAID }),
			},
		});
	};

	const profileScreeTapEvent = (event: IOnPresTab) => {
		trackEvent({
			eventName: IEventName.NAVIGATION_CLICK,
			eventData: {
				page_category: getPageCategory(event.component_name ?? "NA"),
				section: ISection.LOWER_NAVIGATION,
				component_name: IComponentName.LOWER_NAV_PROFILE,
				label: getLabelName(event.label ?? "NA"),
				...(!isPaidUser
					? { user_type: IUserType.FREE }
					: { user_type: IUserType.PAID }),
			},
		});
	};

	const calendarScreeTapEvent = (event: IOnPresTab) => {
		trackEvent({
			eventName: IEventName.NAVIGATION_CLICK,
			eventData: {
				page_category: getPageCategory(event.component_name ?? "NA"),
				section: ISection.LOWER_NAVIGATION,
				component_name: IComponentName.LOWER_NAV_CALENDAR,
				label: getLabelName(event.label ?? "NA"),
				...(!isPaidUser
					? { user_type: IUserType.FREE }
					: { user_type: IUserType.PAID }),
			},
		});
	};

	const libraryScreeTapEvent = (event: IOnPresTab) => {
		trackEvent({
			eventName: IEventName.NAVIGATION_CLICK,
			eventData: {
				page_category: getPageCategory(event.component_name ?? "NA"),
				section: ISection.LOWER_NAVIGATION,
				component_name: IComponentName.LOWER_NAV_LIBRARY,
				label: getLabelName(event.label ?? "NA"),
				...(!isPaidUser
					? { user_type: IUserType.FREE }
					: { user_type: IUserType.PAID }),
			},
		});
	};

	//* Bottom Tab Event End

	//* Top Tab Event Start
	const topNavStreakTapEvent = () => {
		trackEvent({
			eventName: IEventName.NAVIGATION_CLICK,
			eventData: {
				label: "streak",
				section: ISection.TOP_NAVIGATION,
				component_name: IComponentName.TOP_NAV_STREAK,
				page_category: createPageCategory(route.name),
				...(!isPaidUser
					? { user_type: IUserType.FREE }
					: { user_type: IUserType.PAID }),
			},
		});
	};

	const topHomeIconTapEvent = () => {
		trackEvent({
			eventName: IEventName.NAVIGATION_CLICK,
			eventData: {
				label: "kh_logo",
				section: ISection.TOP_NAVIGATION,
				component_name: IComponentName.TOP_NAV_ICON,
				page_category: createPageCategory(route.name),
				...(!isPaidUser
					? { user_type: IUserType.FREE }
					: { user_type: IUserType.PAID }),
			},
		});
	};

	const topNavNotificationTapEvent = () => {
		trackEvent({
			eventName: IEventName.NAVIGATION_CLICK,
			eventData: {
				label: "notification_icon",
				section: ISection.TOP_NAVIGATION,
				component_name: IComponentName.TOP_NAV_NOTIFICATION,
				page_category: createPageCategory(route.name),
				...(!isPaidUser
					? { user_type: IUserType.FREE }
					: { user_type: IUserType.PAID }),
			},
		});
	};

	const topNavCoinTapEvent = () => {
		trackEvent({
			eventName: IEventName.NAVIGATION_CLICK,
			eventData: {
				label: "coin",
				section: ISection.TOP_NAVIGATION,
				component_name: IComponentName.TOP_NAV_COINS,
				page_category: createPageCategory(route.name),
				...(!isPaidUser
					? { user_type: IUserType.FREE }
					: { user_type: IUserType.PAID }),
			},
		});
	};
	//* Top Tab Event End

	return {
		homeScreeTapEvent,
		courseScreeTapEvent,
		profileScreeTapEvent,
		topNavStreakTapEvent,
		topNavNotificationTapEvent,
		topNavCoinTapEvent,
		topHomeIconTapEvent,
		calendarScreeTapEvent,
		libraryScreeTapEvent,
	};
};
