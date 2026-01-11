import React, { memo, useMemo } from "react";
import {
	type StyleProp,
	StyleSheet,
	View,
	type TextStyle,
	ViewStyle,
} from "react-native";
import { C } from "@assets/constants";
import {
	AssessmentsIcon,
	AssignmentsWhiteIcon,
	DurationTimerIcon,
	HandsOnIcon,
	LevelIcon,
	ProjectIcon,
	TimerIcon,
} from "@assets/icons";
import IconContainer from "@components/Reusable/IconContainer";
import { strings } from "@assets/strings";
import { type Course, type Program } from "@interface/userProgram.interface";
import { calculateLearningDuration, moderateScale } from "@utils/functions";

const {
	themes: { primary, text },
	commonStyles: {
		text: { regular },
		spacing: { pl8 },
		align: { row },
	},
	colors:{neutral}
} = C;

const SVG_ICON_SIZE = {
	width: moderateScale(20),
	height: moderateScale(20),
};

interface IKeyPointIconType {
	title: string;
	icon: JSX.Element;
	textStyle?: StyleProp<TextStyle>;
	iconContainerStyle?: StyleProp<TextStyle>;
}

function KeyPointIcon({
	title,
	icon,
	textStyle,
	iconContainerStyle,
}: IKeyPointIconType) {
	return (
		<IconContainer
			iconContainerStyle={[style.iconContainerStyle, iconContainerStyle]}
			rootStyle={style.rootStyle}
			icon={icon}
			textStyle={[style.textStyle, textStyle]}
			title={title}
		/>
	);
}
interface IKeyPointsType {
	totalAssets: number;
	totalAssessments: number;
	totalProjects: number;
	totalAssignments: number;
	totalHandsOns: number;
	totalLearningDuration: number;
	program?: Program;
	course?: Course;
	duration?: number;
}

interface ICouseStatus {
	data: IKeyPointsType;
	childIcon?: JSX.Element;
	textStyle?: StyleProp<TextStyle>;
	rootViewStyle?: StyleProp<ViewStyle>;
	svgColor?: string;
	iconContainerStyle?: StyleProp<TextStyle>;
}

const createIcons = (
	data: IKeyPointsType,
	textStyle: StyleProp<TextStyle>,
	svgColor?: string,
	iconContainerStyle?: StyleProp<TextStyle>,
) => {
	const iconArray: JSX.Element[] = [];
	if (data?.totalLearningDuration) {
		const totalHours = calculateLearningDuration(
			data?.totalLearningDuration ?? 0,
		);
		iconArray.push(
			<KeyPointIcon
				title={`${totalHours}+ ${strings.HRS_PULES}`}
				textStyle={textStyle}
				iconContainerStyle={iconContainerStyle}
				icon={
					<DurationTimerIcon
						color={svgColor || neutral.white}
						{...SVG_ICON_SIZE}
					/>
				}
			/>,
		);
	}
	if (data?.duration) {
		const totalHours = calculateLearningDuration(data?.duration ?? 0);
		iconArray.push(
			<KeyPointIcon
				title={`${totalHours}+ ${strings.HRS_PULES}`}
				textStyle={textStyle}
				iconContainerStyle={iconContainerStyle}
				icon={
					<DurationTimerIcon
						color={svgColor || neutral.white}
						{...SVG_ICON_SIZE}
					/>
				}
			/>,
		);
	}
	if (data?.totalHandsOns) {
		iconArray.push(
			<KeyPointIcon
				title={`${data?.totalHandsOns} ${strings.HANDS_ON}`}
				textStyle={textStyle}
				iconContainerStyle={iconContainerStyle}
				icon={
					<HandsOnIcon
						color={svgColor || neutral.white}
						{...SVG_ICON_SIZE}
					/>
				}
			/>,
		);
	}
	if (data?.totalAssessments) {
		iconArray.push(
			<KeyPointIcon
				title={`${data?.totalAssessments} ${strings.ASSESSMENTS}`}
				textStyle={textStyle}
				iconContainerStyle={iconContainerStyle}
				icon={
					<AssessmentsIcon
						color={svgColor || neutral.white}
						{...SVG_ICON_SIZE}
					/>
				}
			/>,
		);
	}

	if (data?.totalProjects) {
		iconArray.push(
			<KeyPointIcon
				title={`${data?.totalProjects} ${strings.PROJECTS}`}
				textStyle={textStyle}
				iconContainerStyle={iconContainerStyle}
				icon={
					<ProjectIcon
						{...SVG_ICON_SIZE}
						color={svgColor || neutral.white}
					/>
				}
			/>,
		);
	}

	if (data?.totalAssignments) {
		iconArray.push(
			<KeyPointIcon
				title={`${data?.totalAssignments} ${strings.ASSIGNMENTS}`}
				textStyle={textStyle}
				iconContainerStyle={iconContainerStyle}
				icon={
					<AssignmentsWhiteIcon
						color={svgColor || neutral.white}
						{...SVG_ICON_SIZE}
					/>
				}
			/>,
		);
	}


	if (data?.program?.level?.length) {
		const levelOneName = data?.program?.level[0]?.name ?? "";
		const levelTwoName =
			data?.program?.level?.length > 1
				? ` - ${data?.program?.level?.at(-1)?.name ?? ""}`
				: "";

		iconArray.push(
			<KeyPointIcon
				title={`${levelOneName}${levelTwoName}`}
				textStyle={textStyle}
				iconContainerStyle={iconContainerStyle}
				icon={
					<LevelIcon
						color={svgColor || neutral.white}
						{...SVG_ICON_SIZE}
					/>
				}
			/>,
		);
	}
	if (data?.course?.courseLevels?.length) {
		const levelOneName = data?.course?.courseLevels[0]?.name ?? "";
		const levelTwoName =
			data?.course?.courseLevels?.length > 1
				? ` - ${data.course.courseLevels[
					data.course.courseLevels.length - 1
				]?.name ?? ""
				}`
				: "";
		iconArray.push(
			<KeyPointIcon
				textStyle={textStyle}
				title={`${levelOneName}${levelTwoName}`}
				iconContainerStyle={iconContainerStyle}
				icon={
					<LevelIcon
						color={svgColor || neutral.white}
						{...SVG_ICON_SIZE}
					/>
				}
			/>,
		);
	}
	return iconArray;
};

function CoursesKeyPoint({
	data,
	childIcon,
	textStyle,
	rootViewStyle,
	svgColor,
	iconContainerStyle,
}: ICouseStatus) {
	const iconArray = useMemo(
		() => createIcons(data, textStyle, svgColor, iconContainerStyle),
		[data],
	);

	return (
		<View style={[style.rootView, rootViewStyle]}>
			{iconArray}
			{childIcon}
		</View>
	);
}

const style = StyleSheet.create({
	rootView: {
		...row,
		flexWrap: "wrap",
		justifyContent: "flex-start",
		gap: 7,
	},
	iconContainerStyle: {
		backgroundColor: "#000000",
		width: moderateScale(24),
		height: moderateScale(24),
	},
	rootStyle: {
		width: "45%",
	},
	textStyle: { ...pl8, ...regular },
});

export { KeyPointIcon };
export type { IKeyPointsType };

export default memo(CoursesKeyPoint);
