import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { Image, Pressable } from "react-native";
import {
	CustomRendererProps,
	NodeWithChildren,
	TBlock,
} from "react-native-render-html";

import Loading from "@components/Reusable/Loading";
import { MAX_ALLOWED_WIDTH } from "@components/Reusable/RenderHtml/renderHtml.constants";
import styles from "@components/Reusable/RenderHtml/renderHtml.styles";
import SafeImage from "@components/Reusable/SafeImage";
import SvgFromUrl from "@components/Reusable/SvgFromUrl";

import { horizontalScale, verticalScale } from "@utils/functions";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

type DOMNode = NodeWithChildren & {
	name?: string;
};

const listTags = ["ul", "ol", "li"];
const minWidth = horizontalScale(100);

const getNestedListDepth = (node: DOMNode | null): number => {
	let depth = 0;
	let current = node?.parentNode;
	while (current) {
		const tagName = current?.name?.toLowerCase?.();
		if (!tagName) return depth;

		if (listTags.includes(tagName)) depth++;
		current = current.parentNode;
	}
	return depth;
};

const getWidthByDepth = (depth: number): number => {
	const decrementPerLevel = horizontalScale(14);
	const calculatedWidth = MAX_ALLOWED_WIDTH - depth * decrementPerLevel;
	return Math.max(calculatedWidth, minWidth);
};

const CustomImageRenderer = ({ tnode }: CustomRendererProps<TBlock>) => {
	const navigation = useNavigation<RootHomeStackList>();
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [loading, setLoading] = useState(false);
	const [isSvg, setIsSvg] = useState(false);

	const src = tnode.attributes.src || "";
	const isLink = tnode.parent?.tagName === "a";

	const imageStyle = {
		width: dimensions.width,
		height: dimensions.height,
		...styles.maxWidthforImageAndLink,
		marginVertical: verticalScale(10),
		resizeMode: "contain",
	};

	useLayoutEffect(() => {
		if (!src) return;
		setLoading(true);

		const listDepth = getNestedListDepth(tnode.domNode);
		const adjustedWidth = getWidthByDepth(listDepth);

		Image.getSize(
			src,
			(imgWidth: number, imgHeight: number) => {
				if (!imgHeight && !imgWidth) throw new Error();

				if (!imgHeight || !imgWidth) {
					setDimensions({ width: adjustedWidth, height: 200 });
					setLoading(false);
					return;
				}

				const aspectRatio = imgHeight / imgWidth;
				const finalWidth = Math.min(adjustedWidth, imgWidth);

				setDimensions({
					width: finalWidth,
					height: finalWidth * aspectRatio,
				});
				setLoading(false);
			},
			() => {
				setIsSvg(true);
				setDimensions({ width: adjustedWidth, height: 200 });
				setLoading(false);
			},
		);
	}, [src]);

	const handlePress = () => {
		navigation.navigate("ImageViewScreen", {
			file: {
				fileUrl: src,
				contentType: "image/jpeg",
			},
		});
	};

	if (loading) return <Loading />;
	if (isSvg) return <SvgFromUrl url={src} maxWidth={MAX_ALLOWED_WIDTH} />;
	if (!src) return null;

	return (
		<Pressable
			onPress={handlePress}
			disabled={isLink}
			style={styles.hideImageOverflow}
		>
			<SafeImage source={{ uri: src }} imageStyle={imageStyle} />
		</Pressable>
	);
};

export default CustomImageRenderer;
