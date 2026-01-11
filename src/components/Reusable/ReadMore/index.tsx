import React, { memo, useCallback, useMemo, useState } from "react";
import {
	NativeSyntheticEvent,
	StyleProp,
	StyleSheet,
	TextLayoutEventData,
	TextStyle,
} from "react-native";

import RNText from "@components/Reusable/RNText";

import getString from "@strings/getString";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { xxSm, semiBold, regular } = commonStyles.text;

/**
 * ReadMore Component
 *
 * A reusable text component that automatically truncates content after a specified number of lines
 * and provides expand/collapse functionality with "Read More/Less" controls.
 *
 * BEHAVIOR:
 * - Initially renders text with numberOfLines constraint to measure layout
 * - Calculates truncated text based on actual rendered lines
 * - Switches to MoreLessComponent once truncation is calculated
 * - If onCustomReadMorePress provided, only shows "Read More" (no toggle)
 * - Otherwise toggles between truncated and full text with "Read More/Less"
 * - If the text is longer than the numberOfLines, it will be truncated and the "Read More" link will be shown
 * - If the text is shorter than the numberOfLines, it will be displayed as is
 * - If the text is exactly the same length as the numberOfLines, it will be displayed as is
 *
 * @component ReadMore
 * @param {StyleProp<TextStyle>} textStyle - Optional custom style for the main text content
 * @param {StyleProp<TextStyle>} readMoreStyle - Optional custom style for the "Read More/Less" link
 * @param {string} text - The full text content to display
 * @param {number} numberOfLines - The maximum number of lines before truncation
 * @param {string} [readMoreText] - Optional custom text for the "Read More" link
 * @param {string} [readLessText] - Optional custom text for the "Read Less" link
 * @param {() => void} [onCustomReadMorePress] - Optional custom handler for "Read More" (disables toggle if provided)
 * @returns {React.ReactElement} The rendered ReadMore component
 */

const BUFFER_LENGTH = 6;
interface IReadMore {
	textStyle?: StyleProp<TextStyle>;
	readMoreStyle?: StyleProp<TextStyle>;
	text: string;
	numberOfLines: number;
	readMoreText?: string;
	readLessText?: string;
	onCustomReadMorePress?: () => void;
	persistentReadMore?: boolean;
	testID?: string;
}

const ReadMore = ({
	textStyle,
	readMoreStyle,
	readMoreText = getString("common.readMore.readMore"),
	readLessText = getString("common.readMore.readLess"),
	text,
	numberOfLines,
	onCustomReadMorePress,
	persistentReadMore,
	testID,
}: IReadMore) => {
	const [clippedText, setClippedText] = useState("");

	const readMoreTextLength = readMoreText.length + BUFFER_LENGTH;

	const handleTextLayout = useCallback(
		(event: NativeSyntheticEvent<TextLayoutEventData>) => {
			const { lines } = event.nativeEvent;

			const lineCount = lines.length;

			const truncatedLines = lines
				.slice(0, numberOfLines)
				.map((line: { text: string }) => line.text)
				.join("");

			if (lineCount >= numberOfLines) {
				setClippedText(
					truncatedLines.substring(
						0,
						truncatedLines.length - readMoreTextLength,
					),
				);
			} else if (lineCount < numberOfLines && persistentReadMore) {
				setClippedText(truncatedLines);
			}
		},
		[numberOfLines],
	);

	return clippedText ? (
		<MemoizedMoreLessComponent
			truncatedText={clippedText}
			fullText={text}
			readMoreStyle={readMoreStyle}
			textStyle={textStyle}
			onCustomReadMorePress={onCustomReadMorePress}
			readMoreText={readMoreText}
			readLessText={readLessText}
			persistentReadMore={persistentReadMore}
			testID={testID}
		/>
	) : (
		<RNText
			numberOfLines={numberOfLines}
			style={[styles.text, textStyle]}
			onTextLayout={handleTextLayout}
			title={text}
		/>
	);
};

export default memo(ReadMore);

interface IMoreLessComponent {
	truncatedText: string;
	fullText: string;
	readMoreStyle?: StyleProp<TextStyle>;
	textStyle?: StyleProp<TextStyle>;
	onCustomReadMorePress?: () => void;
	readMoreText?: string;
	readLessText?: string;
	persistentReadMore?: boolean;
	testID?: string;
}

const MoreLessComponent = ({
	truncatedText,
	fullText,
	readMoreStyle,
	textStyle,
	readMoreText,
	readLessText,
	onCustomReadMorePress,
	persistentReadMore,
	testID,
}: IMoreLessComponent) => {
	const [more, setMore] = useState(false);

	const handlePress = useCallback(
		() =>
			onCustomReadMorePress ? onCustomReadMorePress() : setMore(!more),
		[onCustomReadMorePress, more],
	);

	const expandCtaText = useMemo(() => {
		if (onCustomReadMorePress) return readMoreText;

		return more ? readLessText : readMoreText;
	}, [onCustomReadMorePress, more, readMoreText, readLessText]);

	const text = useMemo(() => {
		if (onCustomReadMorePress || !more || persistentReadMore)
			return `${truncatedText}... `;

		return `${fullText} `;
	}, [
		onCustomReadMorePress,
		more,
		truncatedText,
		fullText,
		persistentReadMore,
	]);

	return (
		<RNText style={[styles.text, textStyle]} title={text}>
			<RNText
				title={expandCtaText}
				style={[styles.readMore, readMoreStyle]}
				onPress={handlePress}
				testID={testID || "read_more_button"}
			/>
		</RNText>
	);
};

const MemoizedMoreLessComponent = memo(MoreLessComponent);

const styles = StyleSheet.create({
	readMore: {
		...xxSm,
		color: neutral.black,
		...semiBold,
	},
	text: {
		...xxSm,
		color: neutral.black,
		...regular,
	},
});
