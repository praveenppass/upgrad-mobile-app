import React, { memo } from "react";
import { C } from "@assets/constants";
import measures from "@utils/measures";
import CustomButton from "@components/Reusable/Buttons/CustomButton";
import {
	View,
	StyleSheet,
	type ViewStyle,
	type StyleProp,
	type TextStyle,
} from "react-native";
import RNText from "./RNText";

const {
	themes: { primary },
	commonStyles: {
		spacing: { g6, mt6, mt16 },
		align: { flex1, itemsCenter },
		text: { md, sm, bold, clrBlue },
	},
} = C;

interface IExploreCardProps {
	desc?: string;
	title: string;
	btnText?: string;
	icon: JSX.Element;
	onButtonHandler?: () => void;
	btnStyle?: StyleProp<ViewStyle>;
	descStyle?: StyleProp<TextStyle>;
	titleStyle?: StyleProp<TextStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	isTransparent?: boolean;
	plusIcon?: JSX.Element;
}

function EmptyCard({
	icon,
	desc,
	title,
	btnText,
	btnStyle,
	plusIcon,
	descStyle,
	titleStyle,
	containerStyle,
	onButtonHandler,
	isTransparent,
}: IExploreCardProps) {
	return (
		<View style={[g6, flex1, itemsCenter, containerStyle]}>
			{icon}
			<RNText
				title={title}
				style={[md, mt6, bold, clrBlue, styles.txtCenter, titleStyle]}
			/>
			{desc ? (
				<RNText
					title={desc}
					numberOfLines={3}
					style={[sm, clrBlue, styles.desc, descStyle]}
				/>
			) : null}
			{onButtonHandler ? (
				<CustomButton
					isTransparent={isTransparent}
					title={btnText as string}
					onBtnHandler={onButtonHandler}
					btnStyle={[mt16, styles.exploreBtn, btnStyle]}
					rightIcon={plusIcon}
				/>
			) : null}
		</View>
	);
}

export default memo(EmptyCard);

const styles = StyleSheet.create({
	desc: {
		width: "100%",
		textAlign: "center",
	},
	exploreBtn: {
		borderWidth: 1.2,
		borderRadius: measures.BORDER.b8,
	},
	txtCenter: {
		textAlign: "center",
	},
});
