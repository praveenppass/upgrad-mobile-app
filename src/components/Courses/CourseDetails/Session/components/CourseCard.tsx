import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { ILiveSessionCourseResult } from "@graphql/query/academicPlanner/getLiveSessionCourses";

import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { ArrowRightIcon } from "@assets/icons";
import { LiveSessionCoursesIcon } from "@assets/icons/svg/studyPlan";
import { commonStyles } from "@assets/styles";

const { sm, regular, semiBold, md } = commonStyles.text;
const { neutral, state } = colors;

interface ICourseCardProps {
	course: ILiveSessionCourseResult;
	index?: number;
	userProgramId: string;
	onPress?: () => void;
}

const ICON_DIMENSIONS = {
	width: horizontalScale(12),
	height: verticalScale(12),
};

const CourseCard = ({ course, userProgramId, onPress }: ICourseCardProps) => {
	const navigation = useAppNavigation();

	const handlePress = () => {
		if (onPress) {
			onPress();
			return;
		}

		if (course.level1 && userProgramId) {
			navigation.navigate(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.LectureDetailsScreen,
				params: {
					userProgramId,
					level1Id: course.level1,
					courseName: course.name,
					courseLabel: course.label,
				},
			});
		}
	};

	return (
		<Pressable style={styles.container} onPress={handlePress}>
			<View style={styles.contentContainer}>
				<View style={styles.headerContainer}>
					<View style={styles.courseTagContainer}>
						<LiveSessionCoursesIcon
							width={horizontalScale(12)}
							height={verticalScale(12)}
							color={neutral.black}
						/>
						<RNText
							title={course.label || ""}
							style={styles.courseTagText}
						/>
					</View>
				</View>
				<RNText
					title={course.name || ""}
					style={styles.courseTitle}
					numberOfLines={2}
				/>
				<View style={styles.divider} />
				<View style={styles.continueLearningContainer}>
					<RNText
						title="Continue Learning"
						style={styles.continueLearningText}
					/>
					<ArrowRightIcon
						{...ICON_DIMENSIONS}
						color={state.success_green}
					/>
				</View>
			</View>
		</Pressable>
	);
};

export default CourseCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: neutral.white,
		borderRadius: moderateScale(12),
		elevation: 5,
		marginBottom: verticalScale(12),
		marginHorizontal: horizontalScale(20),
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(8),
		shadowColor: neutral.black,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
	},
	contentContainer: {
		flex: 1,
	},
	continueLearningContainer: {
		alignItems: "center",
		alignSelf: "flex-end",
		flexDirection: "row",
		gap: horizontalScale(4),
		justifyContent: "space-between",
	},
	continueLearningText: {
		color: state.success_green,
		...semiBold,
		...sm,
	},
	courseTagContainer: {
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: neutral.grey_04,
		borderRadius: moderateScale(4),
		flexDirection: "row",
		gap: horizontalScale(4),
		paddingHorizontal: horizontalScale(8),
		paddingVertical: verticalScale(4),
		width: "auto",
	},
	courseTagText: {
		color: neutral.black,
		...regular,
		...sm,
	},
	courseTitle: {
		color: neutral.black,
		...semiBold,
		...md,
		lineHeight: verticalScale(24),
		marginBottom: verticalScale(12),
	},
	divider: {
		borderColor: neutral.grey_04,
		borderWidth: 0.5,
		marginHorizontal: horizontalScale(10),
		marginVertical: verticalScale(10),
		width: "96%",
	},
	headerContainer: {
		marginBottom: verticalScale(8),
	},
});
