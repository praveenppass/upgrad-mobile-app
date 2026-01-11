import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import { useAssetWebViewController } from "@components/asset/webView/useWebViewAssetController";
import DownloadsourcecodeFile from "@components/Reusable/DownloadsourcecodeFile";
import WebView from "@components/Reusable/Webview";

import { horizontalScale } from "@utils/functions";

import { LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";

export interface IWebViewAssetProps {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
	assetType: IAssetType;
}

const AssetWebView = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
	assetType,
}: IWebViewAssetProps) => {
	const {
		uri,
		handleWebviewLoad,
		sourceCodeFilePath,
		sourceCodeDisplayText,
	} = useAssetWebViewController({
		assetCode,
		courseId,
		learningPathId,
		learningPathType,
		moduleId,
		segmentId,
		sessionId,
		assetType,
	});

	return (
		<View style={styles.container}>
			<WebView url={uri || ""} onWebviewLoad={handleWebviewLoad} />
			{sourceCodeFilePath ? (
				<DownloadsourcecodeFile
					filePath={sourceCodeFilePath}
					fileTitle={sourceCodeDisplayText || ""}
				/>
			) : null}
		</View>
	);
};

export default memo(AssetWebView);

const styles = StyleSheet.create({
	container: {
		height: "100%",
		paddingHorizontal: horizontalScale(16),
	},
});
