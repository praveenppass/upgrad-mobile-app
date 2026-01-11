import React, { memo } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { useAssetPdfViewController } from "@components/asset/pdf/usePdfController";
import IsolatedPdfView from "@components/IsolatedPdfView";
import DownloadsourcecodeFile from "@components/Reusable/DownloadsourcecodeFile";
import Loading from "@components/Reusable/Loading";

import { horizontalScale } from "@utils/functions";

import { LearningPathType } from "@interface/app.interface";

export interface IPdfAsset {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
}

const renderLoader = () => <Loading />;

const AssetPdfView = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
}: IPdfAsset) => {
	const {
		assetUri,
		handlePageChange,
		sourceCodeFilePath,
		sourceCodeDisplayText,
	} = useAssetPdfViewController({
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		learningPathType,
		learningPathId,
	});

	return (
		<View style={styles.container}>
			<IsolatedPdfView
				style={styles.pdf}
				source={{
					uri: assetUri,
					cache: true,
				}}
				trustAllCerts={Platform.OS !== "android"}
				renderActivityIndicator={renderLoader}
				onPageChanged={handlePageChange}
			/>
			{sourceCodeFilePath ? (
				<DownloadsourcecodeFile
					filePath={sourceCodeFilePath}
					fileTitle={sourceCodeDisplayText}
				/>
			) : null}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: horizontalScale(16),
	},
	pdf: {
		flex: 1,
	},
});
export default memo(AssetPdfView);
