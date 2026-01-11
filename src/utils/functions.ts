import crashlytics from "@react-native-firebase/crashlytics";
import { NavigationState } from "@react-navigation/native";
import moment from "moment-timezone";
import { Image, ImageSourcePropType, Linking, PixelRatio } from "react-native";
import uuid from "react-native-uuid";

import measures from "@utils/measures";
import { getTimezoneFromStore } from "@utils/store.util";

import { IDateFormat } from "@interface/app.interface";

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const { SCREEN_WIDTH, SCREEN_HEIGHT } = measures;

// height, marginTop, marginBottom, marginVertical, line-height, paddingTop, paddingVertical etc..
const horizontalScale = (size: number) =>
	(SCREEN_WIDTH / guidelineBaseWidth) * size;

// width, marginLeft, marginRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal etc..
const verticalScale = (size: number) =>
	(SCREEN_HEIGHT / guidelineBaseHeight) * size;

const moderateScale = (size: number) => {
	const scaleSize = horizontalScale(size);
	const roundedSize = PixelRatio.roundToNearestPixel(scaleSize);

	return Math.min(Math.max(roundedSize, size * 0.9), size * 1.3);
};

const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;

const termsAndConditionsUrl = "https://www.upgrad.com/terms/";
const privacyPolicyUrl = "https://www.upgrad.com/privacy/";

const isValidEmail = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const isMobileNumber = /^[6789]\d{9}$/;
const isEmailId = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidMobNumber = (number: string) => {
	const numRegex = /^[6789]\d{9}$/;
	return numRegex.test(number);
};

const removeHtmlTags = (inputString: string) => {
	const stringWithoutTags = inputString?.replace(/<\/?[^>]+(>|$)/g, "");
	const stringWithoutEntities = stringWithoutTags?.replace(/&[^;]+;/g, "");
	return stringWithoutEntities;
};

const formatTimeToHoursMinutesSecnds = (time: number) => {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = time % 60;

	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

	return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};

const isValidUrl = (value: string) => {
	// Basic URL validation
	const urlPattern =
		/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
	return urlPattern.test(value);
};

const openUrl = async (url: string) => {
	await Linking.openURL(url);
};

const canOpenURL = (url: string, isZoom?: boolean) => {
	Linking.canOpenURL(url)
		.then(async (supported: boolean) => {
			if (!supported && !isZoom) {
				// handle not supported URL
			} else {
				return await Linking.openURL(url);
			}
		})
		.catch((error) => {
			crashlytics().recordError(error);
		});
};

const getActiveBorderRadius = (index: number, length: number) => ({
	borderTopLeftRadius: index === 0 ? 8 : 0,
	borderBottomLeftRadius: index === 0 ? 8 : 0,
	borderTopRightRadius: index === length - 1 ? 8 : 0,
	borderBottomRightRadius: index === length - 1 ? 8 : 0,
});

const checkDateDiff = (checkDate: string) => moment().diff(checkDate, "minute");

const formatDate = (date: string | Date, dateFormat?: IDateFormat): string => {
	const { name: userTimezone } = getTimezoneFromStore();
	if (!date || !moment(date).tz(userTimezone).isValid()) return "";
	return moment(date)
		.tz(userTimezone)
		.format(dateFormat ?? IDateFormat.dateWithTime);
};

const calendarDate = (date?: string | number): string => {
	const { name: userTimezone } = getTimezoneFromStore();
	if (!date || !moment(date).tz(userTimezone).isValid()) return "";
	return moment(date).tz(userTimezone).format(IDateFormat.date);
};

const formatTime = (time?: string | number): string => {
	const { name: userTimezone } = getTimezoneFromStore();
	if (!time || !moment(time).tz(userTimezone).isValid()) return "";
	return moment(time).tz(userTimezone).format(IDateFormat.time);
};

const calculateLearningDuration = (secondsToRoundOff: number) => {
	const totalHours = secondsToRoundOff / 3600; // Convert seconds to hours

	const hours = Math.ceil(totalHours);
	const minutes = Math.round((totalHours - hours) * 60); // Convert remaining decimal part to minutes

	const convertedMinutes = minutes / 100;

	const totalDurationHrs = hours + convertedMinutes;

	let durationToConsider = 0;

	switch (true) {
		case totalDurationHrs >= 0 && totalDurationHrs <= 0.2:
			durationToConsider = 0;
			break;
		case totalDurationHrs >= 0.21 && totalDurationHrs <= 1.2:
			durationToConsider = 1;
			break;
		case totalDurationHrs >= 1.21 && totalDurationHrs <= 2.2:
			durationToConsider = 2;
			break;
		case totalDurationHrs >= 2.21 && totalDurationHrs <= 3.2:
			durationToConsider = 3;
			break;
		case totalDurationHrs >= 3.21 && totalDurationHrs <= 4.2:
			durationToConsider = 4;
			break;
		case totalDurationHrs >= 4.21 && totalDurationHrs <= 9.2:
			durationToConsider = 5;
			break;
		case totalDurationHrs >= 9.21 && totalDurationHrs <= 14.2:
			durationToConsider = 10;
			break;
		case totalDurationHrs >= 14.21 && totalDurationHrs <= 19.2:
			durationToConsider = 15;
			break;
	}

	const roundedDurationValue = Math.round(totalDurationHrs);
	const lastDigit = roundedDurationValue.toString().slice(-1);

	if ([0, 1, 2, 3, 4].includes(parseInt(lastDigit))) {
		durationToConsider = Math.max(
			durationToConsider,
			roundedDurationValue - parseInt(lastDigit),
		);
	} else if ([5, 6, 7, 8, 9].includes(parseInt(lastDigit))) {
		durationToConsider = Math.max(
			durationToConsider,
			roundedDurationValue + 5 - parseInt(lastDigit),
		);
	}

	return durationToConsider;
};

const trimText = (text: string, maxLength = 14) => {
	if (!text) {
		return "";
	}
	if (text.length <= maxLength) {
		return text;
	} else {
		return text.slice(0, maxLength - 3) + "...";
	}
};

const generateSessionCode = () => {
	return uuid.v4();
};

function toPascalCase(input: string): string {
	if (!input) {
		return input;
	}
	const words = input.split("-");
	const pascalCase = words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
	return pascalCase;
}

function capitalizeWords(input: string) {
	if (!input) {
		return "";
	}
	return input
		?.replace(/-/g, " ")
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		?.replace(/\b\w/g, (char) => char?.toUpperCase());
}

function isLastItem(list: unknown[], index: number) {
	return list?.length - 1 === index ? true : false;
}

const lowerCaseString = (inputString: string) => inputString.toLowerCase();

function replaceDashWithUnderscore(inputString: string) {
	if (!inputString) {
		return null;
	}
	const lowercase = lowerCaseString(inputString);
	if (lowercase?.includes("-")) {
		const resultString = lowercase.replace(/-/g, "_");
		return resultString;
	}
	return lowercase;
}

function getInitials(name: string) {
	if (!name) {
		return "";
	}
	return name
		?.split(" ")
		?.map((word) => word[0])
		?.join("");
}

function formatBytes(bytes: number) {
	const marker = 1024; // Change to 1000 if required
	const decimal = 2; // Change as required
	const megaBytes = marker * marker; // One MB is 1024 KB
	return {
		size: parseFloat((bytes / megaBytes).toFixed(decimal)),
		name: (bytes / megaBytes).toFixed(decimal) + " MB",
	};
}

const getCurrentRouteName = (state: NavigationState) => {
	if (!state || !state.routes || state.routes.length === 0) return;

	const route = state.routes[state.index];

	if (route.state) {
		return getCurrentRouteName(route.state as NavigationState);
	}

	return route.name;
};

const convertSecondsToHoursAndMinutes = (seconds: number) => {
	if (!seconds) return 0;

	const duration = moment.duration(seconds, "seconds");

	const hours = Math.floor(duration.asHours());
	const minutes = duration.minutes();

	if (hours === 0 && minutes === 0) return 0;

	const parts = [];
	if (hours) parts.push(`${hours} ${hours === 1 ? "hr" : "hrs"}`);
	if (minutes) parts.push(`${minutes} ${minutes === 1 ? "min" : "mins"}`);

	return parts.join(" ");
};

interface IConvertSecondsToHours {
	seconds: number;
	isRoundedOffToTens?: boolean;
}

const convertSecondsToHours = ({
	seconds,
	isRoundedOffToTens = false,
}: IConvertSecondsToHours) => {
	const hours = Math.floor(seconds / 3600);
	if (isRoundedOffToTens && hours > 10) {
		return `${Math.round(hours / 10) * 10}+ hours`;
	}
	return `${hours} hour${hours !== 1 ? "s" : ""}`;
};

const getBorderRadius = (index: number, length: number) => ({
	borderTopLeftRadius: index === 0 ? moderateScale(8) : moderateScale(0),
	borderTopRightRadius: index === 0 ? moderateScale(8) : moderateScale(0),
	borderBottomLeftRadius:
		index === length - 1 ? moderateScale(8) : moderateScale(0),
	borderBottomRightRadius:
		index === length - 1 ? moderateScale(8) : moderateScale(0),
});

const enableRadius = (topLeftRight: boolean, bottomLeftRight: boolean) => ({
	borderTopLeftRadius: topLeftRight ? moderateScale(8) : moderateScale(0),
	borderTopRightRadius: topLeftRight ? moderateScale(8) : moderateScale(0),
	borderBottomLeftRadius: bottomLeftRight
		? moderateScale(8)
		: moderateScale(0),
	borderBottomRightRadius: bottomLeftRight
		? moderateScale(8)
		: moderateScale(0),
});

const getDateFormate = (value: string) => {
	const { name: userTimezone } = getTimezoneFromStore();
	const date = moment(value).tz(userTimezone);
	if (!date.isValid()) {
		return null;
	}
	return date.format(IDateFormat.dateWithTime);
};

const getVideoDuration = (durationInSeconds: number) => {
	const timeDuration = moment.duration(durationInSeconds, "seconds");
	const hours = timeDuration.hours();
	const minutes = timeDuration.minutes();
	const seconds = timeDuration.seconds();

	const formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");
	const formattedSeconds = seconds.toString().padStart(2, "0");

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const debounce = (func: any, wait: number) => {
	let timeout: number;

	return function executedFunction(...args) {
		const later = () => {
			timeout = null;

			func(...args);
		};
		clearTimeout(timeout);

		timeout = setTimeout(later, wait);
	};
};

interface ICalculateDueDates {
	dueDate: string;
	hardDeadlineDays: number;
	isDueDateExtended: boolean;
}
const calculateDueDates = ({
	dueDate,
	hardDeadlineDays,
	isDueDateExtended,
}: ICalculateDueDates) => {
	const { name: userTimezone } = getTimezoneFromStore();
	if (!dueDate)
		return {
			originalDueDate: null,
			extendedDueDate: null,
		};

	let original = moment(dueDate).tz(userTimezone);
	let extended = original.clone().add(hardDeadlineDays, "days");

	if (isDueDateExtended) {
		extended = original;
		original = original.clone().subtract(hardDeadlineDays, "days");
	}

	return {
		originalDueDate: original.toISOString(),
		extendedDueDate: extended.toISOString(),
	};
};

interface IHTMLParseResult {
	details: string;
	link: string | null;
}

const parseTicketHTMLDescription = (htmlContent: string): IHTMLParseResult => {
	if (!htmlContent) {
		return { details: "", link: null };
	}

	const links = Array.from(
		htmlContent.matchAll(linkRegex),
		(match) => match[1],
	);
	htmlContent = htmlContent.replace(/<a[^>]*>.*?<\/a>/gi, "");

	const threadIdMatch = htmlContent.match(/Thread ID:\s*<\/b>\s*([^\s<]+)/i);
	const threadId = threadIdMatch ? threadIdMatch[1].trim() : null;

	// let cleanHtml = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
	const cleanHtml = htmlContent
		.replace(/<div>\s*<b>Page URL:.*?<\/div>/gi, "")
		.trim();

	return {
		details: threadId ? cleanHtml : htmlContent,
		link: threadId && links.length > 0 ? links[0] : null,
	};
};

interface IGetImageAspectRatio {
	imageSource?: ImageSourcePropType;
	imageUrl?: string;
}
const getImageAspectRatio = async ({
	imageSource,
	imageUrl,
}: IGetImageAspectRatio) => {
	const uri = imageSource
		? Image.resolveAssetSource(imageSource).uri
		: imageUrl;

	if (!uri) return 0;

	const { width, height } = await Image.getSize(uri);
	return width / height;
};

const timeStringToMilliseconds = (time: string): number => {
	if (!time) return 0;

	const parts = time.split(":").map(Number);
	const [hours = 0, minutes = 0, seconds = 0] = parts;

	return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

export {
	openUrl,
	getInitials,
	formatDate,
	canOpenURL,
	isValidEmail,
	getActiveBorderRadius,
	verticalScale,
	moderateScale,
	checkDateDiff,
	horizontalScale,
	isValidMobNumber,
	generateSessionCode,
	removeHtmlTags,
	trimText,
	calculateLearningDuration,
	calendarDate,
	formatTime,
	capitalizeWords,
	toPascalCase,
	isLastItem,
	replaceDashWithUnderscore,
	lowerCaseString,
	formatBytes,
	convertSecondsToHoursAndMinutes,
	getCurrentRouteName,
	isMobileNumber,
	isEmailId,
	termsAndConditionsUrl,
	privacyPolicyUrl,
	getBorderRadius,
	getDateFormate,
	enableRadius,
	getVideoDuration,
	debounce,
	isValidUrl,
	formatTimeToHoursMinutesSecnds,
	calculateDueDates,
	convertSecondsToHours,
	parseTicketHTMLDescription,
	getImageAspectRatio,
	timeStringToMilliseconds,
};
