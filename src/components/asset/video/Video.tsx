import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import AssetSkeleton from "@components/asset/common/AssetSkeleton";
import useVideoAssetController from "@components/asset/video/useVideoController";
import DownloadsourceCodeFile from "@components/Reusable/DownloadsourcecodeFile";
import RenderHtml from "@components/Reusable/RenderHtml";
import RNVideoPlayer from "@components/Reusable/Video";
import RNVimeoPlayer from "@components/Reusable/Video/RNVimeoPlayer";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { LearningPathType } from "@interface/app.interface";

import { colors } from "@assets/colors";

interface ISourceCodeFile {
	displayName: string;
	fileName: string;
}

interface IVideoAsset {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
	seekTime?: number | null;
}

const VideoAsset = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
}: IVideoAsset) => {
	const {
		seekTime,
		completed,
		brightCoveId,
		vimeoId,
		isProgram,
		loader,
		isOptional,
		postText,
		preText,
		beforeVideoFiles,
		afterVideoFiles,
		afterPostTextFiles,
		multilingualVideoData,
		transcriptsData,
	} = useVideoAssetController({
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		learningPathId,
		learningPathType,
	});

	const videoList =
		multilingualVideoData?.getAssetFromUserProgram.asset.videos;

	const renderFileDownloads = (files: ISourceCodeFile[]) => {
		return files?.map((file, index) => (
			<DownloadsourceCodeFile
				key={`${file.fileName}-${index}`}
				filePath={file.fileName}
				fileTitle={file.displayName}
			/>
		));
	};
	return (
		<ScrollView
			nestedScrollEnabled
			showsVerticalScrollIndicator={false}
			style={styles.scrollContainer}
		>
			<View style={styles.container}>
				{loader ? (
					<AssetSkeleton />
				) : (
					<>
						{preText && (
							<View style={styles.component}>
								<RenderHtml
									tagsStyles={{
										p: styles.p,
										img: styles.img,
									}}
									content={preText ?? ""}
								/>
							</View>
						)}

						{beforeVideoFiles &&
							renderFileDownloads(beforeVideoFiles)}

						{brightCoveId ? (
							<RNVideoPlayer
								isProgram={isProgram}
								key={brightCoveId + "_potrate"}
								brightCoveId={brightCoveId}
								seekTime={
									completed !== "completed" && seekTime
										? seekTime
										: 0
								}
								status={completed}
								learningPathId={learningPathId}
								assetCode={assetCode}
								courseId={courseId}
								moduleId={moduleId}
								sessionId={sessionId}
								segmentId={segmentId}
								isOptional={isOptional}
								learningPathType={learningPathType}
								multilingualVideoData={videoList}
							/>
						) : (
							<RNVimeoPlayer videoId={vimeoId} />
						)}

						{afterVideoFiles &&
							renderFileDownloads(afterVideoFiles)}

						<View style={styles.component}>
							<RenderHtml
								customStyles={{
									p: styles.p,
									img: styles.img,
								}}
								content={postText ?? ""}
							/>
						</View>

						{afterPostTextFiles &&
							renderFileDownloads(afterPostTextFiles)}
					</>
				)}
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	component: {
		flex: 1,
		flexDirection: "column",
	},
	container: {
		borderRadius: horizontalScale(10),
		flex: 1,
	},
	htmlSkelton: {
		height: moderateScale(20),
		marginTop: verticalScale(10),
		width: "100%",
	},
	htmlSkelton50: {
		width: "50%",
	},
	img: {
		height: "auto",
		marginVertical: verticalScale(10),
		resizeMode: "contain",
		width: "100%",
	},
	p: {
		color: colors.neutral.grey_08,
		gap: horizontalScale(4),
	},
	scrollContainer: {
		paddingHorizontal: horizontalScale(20),
	},
	videoSkelton: {
		height: moderateScale(180),
		marginTop: verticalScale(10),
		width: "100%",
	},
});

export default VideoAsset;
