import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { SessionFilterIcon, SortIcon } from "@assets/icons";

interface ISessionSortFilter {
	toggleSortModal: () => void;
	toggleFilterModal: () => void;
}

const ICON_PROPS = {
	height: horizontalScale(14),
	width: horizontalScale(14),
	color: colors.neutral.black,
};

const SessionSortFilter = ({
	toggleSortModal,
	toggleFilterModal,
}: ISessionSortFilter) => {
	return (
		<View style={styles.container}>
			<Pressable style={styles.sortIcon} onPress={toggleSortModal}>
				<SortIcon {...ICON_PROPS} />
			</Pressable>

			<Pressable style={styles.filterIcon} onPress={toggleFilterModal}>
				<SessionFilterIcon {...ICON_PROPS} />
			</Pressable>
		</View>
	);
};

export default SessionSortFilter;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	filterIcon: {
		marginTop: verticalScale(14),
	},
	sortIcon: {
		marginRight: horizontalScale(10),
		marginTop: verticalScale(14),
	},
});
