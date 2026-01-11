import React from "react";

// import { IIsAssetNavigationTabDisabled } from "@screens/Tabs/Courses/Asset/asset.interface";
import Assessment from "@components/asset/assessment/Assessment";
import ClassOpinion from "@components/asset/classOpinion/ClassOpinion";
import NotSupportedAsset from "@components/asset/common/NotSupportedAsset";
import HtmlContentAsset from "@components/asset/htmlContent/HtmlContent";
import Pdf from "@components/asset/pdf/Pdf";
import RecallQuiz from "@components/asset/recallQuiz/RecallQuiz";
import Task from "@components/asset/task/Task";
import VideoAsset from "@components/asset/video/Video";
import WebView from "@components/asset/webView/WebViewAsset";
import ZipDownloadAsset from "@components/asset/zipDownload/ZipDownload";
import { IAssetRendererProps } from "@components/studyPlan/container6/Container6Component/container6Component.interface";

import { IAssetType } from "@interface/asset.interface";

export const NEW_ASSETS: IAssetType[] = [
	IAssetType.ASSIGNMENT,
	IAssetType.PROJECT,
	IAssetType.ONLINE_EDITOR,
	IAssetType.HAND_ON,
	IAssetType.RECALL_QUIZ,
	IAssetType.ASSESSMENT,
	IAssetType.CODE_ZIP,
	IAssetType.VIDEO,
	IAssetType.CLASS_OPINION,
	IAssetType.PDF,
	IAssetType.PPT,
	IAssetType.SCORM,
];

// const DISABLED_TABS: Record<IAssetNavigationTab, IAssetType[]> = {
// 	[IAssetNavigationTab.NOTES]: [],
// 	[IAssetNavigationTab.REPORT]: [IAssetType.RECALL_QUIZ],
// 	[IAssetNavigationTab.MODULE_LIST]: [],
// };

// export const isAssetNavigationTabDisabled = ({
// 	assetType,
// 	tabName,
// }: IIsAssetNavigationTabDisabled): boolean => {
// 	if (!assetType) return false;

// 	const disabledTabs = DISABLED_TABS[tabName];
// 	return disabledTabs ? disabledTabs.includes(assetType) : false;
// };

export const extractLastWordWithRest = (assetTitle: string) => {
	const match = assetTitle.match(/([_\s-])?([^\s_-]+)$/);

	if (match?.length && match[2]) {
		const lastWord = match[2];
		const mainText = assetTitle.slice(
			0,
			assetTitle.length - lastWord.length,
		);

		return {
			lastWord: lastWord.trim(),
			mainText: mainText.trim(),
		};
	}

	return { mainText: "", lastWord: "" };
};

export const renderAllAssets = ({ type, props }: IAssetRendererProps) => {
	if (!type) return <NotSupportedAsset />;
	switch (type) {
		case IAssetType.ASSIGNMENT:
		case IAssetType.PROJECT:
			return <Task assetType={type} {...props} />;
		case IAssetType.ASSESSMENT:
			return (
				<Assessment
					{...props}
					assetType={IAssetType.ASSESSMENT}
					ispostSubmission={props.ispostSubmission}
				/>
			);
		case IAssetType.ONLINE_EDITOR:
			return <HtmlContentAsset {...props} />;
		case IAssetType.VIDEO:
			return <VideoAsset {...props} />;
		case IAssetType.RECALL_QUIZ:
			return (
				<RecallQuiz
					{...props}
					assetType={IAssetType.RECALL_QUIZ}
					isPostRecallSubmission={props.isPostRecallSubmission}
				/>
			);
		case IAssetType.CODE_ZIP:
			return <ZipDownloadAsset {...props} />;
		case IAssetType.CLASS_OPINION:
			return <ClassOpinion {...props} />;
		case IAssetType.PDF:
		case IAssetType.PPT:
			return <Pdf {...props} />;
		case IAssetType.SCORM:
		case IAssetType.HTML_ZIP:
			return <WebView assetType={type} {...props} />;
		default:
			return <NotSupportedAsset />;
	}
};
