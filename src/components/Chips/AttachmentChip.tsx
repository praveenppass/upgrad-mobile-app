import React, { memo } from "react";
import { C } from "@assets/constants";
import {
	StyleSheet,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
} from "react-native";
import RNText from "@components/Reusable/RNText";
import measures from "@utils/measures";
import { AttachIcon, RemoveIconCircle } from "@assets/icons";
import { moderateScale } from "@utils/functions";

const {
	themes: { primary, text, border },
	commonStyles: {
		align: { row, flex1 },
		spacing: { p8, mr8, mb4, ml2 },
		text: { sm },
		components: { shadow },
	},
} = C;

const {
	BORDER: { b20 },
} = measures;

interface IAttachmentChip {
	title: string;
	onRemoveTap?: () => void;
	onTap?: () => void;
	attachIconColor?: string;
	rootStyle?: StyleProp<ViewStyle>;
}

function AttachmentChip({
	title,
	onRemoveTap,
	attachIconColor,
	onTap,
	rootStyle,
}: IAttachmentChip) {
	return (
		<TouchableOpacity
			disabled={!onTap}
			onPress={onTap}
			style={[style.noteCountBackGround, rootStyle]}
		>
			<AttachIcon color={attachIconColor ?? text.steelBlue} />
			<RNText
				title={title}
				style={[
					style.noteCountTextStyle,
					{ color: attachIconColor ?? text.darkBlue },
				]}
				numberOfLines={1}
			/>
			{onRemoveTap && (
				<TouchableOpacity
					style={style.closeIcon}
					disabled={!onRemoveTap}
					onPress={onRemoveTap}
				>
					<RemoveIconCircle width={22} height={22} />
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	);
}

const style = StyleSheet.create({
	noteCountBackGround: {
		...p8,
		...mr8,
		...row,
		...shadow,
		borderWidth: 1,
		borderRadius: b20,
		width: moderateScale(100),
		borderColor: border.color1,
		backgroundColor: primary.color2,
		...mb4,
		...ml2,
	},
	noteCountTextStyle: {
		...sm,
		...flex1,
		width: moderateScale(210),
		color: text.darkBlue,
	},
	closeIcon: { position: "absolute", right: -1, top: -6 },
});

export default memo(AttachmentChip);
