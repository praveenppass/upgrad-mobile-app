import tableRenderers, {
	HeuristicTablePluginConfig,
} from "@native-html/heuristic-table-plugin";
import { memo } from "react";
import {
	defaultHTMLElementModels,
	HTMLContentModel,
} from "react-native-render-html";

import CustomIframeRenderer from "@components/Reusable/RenderHtml/CustomIframeRenderer";
import CustomImageRenderer from "@components/Reusable/RenderHtml/CustomImageRenderer";
import CustomLinkRenderer from "@components/Reusable/RenderHtml/CustomLinkRenderer";
import MatrixRenderer from "@components/Reusable/RenderHtml/MatrixRenderer";

import { horizontalScale } from "@utils/functions";

import { IFileTypeEnum } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { fontFamily } from "@assets/fonts";

const { Bold, ExtraBold, ExtraLight, Light, Medium, Regular, SemiBold } =
	fontFamily;
const { neutral } = colors;

const DOC_FILE_EXTENSIONS = Object.values(IFileTypeEnum);

export const systemFonts = [
	Bold,
	ExtraBold,
	ExtraLight,
	Light,
	Medium,
	Regular,
	SemiBold,
];

export const customHTMLElementModels = {
	iframe: CustomIframeRenderer.model,
	label: defaultHTMLElementModels.span.extend({
		contentModel: HTMLContentModel.mixed,
	}),
	img: defaultHTMLElementModels.img.extend({
		contentModel: HTMLContentModel.block,
	}),
	math: defaultHTMLElementModels.math.extend({
		contentModel: HTMLContentModel.mixed,
	}),
};

export const renderers = {
	iframe: CustomIframeRenderer,
	img: memo(CustomImageRenderer),
	a: memo(CustomLinkRenderer),
	math: memo(MatrixRenderer),
	...tableRenderers,
};

const getCellStyle: HeuristicTablePluginConfig["getStyleForCell"] = (
	params,
) => {
	const hasNext = params.tnode.domNode?.next;

	return {
		backgroundColor: params.y % 2 === 0 ? neutral.grey_05 : neutral.white,
		borderTopLeftRadius: params.x === 0 ? horizontalScale(4) : 0,
		borderBottomLeftRadius: params.x === 0 ? horizontalScale(4) : 0,
		borderTopRightRadius: !hasNext ? horizontalScale(4) : 0,
		borderBottomRightRadius: !hasNext ? horizontalScale(4) : 0,
	};
};

export const renderersProps = {
	iframe: {
		scalesPageToFit: true,
	},
	img: {
		enableExperimentalPercentWidth: true,
	},
	table: {
		getStyleForCell: getCellStyle,
	},
};

export const cleanContent = (htmlContent: string): string => {
	return htmlContent
		.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
		.replace(
			/<mark>(.*?)<\/mark>/gis,
			(_, inner) => `<span class="highlight">${inner}</span>`,
		)
		.replace(/ style=['"][^'"]*['"]/gi, " ")
		.replace(/\sstyle=[^\s>]+/gi, "")
		.replace(/<\/?(undefined|mark)[^>]*>/g, "")
		.replace(/<\/?font[^>]*>/gi, "")
		.replace(
			/(^|[^0-9A-Za-z])\*\*(.+?)\*\*([^0-9A-Za-z]|$)/g,
			"$1<strong>$2</strong>$3",
		)
		.replace(/\n/g, "<br>");
};

export const isDownloadableFile = (url: string): boolean => {
	const extractedExtension = `.${url.split(".").pop()}`;
	if (!extractedExtension) return false;
	return DOC_FILE_EXTENSIONS.includes(extractedExtension as IFileTypeEnum);
};
