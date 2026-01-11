import React, { memo, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

import Loading from "@components/Reusable/Loading";

import { verticalScale } from "@utils/functions";
import { httpClientWithoutNetworkErrorScreen } from "@utils/httpClientList";

import { colors } from "@assets/colors";

interface SvgFromUrlProps {
	url: string;
	customDimensions?: {
		width: number;
		height: number;
	};
	maxWidth: number;
}

const fetchSvgContent = async (url: string) => {
	try {
		const response =
			await httpClientWithoutNetworkErrorScreen.get<string>(url);

		return response.data;
	} catch (error) {
		return null;
	}
};

const extractSvgDimensions = ({
	url,
	customDimensions,
	maxWidth,
}: SvgFromUrlProps) => {
	if (customDimensions) return customDimensions;

	const viewBoxMatch = url.match(/viewBox="([^"]+)"/);
	if (viewBoxMatch && maxWidth) {
		const [, viewBox] = viewBoxMatch;
		const [, , width, height] = viewBox.split(" ").map(Number);
		const aspectRatio = width / height;
		// const calcualtedWidth = aspectRatio * verticalScale(48);
		// if (calcualtedWidth > maxWidth)
		// 	return {
		// 		width: maxWidth,
		// 		height: maxWidth / aspectRatio,
		// 	};

		return {
			width: aspectRatio * 48,
			height: verticalScale(48),
		};
	}

	return { width: 0, height: 0 };
};

const SvgFromUrl = ({ url, customDimensions, maxWidth }: SvgFromUrlProps) => {
	const [svgContent, setSvgContent] = useState<string | null>(null);
	const [svgLoading, setSvgLoading] = useState(false);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (!url) return;

		const loadSvg = async () => {
			setSvgLoading(true);
			const svgText = await fetchSvgContent(url);
			if (!svgText) return setSvgLoading(false);

			const calculatedDimensions = extractSvgDimensions({
				url: svgText,
				customDimensions,
				maxWidth,
			});

			setSvgContent(svgText);
			setSvgLoading(false);
			setDimensions(calculatedDimensions);
		};

		loadSvg();
	}, [url]);

	if (svgLoading) return <Loading />;

	if (!svgContent) return null;

	return (
		<ScrollView
			style={styles.viewHeight}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.content}
		>
			<SvgXml
				xml={svgContent}
				width={dimensions.width}
				height={dimensions.height}
				style={styles.svgContainer}
				color={colors.neutral.black}
			/>
		</ScrollView>
	);
};

export default memo(SvgFromUrl);

const styles = StyleSheet.create({
	content: {
		alignItems: "center",
	},
	svgContainer: {
		// backgroundColor: colors.neutral.white,
	},
	viewHeight: {
		height: verticalScale(40),
		marginVertical: verticalScale(10),
	},
});
