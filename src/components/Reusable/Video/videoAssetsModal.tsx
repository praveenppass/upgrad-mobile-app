import React from "react";
import { Modal, SafeAreaView, StyleSheet, View } from "react-native";

import ClassOpinion from "@components/asset/classOpinion/ClassOpinion";
import CustomButton from "@components/Reusable/Buttons/CustomButton";
import InVideoRecallQuiz from "@components/Reusable/InVideoAssets/InVideoRecallQuiz";
import RNText from "@components/Reusable/RNText";

import { moderateScale, verticalScale } from "@utils/functions";

import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const {
	text: { reg, bold },
} = commonStyles;
interface AssetData {
	input: {
		recallQuiz?: string | null;
		meta: {
			asset: string;
			user: string;
			course?: string | null;
			userCourse?: string | null;
			program?: string | null;
			userProgram?: string | null;
			workshop: string | null;
			learnerCourse: string;
			deliveryType: string;
		};
	};
	isScreenModel: boolean;
	assetType: string;
	learningPathType: string;
	parentAssetCode: string;
	assetName: string;
	status: string;
	question?: string | undefined;
}

interface VideoAssetsModalProps {
	closeModal: (response?: string) => void;
	closeVideoNewModal: () => void;
	assetData: AssetData;
	isFullscreen: boolean;
	onBackPress: () => void;
}

const VideoAssetsModal: React.FC<VideoAssetsModalProps> = ({
	closeModal,
	assetData,
	closeVideoNewModal,
	isFullscreen,
	onBackPress,
}) => {
	const componentMap: Record<string, () => JSX.Element> = {
		[IAssetType.CLASS_OPINION]: () => (
			<ClassOpinion modalPageData={assetData} closeModal={closeModal} />
		),
		[IAssetType.RECALL_QUIZ]: () => (
			<InVideoRecallQuiz
				props={{ ...assetData }}
				closeModal={closeModal}
			/>
		),
	};
	const isCompleted = assetData?.status === IAssetStatusEnum.completed;

	const goBackHome = () => {
		if (!isCompleted) {
			onBackPress();
		}
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={assetData?.isScreenModel}
			onRequestClose={goBackHome}
			supportedOrientations={["portrait", "landscape"]}
		>
			<SafeAreaView style={styles.centeredView}>
				<View
					style={[
						styles.modalView,
						{ height: isFullscreen ? "90%" : "97%" },
					]}
				>
					<View style={styles.headerTitle}>
						<RNText
							title={assetData?.assetName}
							style={styles.titleStyle}
							numberOfLines={1}
						/>
						{isCompleted && (
							<CustomButton
								title="Skip"
								btnStyle={styles.exitButton}
								onBtnHandler={closeVideoNewModal}
							/>
						)}
					</View>

					{componentMap[assetData?.assetType]
						? componentMap[assetData?.assetType]()
						: null}
				</View>
			</SafeAreaView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		alignItems: "center",
		backgroundColor: neutral.black,
		flex: 1,
		justifyContent: "center",
	},
	exitButton: {
		borderRadius: moderateScale(15),
		paddingVertical: moderateScale(5),
	},
	headerTitle: {
		backgroundColor: neutral.white,
		borderTopLeftRadius: verticalScale(20),
		borderTopRightRadius: verticalScale(20),
		elevation: 6,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(10),
		paddingHorizontal: verticalScale(15),
		paddingVertical: verticalScale(10),
		shadowColor: neutral.black,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	modalView: {
		backgroundColor: neutral.white,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		bottom: -20,
		margin: 20,
		position: "absolute",
		width: "100%",
	},
	titleStyle: {
		...reg,
		...bold,
		alignSelf: "center",
		color: neutral.black,
		width: "85%",
	},
});

export default VideoAssetsModal;
