import React, { useRef, useState } from "react";
import {
	FlatList,
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Pressable,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import {
	GrayDownArrowIcon,
	GrayUpArrowIcon,
	WhiteLeftIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, cta } = colors;
const {
	text: { regular, sm, md, medium, bold },
} = commonStyles;

interface VideoItem {
	brightcoveId: string;
	poster: string;
	uri: string;
	vimeoId: string | null;
}

interface IModerateItem {
	item: VideoItem;
	index: number;
}

interface SessionVideoListProps {
	videoData: VideoItem[];
	selectedBrightCoveId: string;
	handleSelectVideo: (brightcoveId: string) => void;
}

const SessionVideoList = ({
	videoData,
	selectedBrightCoveId,
	handleSelectVideo,
}: SessionVideoListProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const flatListRef = useRef<FlatList<VideoItem> | null>(null);
	const [currentOffset, setCurrentOffset] = useState(0);

	const handleToggle = () => {
		setIsExpanded((prev) => !prev);
	};

	const scrollStep = horizontalScale(120);
	const scrollToLeftStep = () => {
		const newOffset = Math.max(currentOffset + scrollStep, 0);

		if (flatListRef.current) {
			flatListRef.current.scrollToOffset({
				offset: newOffset,
				animated: true,
			});
			setCurrentOffset(newOffset);
		}
	};

	const onScroll = ({
		nativeEvent: {
			contentOffset: { x },
		},
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		setCurrentOffset(x);
	};

	const modalRenderItem = ({ item, index }: IModerateItem) => {
		const dynamicTitle = `Part ${index + 1}`;
		const isSelected = selectedBrightCoveId === item.brightcoveId;
		return (
			<View>
				<View style={styles.itemContainer}>
					<TouchableWithoutFeedback
						onPress={() => {
							handleSelectVideo(item.brightcoveId);
						}}
					>
						<Image
							source={{
								uri: item?.poster,
							}}
							style={[
								styles.image,
								isSelected && styles.selectedImage,
							]}
						/>
					</TouchableWithoutFeedback>
				</View>
				<RNText
					title={dynamicTitle}
					style={[styles.sessionTitle, isSelected && styles.boldTxt]}
				/>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<RNText
					title={strings.SESSION_PARTS}
					style={styles.headerText}
				/>

				<Pressable onPress={handleToggle} style={styles.iconPressable}>
					{isExpanded ? <GrayUpArrowIcon /> : <GrayDownArrowIcon />}
				</Pressable>
			</View>

			{isExpanded ? (
				<View style={styles.itemView}>
					<FlatList
						ref={flatListRef}
						data={videoData}
						renderItem={modalRenderItem}
						keyExtractor={(item) => item.brightcoveId}
						horizontal
						showsHorizontalScrollIndicator={false}
						scrollEventThrottle={16}
						onScroll={onScroll}
					/>
					{videoData.length > 3 && (
						<Pressable
							style={styles.leftViewContainer}
							onPress={scrollToLeftStep}
						>
							<WhiteLeftIcon
								height={verticalScale(20)}
								width={horizontalScale(30)}
							/>
						</Pressable>
					)}
				</View>
			) : null}
		</View>
	);
};

export default SessionVideoList;

const styles = StyleSheet.create({
	boldTxt: {
		color: neutral.grey_08,
		...bold,
	},
	container: {
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(8),
		flexGrow: 1,
		marginVertical: verticalScale(10),
	},
	header: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: horizontalScale(10),
	},
	headerText: {
		...md,
		...medium,
		color: neutral.black,
	},
	iconPressable: {
		alignItems: "center",
		height: verticalScale(30),
		justifyContent: "center",
		paddingHorizontal: horizontalScale(10),
	},
	image: {
		borderRadius: horizontalScale(11),
		height: "100%",
		width: "100%",
	},
	itemContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(11),
		height: verticalScale(65),
		justifyContent: "center",
		marginRight: horizontalScale(5),
		width: horizontalScale(100),
	},
	itemView: {
		flexGrow: 1,
		padding: horizontalScale(10),
	},
	leftViewContainer: {
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.75)",
		height: "100%",
		justifyContent: "center",
		position: "absolute",
		right: 0,
		width: horizontalScale(30),
	},
	selectedImage: {
		borderColor: cta.fill.watch_recording,
		borderRadius: horizontalScale(11),
		borderWidth: horizontalScale(2),
	},
	selectedItem: {
		borderColor: cta.fill.watch_recording,
		borderWidth: horizontalScale(3),
	},
	sessionTitle: {
		...sm,
		lineHeight: verticalScale(20),
		...regular,
		color: neutral.grey_08,
		marginLeft: horizontalScale(10),
		marginVertical: verticalScale(5),
	},
});
