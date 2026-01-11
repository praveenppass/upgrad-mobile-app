import React, { memo } from "react";

import EmptyUseEventsView from "@components/academicPlanner/EmptyUseEventsView";
import WebUserNotEnrolled from "@components/web/UserNotEnrolled";

import WithWebHeader from "@hoc/withWebHeader";

import useGetUserType from "@hooks/useGetUserType";

import { strings } from "@assets/strings";

interface IBodyComponent {
	isLoggedIn: boolean;
}

const BodyComponent = ({ isLoggedIn }: IBodyComponent) => {
	if (!isLoggedIn)
		return (
			<WebUserNotEnrolled
				title={strings.SIGN_IN_TO_ACCESS_ACADEMIC_PLANNER}
			/>
		);

	return <EmptyUseEventsView isFromStudyPlan={false} />;
};

const MemoizedBodyComponent = memo(BodyComponent);

const UgAcademicPlanner = () => {
	const { isLoggedIn, isLearnUser } = useGetUserType();
	if (isLoggedIn && isLearnUser) return null;
	return (
		<WithWebHeader
			BodyComponent={() => (
				<MemoizedBodyComponent isLoggedIn={isLoggedIn} />
			)}
			isGuest={!isLoggedIn}
			showRightSection
			removeBottomInset
		/>
	);
};

export default memo(UgAcademicPlanner);
