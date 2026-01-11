import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import UploadTaskModal from "@components/asset/task/common/SubmitTaskModal";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { IAssetType } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import DurationIconLxp from "@assets/icons/svg/duration-icon-lxp.svg";
import PercentageIcon from "@assets/icons/svg/percentage-icon.svg";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, cta, bg } = colors;
const { BORDER } = measures;

const { semiBold, sm, regular, bold, md } = commonStyles.text;

interface IUploadFileData {
	name: string;
	url: string;
}

interface IUploadTask {
	marks: string | number;
	duration: string | number;
	upload: () => void;
	uploadUrl: () => void;
	uploadFileTitle: string;
	disabled: boolean;
	loading: boolean;
	uploadLimit: number;
	urlLimit?: number;
	assetType: IAssetType.ASSIGNMENT | IAssetType.PROJECT;
	onModalClose: () => void;
	onSubmit: () => void;
	handleInputChange: (value: string) => void;
	modalVisible: boolean;
	progressPercent: number;
	submissionFileName: IUploadFileData[];
	isUploaded: boolean;
	onDownload: (fileName?: string) => void;
	downloading?: boolean;
	downloadingFileName?: string;
	dueDate: string | null;
	isGroupSubmission?: boolean;
	hardDeadlineDays?: number;
	style?: StyleProp<ViewStyle>;
	isTaskSubmitted?: boolean;
	uploadTaskEnterUrl?: string | null;
	isTaskSubmitTypeUrl?: boolean;
	onDeleteFile: (fileName: string) => void;
	setOpenUploadTaskModal: (value: boolean) => void;
	fileValidationError?: { errorMessage: string; errorFile: string } | null;
	errorMessage?: string | null;
}

interface IUploadTaskSkeleton {
	style?: StyleProp<ViewStyle>;
}

interface IUploadTaskFile {
	isAssignment: boolean;
	uploadFileTitle: string | null;
	disabled: boolean;
	upload: () => void;
	setOpenUploadTaskModal: (value: boolean) => void;
}

const UploadTaskSkeleton = ({ style }: IUploadTaskSkeleton) => {
	return (
		<View style={[styles.uploadContainer, style]}>
			<View style={styles.rowContainer}>
				<Skeleton style={styles.iconStyleOuter} />

				<Skeleton style={styles.text} />
				<Skeleton style={styles.text2} />
			</View>
			<View style={styles.rowContainer2}>
				<Skeleton style={styles.iconStyleOuter} />
				<Skeleton style={styles.text3} />
				<Skeleton style={styles.text4} />
			</View>
			<View style={styles.ctaRow}>
				<Skeleton style={styles.cta} />
				<Skeleton style={styles.ctaText} dark />
			</View>
			<Skeleton style={styles.rowSkeleton1} />
			<Skeleton style={styles.rowSkeleton2} />
			<Skeleton style={styles.rowSkeleton3} />
		</View>
	);
};

const UploadTask: React.FC<IUploadTask> = ({
	marks,
	duration,
	upload,
	uploadFileTitle,
	disabled,
	assetType,
	loading,
	isUploaded,
	modalVisible,
	onDownload,
	onModalClose,
	onSubmit,
	progressPercent,
	submissionFileName,
	downloading,
	uploadLimit,
	urlLimit,
	downloadingFileName,
	dueDate,
	hardDeadlineDays,
	isGroupSubmission,
	style,
	uploadUrl,
	uploadTaskEnterUrl,
	isTaskSubmitTypeUrl,
	isTaskSubmitted,
	handleInputChange,
	setOpenUploadTaskModal,
	onDeleteFile,
	fileValidationError,
	errorMessage,
}) => {
	const isAssignment = assetType === IAssetType.ASSIGNMENT;

	if (loading) return <UploadTaskSkeleton style={style} />;

	return (
		<>
			<View style={[styles.container, style]}>
				<View style={styles.fileTextContainer}>
					<View style={styles.circleStyle}>
						<PercentageIcon />
					</View>
					<RNText style={styles.header} title={`${strings.MARKS} : `}>
						<RNText style={styles.content} title={marks} />
					</RNText>
				</View>
				<View style={styles.fileTextContainer}>
					<View style={styles.circleStyle}>
						<DurationIconLxp />
					</View>

					<RNText
						style={styles.header}
						title={`${strings.DURATION} : `}
					>
						<RNText
							style={styles.content}
							title={`${duration} ${strings.MINS_LEARNING}`}
						/>
					</RNText>
				</View>

				{!isTaskSubmitted ? (
					<UploadTaskFile
						isAssignment={isAssignment}
						setOpenUploadTaskModal={setOpenUploadTaskModal}
						uploadFileTitle={uploadFileTitle}
						disabled={disabled}
						upload={upload}
					/>
				) : (
					<></>
				)}
			</View>

			<UploadTaskModal
				dueDate={dueDate}
				onSubmit={onSubmit}
				isTaskSubmitTypeUrl={isTaskSubmitTypeUrl}
				upload={upload}
				isAssignment={isAssignment}
				url={uploadTaskEnterUrl}
				uploadFileTitle={uploadFileTitle}
				uploadTaskEnterUrl={uploadTaskEnterUrl}
				handleInputChange={handleInputChange}
				uploadUrl={uploadUrl}
				disabled={disabled}
				visible={modalVisible}
				onClose={onModalClose}
				uploadLimit={uploadLimit}
				urlLimit={urlLimit}
				progressPercent={progressPercent}
				submissionFileNames={submissionFileName}
				isUploaded={isUploaded}
				onDeleteFile={onDeleteFile}
				downloading={downloading}
				downloadingFileName={downloadingFileName}
				onDownload={onDownload}
				isGroupSubmission={isGroupSubmission}
				hardDeadlineDays={hardDeadlineDays}
				fileValidationError={fileValidationError}
				errorMessage={errorMessage}
			/>
		</>
	);
};

const UploadTaskFile = ({
	isAssignment,
	uploadFileTitle,
	disabled,
	setOpenUploadTaskModal,
}: IUploadTaskFile) => {
	return (
		<>
			<CommonButton
				title={
					isAssignment
						? strings.UPLOAD_ASSIGNMENT
						: strings.UPLOAD_PROJECT
				}
				onPress={() => setOpenUploadTaskModal(true)}
				variant={IButtonVariant.Primary}
				isDisabled={disabled}
				style={styles.uploadBtn}
			/>

			<RNText
				style={styles.des}
				numberOfLines={4}
				title={uploadFileTitle}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	btn: {
		borderBottomLeftRadius: 0,
		borderTopLeftRadius: 0,
		marginVertical: 0,
	},
	circleStyle: {
		alignItems: "center",
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(15),
		height: verticalScale(22),
		justifyContent: "center",
		width: horizontalScale(22),
	},
	container: {
		justifyContent: "center",
	},
	content: {
		color: cta.text.default_secondary,
		...sm,
		...bold,
		lineHeight: verticalScale(18),
		marginRight: horizontalScale(4),
		textAlign: "center",
	},
	cta: {
		borderRadius: horizontalScale(6),
		height: verticalScale(40),
		width: "100%",
	},
	ctaRow: {
		alignContent: "center",
		alignItems: "center",
		marginTop: verticalScale(20),
	},
	ctaText: {
		alignSelf: "center",
		backgroundColor: bg.fill.bg_default,
		borderRadius: horizontalScale(17),
		height: verticalScale(12),
		marginTop: verticalScale(10),
		position: "absolute",
		width: horizontalScale(128),
	},
	des: {
		alignSelf: "flex-start",
		color: neutral.grey_07,
		...sm,
		paddingHorizontal: horizontalScale(4),
		paddingVertical: verticalScale(8),
		...regular,
		lineHeight: verticalScale(19),
	},
	disabled: {
		backgroundColor: cta.fill.disable,
	},
	fileTextContainer: {
		flexDirection: "row",
		marginTop: verticalScale(6),
	},
	flexView: {
		flex: 1,
	},
	header: {
		color: cta.text.default_secondary,
		...sm,
		...regular,
		lineHeight: verticalScale(18),
		marginLeft: horizontalScale(4),
		textAlign: "center",
	},
	iconStyleOuter: {
		alignContent: "center",
		alignItems: "center",
		borderRadius: horizontalScale(15),
		height: horizontalScale(22),
		width: horizontalScale(22),
	},

	marksTextContainer: {
		flexDirection: "row",
		marginTop: verticalScale(20),
	},
	rowContainer: {
		alignItems: "center",
		flexDirection: "row",
	},
	rowContainer2: {
		alignItems: "center",
		flexDirection: "row",
		marginTop: verticalScale(6),
	},
	rowSkeleton1: {
		borderColor: bg.fill.bg_default,
		borderRadius: horizontalScale(15),
		borderWidth: horizontalScale(1),
		height: verticalScale(10),
		marginTop: verticalScale(6),
		width: horizontalScale(148),
	},
	rowSkeleton2: {
		borderColor: bg.fill.bg_default,
		borderRadius: horizontalScale(15),
		borderWidth: horizontalScale(1),
		height: verticalScale(10),
		marginTop: verticalScale(5),
		width: horizontalScale(283),
	},

	rowSkeleton3: {
		borderColor: bg.fill.bg_default,
		borderRadius: horizontalScale(15),
		borderWidth: horizontalScale(1),
		height: verticalScale(10),
		marginTop: verticalScale(5),
		width: horizontalScale(181),
	},
	submitBtnStyle: {
		borderBottomRightRadius: BORDER.b8,
		borderTopEndRadius: BORDER.b8,
	},
	text: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginLeft: horizontalScale(4),
		width: horizontalScale(22),
	},
	text2: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginLeft: horizontalScale(24),
		width: horizontalScale(12),
	},
	text3: {
		borderRadius: horizontalScale(15),
		height: verticalScale(10),
		marginLeft: horizontalScale(4),
		width: horizontalScale(29),
	},
	text4: {
		borderRadius: horizontalScale(30),
		height: verticalScale(10),
		marginLeft: horizontalScale(24),
		width: horizontalScale(75),
	},
	textContainer: {
		borderRadius: horizontalScale(6),
		justifyContent: "center",
		paddingVertical: verticalScale(10),
	},
	textContainerMarginTop: {
		marginTop: verticalScale(12),
	},

	textWhite: {
		color: cta.text.default_primary,
		...md,
		...semiBold,
		textAlign: "center",
	},
	uploadBtn: {
		marginTop: verticalScale(5),
	},
	uploadContainer: {
		height: verticalScale(154),
		width: horizontalScale(320),
	},
});

export default UploadTask;
