import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";
import ScreenWrapper from "@components/Reusable/ScreenWrapper";

import { horizontalScale, verticalScale } from "@utils/functions";

import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";
import { RootNavParamsList } from "@interface/types/rootStack.type";

import { colors } from "@assets/colors";
import { CloseIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { xlg } = commonStyles.text;

const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const BodyComponent = () => {
	const { goBack } = useNavigation<RootNavParamsList>();

	const route = useRoute<RootHomeStackRouteProps<"ImageViewScreen">>();
	const { file } = route.params;

	const isSupportedImage =
		file?.contentType &&
		file?.fileUrl &&
		SUPPORTED_IMAGE_TYPES.includes(file.contentType);

	return (
		<ScreenWrapper style={styles.rootStyle}>
			{isSupportedImage ? (
				<>
					<Pressable
						onPress={goBack}
						style={styles.closeIconContainer}
					>
						<CloseIcon
							color={colors.neutral.black}
							height={verticalScale(20)}
							width={horizontalScale(20)}
							style={styles.iconStyle}
						/>
					</Pressable>

					<ImageViewer
						backgroundColor={colors.neutral.white}
						loadingRender={() => <Loading />}
						imageUrls={[{ url: file.fileUrl }]}
						useNativeDriver
					/>
				</>
			) : (
				<View style={styles.notSupportedView}>
					<RNText style={xlg} title="Not Supported" />
				</View>
			)}
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	closeIconContainer: {
		alignItems: "center",
		height: verticalScale(40),
		justifyContent: "center",
		position: "absolute",
		right: 0,
		top: 0,
		width: horizontalScale(40),
		zIndex: 2,
	},
	iconStyle: {
		alignSelf: "flex-end",
		margin: verticalScale(20),
	},
	notSupportedView: {
		alignItems: "center",
		justifyContent: "center",
	},
	rootStyle: {
		flex: 1,
	},
});

export default memo(BodyComponent);
