import {
	HTMLIframe,
	iframeModel,
	useHtmlIframeProps,
} from "@native-html/iframe-plugin";
import React from "react";
import { CustomRendererProps, TBlock } from "react-native-render-html";
import YoutubePlayer from "react-native-youtube-iframe";

import { MAX_ALLOWED_WIDTH } from "@components/Reusable/RenderHtml/renderHtml.constants";

import { extractYoutubeIdRegex } from "@constants/regex.constants";

const getYoutubeId = (url: string) => {
	const match = url.match(extractYoutubeIdRegex);
	return match ? match[1] : null;
};

const CustomIframeRenderer = (props: CustomRendererProps<TBlock>) => {
	const iframeProps = useHtmlIframeProps(props);

	const { source, htmlAttribs } = iframeProps;

	const src = source?.uri;
	if (!src) return null;

	const youtubeId = getYoutubeId(src);
	if (!youtubeId) return <HTMLIframe {...iframeProps} />;

	const { width = "0", height = "1" } = htmlAttribs;

	const aspectRatio = Number(width) / Number(height);
	const calculatedHeight = MAX_ALLOWED_WIDTH / aspectRatio;

	return <YoutubePlayer height={calculatedHeight} videoId={youtubeId} />;
};

export default CustomIframeRenderer;

CustomIframeRenderer.model = iframeModel;
