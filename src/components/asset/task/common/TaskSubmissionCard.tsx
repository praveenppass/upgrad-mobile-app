import { useNavigation } from "@react-navigation/native";
import moment from "moment-timezone";
import React, { useState } from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import ReEvaluationModal from "@components/asset/task/common/ReEvaluationModal";
import CustomButton from "@components/Reusable/Buttons/CustomButton";
import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";
import ViewOnDesktopModal from "@components/Reusable/ViewOnDesktopModal";

import useGetTimezone from "@hooks/useGetTimezone";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import { formatDateByTime } from "@utils/timezoneHelper";

import { IDateFormat } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";
import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { colors } from "@assets/colors";
import {
	AttachedPinGrayIcon,
	CompletedIcon,
	DownloadIcon,
	LinkIcon,
	LinkingUrlLxp,
	PdfIconLxp,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const ICON_DIMENSIONS = {
	width: horizontalScale(14),
	height: verticalScale(14),
};

enum FileTypeEnum {
	URL = "url",
	LINK = "link",
	PDF = "pdf",
	FILE = "file",
}

enum SubmissionTypeEnum {
	URL_ONLY = "url-only",
	FILE_ONLY = "file-only",
	MIXED = "mixed",
}

const { cta, neutral } = colors;

const { sm, regular, bold, md } = commonStyles.text;

const isUrlOrFile = (answerFiles: { name: string; url: string }[]) => {
	const isLink = (name: string) =>
		name === "URL" ||
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(name) ||
		/^(https?:\/\/|www\.)/i.test(name);

	return answerFiles.map((file) => ({
		...file,
		type: isLink(file.name) ? FileTypeEnum.LINK : FileTypeEnum.FILE,
	}));
};

const getFileIcon = (fileName: string, fileType?: string) => {
	const iconProps = {
		style: styles.pdfStyle,
		...ICON_DIMENSIONS,
	};

	if (fileType === FileTypeEnum.URL || fileType === FileTypeEnum.LINK) {
		return <LinkIcon color={neutral.black} {...iconProps} />;
	}

	const extension = fileName?.split(".").pop()?.toLowerCase();

	if (extension === FileTypeEnum.PDF) {
		return <PdfIconLxp {...iconProps} />;
	}

	return <AttachedPinGrayIcon color={neutral.black} {...iconProps} />;
};

interface IUploadUrlProps {
	title: { name: string; url: string }[];
}

interface IUploadTaskProps {
	title: { name: string; url: string }[];
	downloading?: boolean;
	downloadingFileName?: string;
	download: (fileName?: string) => void;
}
interface ITaskSubmissionCard {
	title: { name: string; url: string }[];
	submittedBy: string | null;
	download: (fileName?: string) => void;
	submittedDate: string;
	downloading?: boolean;
	downloadingFileName?: string;
	submitUrl: boolean;
	taskSubmissionType?: SubmissionTypeEnum;
	style?: StyleProp<ViewStyle>;
	evaluationReport?: {
		score: number | null;
		percentage: number | null;
		attemptScore: number | null;
		proficiencyPercentage: number | null;
		classAvgProficiencyPercentage: number | null;
	} | null;
	isResubmissionButtonVisible: boolean;
	requestedReEvaluationDate?: string | null;
	learnerRevaluationRequestDate: number | null;
	handleEvaluationSubmit: (val: string) => void;
	isRevaluationCompleted: boolean;
	isEvaluationCompleted: boolean;
	assetType: IAssetType.ASSIGNMENT | IAssetType.PROJECT;
	isRevaluationBtnVisible: boolean;
	showSubmissionReview: boolean;
	onResubmit: () => void;
	evaluationStatus: string | null;
	isResubmit: boolean;
	hardDeadlineDays: number;
}

const TaskSubmissionCard: React.FC<ITaskSubmissionCard> = ({
	title,
	assetType,
	download,
	submittedBy,
	submittedDate,
	downloading,
	downloadingFileName,
	style,
	evaluationReport,
	requestedReEvaluationDate,
	learnerRevaluationRequestDate,
	handleEvaluationSubmit,
	isRevaluationCompleted,
	isEvaluationCompleted,
	isRevaluationBtnVisible,
	showSubmissionReview,
	evaluationStatus,
	submitUrl: _submitUrl,
	taskSubmissionType,
	onResubmit,
	isResubmissionButtonVisible,
}) => {
	const { name: userTimezone } = useGetTimezone();
	const [openViewDesktopModal, setOpenViewDesktopModal] = useState(false);
	const [openEvaluationModal, setopenEvaluationModal] = useState(false);
	const resubmitButtonTitle =
		assetType === IAssetType.ASSIGNMENT
			? strings.RESUBMIT_ASSIGNMENT
			: strings.RESUBMIT_PROJECT;

	const handleEvaluationClick = (value: boolean) => {
		setopenEvaluationModal(value);
	};

	const handleModal = (value: boolean) => {
		setOpenViewDesktopModal(value);
	};

	const handleShowModal = () => {
		handleModal(true);
	};

	const isSubmissionReviewVisible =
		showSubmissionReview && evaluationStatus === null;

	const uploadFileSubmissionDate = submittedDate
		? `${formatDateByTime(`${submittedDate}`, IDateFormat.dateWithTime)}`
		: "";

	const revaluationDate = moment(submittedDate).tz(userTimezone);

	const extendedDate = revaluationDate.add(
		learnerRevaluationRequestDate ?? 0,
		"days",
	);

	const revaluationReportDate = `${formatDateByTime(`${extendedDate.toISOString()}`, IDateFormat.dateWithTime)}`;
	const requestReEvaluationDate = `${formatDateByTime(`${requestedReEvaluationDate}`, IDateFormat.dateWithTime)}`;

	const classifiedFiles = isUrlOrFile(title);

	const linkItems = classifiedFiles.filter(
		(item) => item.type === FileTypeEnum.LINK,
	);
	const fileItems = classifiedFiles.filter(
		(item) => item.type === FileTypeEnum.FILE,
	);

	const renderSubmitComponent = () => {
		if (taskSubmissionType === SubmissionTypeEnum.MIXED) {
			return (
				<>
					{fileItems.length > 0 && (
						<SubmitTaskComponent
							title={fileItems}
							downloading={downloading}
							downloadingFileName={downloadingFileName}
							download={download}
						/>
					)}
					{linkItems.length > 0 && (
						<SubmitUrlComponent title={linkItems} />
					)}
				</>
			);
		}

		if (taskSubmissionType === SubmissionTypeEnum.URL_ONLY) {
			return <SubmitUrlComponent title={title} />;
		}

		if (taskSubmissionType === SubmissionTypeEnum.FILE_ONLY) {
			return (
				<SubmitTaskComponent
					title={title}
					downloading={downloading}
					downloadingFileName={downloadingFileName}
					download={download}
				/>
			);
		}

		return null;
	};

	return (
		<>
			<View style={[styles.container, style]}>
				<View style={styles.fileTextContainer}>
					{renderSubmitComponent()}
				</View>

				{submittedBy ? (
					<View style={styles.rowContainer}>
						<RNText
							style={styles.header}
							title={strings.SUBMITTED_BY}
						>
							<RNText
								style={styles.content}
								title={submittedBy}
							/>
						</RNText>
					</View>
				) : null}

				{submittedDate ? (
					<View style={styles.rowContainer}>
						<RNText
							style={styles.header}
							title={strings.SUBMITTED_ON}
						>
							{" "}
							<RNText
								style={styles.content}
								title={uploadFileSubmissionDate}
							/>
						</RNText>
					</View>
				) : null}

				{isRevaluationCompleted ? (
					<View style={styles.rowContainer}>
						<RNText
							style={styles.header}
							title={strings.RE_EVALUATION_COMPLETED}
						/>

						<CompletedIcon />
					</View>
				) : null}

				{isEvaluationCompleted && !isRevaluationCompleted ? (
					<View style={styles.rowContainer}>
						<RNText
							style={styles.header}
							title={strings.EVALUATION_COMPLETED}
						/>

						<CompletedIcon />
					</View>
				) : null}

				{requestedReEvaluationDate && !isRevaluationCompleted ? (
					<View style={styles.rowContainer}>
						<RNText
							style={styles.header}
							title={`${strings.RE_EVALUATION_REQUEST_SENT_ON} `}
						>
							<RNText
								style={styles.content}
								title={requestReEvaluationDate}
							/>
						</RNText>
					</View>
				) : null}

				{isResubmissionButtonVisible ? (
					<CustomButton
						title={resubmitButtonTitle}
						onBtnHandler={() => onResubmit()}
						btnStyle={[styles.reportBtn]}
					/>
				) : null}

				{evaluationReport ? (
					<CustomButton
						title={strings.VIEW_REPORT}
						onBtnHandler={handleShowModal}
						btnStyle={[styles.reportBtn]}
					/>
				) : null}

				{isRevaluationBtnVisible ? (
					<View style={styles.evaluationContainer}>
						<View style={styles.evaluationSubContainer}>
							<RNText
								style={styles.workTxt}
								title={
									strings.WANT_YOUR_WORK_TO_BE_REVIEWED_AGAIN
								}
							/>
						</View>
						<View style={styles.rowContainer}>
							<RNText
								style={styles.evaluationHeader}
								title={strings.REQUEST_RE_EVALUATION}
								onPress={() => {
									handleEvaluationClick(true);
								}}
							/>

							<RNText
								style={styles.evaluationDescription}
								title={revaluationReportDate}
							/>
						</View>
					</View>
				) : null}

				{isSubmissionReviewVisible ? (
					<View style={styles.rowContainer}>
						<RNText
							style={styles.reviewLine}
							title={strings.SUBMISSION_UNDER_REVIEW}
						/>
					</View>
				) : null}

				<ViewOnDesktopModal
					showModal={openViewDesktopModal}
					setShowModal={setOpenViewDesktopModal}
				/>

				<ReEvaluationModal
					showModal={openEvaluationModal}
					setShowModal={setopenEvaluationModal}
					handleEvaluationSubmit={handleEvaluationSubmit}
				/>
			</View>
		</>
	);
};

const SubmitUrlComponent = ({ title }: IUploadUrlProps) => {
	const { navigate } = useNavigation<RootHomeStackList>();

	return (
		<>
			{title?.map((item, index) => {
				const key = `${item?.url ?? item?.name}-${index}`;
				const displayText =
					item?.name === "URL" ? item?.url : item?.name;

				return (
					<View
						key={key}
						style={[
							styles.fileRow,
							index > 0 && { marginTop: verticalScale(5) },
						]}
					>
						{getFileIcon(item?.name, FileTypeEnum.URL)}

						<RNText
							numberOfLines={2}
							style={styles.subTitle}
							title={displayText}
						/>

						<Pressable
							onPress={() =>
								navigate("WebViewModal", {
									name: item?.name,
									url: item?.url,
								})
							}
							style={styles.downloadCta}
						>
							<LinkingUrlLxp
								height={verticalScale(16)}
								width={horizontalScale(16)}
							/>
						</Pressable>
					</View>
				);
			})}
		</>
	);
};

const SubmitTaskComponent = ({
	title,
	downloading,
	downloadingFileName,
	download,
}: IUploadTaskProps) => {
	return (
		<>
			{title?.map((item, index) => {
				const isDownloading =
					downloading && downloadingFileName === item?.name;

				return (
					<View
						key={item?.name ?? index}
						style={[
							styles.fileRow,
							index > 0 && { marginTop: verticalScale(8) },
						]}
					>
						{getFileIcon(item?.name)}

						<RNText
							numberOfLines={1}
							style={styles.subTitle}
							title={item?.name ?? ""}
						/>

						{isDownloading ? (
							<Loading
								imageStyle={styles.loading}
								style={styles.loadingContainer}
							/>
						) : (
							<Pressable
								onPress={() => download(item?.name)}
								style={styles.downloadCta}
							>
								<DownloadIcon
									color={colors.neutral.black}
									height={verticalScale(16)}
									width={horizontalScale(16)}
								/>
							</Pressable>
						)}
					</View>
				);
			})}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: colors.highlight.bg_blue,
		borderRadius: horizontalScale(4),
		justifyContent: "center",
		paddingBottom: verticalScale(8),
		paddingHorizontal: horizontalScale(12),
	},
	content: {
		color: neutral.grey_07,
		...sm,
		...bold,
		lineHeight: verticalScale(19),
	},
	downloadCta: {
		alignSelf: "center",
		marginLeft: horizontalScale(16),
	},
	evaluationContainer: {
		marginBottom: verticalScale(8),
		width: "100%",
	},
	evaluationDescription: {
		color: neutral.black,
		...regular,
		...sm,
	},
	evaluationHeader: {
		color: neutral.black,
		...sm,
		...bold,
		lineHeight: verticalScale(19),
		marginLeft: horizontalScale(4),
		textDecorationColor: neutral.black,
		textDecorationLine: "underline",
	},
	evaluationSubContainer: {
		paddingLeft: moderateScale(4),
	},
	fileRow: {
		flexDirection: "row",
		marginTop: verticalScale(5),
		width: "100%",
	},
	fileTextContainer: {
		marginBottom: verticalScale(14),
		marginTop: verticalScale(16),
		width: "100%",
	},
	header: {
		color: neutral.grey_07,
		...sm,
		...regular,
		lineHeight: verticalScale(19),
		marginLeft: horizontalScale(4),
	},
	loading: {
		height: horizontalScale(14),
		width: horizontalScale(14),
	},
	loadingContainer: {
		marginLeft: horizontalScale(16),
	},
	pdfStyle: {
		alignSelf: "center",
	},
	reportBtn: {
		backgroundColor: neutral.black,
		borderRadius: moderateScale(8),
		marginVertical: verticalScale(10),
		width: "100%",
	},
	reviewLine: { color: neutral.grey_07, ...sm, ...bold },
	rowContainer: {
		alignItems: "center",
		flexDirection: "row",
		marginBottom: verticalScale(8),
		width: "100%",
	},
	subTitle: {
		color: cta.text.default_secondary,
		flex: 1,
		...md,
		...bold,
		lineHeight: verticalScale(22),
		marginLeft: horizontalScale(4),
		textAlign: "left",
	},
	workTxt: {
		color: neutral.black,
		...regular,
		...sm,
	},
});

export default TaskSubmissionCard;
