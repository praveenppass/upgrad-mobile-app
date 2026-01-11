import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import SubmissionsList from "@components/asset/task/common/SubmissionsList";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { LinkIcon, PlusLxp, UploadIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, state } = colors;
const { sm, regular, medium } = commonStyles.text;

interface IUploadFileData {
	name: string;
	url: string;
	type?: string;
}

interface IFileUploadSectionProps {
	onUpload: () => void;
	onAddUrl: () => void;
	_canUpload: boolean;
	_canAddUrl: boolean;
	isTaskSubmitTypeUrl: boolean;
	maxLimitReached: boolean;
	urlLimitReached: boolean;
	shouldDisableUploadForUrlOnly: boolean;
	fileValidationError?: { errorMessage: string; errorFile: string } | null;
	showUrlInput: boolean;
	url: string | null;
	onUrlChange: (value: string) => void;
	onUrlSave: () => void;
	uploadTaskEnterUrl?: string | null;
	isUploaded: boolean;
	downloading?: boolean;
	downloadingFileName?: string;
	submissionFileNames: IUploadFileData[];
	onDownload: (fileName?: string) => void;
	onDeleteFile: (fileName: string) => void;
	progressPercent: number;
	uploadFileTitle: string;
	errorMessage?: string | null;
}

const FileUploadSection: React.FC<IFileUploadSectionProps> = ({
	onUpload,
	onAddUrl,
	isTaskSubmitTypeUrl,
	maxLimitReached,
	urlLimitReached,
	shouldDisableUploadForUrlOnly,
	fileValidationError,
	showUrlInput,
	url,
	onUrlChange,
	onUrlSave,
	uploadTaskEnterUrl,
	isUploaded,
	downloading,
	downloadingFileName,
	submissionFileNames,
	onDownload,
	onDeleteFile,
	progressPercent,
	uploadFileTitle,
	errorMessage,
}) => {
	return (
		<View style={styles.uploadContainer}>
			<View style={styles.uploadIconContainer}>
				<UploadIcon />
			</View>

			<RNText style={styles.title} title={strings.UPLOAD_FILE} />

			<View style={styles.btnContainer}>
				<CommonButton
					title={strings.ADD_URL}
					icon={(props) => <PlusLxp {...props} />}
					onPress={onAddUrl}
					variant={
						isTaskSubmitTypeUrl
							? IButtonVariant.Tertiary
							: IButtonVariant.Disabled
					}
					style={[
						styles.btnStyle,
						!isTaskSubmitTypeUrl && styles.disabledOpacity,
					]}
					isDisabled={
						!isTaskSubmitTypeUrl ||
						maxLimitReached ||
						urlLimitReached
					}
					testID="add-url-button"
				/>
				<CommonButton
					title={strings.UPLOAD}
					onPress={onUpload}
					variant={IButtonVariant.Secondary}
					style={[
						styles.btnStyle,
						(maxLimitReached || shouldDisableUploadForUrlOnly) &&
							styles.disabledOpacity,
					]}
					isDisabled={
						maxLimitReached ||
						!!fileValidationError?.errorMessage ||
						shouldDisableUploadForUrlOnly
					}
					testID="upload-file-button"
				/>
			</View>

			{errorMessage ? (
				<RNText style={styles.errorText} title={errorMessage} />
			) : null}
			{isTaskSubmitTypeUrl &&
				showUrlInput &&
				!maxLimitReached &&
				!urlLimitReached && (
					<>
						<View style={styles.urlInputContainer}>
							<LinkIcon color={neutral.grey_07} />
							<RNText style={styles.urlTitle}>
								{strings.ADD_URL}
							</RNText>
						</View>
						<View style={styles.urlInputRow}>
							<TextInput
								style={styles.textInput}
								value={url || ""}
								onChangeText={onUrlChange}
								placeholder={strings.ENTER_URL}
								placeholderTextColor={neutral.grey_06}
								editable={isTaskSubmitTypeUrl}
							/>

							<View style={styles.flex}>
								<CommonButton
									title={strings.SAVE}
									style={styles.saveBtn}
									onPress={onUrlSave}
									variant={IButtonVariant.Primary}
									isDisabled={
										!uploadTaskEnterUrl ||
										!isTaskSubmitTypeUrl
									}
								/>
							</View>
						</View>
					</>
				)}

			<SubmissionsList
				isUploaded={isUploaded}
				downloading={downloading}
				downloadingFileName={downloadingFileName}
				submissionFileNames={submissionFileNames}
				onDownload={onDownload}
				onDeleteFile={onDeleteFile}
				progressPercent={progressPercent}
				fileValidationError={fileValidationError}
			/>

			<RNText style={styles.rulesText}>{uploadFileTitle}</RNText>
		</View>
	);
};

export default FileUploadSection;

const styles = StyleSheet.create({
	btnContainer: {
		flexDirection: "row",
		gap: horizontalScale(10),
		marginBottom: verticalScale(20),
		marginTop: verticalScale(32),
		width: "100%",
	},
	btnStyle: {
		flex: 1,
	},
	disabledOpacity: {
		opacity: 0.5,
	},
	errorText: {
		color: state.error_red,
		...sm,
		...regular,
	},
	flex: {
		flex: 1,
	},
	rulesText: {
		color: neutral.grey_07,
		...sm,
		...regular,
		lineHeight: verticalScale(15),
		marginTop: verticalScale(16),
		textAlign: "left",
		width: "95%",
	},
	saveBtn: {
		borderBottomLeftRadius: 0,
		borderTopLeftRadius: 0,
		marginVertical: 0,
	},
	textInput: {
		backgroundColor: neutral.white,
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 0,
		borderColor: neutral.grey_05,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 0,
		borderWidth: 1,
		color: neutral.black,
		flex: 2,
		padding: horizontalScale(10),
		...sm,
		...regular,
	},
	title: {
		alignSelf: "center",
		color: neutral.black,
		marginTop: verticalScale(10),
		...sm,
		...medium,
		lineHeight: verticalScale(14),
	},
	uploadContainer: {
		alignItems: "center",
		borderColor: neutral.grey_05,
		borderRadius: horizontalScale(4),
		borderWidth: horizontalScale(1),
		justifyContent: "center",
		marginTop: verticalScale(36),
		padding: horizontalScale(16),
	},
	uploadIconContainer: {
		alignSelf: "center",
	},
	urlInputContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(10),
		marginTop: verticalScale(20),
		width: "100%",
	},
	urlInputRow: {
		flexDirection: "row",
		marginHorizontal: horizontalScale(4),
		marginVertical: verticalScale(10),
	},
	urlTitle: {
		color: neutral.grey_07,
		fontWeight: "600",
		lineHeight: verticalScale(14),
		textAlign: "center",
		...sm,
	},
});
