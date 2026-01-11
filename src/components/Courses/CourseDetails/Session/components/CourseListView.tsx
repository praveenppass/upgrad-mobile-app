import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import CourseCard from "@components/Courses/CourseDetails/Session/components/CourseCard";
import Skeleton from "@components/Skeleton/Skeleton";

import { ILiveSessionCourseResult } from "@graphql/query/academicPlanner/getLiveSessionCourses";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

const SKELETON_LENGTH = 4;

interface ICourseListViewProps {
	courses: ILiveSessionCourseResult[];
	loading: boolean;
	userProgramId: string;
	onRefetch?: () => void;
}

const CourseListView = ({
	courses,
	loading,
	userProgramId,
}: ICourseListViewProps) => {
	if (loading) {
		return (
			<View style={styles.container}>
				{Array.from({ length: SKELETON_LENGTH }).map((_, index) => (
					<View key={index} style={styles.skeletonCard}>
						<Skeleton style={styles.skeletonTag} dark />
						<Skeleton style={styles.skeletonTitle} dark />
						<Skeleton style={styles.skeletonButton} dark />
					</View>
				))}
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={courses}
				renderItem={({ item, index }) => (
					<CourseCard
						course={item}
						index={index}
						userProgramId={userProgramId}
					/>
				)}
				keyExtractor={(item, index) => `course-${index}-${item.level1}`}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default CourseListView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: verticalScale(16),
	},
	listContent: {
		paddingBottom: verticalScale(20),
	},
	skeletonButton: {
		alignSelf: "flex-end",
		borderRadius: verticalScale(6),
		height: verticalScale(16),
		marginTop: verticalScale(12),
		width: horizontalScale(120),
	},
	skeletonCard: {
		backgroundColor: neutral.white,
		borderRadius: verticalScale(12),
		elevation: 5,
		marginBottom: verticalScale(12),
		marginHorizontal: horizontalScale(20),
		padding: horizontalScale(12),
		shadowColor: neutral.black,
		shadowOffset: {
			width: 0,
			height: verticalScale(2),
		},
		shadowOpacity: 0.1,
		shadowRadius: verticalScale(4),
	},
	skeletonTag: {
		borderRadius: verticalScale(6),
		height: verticalScale(20),
		marginBottom: verticalScale(8),
		width: horizontalScale(80),
	},
	skeletonTitle: {
		borderRadius: verticalScale(6),
		height: verticalScale(20),
		marginBottom: verticalScale(8),
		width: "80%",
	},
});
