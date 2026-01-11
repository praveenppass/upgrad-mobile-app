import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { IMultilingualVideo } from "@graphql/query/asset/video/getMultilingualDataQuery";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const {
	text: { regular, sm, md, reg, semiBold },
} = commonStyles;

type IMultilingualProps = {
	selectedBrightCoveId: string | "";
	data: IMultilingualVideo[];
	isVisible: boolean;
	onSelectedMultilingualLang: (brightCoveId: string) => void;
	toggleMultilingualLang: () => void;
};

const Multilingual = ({
	data,
	isVisible,
	selectedBrightCoveId,
	onSelectedMultilingualLang,
	toggleMultilingualLang,
}: IMultilingualProps) => {
	return (
		<ActionModal
			isOpen={isVisible}
			closeModal={toggleMultilingualLang}
			onBackPress={toggleMultilingualLang}
			disableCloseOnSwipeDown
			style={styles.removePadding}
		>
			<View style={styles.modalContent}>
				<View style={styles.headerLine} />
				<RNText title={strings.LANGUAGE} style={styles.modalTitle} />

				<ScrollView style={styles.scrollList}>
					{data?.map((item, index) => (
						<Pressable
							key={index}
							style={({ pressed }) => {
								const isSelected =
									item.brightcoveId === selectedBrightCoveId;
								return [
									styles.itemContainer,
									(pressed || isSelected) &&
										styles.itemPressed,
								];
							}}
							onPress={() => {
								onSelectedMultilingualLang(
									item.brightcoveId || "",
								);
							}}
						>
							<RNText
								title={item.language.name}
								style={styles.itemText}
							/>
						</Pressable>
					))}
				</ScrollView>
			</View>
		</ActionModal>
	);
};

export default Multilingual;

const styles = StyleSheet.create({
	headerLine: {
		alignSelf: "center",
		backgroundColor: neutral.grey_04,
		height: 2,
		marginBottom: verticalScale(10),
		width: horizontalScale(70),
	},
	itemContainer: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderRadius: 8,
		flexDirection: "row",
		height: verticalScale(45),
		marginTop: verticalScale(10),
		paddingHorizontal: horizontalScale(16),
	},
	itemPressed: {
		backgroundColor: neutral.grey_02,
	},
	itemText: {
		...md,
		...regular,
		color: neutral.grey_08,
	},
	langContainer: {
		alignItems: "center",
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "center",
		marginTop: verticalScale(10),
		width: "100%",
	},
	languageItem: {
		alignItems: "center",
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(8),
		columnGap: horizontalScale(5),
		flexDirection: "row",
		height: verticalScale(45),
		justifyContent: "center",
		paddingHorizontal: horizontalScale(16),
	},
	languageText: {
		color: neutral.black,
		...regular,
		...sm,
		marginLeft: horizontalScale(5),
		marginRight: horizontalScale(20),
	},
	modalContent: {
		height: verticalScale(350),
	},
	modalTitle: {
		...reg,
		...semiBold,
		color: neutral.black,
		marginBottom: verticalScale(10),
		textAlign: "center",
	},
	removePadding: {
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	scrollList: {
		flex: 1,
	},
});
