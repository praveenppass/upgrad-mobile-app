import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
	View,
} from "react-native";

import {
	IUploadFile,
	IUploadFileType,
	useUploadController,
} from "@components/Inputs/UploadInput/useUploadController";
import withFormContext from "@components/Inputs/withFormContext";
import CustomButton from "@components/Reusable/Buttons/CustomButton";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { AlertIcon, CancelledIcon } from "@assets/icons";
import { PDFIcon } from "@assets/icons/img";
import {
	ProfileDefaultIcon,
	ResumeUploadIcon,
} from "@assets/icons/svg/studyPlan";

const STRINGS = createStringConstants({
	UPLOAD: "studyPlan.profileSetup.modals.common.upload",
	REPLACE: "studyPlan.profileSetup.modals.common.replace",
	FILE_REQUIREMENTS:
		"studyPlan.profileSetup.modals.resume.fileRequirementsText",
});

const {
	commonStyles: {
		text: { sm, md, regular, semiBold },
	},
	themes,
} = C;
export interface IUploadInputProps extends UseControllerProps {
	label: string;
	fileType: IUploadFileType;
	defaultValue?: IUploadFile;
	isMandatory?: boolean;
	description?: string;
	disabled?: boolean;
	buttonLabel?: string;
	onUploadPress?: () => void;
}

const UploadInput = (props: IUploadInputProps) => {
	const {
		name,
		label,
		rules,
		defaultValue,
		isMandatory,
		description,
		disabled,
		fileType,
		buttonLabel,
		onUploadPress,
	} = props;
	const {
		field,
		fieldState: { error },
	} = useController({ name, rules, defaultValue });

	const { isUploading, handleFileUpload } = useUploadController({
		fileType,
	});

	const handleUpload = async () => {
		if (disabled || isUploading) return;

		if (onUploadPress) {
			onUploadPress();
			return;
		}

		const file = await handleFileUpload();
		if (file) field.onChange(file);
	};

	if (fileType === IUploadFileType.MEDIA) {
		return (
			<View style={styles.profileContainer}>
				<View style={styles.avatarContainer}>
					{field.value?.filePath ? (
						<Image
							source={{ uri: field.value.filePath }}
							style={styles.avatar}
						/>
					) : (
						<View style={styles.avatarPlaceholder}>
							<ProfileDefaultIcon
								width={horizontalScale(50)}
								height={verticalScale(50)}
								color={colors.neutral.grey_08}
							/>
						</View>
					)}

					{isUploading && (
						<View style={styles.loadingOverlay}>
							<ActivityIndicator
								animating
								size="large"
								color={themes.text.navyBlue}
							/>
						</View>
					)}
				</View>

				<RNText style={styles.profileHeading}>
					{label}
					{isMandatory && <RNText style={styles.starTxt}> *</RNText>}
				</RNText>

				{description && (
					<RNText style={styles.profileDescription}>
						{description}
					</RNText>
				)}

				<CustomButton
					title={
						field.value?.filePath
							? getString(STRINGS.REPLACE)
							: buttonLabel || getString(STRINGS.UPLOAD)
					}
					onBtnHandler={handleUpload}
					isDisabled={disabled || isUploading}
					btnStyle={styles.profileUploadButton}
					titleStyle={styles.profileUploadButtonText}
				/>

				{error?.message && (
					<View style={styles.errorContainer}>
						<AlertIcon />
						<RNText style={styles.errorLabel}>
							{error.message}
						</RNText>
					</View>
				)}
			</View>
		);
	}

	return (
		<View style={styles.documentContainer}>
			{field.value?.filePath ? (
				<>
					<View style={styles.documentIconContainerWithFile}>
						<Pressable
							style={styles.closeButton}
							onPress={() => field.onChange(null)}
						>
							<CancelledIcon
								width={horizontalScale(20)}
								height={verticalScale(20)}
							/>
						</Pressable>
						<Image
							source={PDFIcon}
							style={styles.pdfIcon}
							resizeMode="contain"
						/>
					</View>

					<RNText style={styles.documentHeading}>
						{label}
						{isMandatory && (
							<RNText style={styles.starTxt}> *</RNText>
						)}
					</RNText>

					<RNText style={styles.documentDescription}>
						{getString(STRINGS.FILE_REQUIREMENTS)}
					</RNText>

					<CustomButton
						title={getString(STRINGS.REPLACE)}
						onBtnHandler={handleUpload}
						isDisabled={disabled || isUploading}
						btnStyle={styles.replaceButton}
						titleStyle={styles.replaceButtonText}
					/>
				</>
			) : (
				<>
					<View style={styles.documentIconContainer}>
						<ResumeUploadIcon
							color={colors.neutral.black}
							width={horizontalScale(60)}
							height={verticalScale(60)}
						/>
					</View>

					<RNText style={styles.documentHeading}>
						{label}
						{isMandatory && (
							<RNText style={styles.starTxt}> *</RNText>
						)}
					</RNText>

					{description && (
						<RNText style={styles.documentDescription}>
							{description}
						</RNText>
					)}

					<CustomButton
						title={buttonLabel || getString(STRINGS.UPLOAD)}
						onBtnHandler={handleUpload}
						isDisabled={disabled || isUploading}
						btnStyle={styles.profileUploadButton}
						titleStyle={styles.profileUploadButtonText}
					/>
				</>
			)}

			{error?.message && (
				<View style={styles.errorContainer}>
					<AlertIcon />
					<RNText style={styles.errorLabel}>{error.message}</RNText>
				</View>
			)}
		</View>
	);
};

export default withFormContext(UploadInput);

const styles = StyleSheet.create({
	avatar: {
		borderRadius: horizontalScale(60),
		height: "100%",
		width: "100%",
	},
	avatarContainer: {
		alignItems: "center",
		alignSelf: "center",
		height: horizontalScale(120),
		marginBottom: verticalScale(20),
		position: "relative",
		width: horizontalScale(120),
	},
	avatarPlaceholder: {
		alignItems: "center",
		backgroundColor: colors.neutral.grey_03,
		borderRadius: horizontalScale(60),
		height: "100%",
		justifyContent: "center",
		width: "100%",
	},
	closeButton: {
		alignItems: "center",
		backgroundColor: colors.neutral.grey_05,
		borderRadius: horizontalScale(12),
		height: horizontalScale(24),
		justifyContent: "center",
		position: "absolute",
		right: horizontalScale(8),
		top: verticalScale(8),
		width: horizontalScale(24),
		zIndex: 10,
	},
	closeButtonText: {
		color: colors.neutral.white,
		fontSize: horizontalScale(16),
		...semiBold,
	},
	discTxt: {
		color: colors.neutral.grey_07,
		lineHeight: horizontalScale(19),
		marginTop: horizontalScale(5),
		...sm,
		...regular,
	},
	documentContainer: {
		alignItems: "center",
		marginVertical: verticalScale(20),
	},
	documentDescription: {
		color: colors.neutral.grey_07,
		marginBottom: verticalScale(20),
		marginTop: verticalScale(8),
		textAlign: "center",
		...regular,
		...sm,
	},
	documentHeading: {
		color: colors.neutral.black,
		marginBottom: verticalScale(8),
		textAlign: "center",
		...semiBold,
		...md,
	},
	documentIconContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: verticalScale(20),
	},
	documentIconContainerWithFile: {
		alignItems: "center",
		backgroundColor: colors.neutral.grey_03,
		borderColor: colors.neutral.grey_05,
		borderRadius: horizontalScale(12),
		borderWidth: horizontalScale(1),
		justifyContent: "center",
		marginBottom: verticalScale(20),
		paddingHorizontal: horizontalScale(50),
		paddingVertical: verticalScale(30),
		position: "relative",
	},
	documentUploadButton: {
		alignItems: "center",
		backgroundColor: colors.state.error_red,
		borderRadius: horizontalScale(8),
		justifyContent: "center",
		paddingVertical: verticalScale(14),
		width: horizontalScale(200),
	},
	documentUploadButtonText: {
		color: colors.neutral.white,
		...semiBold,
		...md,
	},
	errorContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: verticalScale(5),
		marginTop: verticalScale(5),
	},
	errorInput: {
		borderColor: colors.state.error_red,
	},
	errorLabel: {
		color: colors.state.error_red,
		...regular,
		...sm,
	},
	inputTxt: {
		color: colors.neutral.grey_07,
		flex: 9,
		...md,
		...regular,
		paddingVertical: verticalScale(5),
	},
	inputView: {
		alignItems: "center",
		borderColor: colors.neutral.grey_05,
		borderRadius: horizontalScale(6),
		borderWidth: horizontalScale(1),
		color: colors.neutral.grey_07,
		flexDirection: "row",
		gap: horizontalScale(10),
		height: horizontalScale(48),
		paddingLeft: horizontalScale(10),
	},
	inputViewContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(5),
		marginRight: horizontalScale(10),
	},
	label: {
		color: colors.neutral.black,
		...md,
		...semiBold,
		marginBottom: verticalScale(15),
	},
	loadingOverlay: {
		alignItems: "center",
		backgroundColor: colors.neutral.white,
		borderRadius: horizontalScale(60),
		bottom: 0,
		justifyContent: "center",
		left: 0,
		opacity: 0.8,
		position: "absolute",
		right: 0,
		top: 0,
	},
	pdfIcon: {
		height: verticalScale(60),
		width: horizontalScale(60),
	},
	profileContainer: {
		alignItems: "center",
		marginVertical: verticalScale(20),
	},
	profileDescription: {
		color: colors.neutral.grey_07,
		marginBottom: verticalScale(20),
		marginTop: verticalScale(8),
		textAlign: "center",
		...regular,
		...sm,
	},
	profileHeading: {
		color: colors.neutral.black,
		textAlign: "center",
		...semiBold,
		...md,
	},
	profileUploadButton: {
		borderRadius: horizontalScale(8),
		width: horizontalScale(170),
	},
	profileUploadButtonText: {
		...semiBold,
		...md,
	},
	replaceButton: {
		backgroundColor: colors.state.error_red,
		borderRadius: horizontalScale(8),
		width: horizontalScale(200),
	},
	replaceButtonText: {
		color: colors.neutral.white,
		...semiBold,
		...md,
	},
	resumeUploadText: {
		...semiBold,
		color: colors.neutral.black,
		lineHeight: verticalScale(21),
	},
	starTxt: {
		...md,
		...semiBold,
		color: colors.state.error_red,
	},
	txtContainer: {
		flexDirection: "row",
		gap: verticalScale(5),
	},
	uploadButtonDisabled: {
		opacity: 0.5,
	},
	uploadResume: {
		alignItems: "center",
		borderColor: colors.neutral.black,
		borderRadius: measures.BORDER.b10,
		borderWidth: 1,
		flexDirection: "row",
		gap: horizontalScale(8),
		justifyContent: "center",
		paddingVertical: verticalScale(8),
		width: horizontalScale(150),
	},
	uploadView: {
		flexDirection: "row",
		gap: horizontalScale(10),
	},
	viewButton: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(5),
		marginTop: verticalScale(10),
	},
	viewButtonText: {
		borderBottomWidth: verticalScale(1),
		color: colors.neutral.black,
		...semiBold,
	},
	viewTxt: {
		color: colors.neutral.black,
		...semiBold,
		borderBottomWidth: verticalScale(1),
	},
});
