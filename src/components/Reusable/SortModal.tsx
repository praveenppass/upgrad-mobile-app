import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

export enum ISortType {
	Default,
	OldFirst,
	NewFirst,
}

interface ISortModal {
	isVisible: boolean;
	onCloseModal: () => void;
	sortType: ISortType;
	setSortType: (sortType: ISortType) => void;
}

const { md, regular, semiBold } = commonStyles.text;
const { neutral, cta } = colors;

const orders = [
	{ title: strings.DEFAULT, type: ISortType.Default },
	{ title: strings.OLD_TO_NEW, type: ISortType.OldFirst },
	{ title: strings.NEW_TO_OLD, type: ISortType.NewFirst },
];

const SortModal = ({
	isVisible,
	onCloseModal,
	sortType,
	setSortType,
}: ISortModal) => (
	<ActionModal
		isOpen={isVisible}
		closeModal={onCloseModal}
		onBackPress={onCloseModal}
	>
		<View style={styles.indicator} />
		<View style={styles.container}>
			{orders.map((sort) => (
				<Pressable
					key={sort.type}
					onPress={() => {
						setSortType(sort.type);
						onCloseModal();
					}}
					style={styles.sort}
				>
					<RNText
						title={sort.title}
						style={[
							styles.modalItemText,
							sortType === sort.type &&
								styles.modalItemTextActive,
						]}
					/>
				</Pressable>
			))}
		</View>
	</ActionModal>
);

export default SortModal;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginVertical: verticalScale(12),
		rowGap: verticalScale(6),
	},
	indicator: {
		alignSelf: "center",
		backgroundColor: cta.fill.disable,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginBottom: verticalScale(12),
		width: horizontalScale(64),
	},
	modalItemText: {
		...regular,
		...md,
		color: neutral.black,
	},
	modalItemTextActive: {
		...semiBold,
	},
	sort: {
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(4),
	},
});
