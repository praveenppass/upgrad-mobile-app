// MainComponent.tsx
import React, { PropsWithChildren } from "react";
import {
	Image,
	ImageSourcePropType,
	ImageStyle,
	StyleProp,
	StyleSheet,
	View,
} from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";

const { neutral } = colors;

interface IConfirmationModal extends PropsWithChildren {
	visible: boolean;
	bgColor?: string;
	onClose?: () => void;
	icon?: string | ImageSourcePropType;
	iconStyle?: StyleProp<ImageStyle>;
}

const ConfirmationModal: React.FC<IConfirmationModal> = ({
	visible,
	children,
	bgColor,
	onClose,
	icon,
	iconStyle,
}) => (
	<ActionModal
		isOpen={visible}
		closeModal={onClose}
		onBackPress={onClose}
		style={styles.modelStyle}
	>
		<View style={styles.overlay}>
			<View style={[styles.customBg, { backgroundColor: bgColor }]} />
			<View style={styles.indicatorStyle} />
			<View>
				<View style={styles.container}>
					{icon && (
						<Image
							source={
								typeof icon === "string" ? { uri: icon } : icon
							}
							style={[styles.image, iconStyle]}
							resizeMode="contain"
						/>
					)}
					{children}
				</View>
			</View>
		</View>
	</ActionModal>
);

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(6),
	},
	customBg: {
		borderRadius: (measures.SCREEN_WIDTH / 2) * 1.5,
		height: measures.SCREEN_WIDTH * 1.5,
		left: -measures.SCREEN_WIDTH / 4,
		position: "absolute",
		top: -measures.SCREEN_WIDTH * 1.2,
		width: measures.SCREEN_WIDTH * 1.5,
	},
	image: {
		height: verticalScale(110),
		marginVertical: verticalScale(24),
		width: horizontalScale(150),
	},
	indicatorStyle: {
		alignSelf: "center",
		backgroundColor: neutral.grey_05,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(6),
		width: horizontalScale(64),
	},
	modelStyle: { paddingHorizontal: 0, paddingVertical: verticalScale(0) },
	overlay: {
		borderTopLeftRadius: horizontalScale(16),
		borderTopRightRadius: horizontalScale(16),
		overflow: "hidden",
	},
});

export default ConfirmationModal;
