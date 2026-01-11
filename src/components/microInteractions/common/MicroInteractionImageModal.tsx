import React, { useEffect, useState } from "react";
import {
	ColorValue,
	Image,
	ImageSourcePropType,
	Modal,
	Pressable,
	StyleSheet,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useMicroInteractionAudio from "@components/microInteractions/common/useMicroInteractionAudio";

import {
	getImageAspectRatio,
	horizontalScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { colors } from "@assets/colors";

const { SCREEN_WIDTH } = measures;
const { neutral } = colors;

interface IMicroInteractionImageModal {
	isVisible: boolean;
	onClose: () => void;
	children: React.ReactNode;
	imageSource?: ImageSourcePropType;
	imageUrl?: string;
	navigationBarBackgroundColor: ColorValue;
}
const MicroInteractionImageModal = ({
	isVisible,
	onClose,
	children,
	imageSource,
	imageUrl,
	navigationBarBackgroundColor,
}: IMicroInteractionImageModal) => {
	const [scaledHeight, setScaledHeight] = useState<number | null>(null);

	const [isReady, setIsReady] = useState(false);

	const { bottom } = useSafeAreaInsets();

	useMicroInteractionAudio(isVisible);

	useEffect(() => {
		const fetchAspectRatio = async () => {
			const aspectRatio = await getImageAspectRatio({
				imageSource,
				imageUrl,
			});

			await new Promise((resolve) => setTimeout(resolve, 0));
			setScaledHeight(SCREEN_WIDTH / aspectRatio);
			setTimeout(() => setIsReady(true), 500);
		};

		fetchAspectRatio();
	}, [imageSource]);

	if (!isReady) return null;

	return (
		<Modal
			statusBarTranslucent
			transparent
			visible={isVisible}
			onRequestClose={onClose}
			animationType="fade"
			supportedOrientations={["portrait", "landscape"]}
		>
			<Pressable onPress={() => onClose()} style={styles.overlay}>
				<View
					style={[styles.contentContainer, { height: scaledHeight }]}
				>
					<View style={styles.imageContainer}>
						<Image
							source={imageSource ?? { uri: imageUrl }}
							style={styles.image}
							resizeMode="contain"
						/>
					</View>

					{children}
				</View>

				<View
					style={[
						styles.navigationBar,
						{
							height: bottom,
							backgroundColor: navigationBarBackgroundColor,
						},
					]}
				/>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		borderTopLeftRadius: horizontalScale(16),
		borderTopRightRadius: horizontalScale(16),
		width: "100%",
	},
	image: {
		bottom: -verticalScale(1),
		height: "100%",
		width: "100%",
	},
	imageContainer: {
		bottom: 0,
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
	},
	navigationBar: {
		width: "100%",
		zIndex: 10,
	},
	overlay: {
		alignItems: "flex-end",
		backgroundColor: `${neutral.black}aa`,
		flex: 1,
		justifyContent: "flex-end",
	},
});

export default MicroInteractionImageModal;
