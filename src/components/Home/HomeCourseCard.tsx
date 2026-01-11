import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import { WOOLF } from "@screens/Home/HomeTab/MyPrograms/useMyProgramsController";

import RNText from "@components/Reusable/RNText";
import ViewOnDesktopModal from "@components/Reusable/ViewOnDesktopModal";
import Skeleton from "@components/Skeleton/Skeleton";

import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { COURSE_FALL_BACK_IMG } from "@utils/constants";
import { isMileStone } from "@utils/courseDetailsUtils";
import {
	convertSecondsToHoursAndMinutes,
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { studyPlanSlice } from "@redux/slices/studyplan.slice";

import { ICourseVariantEnum, LearningPathType } from "@interface/app.interface";
import { IHomeCourseCard } from "@interface/components/home/homeCourseCard";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { ArrowLeft, BellIcon, TimerLxp } from "@assets/icons";
import { strings } from "@assets/strings";

const {
	commonStyles: {
		components: { cardViewStyle },
		align: { row, alignCenter, selfEnd, justifyBetween, column },
		spacing: { p12, g4, g12 },
		text: { sm, regular, semiBold, md },
	},
	colors: { neutral, state },
} = C;

const {
	BORDER: { b4, b8 },
} = measures;

export const HomeCourseCardSkeleton = () => (
	<View style={styles.container}>
		<View style={styles.courseContainer}>
			<Skeleton style={styles.image} dark />
			<View style={styles.contentContainer}>
				<View>
					<Skeleton style={styles.headingSkeleton} dark />
					<View style={styles.timer}>
						<Skeleton style={styles.timerIconSkeleton} dark />
						<Skeleton style={styles.timerTextSkeleton} dark />
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<Skeleton style={styles.buttonTextSkeleton} dark />
				</View>
			</View>
		</View>
		<View style={styles.progressBarSkeleton} />
	</View>
);

const HomeCourseCard = ({
	title,
	duration,
	progress,
	imageUrl,
	id,
	variant,
	specializationsCount,
	toggleSpecialization,
	isSpecializationScreen,
	universityPartnerName,
	workshopId,
	workshopCode,
	userProgramId,
	code,
}: IHomeCourseCard) => {
	const learningPathType =
		variant === ICourseVariantEnum.MILESTONE
			? LearningPathType.PROGRAM
			: LearningPathType.COURSE;

	let cta;
	const navigation = useAppNavigation();
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	if (progress === 100) cta = strings.REVISE;
	else if (progress === 0) cta = strings.GET_STARTED;
	else cta = strings.VIEW;

	const handleNavigation = () => {
		if (universityPartnerName === WOOLF) return setShowModal(true);

		const courseVariant = variant as unknown as ICourseVariantEnum;

		dispatch(studyPlanSlice.actions.restStudyState());
		dispatch(
			studyPlanSlice.actions.selectedCourseDetailsAction({
				selectedCourseID: id,
				courseVariant,
				isMilestoneResume: !!isMileStone(courseVariant),
				courseDetailTemp: {
					courseName: title,
					courseProgress: progress,
				},
			}),
		);

		if (isSpecializationScreen) {
			navigation.navigate(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.Container1Screen,
				params: {
					learningPathType,
					learningPathId: id,
					learningPathName: title,
				},
			});
		} else {
			navigation.navigate(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.Container2Screen,
				params: {
					learningPathId: id,
					learningPathType,
					learningPathName: title,
					learningPathCode: code,
					workshopId,
					workshopCode,
					userProgramId: userProgramId || "",
				},
			});
		}
	};

	return (
		<Pressable onPress={handleNavigation} style={styles.wrapper}>
			<View style={styles.container}>
				<View style={styles.courseContainer}>
					<Image
						source={{
							uri: imageUrl || COURSE_FALL_BACK_IMG,
						}}
						style={styles.image}
						resizeMode="cover"
					/>

					<View style={styles.contentContainer}>
						<View>
							<RNText
								title={title}
								style={styles.heading}
								numberOfLines={2}
							/>
							<View style={styles.timer}>
								<TimerLxp color={neutral.grey_07} />
								<RNText
									title={convertSecondsToHoursAndMinutes(
										duration,
									)}
									style={styles.timerText}
								/>
							</View>
						</View>

						<View style={styles.buttonContainer}>
							<RNText title={cta} style={styles.buttonText} />
							<ArrowLeft
								style={styles.arrow}
								color={neutral.grey_07}
								width={horizontalScale(8)}
								height={verticalScale(10)}
								stroke={neutral.grey_07}
								strokeWidth={1}
							/>
						</View>
					</View>
				</View>

				{specializationsCount ? (
					<View style={styles.specializationView}>
						<BellIcon />
						<RNText
							title={`  ${specializationsCount} ${strings.UPCOMING_SPECIALISATIONS}`}
							style={styles.specializationTxt}
						/>
						<Pressable
							onPress={() =>
								toggleSpecialization(specializationsCount)
							}
							style={styles.specializationLine}
						>
							<RNText
								title={strings.SELECT_NOW}
								style={styles.specializationSelectTxt}
							/>
						</Pressable>
					</View>
				) : null}
				<View
					style={[
						styles.progressBar,
						progress === 0 && styles.progressBarEmpty,
					]}
				>
					<View
						style={[styles.progress, { width: `${progress}%` }]}
					/>
				</View>
			</View>
			<ViewOnDesktopModal
				description={strings.UNIVESITY_PARTNER_DESC}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</Pressable>
	);
};

export default HomeCourseCard;

const styles = StyleSheet.create({
	arrow: {
		transform: [{ scaleX: -1 }],
	},
	buttonContainer: {
		...row,
		...selfEnd,
		...g4,
		...alignCenter,
	},
	buttonText: {
		...semiBold,
		...sm,
		color: neutral.grey_07,
	},
	buttonTextSkeleton: {
		borderRadius: horizontalScale(10),
		height: moderateScale(16),
		width: horizontalScale(45),
	},
	container: {
		backgroundColor: neutral.white,
		borderRadius: b8,
		overflow: "hidden",
	},
	contentContainer: {
		...column,
		...justifyBetween,
		flexShrink: 1,
	},
	courseContainer: {
		...p12,
		...row,
		...g12,
	},

	heading: {
		...semiBold,
		...md,
		color: neutral.black,
		lineHeight: moderateScale(24),
		width: horizontalScale(211),
	},
	headingSkeleton: {
		borderRadius: horizontalScale(10),
		height: verticalScale(16),
		marginBottom: verticalScale(5),
		width: horizontalScale(206),
	},
	image: {
		borderRadius: b4,
		height: horizontalScale(86),
		width: horizontalScale(86),
	},
	progress: {
		backgroundColor: state.success_green,
		height: horizontalScale(4),
	},
	progressBar: {
		backgroundColor: state.success_light_green,
		height: horizontalScale(4),
	},
	progressBarEmpty: {
		backgroundColor: colors.transparent,
	},
	progressBarSkeleton: {
		borderBottomLeftRadius: b8,
		borderBottomRightRadius: b8,
		height: horizontalScale(4),
	},
	specializationLine: {
		borderBottomColor: colors.highlight.text_blue,
		borderBottomWidth: verticalScale(1),
	},
	specializationSelectTxt: {
		color: colors.highlight.text_blue,
		...semiBold,
		...sm,
	},
	specializationTxt: {
		color: colors.neutral.black,
		...regular,
		...sm,
	},
	specializationView: {
		alignItems: "center",
		backgroundColor: colors.neutral.white,
		borderTopColor: colors.bg.fill.bg_disable,
		borderTopWidth: verticalScale(1),
		flexDirection: "row",
		height: verticalScale(48),
		paddingLeft: verticalScale(16),
	},
	timer: {
		...row,
		...alignCenter,
		gap: horizontalScale(4),
		marginTop: verticalScale(6),
	},
	timerContainer: {
		marginTop: verticalScale(8),
	},
	timerIconSkeleton: {
		borderRadius: horizontalScale(10),
		height: horizontalScale(18),
		width: horizontalScale(18),
	},
	timerText: {
		...regular,
		...sm,
		color: neutral.grey_07,
		width: horizontalScale(211),
	},
	timerTextSkeleton: {
		borderRadius: horizontalScale(10),
		height: moderateScale(16),
		width: horizontalScale(100),
	},
	wrapper: {
		...cardViewStyle,
	},
});
