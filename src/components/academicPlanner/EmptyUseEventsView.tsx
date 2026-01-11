import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { NoEventsIconLxp } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { xlg, medium } = commonStyles.text;

interface IEmptyUseEventsView {
	isFromStudyPlan?: boolean;
}

const EmptyUseEventsView: React.FC<IEmptyUseEventsView> = ({
	isFromStudyPlan,
}) => {
	return (
		<View
			style={isFromStudyPlan ? styles.studyPlanStyle : styles.container}
		>
			<NoEventsIconLxp />
			<RNText
				style={styles.titleTextStyle}
				title={strings.NO_EVENTS_FOUND}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},

	studyPlanStyle: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: verticalScale(100),
	},

	titleTextStyle: {
		color: colors.content.text.body_grey_07,
		...xlg,
		...medium,
		lineHeight: verticalScale(20),
	},
});

export default EmptyUseEventsView;
