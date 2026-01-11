import React from "react";
import { ScrollView, View } from "react-native";

import AssetSkeleton from "@components/asset/common/AssetSkeleton";
import useZipDownloadAssetController from "@components/asset/zipDownload/useZipDownloadController";
import styles from "@components/asset/zipDownload/zipDownload.styles";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import DownloadsourcecodeFile from "@components/Reusable/DownloadsourcecodeFile";
import RenderHtml from "@components/Reusable/RenderHtml";

import { LearningPathType } from "@interface/app.interface";

import { ZipIcon } from "@assets/icons";
import { strings } from "@assets/strings";

interface IZipDownloadAsset {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
}

const ZipDownloadAsset = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
}: IZipDownloadAsset) => {
	const {
		loading,
		handleDownloadZip,
		buttonDisabled,
		preText,
		postText,
		sourceCodeDisplayText,
		sourceCodeFilePath,
	} = useZipDownloadAssetController({
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		learningPathId,
		learningPathType,
	});

	if (loading)
		return (
			<View style={styles.skeletonContainer}>
				<AssetSkeleton />
			</View>
		);

	return (
		<ScrollView
			style={styles.main}
			contentContainerStyle={styles.container}
		>
			{preText ? (
				<View style={styles.component}>
					<RenderHtml
						tagsStyles={{
							p: styles.p,
							img: styles.img,
						}}
						content={preText ?? ""}
					/>
				</View>
			) : (
				<></>
			)}

			<ZipIcon style={styles.zipIcon} />

			<CommonButton
				title={strings.DOWNLOAD}
				onPress={handleDownloadZip}
				variant={IButtonVariant.Primary}
				isDisabled={buttonDisabled}
				style={styles.downloadBtn}
			/>

			{postText ? (
				<View style={styles.component}>
					<RenderHtml
						tagsStyles={{
							p: styles.p,
							img: styles.img,
						}}
						content={postText ?? ""}
					/>
				</View>
			) : (
				<></>
			)}
			{sourceCodeFilePath ? (
				<DownloadsourcecodeFile
					filePath={sourceCodeFilePath}
					fileTitle={sourceCodeDisplayText}
				/>
			) : (
				<></>
			)}
		</ScrollView>
	);
};

export default ZipDownloadAsset;
