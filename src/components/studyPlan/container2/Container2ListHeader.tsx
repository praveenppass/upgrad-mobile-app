import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import Container2Carousel from "@components/studyPlan/container2/Container2Carousel";
import CourseDescription from "@components/studyPlan/container2/CourseDescription";
import { INotificationCard } from "@components/studyPlan/container2/NotificationCard";

import { horizontalScale } from "@utils/functions";

import { colors } from "@assets/colors";

const { neutral } = colors;

interface IContainer2ListHeader {
	carouselData: INotificationCard[];
	description: string;
	learningPathName: string;
	totalExtensionsTaken: number;
	totalExtensionsAllowed: number;
	totalLearningDuration: string;
	progress: number;
	isProgram: boolean;
	isSpecialization: boolean;
	autoScrollInterval?: number;
}

const Container2ListHeader = ({
	carouselData,
	description,
	learningPathName,
	totalExtensionsTaken,
	totalExtensionsAllowed,
	totalLearningDuration,
	progress,
	isProgram,
	isSpecialization,
	autoScrollInterval = 5000,
}: IContainer2ListHeader) => {
	return (
		<>
			<Container2Carousel
				carouselData={carouselData}
				autoScrollInterval={autoScrollInterval}
			/>
			<View style={styles.separator} />
			<View style={styles.descriptionContainer}>
				<CourseDescription
					description={description}
					learningPathName={learningPathName}
					totalExtensionsTaken={totalExtensionsTaken}
					totalExtensionsAllowed={totalExtensionsAllowed}
					totalLearningDuration={totalLearningDuration}
					progress={progress}
					isProgram={isProgram}
					isSpecialization={isSpecialization}
				/>
			</View>
		</>
	);
};

export default memo(Container2ListHeader);

const styles = StyleSheet.create({
	descriptionContainer: {
		marginHorizontal: horizontalScale(24),
		overflow: "visible",
	},
	separator: {
		borderTopColor: neutral.grey_03,
		borderTopWidth: 1,
	},
});
