import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import Loading from "@components/Reusable/Loading";
import ProgressBar from "@components/Reusable/ProgressBar";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import {
	CrossIconResume,
	DownloadIconResume,
	ResumeIcon,
	ResumeUploadIcon,
	UploadResumeModalPinIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, state } = colors;

const {
	text: { semiBold, sm, regular, medium, md },
} = commonStyles;

interface ResumeItem {
	fileName: string;
	resumeId: string;
	filePath: string;
}

interface IUploadResumeModal {
	data: ResumeItem[];
	onClose: () => void;
	visible: boolean;
	onRemoveResume: (id: string) => void;
	handleResumeUpload: () => void;
	onDownloadResume: (fileName: string, filePath: string) => void;
	isUploading: boolean;
	uploadFileName?: string;
	uploadPercent?: number;
	isuploadLimitReached: boolean;
	resumeDownloadingId: string | null;
	resumeRemovingFileName: string | null;
}

const UploadResumeModal: React.FC<IUploadResumeModal> = ({
	data,
	onClose,
	visible,
	onRemoveResume,
	handleResumeUpload,
	onDownloadResume,
	isUploading,
	uploadFileName,
	uploadPercent,
	isuploadLimitReached,
	resumeDownloadingId,
	resumeRemovingFileName,
}) => {
	return (
		<ActionModal
			isOpen={visible}
			closeModal={onClose}
			onBackPress={onClose}
		>
			<View style={styles.containerView}>
				<View style={styles.centerSlider}>
					<View style={styles.slider} />
				</View>
				<View style={styles.firstView}>
					<ResumeIcon />
					<RNText style={styles.resumeText}>{strings.RESUME}</RNText>
				</View>
				<View style={styles.viewGap}>
					<View style={styles.uploadResumeView}>
						<RNText style={styles.uploadResumeText}>
							{strings.UPLOAD_RESUME_TEXT}
						</RNText>
						<RNText style={styles.redStar}>*</RNText>
					</View>

					<Pressable
						style={[
							styles.uploadButton,
							isuploadLimitReached && styles.disabledButton,
						]}
						onPress={() => handleResumeUpload()}
						disabled={isuploadLimitReached}
					>
						<ResumeUploadIcon
							color={
								isuploadLimitReached
									? colors.neutral.grey_05
									: colors.neutral.black
							}
						/>
						<RNText
							style={[
								styles.resumeUploadText,
								isuploadLimitReached && styles.disabledtext,
							]}
						>
							{strings.UPLOAD_RESUME}
						</RNText>
					</Pressable>
				</View>
				<View style={styles.rulesView}>
					<RNText style={styles.limitText}>
						{isuploadLimitReached
							? strings.MAX_LIMIT_REACHED_RESUME
							: strings.RESUME_LIMIT_TEXT}
					</RNText>
					{!isuploadLimitReached ? (
						<RNText style={styles.sizeText}>
							{strings.RESUME_UPLOAD_SIZE}
						</RNText>
					) : (
						<></>
					)}
				</View>

				{isUploading ? (
					<View style={styles.progressView}>
						<ProgressBar
							LeftIcon={() => <UploadResumeModalPinIcon />}
							progress={uploadPercent || 0}
							leftTextTitle={uploadFileName || ""}
							leftTextStyle={styles.resumeFilename}
							rightTextTitle={
								uploadPercent ? `${uploadPercent}%` : ""
							}
							rightTextStyle={styles.rightText}
						/>
					</View>
				) : (
					<></>
				)}

				<View style={styles.flatlistView}>
					{data?.map(({ fileName, filePath, resumeId }, index) => {
						const isResumeDownloading =
							resumeDownloadingId === resumeId;

						const isResumeRemoving =
							resumeRemovingFileName === fileName;
						return (
							<View key={index} style={styles.resumeCardView}>
								<View style={styles.resumeCardLeft}>
									<UploadResumeModalPinIcon />
									<RNText
										style={styles.resumeFilename}
										numberOfLines={1}
									>
										{fileName}
									</RNText>
								</View>
								<View style={styles.resumeCardRight}>
									<Pressable
										onPress={() =>
											!isResumeDownloading &&
											onDownloadResume(fileName, filePath)
										}
										style={styles.iconContainer}
									>
										{isResumeDownloading ? (
											<Loading
												imageStyle={styles.loadingStyle}
											/>
										) : (
											<DownloadIconResume />
										)}
									</Pressable>

									<Pressable
										onPress={() =>
											!isResumeRemoving &&
											onRemoveResume(resumeId)
										}
										style={styles.iconContainer}
									>
										{isResumeRemoving ? (
											<Loading
												imageStyle={styles.loadingStyle}
											/>
										) : (
											<CrossIconResume
												color={neutral.grey_07}
											/>
										)}
									</Pressable>
								</View>
							</View>
						);
					})}
				</View>
			</View>
		</ActionModal>
	);
};

export default UploadResumeModal;

const styles = StyleSheet.create({
	ack: {
		color: neutral.grey_07,
		marginTop: verticalScale(24),
		...md,
		...regular,
		lineHeight: verticalScale(16),
	},

	centerSlider: {
		alignItems: "center",
		justifyContent: "center",
	},
	containerView: {
		marginBottom: verticalScale(10),
		paddingHorizontal: horizontalScale(12),
	},
	disabledButton: {
		borderColor: neutral.grey_05,
	},
	disabledtext: {
		color: neutral.grey_05,
	},

	firstView: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(7),
		height: verticalScale(40),
		justifyContent: "center",
		width: horizontalScale(320),
	},

	flatlistView: {
		gap: verticalScale(10),
	},
	iconContainer: {
		alignItems: "center",
		height: verticalScale(30),
		justifyContent: "center",
		width: horizontalScale(25),
	},
	limitText: {
		...regular,
		...sm,
		color: neutral.grey_07,
		lineHeight: verticalScale(19),
	},
	loadingStyle: {
		height: verticalScale(12),
		width: horizontalScale(12),
	},
	progressView: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderColor: neutral.grey_04,
		borderRadius: verticalScale(4),
		borderWidth: 1,
		flexDirection: "row",
		marginBottom: verticalScale(10),
		paddingBottom: verticalScale(5),
		paddingHorizontal: verticalScale(10),
		paddingTop: verticalScale(10),
	},
	redStar: {
		color: state.error_red,
	},
	resumeCardLeft: {
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
		gap: horizontalScale(8),
	},
	resumeCardRight: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(4),
	},
	resumeCardView: {
		alignItems: "center",
		backgroundColor: neutral.grey_03,
		borderRadius: verticalScale(4),
		columnGap: horizontalScale(6),
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(8),
		width: horizontalScale(320),
	},
	resumeFilename: {
		...medium,
		...sm,
		color: neutral.black,
		flex: 1,
		lineHeight: verticalScale(19),
	},
	resumeText: {
		...md,
		...semiBold,
		color: neutral.black,
		lineHeight: verticalScale(22),
	},
	resumeUploadText: {
		...semiBold,
		color: neutral.black,
		lineHeight: verticalScale(21),
	},
	rightText: {
		...semiBold,
		...sm,
		color: neutral.black,
	},
	row: {
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
	},
	rulesView: {
		height: verticalScale(57),
		marginVertical: verticalScale(10),
		width: horizontalScale(320),
	},
	sizeText: {
		...regular,
		...sm,
		color: neutral.grey_07,
		lineHeight: verticalScale(19),
	},
	slider: {
		backgroundColor: neutral.grey_04,
		borderRadius: verticalScale(100),
		height: verticalScale(4),
		width: horizontalScale(64),
	},
	uploadButton: {
		alignItems: "center",
		borderColor: neutral.black,
		borderRadius: verticalScale(6),
		borderWidth: verticalScale(1),
		flexDirection: "row",
		gap: horizontalScale(5),
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(8),
	},
	uploadResumeText: {
		...md,
		...semiBold,
		color: neutral.black,
		lineHeight: verticalScale(21),
	},
	uploadResumeView: {
		flexDirection: "row",
		gap: horizontalScale(2),
		height: verticalScale(23),
		width: horizontalScale(193),
	},

	viewGap: { alignItems: "flex-start", gap: verticalScale(12) },
});
