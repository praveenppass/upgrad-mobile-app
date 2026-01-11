import React, { memo, useMemo } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import useFileUploadModalController from "@screens/Home/MyProfile/ProfileMethods/ParseResumeModal/useParseResumeModalController";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { CancelledIcon } from "@assets/icons";
import { PDFIcon } from "@assets/icons/img";
import { UploadResumeIcon } from "@assets/icons/svg/studyPlan";
import { commonStyles } from "@assets/styles";

const { reg, sm, md, regular, semiBold, bold, lightBold } = commonStyles.text;
const { neutral, highlight, state } = colors;

const STRINGS = createStringConstants({
	fileModalTitle: "studyPlan.profileSetup.modals.resume.title",
	fileModalProfileImageTitle:
		"studyPlan.profileSetup.modals.photo.title",
	fileModalContinue:
		"studyPlan.profileSetup.modals.common.continue",
	fileModalSelectFile:
		"studyPlan.profileSetup.modals.common.selectFile",
	fileModalFileRequirements:
		"studyPlan.profileSetup.modals.resume.fileRequirementsText",
	fileModalProfileImageRequirements:
		"studyPlan.profileSetup.modals.photo.profileImageRequirementsText",
	fileModalProfileImageError:
		"studyPlan.profileSetup.modals.photo.profileImageErrorText",
});

export enum IFileUploadModalType {
	RESUME,
	PROFILE_IMAGE,
}

export interface IUploadedFileData {
	fileName: string;
	filePath: string;
	uploadedAt: string;
}

interface IFileUploadModal {
	isModalVisible: boolean;
	setIsModalVisible: (visible: boolean) => void;
	modalType: IFileUploadModalType;
	onParseFileStatusChange?: (status: IParseFileStatus) => void;
	skipParsing?: boolean;
	onFileUploaded?: (fileData: IUploadedFileData) => void;
}

interface IUploadedFile {
	isError: boolean;
	clearSelectedFile: () => void;
	modalType: IFileUploadModalType;
	imageUri?: string;
}

interface IFileUploadArea {
	onSelectFile: () => void;
	modalType: IFileUploadModalType;
}

export enum IParseFileStatus {
	IDLE,
	LOADING,
	COMPLETED,
}

const FileUploadModal = ({
	isModalVisible,
	setIsModalVisible,
	modalType,
	onParseFileStatusChange,
	skipParsing = false,
	onFileUploaded,
}: IFileUploadModal) => {
	const {
		isError,
		handleModalClose,
		handleFileSelection,
		clearSelectedFile,
		submitFile,
		isFileSelected,
		selectedImage,
		handleImageSelection,
	} = useFileUploadModalController({
		isModalVisible,
		setIsModalVisible,
		onParseFileStatusChange,
		skipParsing,
		onFileUploaded,
		modalType,
	});

	const isFileOrError = useMemo(() => {
		return isFileSelected || isError || selectedImage;
	}, [isFileSelected, isError, selectedImage]);

	const modalTitle = useMemo(() => {
		return modalType === IFileUploadModalType.PROFILE_IMAGE
			? getString(STRINGS.fileModalProfileImageTitle)
			: getString(STRINGS.fileModalTitle);
	}, [modalType]);

	return (
		<ActionModal
			isOpen={isModalVisible}
			onBackPress={handleModalClose}
			closeModal={handleModalClose}
			style={styles.fileModalContainer}
		>
			<View style={styles.fileModalContent}>
				<RNText title={modalTitle} style={styles.fileModalTitle} />

				{isFileOrError ? (
					<MemoizedUploadedFile
						isError={isError}
						clearSelectedFile={clearSelectedFile}
						modalType={modalType}
						imageUri={selectedImage?.uri}
					/>
				) : (
					<MemoizedFileUploadArea
						onSelectFile={
							modalType === IFileUploadModalType.RESUME
								? handleFileSelection
								: handleImageSelection
						}
						modalType={modalType}
					/>
				)}

				{isError && modalType === IFileUploadModalType.RESUME && (
					<RNText
						title={getString(STRINGS.fileModalFileRequirements)}
						style={styles.errorText}
					/>
				)}

				{isError &&
					modalType === IFileUploadModalType.PROFILE_IMAGE && (
						<RNText
							title={getString(
								STRINGS.fileModalProfileImageError,
							)}
							style={styles.errorText}
						/>
					)}

				<CommonButton
					title={getString(STRINGS.fileModalContinue)}
					variant={IButtonVariant.Primary}
					onPress={submitFile}
					style={styles.fileContinueButton}
					isDisabled={isError || (!isFileSelected && !selectedImage)}
				/>
			</View>
		</ActionModal>
	);
};

export default memo(FileUploadModal);

const UploadedFile = ({
	isError,
	clearSelectedFile,
	modalType,
	imageUri,
}: IUploadedFile) => (
	<Pressable style={styles.fileUploadArea} onPress={clearSelectedFile}>
		<View
			style={[
				styles.fileIconContainer,
				modalType === IFileUploadModalType.PROFILE_IMAGE &&
					styles.imagePreviewContainer,
				isError && styles.errorIconContainer,
			]}
		>
			<CancelledIcon
				width={horizontalScale(20)}
				height={verticalScale(20)}
				style={styles.cancelledIcon}
				color={neutral.grey_05}
			/>
			{modalType === IFileUploadModalType.PROFILE_IMAGE && imageUri ? (
				<Image
					source={{ uri: imageUri }}
					style={styles.imagePreview}
					resizeMode="cover"
				/>
			) : (
				<Image
					source={PDFIcon}
					style={styles.fileIcon}
					resizeMode="contain"
				/>
			)}
		</View>
	</Pressable>
);

const MemoizedUploadedFile = memo(UploadedFile);

const FileUploadArea = ({ onSelectFile, modalType }: IFileUploadArea) => {
	const fileRequirementsText =
		modalType === IFileUploadModalType.PROFILE_IMAGE
			? getString(STRINGS.fileModalProfileImageRequirements)
			: getString(STRINGS.fileModalFileRequirements);

	return (
		<Pressable
			style={({ pressed }) => [
				styles.fileUploadArea,
				{
					transform: [{ scale: pressed ? 0.98 : 1 }],
					backgroundColor: pressed
						? neutral.grey_04
						: neutral.grey_03,
				},
			]}
			onPress={onSelectFile}
		>
			<UploadResumeIcon
				width={horizontalScale(64)}
				height={verticalScale(64)}
			/>

			<RNText
				title={getString(STRINGS.fileModalSelectFile)}
				style={styles.fileUploadSelectFile}
			/>
			<RNText
				title={fileRequirementsText}
				style={styles.fileUploadSubtext}
			/>
		</Pressable>
	);
};

const MemoizedFileUploadArea = memo(FileUploadArea);

const styles = StyleSheet.create({
	cancelledIcon: {
		position: "absolute",
		right: horizontalScale(8),
		top: verticalScale(8),
		zIndex: 10,
	},
	errorIconContainer: {
		borderColor: state.error_red,
	},
	errorText: {
		...sm,
		...regular,
		color: state.error_red,
		lineHeight: verticalScale(18),
		marginTop: verticalScale(8),
		paddingHorizontal: horizontalScale(10),
		textAlign: "center",
	},
	fileContinueButton: {
		marginTop: verticalScale(24),
	},
	fileIcon: {
		height: verticalScale(60),
		width: horizontalScale(60),
	},
	fileIconContainer: {
		backgroundColor: highlight.bg_blue,
		borderColor: neutral.grey_06,
		borderRadius: horizontalScale(12),
		borderWidth: horizontalScale(1),
		paddingHorizontal: verticalScale(52),
		paddingVertical: verticalScale(34),
	},
	fileModalContainer: {
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(0),
	},
	fileModalContent: {
		paddingBottom: verticalScale(20),
		paddingTop: verticalScale(24),
	},
	fileModalTitle: {
		...reg,
		...semiBold,
		color: neutral.black,
		textAlign: "center",
	},
	fileUploadArea: {
		alignItems: "center",
		backgroundColor: neutral.grey_03,
		borderRadius: horizontalScale(12),
		marginTop: verticalScale(24),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(40),
	},
	fileUploadSelectFile: {
		...md,
		...bold,
		color: neutral.black,
		textDecorationLine: "underline",
	},
	fileUploadSubtext: {
		...sm,
		...regular,
		color: neutral.grey_07,
		marginTop: verticalScale(8),
		textAlign: "center",
	},
	fileUploadText: {
		...md,
		...lightBold,
		color: neutral.black,
		marginTop: verticalScale(16),
		textAlign: "center",
	},
	imagePreview: {
		borderRadius: horizontalScale(8),
		height: "100%",
		width: "100%",
	},
	imagePreviewContainer: {
		height: verticalScale(130),
		paddingHorizontal: 0,
		paddingVertical: 0,
		width: horizontalScale(165),
	},
});
