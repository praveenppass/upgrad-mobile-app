import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import useContainer1Controller from "@screens/Home/StudyPlan/Container1/useContainer1Controller";

import RNText from "@components/Reusable/RNText";
import StudyPlanSkeleton from "@components/studyPlan/common/StudyPlanSkeleton";
import Container1BaseCard from "@components/studyPlan/container1/BaseCard";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { HOME_ROUTES } from "@navigation/routes";
import { useAppRoute } from "@navigation/useAppRoute";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { reg, bold } = commonStyles.text;

const STRINGS = createStringConstants({
	BASE_PROGRAM: "studyPlan.container1.baseProgram",
	SPECIALIZATION: "studyPlan.container1.specialization",
});

const Container1 = () => {
	const {
		programDetails,
		specializationListLoading,
		navigateToStudyPlan,
		renderSpecializationCard,
	} = useContainer1Controller();

	const { baseProgram, specializationPrograms } = programDetails;

	if (specializationListLoading) return <StudyPlanSkeleton />;

	return (
		<View style={styles.container}>
			<RNText
				title={getString(STRINGS.BASE_PROGRAM)}
				style={styles.title}
				testID="container1_base_program_title"
			/>

			<Container1BaseCard
				navigate={() => navigateToStudyPlan(baseProgram)}
				courseName={baseProgram.name}
				timeLeftText={`${baseProgram.durationText} left`}
				progress={baseProgram.progress}
			/>

			<View style={styles.divider} />

			<RNText
				title={getString(STRINGS.SPECIALIZATION)}
				style={styles.title}
				testID="container1_specialization_title"
			/>

			<FlatList
				data={specializationPrograms}
				keyExtractor={(index) => index.toString()}
				renderItem={renderSpecializationCard}
				contentContainerStyle={styles.specializationList}
				testID="container1_specialization_list"
			/>
		</View>
	);
};
const MemoizedContainer1 = memo(Container1);

const Container1Screen = () => {
	const route = useAppRoute<typeof HOME_ROUTES.Container1Screen>();
	const { learningPathName } = route.params;

	return (
		<WithHeaderLxp
			BodyComponent={MemoizedContainer1}
			title={learningPathName}
			showBack
			showHome
			removeBackground
		/>
	);
};

export default Container1Screen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: verticalScale(20),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(24),
	},
	divider: {
		borderColor: neutral.grey_03,
		borderWidth: 1,
		marginVertical: verticalScale(20),
		width: "100%",
	},
	specializationList: {
		gap: verticalScale(12),
	},
	title: {
		color: neutral.black,
		...reg,
		...bold,
		marginBottom: verticalScale(10),
	},
});
