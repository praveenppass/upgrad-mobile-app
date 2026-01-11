import React, { useEffect, useMemo, useState } from "react";
import {
	FlatList,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";
import TranscriptList from "@components/Reusable/Video/Common/TranscriptList";

import { IKeyMovementTranscriptDetails } from "@graphql/query/asset/video/landscape/getKeyMovementTranscriptDetailsQuery";

import {
	horizontalScale,
	timeStringToMilliseconds,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral, highlight } = colors;
const {
	text: { medium, sm, lineHeight22, semiBold, regular },
} = commonStyles;

type TabType = "Agenda" | "Key Moments" | "Transcripts";

enum TabOptions {
	Agenda = "Agenda",
	KeyMoments = "Key Moments",
	Transcripts = "Transcripts",
}

type ITranscriptTabsProps = {
	agenda: string;
	highLightIndex: number;
	transcriptsData?: IKeyMovementTranscriptDetails;
	handleKeyMovementClick: (timeIndex: number) => void;
};

const TranscriptTabs = ({
	agenda,
	transcriptsData,
	highLightIndex,
	handleKeyMovementClick,
}: ITranscriptTabsProps) => {
	const [activeTab, setActiveTab] = useState<TabType | null>(null);

	const transcription = transcriptsData?.transcript?.transcription || [];
	const keyMoments = transcriptsData?.transcript?.keyMoments || [];

	const visibleTabs = useMemo(
		() =>
			[
				{ key: TabOptions.Agenda, isVisible: agenda != "" },
				{
					key: TabOptions.KeyMoments,
					isVisible: keyMoments.length > 0,
				},
				{
					key: TabOptions.Transcripts,
					isVisible: transcription.length > 0,
				},
			].filter((tab) => tab.isVisible),
		[agenda, transcriptsData?.transcript],
	);

	useEffect(() => {
		if (visibleTabs.length > 0) {
			setActiveTab(visibleTabs[0].key);
		}
	}, [visibleTabs]);

	const onKeyMovementClick = (timeStr: string) => {
		const milliseconds = timeStringToMilliseconds(timeStr);
		handleKeyMovementClick(milliseconds);
	};

	const renderKeyMomentItem = ({
		item,
	}: {
		item: { start: string; text: string };
	}) => (
		<View style={styles.transcriptMovementView}>
			<Pressable onPress={() => onKeyMovementClick(item.start)}>
				<RNText
					title={item?.start?.split(".")[0] || ""}
					style={styles.transcriptTimeTxt}
				/>
			</Pressable>
			<RNText title={item?.text} style={styles.keyMovementTxt} />
		</View>
	);

	if (!visibleTabs.length) return null;

	return (
		<View style={styles.cardViewStyle}>
			<View style={styles.titleView}>
				{visibleTabs.map(({ key }) => (
					<Pressable key={key} onPress={() => setActiveTab(key)}>
						<View style={styles.tabWrapper}>
							<RNText
								title={key}
								style={[
									styles.tabTxt,
									activeTab === key && styles.activeTabText,
								]}
							/>
							{activeTab === key && (
								<View style={styles.customUnderline} />
							)}
						</View>
					</Pressable>
				))}
			</View>

			{activeTab === TabOptions.Agenda && (
				<ScrollView style={styles.itemContainer}>
					<RenderHtml content={agenda} />
				</ScrollView>
			)}

			{activeTab === TabOptions.KeyMoments && (
				<FlatList
					data={keyMoments || []}
					keyExtractor={(_, index) => `key-moment-${index}`}
					renderItem={renderKeyMomentItem}
					style={styles.itemContainer}
				/>
			)}

			{activeTab === TabOptions.Transcripts && (
				<TranscriptList
					isFromLandscape
					highLightIndex={highLightIndex}
					transcriptsData={transcriptsData}
					handleKeyMovementClick={handleKeyMovementClick}
				/>
			)}
		</View>
	);
};

export default TranscriptTabs;

const styles = StyleSheet.create({
	activeTabText: {
		color: neutral.black,
		...medium,
	},
	cardViewStyle: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(8),
		height: verticalScale(300),
		marginBottom: verticalScale(20),
		marginTop: verticalScale(16),
		paddingBottom: verticalScale(10),
		shadowColor: neutral.black,
		...Platform.select({
			ios: {
				shadowOffset: { width: 0, height: verticalScale(2) },
				shadowOpacity: 0.2,
				shadowRadius: horizontalScale(3),
			},
			android: {
				elevation: 4,
			},
		}),
		overflow: Platform.OS === "android" ? "hidden" : undefined,
	},
	container: {
		columnGap: horizontalScale(8),
		flexDirection: "column",
		marginTop: verticalScale(10),
	},
	customUnderline: {
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(2),
		bottom: 0,
		height: verticalScale(2),
		position: "absolute",
		width: "80%",
	},
	highlightedText: {
		backgroundColor: highlight.text_blue,
		borderRadius: horizontalScale(6),
		color: colors.neutral.white,
		overflow: "hidden",
		padding: horizontalScale(5),
	},
	itemContainer: {
		flex: 1,
		paddingHorizontal: horizontalScale(16),
	},
	keyMovementTxt: {
		...sm,
		...medium,
		...lineHeight22,
		color: neutral.grey_08,
		marginBottom: verticalScale(6),
		marginRight: horizontalScale(6),
		width: "85%",
	},
	scrollContent: {
		paddingBottom: verticalScale(20),
	},
	tabTxt: {
		...sm,
		...medium,
		color: neutral.grey_07,
		paddingHorizontal: horizontalScale(6),
		paddingVertical: verticalScale(4),
	},
	tabWrapper: {
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: horizontalScale(6),
		paddingVertical: verticalScale(4),
		position: "relative",
	},
	timeBox: {
		backgroundColor: highlight.bg_blue,
		borderRadius: horizontalScale(4),
		marginBottom: verticalScale(4),
		padding: horizontalScale(6),
		width: "30%",
	},
	timeTxt: {
		color: neutral.grey_08,
		...sm,
	},
	titleView: {
		alignItems: "center",
		flexDirection: "row",
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(10),
	},
	transcriptMovementView: {
		columnGap: horizontalScale(10),
		flexDirection: "row",
	},
	transcriptTimeTxt: {
		color: highlight.text_blue,
		...sm,
		...medium,
		textDecorationLine: "underline",
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
