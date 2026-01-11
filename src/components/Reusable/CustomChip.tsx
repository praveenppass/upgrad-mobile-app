import React, { memo } from "react";
import {
	type StyleProp,
	StyleSheet,
	type TextStyle,
	TouchableOpacity,
	View,
	type ViewStyle,
} from "react-native";

import Skeleton from "@components/Skeleton/Skeleton";

import { moderateScale } from "@utils/functions";
import measures from "@utils/measures";

import { C } from "@assets/constants";

import RNText from "./RNText";

interface ChipProps {
	title: string;
	disabled?: boolean;
	selected?: boolean;
	customIcon?: JSX.Element;
	handleChipPress: () => void;
	customStyle?: StyleProp<ViewStyle>;
	badgeCount?: string;
	customTextCss?: StyleProp<TextStyle>;
}

const { BORDER } = measures;

const defaultSize = moderateScale(24);

const {
	themes: { primary, text, border },
	commonStyles: {
		align: { rowCenter },
		spacing: { pl16, pb6, pt6, pr16, ml8, p4, mr4 },
		text: { md, regular, clrBlack, bold, sm },
	},
} = C;

const CustomChip = ({
	title,
	disabled,
	handleChipPress,
	selected,
	customStyle = {},
	customIcon,
	badgeCount,
	customTextCss = {},
}: ChipProps) => {
	return (
		<TouchableOpacity
			onPress={handleChipPress}
			disabled={disabled}
			style={[
				pl16,
				pr16,
				rowCenter,
				styles.chip,
				selected && styles.selectedChip,
				customStyle,
			]}
		>
			<RNText
				title={title}
				style={[
					md,
					mr4,
					clrBlack,
					selected && [styles.selectedTitle, regular],
					customTextCss,
				]}
			/>
			{selected && customIcon}
			{badgeCount && (
				<View
					style={[
						styles.badgeView,
						{
							backgroundColor: selected
								? text.darkBlue
								: border.color1,
						},
					]}
				>
					<RNText
						title={badgeCount ?? ""}
						style={[
							styles.badgeCount,
							{
								color: selected
									? primary.color1
									: text.darkBlue,
							},
						]}
					/>
				</View>
			)}
		</TouchableOpacity>
	);
};

interface LoadingChipsProps {
	customStyle?: StyleProp<ViewStyle>;
}

const LoadingChips = memo(({ customStyle }: LoadingChipsProps) => {
	return <Skeleton style={customStyle} />;
});

const styles = StyleSheet.create({
	badgeCount: {
		...sm,
		...bold,
		...p4,
	},
	badgeView: {
		...ml8,
		alignItems: "center",
		borderRadius: defaultSize / 2,
		height: defaultSize,
		justifyContent: "center",
		width: defaultSize,
	},
	chip: {
		borderColor: border.color1,
		borderRadius: BORDER.b20,
		borderWidth: 1,
		...pb6,
		...pt6,
		backgroundColor: primary.color2,
	},
	selectedChip: {
		backgroundColor: text.dark,
	},
	selectedIcon: {
		color: primary.color2,
	},
	selectedTitle: {
		color: primary.color2,
	},
});

export { LoadingChips };

export default memo(CustomChip);
