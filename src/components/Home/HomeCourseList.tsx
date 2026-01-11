import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import HomeCourseCard, {
	HomeCourseCardSkeleton,
} from "@components/Home/HomeCourseCard";
import ReferAndEarn, {
	ReferAndEarnSkeleton,
} from "@components/Home/ReferAndEarn";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";
//TODO: charizard: move this from here to specialization screen
import SpecializationModal from "@components/studyPlan/container2/SpecializationModal";

import { horizontalScale, verticalScale } from "@utils/functions";

import { ICourseVariantEnum } from "@interface/app.interface";
import {
	IHomeCourseList,
	IHomeCourseListSkeleton,
} from "@interface/components/home/homeCourseList.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { SearchIcon } from "@assets/icons";

const {
	commonStyles: {
		text: { semiBold, md },
	},
} = C;

const HomeCourseListSkeleton = ({
	showReferAndEarnSkeleton,
}: IHomeCourseListSkeleton) => {
	return (
		<View>
			<View style={styles.headingAndSearchContainer}>
				<Skeleton style={styles.titleContainer} dark />
				<Skeleton style={styles.iconContainer} dark />
			</View>
			<View style={styles.courseSkeletonView}>
				{new Array(3).fill(1)?.map((_item, i: number) => (
					<HomeCourseCardSkeleton key={i} />
				))}
				{showReferAndEarnSkeleton ? <ReferAndEarnSkeleton /> : <></>}
			</View>
		</View>
	);
};

const calculateSpecializationsCount = (
	specializationsPurchasedCount: number,
	relatedUserProgramsLength: number,
): number => {
	if (!specializationsPurchasedCount) {
		return 0;
	}
	const count =
		specializationsPurchasedCount - (relatedUserProgramsLength - 1);
	return count;
};

const HomeCourseList = ({
	title,
	showSearch,
	onSearchPress,
	courses,
	onFetchMore,
	referAndEarnIndex,
	loading,
	showReferAndEarnSkeleton,
}: IHomeCourseList) => {
	const [specializationState, setSpecializationState] = useState({
		isVisible: false,
		count: 0,
	});

	const handleSpecializationState = (count: number) => {
		setSpecializationState((prev) => ({
			isVisible: !prev.isVisible,
			count,
		}));
	};

	const filteredCourses = useMemo(
		() =>
			courses.filter(
				({ program, course }) => program != null || course != null,
			),
		[courses],
	);

	if (loading)
		return (
			<HomeCourseListSkeleton
				showReferAndEarnSkeleton={showReferAndEarnSkeleton}
			/>
		);

	if (filteredCourses.length === 0) return <></>;

	return (
		<View>
			<View style={styles.coursesView}>
				<RNText style={styles.courseTitle}>{title}</RNText>
				{showSearch ? (
					<Pressable onPress={onSearchPress}>
						<SearchIcon color={colors.neutral.black} />
					</Pressable>
				) : (
					<></>
				)}
			</View>
			<FlatList
				data={filteredCourses || []}
				contentContainerStyle={styles.flatlistContainer}
				renderItem={({ item, index }) => {
					const course = item.program ?? item.course;

					const courseCardProps = {
						title: item?.courseInfo
							? item?.courseInfo?.name
							: course.name,
						duration: item.totalLearningDuration,

						progress: item.progress,
						imageUrl: course.image,
						universityPartnerName: course.universityPartner,
						id: item.id,
						variant: item.variant as ICourseVariantEnum,
						specializationsCount: calculateSpecializationsCount(
							item.specializationsPurchasedCount,
							item.relatedUserPrograms.length,
						),
						toggleSpecialization: handleSpecializationState,
						isSpecializationScreen:
							item?.relatedUserPrograms?.length > 1,
						workshopId: item.workshop?.id,
						workshopCode: item.workshop?.code,
						userProgramId: item.program?.id,
						code: course.code,
					};

					if (index === referAndEarnIndex)
						return (
							<>
								<HomeCourseCard {...courseCardProps} />
								<View style={styles.referAndEarnView}>
									<ReferAndEarn />
								</View>
							</>
						);
					else return <HomeCourseCard {...courseCardProps} />;
				}}
				onEndReached={onFetchMore}
				onEndReachedThreshold={0.1}
				keyExtractor={(_, index) => `HomeCourseCard-${index}`}
			/>
			{/* //TODO:add a todo here, we will check why modal is present on home
			screen too */}
			<SpecializationModal
				isVisible={specializationState.isVisible}
				onClose={() =>
					handleSpecializationState(specializationState.count)
				}
				specializationCount={specializationState.count}
			/>
		</View>
	);
};

export default HomeCourseList;

const styles = StyleSheet.create({
	courseSkeletonView: {
		gap: horizontalScale(24),
	},
	courseTitle: {
		...semiBold,
		...md,
	},
	coursesView: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(12),
	},
	flatlistContainer: {
		gap: horizontalScale(24),
		padding: horizontalScale(2),
	},
	headingAndSearchContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(10),
	},
	iconContainer: {
		borderRadius: horizontalScale(10),
		height: verticalScale(20),
		width: horizontalScale(20),
	},
	referAndEarnView: {
		marginTop: verticalScale(24),
	},
	titleContainer: {
		borderRadius: horizontalScale(10),
		height: verticalScale(15),
		width: horizontalScale(80),
	},
});
