import React, { memo } from "react";
import { useWindowDimensions, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { WebView } from "react-native-webview";

import { MAX_ALLOWED_WIDTH } from "@components/Reusable/RenderHtml/renderHtml.constants";
import styles from "@components/Reusable/RenderHtml/renderHtml.styles";
import {
	customHTMLElementModels,
	renderers,
	renderersProps,
} from "@components/Reusable/RenderHtml/renderHtml.utils";
import { systemFonts } from "@components/Reusable/RenderHtml/renderHtml.utils";
import useRenderHtmlController from "@components/Reusable/RenderHtml/useRenderHtmlController";

import { useContentRTL } from "@hooks/useContentRTL";

import { horizontalScale, verticalScale } from "@utils/functions";

import { commonStyles } from "@assets/styles";

interface IRenderHtml {
	content: string;
	customStyles?: Record<string, { [key: string]: string | number }>;
}

const { sm, bold, regular } = commonStyles.text;

const RenderHtml = ({ content, customStyles }: IRenderHtml) => {
	const { cleanedContent } = useRenderHtmlController({ content });
	const { width, height } = useWindowDimensions();
	const { textAlign, writingDirection } = useContentRTL();
	const isLandscape = width > height;

	const rtlStyle = { textAlign, writingDirection };

	const rtlStyles = {
		p: rtlStyle,
		div: rtlStyle,
		span: rtlStyle,
		h1: rtlStyle,
		h2: rtlStyle,
		h3: rtlStyle,
		h4: rtlStyle,
		h5: rtlStyle,
		h6: rtlStyle,
		li: rtlStyle,
		th: rtlStyle,
	};

	const landscapeTagsStyles = isLandscape
		? {
				table: {
					alignSelf: "center",
					marginVertical: verticalScale(20),
				},
				td: {
					borderWidth: 1,
					lineHeight: verticalScale(24),
					paddingHorizontal: horizontalScale(12),
					paddingVertical: verticalScale(16),
					textAlign: "center",
					borderColor: "gray",
					padding: horizontalScale(10),
					...regular,
					...sm,
				},
				th: {
					paddingVertical: verticalScale(16),
					lineHeight: verticalScale(24),
					padding: horizontalScale(4),
					textAlign: "center",
					...bold,
					...sm,
				},
			}
		: {};

	return (
		<View style={styles.container}>
			<RenderHTML
				source={{ html: cleanedContent }}
				WebView={WebView}
				defaultWebViewProps={{
					allowsInlineMediaPlayback: true,
					allowsFullscreenVideo: true,
				}}
				renderers={renderers}
				contentWidth={MAX_ALLOWED_WIDTH}
				customHTMLElementModels={customHTMLElementModels}
				classesStyles={styles}
				enableExperimentalBRCollapsing
				enableExperimentalMarginCollapsing
				enableExperimentalPercentWidth
				renderersProps={renderersProps}
				systemFonts={systemFonts}
				defaultTextProps={{ style: styles.defaultTextProps }}
				allowedStyles={[]}
				tagsStyles={{
					...styles,
					...rtlStyles,
					...customStyles,
					...landscapeTagsStyles,
				}}
			/>
		</View>
	);
};

export default memo(RenderHtml);
