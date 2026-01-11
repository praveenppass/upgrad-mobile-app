import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { FlatList, Pressable } from "react-native";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";
import { useToast } from "@components/Reusable/Toast";

import { IKeyMovementTranscriptDetails } from "@graphql/query/asset/video/landscape/getKeyMovementTranscriptDetailsQuery";

import { generateDoc } from "@services/JsonToDocx";

import {
	horizontalScale,
	timeStringToMilliseconds,
	verticalScale,
} from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { DownloadIcon } from "@assets/icons/svg/transcript";
import { commonStyles } from "@assets/styles";

const { neutral, highlight } = colors;
const { sm, lineHeight22, semiBold, regular } = commonStyles.text;

interface ITranscriptSentence {
	type: ItemType.Sentence;
	id: string;
	index: number;
	text: string;
	start: string;
	end: string;
}

interface ITranscriptSection {
	type: ItemType.Section;
	id: string;
	start: string;
	end: string;
	text: string;
}

type TranscriptItem = ITranscriptSentence | ITranscriptSection;

interface ITranscriptTabs {
	title?: string;
	isFromLandscape?: boolean;
	highLightIndex: number;
	transcriptsData?: IKeyMovementTranscriptDetails;
	handleKeyMovementClick?: (timeIndex: number) => void;
}

interface ITranscriptItem {
	item: TranscriptItem;
	highLightIndex: number;
	onKeyMovementClick: (time: string) => void;
}

const STRINGS = createStringConstants({
	DOWNLOAD_TRANSCRIPT: "studyPlan.container6.transcript.downloadTranscript",
});

enum ItemType {
	Section = "section",
	Sentence = "sentence",
}

const buildTranscriptData = (keyMoments, transcription) => {
	const data: TranscriptItem[] = [];
	let globalIndex = 0;

	keyMoments.forEach((moment, sectionIndex) => {
		data.push({
			type: ItemType.Section,
			id: `${ItemType.Section}-${sectionIndex}`,
			start: sectionIndex === 0 ? transcription[0].start : moment.start,
			end: moment.end,
			text: moment.text,
		});

		const sentences = transcription.filter(
			(t) => t.start >= moment.start && t.end <= moment.end,
		);

		sentences.forEach((s) => {
			data.push({
				type: ItemType.Sentence,
				id: `${ItemType.Sentence}-${globalIndex}`,
				index: globalIndex,
				text: s.text,
				start: s.start,
				end: s.end,
			});
			globalIndex++;
		});
	});

	return data;
};

const formatTimeFromString = (timeStr: string) => {
	const splitTime = timeStr.split(".")[0];
	const parts = splitTime.split(":");
	if (parts[0] === "00") {
		const minutes = parts[1];
		const seconds = parts[2];
		return `${minutes}:${seconds}`;
	} else {
		return `${parts[0]}:${parts[1]}`;
	}
};

const TranscriptList = ({
	title,
	isFromLandscape,
	highLightIndex,
	transcriptsData,
	handleKeyMovementClick,
}: ITranscriptTabs) => {
	const scrollRef = useRef<FlatList>(null);
	const transcription = transcriptsData?.transcript?.transcription || [];
	const keyMoments = transcriptsData?.transcript?.keyMoments || [];

	const { showToast } = useToast();

	const transcriptData = useMemo(
		() => buildTranscriptData(keyMoments, transcription),
		[keyMoments, transcription],
	);
	const shouldScrollToIndex =
		scrollRef.current &&
		transcriptData.length > 0 &&
		highLightIndex != null &&
		highLightIndex < transcriptData.length;

	useEffect(() => {
		if (shouldScrollToIndex) {
			scrollToIndex(highLightIndex + 1, transcriptData.length, 0.3);
		}
	}, [highLightIndex, transcriptData]);

	const onScrollToIndexFailed = (info) => {
		scrollToIndex(info.index, transcriptData.length);
	};

	const scrollToIndex = (
		index: number,
		transcriptLength: number,
		viewPosition = 0.3,
	) => {
		if (
			!scrollRef?.current ||
			transcriptLength === 0 ||
			index == null ||
			index >= transcriptLength
		)
			return;

		const adjustedIndex = isFromLandscape ? index : index * 1.13;

		try {
			scrollRef.current.scrollToIndex({
				index: adjustedIndex,
				animated: true,
				viewPosition,
			});
		} catch (error) {
			setTimeout(() => {
				if (index < transcriptLength) {
					scrollRef.current?.scrollToIndex({ index, animated: true });
				}
			}, 300);
		}
	};

	const onKeyMovementClick = (timeStr: string) => {
		const milliseconds = timeStringToMilliseconds(timeStr);
		if (isFromLandscape) {
			handleKeyMovementClick?.(milliseconds);
		}
	};

	const renderTranscriptItem = ({
		item,
		highLightIndex,
		onKeyMovementClick,
	}: ITranscriptItem) => {
		if (item.type === ItemType.Section) {
			return (
				<View style={styles.container}>
					<View style={styles.timeBox}>
						<RNText
							title={`${formatTimeFromString(item.start)} - ${formatTimeFromString(item.end)}`}
							style={styles.timeTxt}
						/>
					</View>
					<RNText title={item.text} style={styles.transcriptTitle} />
				</View>
			);
		}

		const isHighlighted = highLightIndex === item.index;

		return (
			<Pressable onPress={() => onKeyMovementClick(item.start)}>
				<RNText
					title={item.text}
					style={
						isHighlighted
							? styles.highlightedText
							: styles.transcriptTxt
					}
				/>
			</Pressable>
		);
	};

	const renderFooter = useCallback(() => {
		if (isFromLandscape) return null;

		return (
			<Pressable
				style={styles.downContainer}
				onPress={() =>
					generateDoc({ data: keyMoments, title, showToast })
				}
			>
				<RNText
					title={getString(STRINGS.DOWNLOAD_TRANSCRIPT)}
					style={styles.downText}
				/>
				<DownloadIcon color={neutral.black} />
			</Pressable>
		);
	}, [isFromLandscape, keyMoments, title, showToast]);

	return (
		<FlatList
			ref={scrollRef}
			data={transcriptData}
			keyExtractor={(item) => item.id}
			nestedScrollEnabled
			scrollEnabled
			renderItem={({ item }) =>
				renderTranscriptItem({
					item,
					highLightIndex,
					onKeyMovementClick,
				})
			}
			onScrollToIndexFailed={onScrollToIndexFailed}
			style={styles.scrollContainer}
			contentContainerStyle={styles.scrollContent}
			ListFooterComponent={renderFooter}
		/>
	);
};

export default TranscriptList;

const styles = StyleSheet.create({
	container: {
		columnGap: horizontalScale(8),
		flexDirection: "column",
		marginTop: verticalScale(10),
	},
	downContainer: {
		alignItems: "center",
		columnGap: horizontalScale(6),
		flexDirection: "row",
		marginTop: verticalScale(10),
	},
	downText: {
		...sm,
		...semiBold,
		color: neutral.black,
	},
	highlightedText: {
		backgroundColor: highlight.text_blue,
		borderRadius: horizontalScale(6),
		color: neutral.white,
		overflow: "hidden",
		padding: horizontalScale(5),
	},
	scrollContainer: {
		flex: 1,
		paddingHorizontal: horizontalScale(16),
	},
	scrollContent: {
		paddingBottom: verticalScale(20),
	},
	timeBox: {
		backgroundColor: highlight.text_bg,
		borderRadius: horizontalScale(4),
		marginBottom: verticalScale(4),
		padding: horizontalScale(5),
		width: "30%",
	},
	timeTxt: {
		color: neutral.grey_08,
		...sm,
	},
	transcriptTitle: {
		color: neutral.black,
		...semiBold,
		...sm,
		marginBottom: verticalScale(5),
	},
	transcriptTxt: {
		...sm,
		...regular,
		...lineHeight22,
		color: neutral.grey_08,
		marginBottom: verticalScale(6),
		marginRight: horizontalScale(6),
	},
});
