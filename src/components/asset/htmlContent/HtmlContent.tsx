import React from "react";
import { ScrollView, View } from "react-native";

import ReferenceLinks from "@components/asset/common/ReferenceLinks";
import HtmlDescription from "@components/asset/htmlContent/common/HtmlDescription";
import styles from "@components/asset/htmlContent/htmlContent.styles";
import useHtmlContentAssetController from "@components/asset/htmlContent/useHtmlContentController";
import DownloadsourcecodeFile from "@components/Reusable/DownloadsourcecodeFile";

import { LearningPathType } from "@interface/app.interface";

interface IHtmlContentAsset {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathId: string;
}

const HtmlContentAsset = ({
	assetCode,
	courseId,
	learningPathId,
	learningPathType,
	moduleId,
	segmentId,
	sessionId,
}: IHtmlContentAsset) => {
	const {
		htmlContent,
		loading,
		relatedLinks,
		sourceCodeFilePath,
		sourceCodeDisplayText,
	} = useHtmlContentAssetController({
		assetCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		learningPathId,
		learningPathType,
	});

	return (
		<ScrollView style={styles.main}>
			<HtmlDescription
				htmlContent={htmlContent || null}
				loading={loading}
				style={styles.component}
			/>

			<ReferenceLinks
				links={relatedLinks || []}
				style={styles.endComponent}
				loading={loading}
			/>
			<View style={styles.onlineEditorComponent}>
				{sourceCodeFilePath ? (
					<DownloadsourcecodeFile
						filePath={sourceCodeFilePath}
						fileTitle={sourceCodeDisplayText}
					/>
				) : null}
			</View>
		</ScrollView>
	);
};

export default HtmlContentAsset;
