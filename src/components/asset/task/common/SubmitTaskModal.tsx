import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import FileUploadSection from "@components/asset/task/common/FileUploadSection";
import TaskSubmissionHeader from "@components/asset/task/common/TaskSubmissionHeader";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import CustomCheckbox from "@components/Reusable/CustomCheckbox";
import RNText from "@components/Reusable/RNText";

import { verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { sm, regular } = commonStyles.text;

interface IUploadFileData {
	name: string;
	url: string;
	type?: string;
}

interface IUploadTaskModal {
	onClose: () => void;
	onSubmit: () => void;
	upload: () => void;
	visible: boolean;
	progressPercent: number;
	submissionFileNames: IUploadFileData[];
	isUploaded: boolean;
	onDownload: (fileName?: string) => void;
	downloading?: boolean;
	downloadingFileName?: string;
	dueDate?: string | null;
	uploadFileTitle: string;
	isGroupSubmission?: boolean;
	hardDeadlineDays?: number;
	isTaskSubmitTypeUrl?: boolean;
	uploadTaskEnterUrl?: string | null;
	handleInputChange: (value: string) => void;
	uploadUrl: () => void;
	uploadLimit: number;
	urlLimit?: number;
	disabled?: boolean;
	isAssignment: boolean;
	onDeleteFile: (fileName: string) => void;
	url: string | null;
	fileValidationError?: { errorMessage: string; errorFile: string } | null;
	errorMessage?: string | null;
}

const UploadTaskModal: React.FC<IUploadTaskModal> = ({
	onClose,
	upload,
	uploadLimit,
	urlLimit,
	onSubmit,
	visible,
	progressPercent,
	submissionFileNames,
	isUploaded,
	uploadFileTitle,
	onDownload,
	downloading,
	downloadingFileName,
	dueDate,
	isGroupSubmission,
	hardDeadlineDays,
	isTaskSubmitTypeUrl,
	uploadTaskEnterUrl,
	handleInputChange,
	uploadUrl,
	isAssignment,
	onDeleteFile,
	url,
	fileValidationError,
	errorMessage,
}) => {
	const [checked, setChecked] = React.useState(false);
	const [showUrlInput, setShowUrlInput] = React.useState(false);

	const handleAddUrl = () => setShowUrlInput(true);

	const handleClose = () => {
		setShowUrlInput(false);
		onClose();
	};

	const maxLimitReached = submissionFileNames.length === uploadLimit;

	const urlCount = submissionFileNames.filter(
		(file) => file.type === "url",
	).length;

	const urlLimitReached = urlLimit !== undefined && urlCount >= urlLimit;

	const isUrlOnlySubmission =
		(isTaskSubmitTypeUrl ?? false) &&
		urlLimit !== undefined &&
		uploadLimit === urlLimit;

	const shouldDisableUploadForUrlOnly = isUrlOnlySubmission;

	const handleUrlSave = () => {
		if (uploadTaskEnterUrl) {
			uploadUrl();
			const newUrlCount = urlCount + 1;
			if (urlLimit && newUrlCount >= urlLimit) {
				setShowUrlInput(false);
			}
		}
	};

	return (
		<ActionModal
			isOpen={visible}
			closeModal={handleClose}
			onBackPress={handleClose}
			disableCloseOnSwipeDown
		>
			<ScrollView
				style={styles.modalContainer}
				showsVerticalScrollIndicator={false}
			>
				<Pressable>
					<TaskSubmissionHeader
						title={
							isAssignment
								? strings.UPLOAD_ASSIGNMENT
								: strings.UPLOAD_PROJECT
						}
						dueDate={dueDate}
						hardDeadlineDays={hardDeadlineDays}
					/>

					<FileUploadSection
						onUpload={() => upload?.()}
						onAddUrl={handleAddUrl}
						_canUpload={
							submissionFileNames.length < uploadLimit &&
							!isUrlOnlySubmission
						}
						_canAddUrl={
							(isTaskSubmitTypeUrl ?? false) &&
							!maxLimitReached &&
							!urlLimitReached
						}
						isTaskSubmitTypeUrl={isTaskSubmitTypeUrl ?? false}
						maxLimitReached={maxLimitReached}
						urlLimitReached={urlLimitReached ?? false}
						shouldDisableUploadForUrlOnly={
							shouldDisableUploadForUrlOnly
						}
						fileValidationError={fileValidationError}
						showUrlInput={showUrlInput}
						url={url}
						onUrlChange={handleInputChange}
						onUrlSave={handleUrlSave}
						uploadTaskEnterUrl={uploadTaskEnterUrl}
						isUploaded={isUploaded}
						downloading={downloading}
						downloadingFileName={downloadingFileName}
						submissionFileNames={submissionFileNames}
						onDownload={onDownload}
						onDeleteFile={onDeleteFile}
						progressPercent={progressPercent}
						uploadFileTitle={uploadFileTitle}
						errorMessage={errorMessage}
					/>

					{submissionFileNames.length > 0 && (
						<RNText
							style={styles.des}
							title={strings.UPLOADED_FILE_WILL}
						/>
					)}

					<CustomCheckbox
						label={
							isGroupSubmission
								? strings.ACKNOWLEDGE_GROUP
								: strings.ACKNOWLEDGE_INDIVIDUAL
						}
						isChecked={checked}
						setIsChecked={setChecked}
					/>
					<View style={styles.submitBtnContainer}>
						<CommonButton
							title={strings.SUBMIT}
							onPress={() => {
								if (checked) onSubmit();
							}}
							variant={IButtonVariant.Secondary}
							style={styles.submitBtn}
							isDisabled={
								submissionFileNames.length !== uploadLimit ||
								!checked
							}
						/>
					</View>
				</Pressable>
			</ScrollView>
		</ActionModal>
	);
};

export default UploadTaskModal;

const styles = StyleSheet.create({
	des: {
		color: neutral.grey_06,
		...sm,
		...regular,
		lineHeight: verticalScale(15),
		marginTop: verticalScale(10),
		textAlign: "left",
	},
	modalContainer: {
		height: verticalScale(700),
	},
	submitBtn: {
		alignSelf: "center",
		width: "100%",
	},
	submitBtnContainer: {
		width: "100%",
	},
});
