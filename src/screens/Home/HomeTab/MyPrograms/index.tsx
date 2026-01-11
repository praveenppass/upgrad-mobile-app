import React, { memo } from "react";
import { ScrollView, View } from "react-native";

import styles from "@screens/Home/HomeTab/MyPrograms/myPrograms.styles";
import useMyProgramsController from "@screens/Home/HomeTab/MyPrograms/useMyProgramsController";

import HomeBanner from "@components/Home/HomeBanner";
import HomeCourseList from "@components/Home/HomeCourseList";
import HomeUgAppDownload from "@components/Home/HomeUgAppDownload";
import ReferAndEarn from "@components/Home/ReferAndEarn";
import BirthdayModal from "@components/microInteractions/BirthdayModal";
import IntroModal from "@components/microInteractions/IntroModal";
import OnboardingModal, {
	IOnboardingMicroInteractionModalType,
} from "@components/microInteractions/OnboardingModal";
import NotEnrolledUserComponent from "@components/web/UserNotEnrolled";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { IHomeReferAndEarnPosition } from "@interface/myPrograms.interface";

import { colors } from "@assets/colors";

const STRINGS = createStringConstants({
	completedProgram: "home.completedProgram",
	ongoingProgram: "home.ongoingProgram",
	youHaventEnrolledInAnyCoursesYet: "home.youHaventEnrolledInAnyCoursesYet",
});

const BodyComponent = () => {
	const {
		onSearchPress,
		sessionsLoading,
		assetLoading,
		bannerItems,
		ongoingCourseLoading,
		ongoingCourses,
		completedCourses,
		completedCoursesLoading,
		fetchMoreOngoingCourses,
		fetchMoreCompletedCourses,
		referAndEarn,
		ongoingCoursesPage,
		completedCoursesPage,
		handleFetchMoreOngoing,
		handleFetchMoreCompleted,
		hasLearnCourses,
		hasUgCourses,
		isIntroModalOpen,
		isBirthdayModalOpen,
		handleIntroModalClose,
		handleBirthdayModalClose,
		handleRejoinModalClose,
		isRejoinModalOpen,
	} = useMyProgramsController();

	if (!hasLearnCourses)
		return (
			<NotEnrolledUserComponent
				title={getString(STRINGS.youHaventEnrolledInAnyCoursesYet)}
				showButton
			/>
		);

	return (
		<ScrollView
			contentContainerStyle={styles.scrollViewContainer}
			showsVerticalScrollIndicator={false}
		>
			<HomeBanner
				bannerItems={bannerItems}
				loading={assetLoading || sessionsLoading}
			/>
			<View style={styles.courseListView}>
				<HomeCourseList
					title={getString(STRINGS.ongoingProgram)}
					showSearch
					onSearchPress={onSearchPress}
					courses={ongoingCourses?.learnerCourses?.result || []}
					onFetchMore={() => {
						handleFetchMoreOngoing(
							ongoingCoursesPage,
							fetchMoreOngoingCourses,
						);
					}}
					referAndEarnIndex={
						referAndEarn.position ===
						IHomeReferAndEarnPosition.ONGOING
							? referAndEarn.index
							: -1
					}
					loading={ongoingCourseLoading}
					showReferAndEarnSkeleton
				/>

				{hasUgCourses ? <HomeUgAppDownload /> : <></>}

				<HomeCourseList
					title={getString(STRINGS.completedProgram)}
					courses={completedCourses?.learnerCourses.result || []}
					onFetchMore={() => {
						handleFetchMoreCompleted(
							completedCoursesPage,
							fetchMoreCompletedCourses,
						);
					}}
					referAndEarnIndex={
						referAndEarn.position ===
						IHomeReferAndEarnPosition.COMPLETED
							? referAndEarn.index
							: -1
					}
					loading={completedCoursesLoading}
					showSearch={
						ongoingCourses?.learnerCourses.result.length === 0
					}
					onSearchPress={onSearchPress}
				/>
			</View>
			<View style={styles.container}>
				{referAndEarn.position === IHomeReferAndEarnPosition.BOTTOM ? (
					<View style={styles.referAndEarnContainerView}>
						<ReferAndEarn />
					</View>
				) : (
					<></>
				)}
				{/* <ExploreCourses /> */}
			</View>

			<IntroModal
				isOpen={isIntroModalOpen}
				closeModal={handleIntroModalClose}
			/>
			<BirthdayModal
				isOpen={isBirthdayModalOpen}
				closeModal={handleBirthdayModalClose}
			/>

			<OnboardingModal
				modalType={IOnboardingMicroInteractionModalType.Rejoin}
				closeModal={handleRejoinModalClose}
				isOpen={isRejoinModalOpen}
			/>
		</ScrollView>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const MyPrograms = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showProfile
		backgroundColor={colors.neutral.grey_02}
		removeBottomInset
	/>
);

export default MyPrograms;
