import moment from "moment-timezone";
import { call, put, takeLatest } from "redux-saga/effects";

import getUserCoursesCountQuery, {
	IGetUserCoursesCount,
} from "@graphql/query/common/getUserCoursesCountQuery";

import {
	getMasterData,
	getUserProfile,
	IMasterDataKey,
	IUserProfileResponse,
} from "@services/cpsService";

import { getProfilePictureUrl } from "@utils/profilePicture.utils";
import { getTimezoneFromStore } from "@utils/store.util";

import { client } from "@config/apollo";

import { onGetUgCourseCount } from "@redux/saga/user.saga";
import {
	requestUserPersonalDetails,
	setTimezone,
	setUserBasicDetails,
} from "@redux/slices/personalDetails.slice";

interface ITimezone {
	name: string;
	offset: string;
}

const { name: userTimezone } = getTimezoneFromStore();

const getTimezoneDetails = async (
	timezone: string,
): Promise<ITimezone | null> => {
	const timezoneMasterData = await getMasterData(IMasterDataKey.TIMEZONE);

	if (!timezoneMasterData) return null;

	const timezoneData = timezoneMasterData.find(
		(item) => item.value === timezone,
	);

	if (!timezoneData) return null;

	return {
		name: timezoneData.value,
		offset: timezoneData.offset || "",
	};
};

const getUserCoursesCount = async () => {
	const { data } = await client.query<IGetUserCoursesCount>({
		query: getUserCoursesCountQuery,
		fetchPolicy: "no-cache",
	});

	return data;
};

export const syncLastAccessTime = function* () {
	const userCoursesCount: IGetUserCoursesCount =
		yield call(getUserCoursesCount);

	const userProfile: IUserProfileResponse = yield call(getUserProfile);

	const { firstName, lastName, email, image, timezone } = userProfile || {};

	const { totalCourses, lastLogin } = userCoursesCount.me;

	const totalUgCourses: number = yield call(onGetUgCourseCount);

	const basicDetails = {
		firstName: firstName ?? "",
		lastName: lastName ?? "",
		email: email ?? "",
		profilePicture: getProfilePictureUrl(image),
		hasLearnCourses: totalCourses ? totalCourses > 0 : false,
		hasUgCourses: totalUgCourses ? totalUgCourses > 0 : false,
		lastLogin: lastLogin?.createdAt ?? "",
		dateOfBirth: moment(userProfile?.dateOfBirth ?? "")
			.tz(userTimezone)
			.format("YYYY-MM-DD"),
		loaded: true,
	};

	yield put(setUserBasicDetails(basicDetails));

	if (!timezone) return;

	const currentTimezoneInfo: ITimezone | null = yield call(() =>
		getTimezoneDetails(timezone),
	);

	if (!currentTimezoneInfo) return;

	yield put(setTimezone(currentTimezoneInfo));
};

export const personalDetailsSaga = function* () {
	yield takeLatest(requestUserPersonalDetails, syncLastAccessTime);
};
