import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import UpGradAppBanner from "@components/web/UpGradAppBanner";
import WebUserNotEnrolled from "@components/web/UserNotEnrolled";

import WithWebHeader from "@hoc/withWebHeader";

import useGetUserType from "@hooks/useGetUserType";

import { verticalScale } from "@utils/functions";

import { strings } from "@assets/strings";

interface IBodyComponent {
	isLoggedIn: boolean;
	hasCourses: boolean;
}

const BodyComponent = ({ isLoggedIn, hasCourses }: IBodyComponent) => {
	if (!isLoggedIn)
		return (
			<WebUserNotEnrolled title={strings.SIGN_IN_TO_ACCESS_PROGRAMS} />
		);

	if (!hasCourses)
		return (
			<WebUserNotEnrolled
				title={strings.YOU_HAVENT_ENROLLED_IN_ANY_COURSES_YET}
				showButton
			/>
		);

	return (
		<View style={styles.container}>
			<UpGradAppBanner />
		</View>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const UgMyPrograms = () => {
	const { isLoggedIn, hasUgCourses, isLearnUser } = useGetUserType();

	if (isLoggedIn && isLearnUser) return null;

	return (
		<WithWebHeader
			BodyComponent={() => (
				<MemoizedBodyComponent
					isLoggedIn={isLoggedIn}
					hasCourses={hasUgCourses}
				/>
			)}
			isGuest={!isLoggedIn}
			showRightSection
			removeBottomInset
		/>
	);
};

const styles = StyleSheet.create({
	bannerContainer: {
		marginTop: verticalScale(24),
		width: "100%",
	},
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
});

export default memo(UgMyPrograms);
