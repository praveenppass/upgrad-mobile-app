import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import BackgroundService from "react-native-background-actions";

import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import {
	AlertIcon,
	AttachedPinGrayIcon,
	CrossIconResume,
	DownloadIcon,
	LinkIcon,
	SuccessIconLxp,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, cta, state } = colors;
const { sm, regular, medium, bold, md } = commonStyles.text;

interface IUploadFileData {
	name: string;
	url: string;
	type?: string;
}

interface ISubmissionItemProps {
	file: IUploadFileData;
	index: number;
	downloading?: boolean;
	downloadingFileName?: string;
	onDownload: (fileName?: string) => void;
	onDeleteFile: (fileName: string) => void;
	fileValidationError?: { errorMessage: string; errorFile: string } | null;
}

interface ISubmissionsListProps {
	isUploaded: boolean;
	downloading?: boolean;
	downloadingFileName?: string;
	submissionFileNames: IUploadFileData[];
	onDownload: (fileName?: string) => void;
	progressPercent: number;
	onDeleteFile: (fileName: string) => void;
	fileValidationError?: { errorMessage: string; errorFile: string } | null;
}

const SubmissionItem: React.FC<ISubmissionItemProps> = ({
	file,
	downloading,
	downloadingFileName,
	onDownload,
	onDeleteFile,
	fileValidationError,
}) => {
	return (
		<View style={styles.uploadedFileContainer}>
			<View
				style={[
					file.type === "url" ? styles.urlRow : styles.fileRow,
					fileValidationError?.errorFile === file.name &&
						styles.errorRowBorder,
				]}
			>
				{file.type !== "url" ? (
					<AttachedPinGrayIcon currentColor={neutral.black} />
				) : (
					<LinkIcon color={neutral.black} />
				)}
				<RNText
					title={file.name}
					style={styles.subTitle}
					numberOfLines={1}
				/>

				{downloading && downloadingFileName === file.name ? (
					<Loading imageStyle={styles.loading} />
				) : (
					<>
						{file.type !== "url" ? (
							<Pressable
								onPress={() => onDownload(file.name)}
								style={styles.downloadCta}
							>
								<DownloadIcon
									color={neutral.black}
									height={verticalScale(18)}
									width={horizontalScale(14)}
								/>
							</Pressable>
						) : null}
						<Pressable
							onPress={() => onDeleteFile(file.name)}
							style={styles.downloadCta}
							testID={`${file.name}-delete-uploaded-file`}
						>
							<CrossIconResume
								color={neutral.black}
								height={verticalScale(18)}
								width={horizontalScale(14)}
							/>
						</Pressable>
					</>
				)}
			</View>
		</View>
	);
};

const SubmissionsList: React.FC<ISubmissionsListProps> = ({
	isUploaded,
	downloading,
	downloadingFileName,
	submissionFileNames,
	onDownload,
	progressPercent,
	onDeleteFile,
	fileValidationError,
}) => {
	const [isBgRunning, setIsBgRunning] = React.useState(false);
	const isUploading = progressPercent > 0 && !isUploaded;
	const isCompleted = submissionFileNames.length > 0; // Show submissions if there are any, regardless of upload state
	const isBackgroundServiceRunning = () => {
		const isRunning = BackgroundService.isRunning();
		return isRunning;
	};
	React.useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		const checkStatus = async () => {
			const running = await BackgroundService.isRunning();
			setIsBgRunning(running);
		};
		checkStatus();

		interval = setInterval(checkStatus, 1000);

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isUploading, isUploaded]);
	return (
		<View>
			{(isUploading || isCompleted) && (
				<View style={styles.rowWithGap}>
					{isBackgroundServiceRunning() || isUploading ? (
						<Loading imageStyle={styles.loading} />
					) : null}
					<RNText
						style={styles.uploadTitle}
						numberOfLines={2}
						title={
							isCompleted ? strings.UPLOADED : strings.UPLOADING
						}
					/>
					{isCompleted ? (
						<SuccessIconLxp
							width={horizontalScale(20)}
							height={verticalScale(20)}
						/>
					) : null}
				</View>
			)}

			<View style={styles.fileTextContainer}>
				{isCompleted ? (
					<View style={styles.fileListContainer}>
						<FlatList
							data={submissionFileNames}
							keyExtractor={(item, index) =>
								`${item.name}-${index}`
							}
							renderItem={({ item, index }) => (
								<SubmissionItem
									file={item}
									index={index}
									downloading={downloading}
									downloadingFileName={downloadingFileName}
									onDownload={onDownload}
									onDeleteFile={onDeleteFile}
									fileValidationError={fileValidationError}
								/>
							)}
							showsVerticalScrollIndicator={false}
						/>

						{fileValidationError && (
							<View style={styles.errorContainer}>
								<AlertIcon />
								<RNText
									style={styles.errorText}
									numberOfLines={1}
									title={fileValidationError.errorMessage}
								/>
							</View>
						)}
					</View>
				) : null}
			</View>
		</View>
	);
};

export default SubmissionsList;

const styles = StyleSheet.create({
	downloadCta: {
		marginLeft: horizontalScale(16),
	},
	errorContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(4),
		marginBottom: verticalScale(10),
		width: "90%",
	},
	errorRowBorder: {
		borderColor: state.error_red,
		borderWidth: horizontalScale(1),
	},
	errorText: {
		color: state.error_red,
		...sm,
		...regular,
		lineHeight: verticalScale(15),
	},
	fileListContainer: {
		gap: verticalScale(8),
		width: "100%",
	},
	fileRow: {
		alignItems: "center",
		backgroundColor: neutral.grey_03,
		borderColor: neutral.grey_05,
		borderRadius: horizontalScale(5),
		borderWidth: horizontalScale(1),
		flexDirection: "row",
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(10),
	},
	fileTextContainer: {
		alignItems: "center",
		flexDirection: "column",
		marginTop: verticalScale(10),
		width: "100%",
	},
	loading: {
		height: horizontalScale(14),
		width: horizontalScale(14),
	},
	row: {
		alignItems: "center",
		backgroundColor: neutral.grey_03,
		flexDirection: "row",
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(6),
	},
	rowWithGap: {
		alignItems: "center",
		columnGap: horizontalScale(5),
		flexDirection: "row",
		marginTop: verticalScale(12),
		width: "100%",
	},
	subTitle: {
		color: cta.text.default_secondary,
		...md,
		...bold,
		lineHeight: verticalScale(22),
		marginLeft: horizontalScale(4),
		width: "75%",
	},
	uploadTitle: {
		color: cta.text.default_secondary,
		...sm,
		...medium,
		lineHeight: verticalScale(14),
	},
	uploadedFileContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: verticalScale(4),
	},
	urlRow: {
		alignItems: "center",
		backgroundColor: neutral.grey_03,
		borderColor: neutral.grey_05,
		borderRadius: horizontalScale(5),
		borderWidth: horizontalScale(1),
		flexDirection: "row",
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(10),
		width: "100%",
	},
});
