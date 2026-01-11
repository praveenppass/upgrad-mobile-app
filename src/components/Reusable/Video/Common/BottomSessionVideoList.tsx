import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	FlatList,
	Image,
	Modal,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Pressable,
	SafeAreaView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { ArrowLeftVideoIcon, ArrowRightVideoIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, cta, bg } = colors;
const { semiBold, md, bold } = commonStyles.text;

interface IArrowButtonProps {
	onPress: () => void;
	position: "left" | "right";
}

interface Layout {
	width: number;
}

interface IModerateItem {
	item: IVideoItem;
	index: number;
}
interface IVideoItem {
	brightcoveId: string;
	poster: string;
	uri: string;
	vimeoId: string | null;
}

interface IBottomSessionVideoListProps {
	videoData: IVideoItem[];
	isMultipleVideosModalVisible: boolean;
	toggleVideosResponseModal: () => void;
	selectedBrightCoveId: string;
	handleSelectVideo: (brightcoveId: string) => void;
}

const ArrowButton = ({ onPress, position }: IArrowButtonProps) => {
	const IconComponent =
		position === "left" ? ArrowLeftVideoIcon : ArrowRightVideoIcon;

	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.arrowContainer,
				position === "left"
					? styles.arrowLeftStyle
					: styles.arrowRightStyle,
			]}
		>
			<IconComponent />
		</Pressable>
	);
};

const BottomSessionVideoList = ({
	videoData,
	isMultipleVideosModalVisible,
	toggleVideosResponseModal,
	selectedBrightCoveId,
	handleSelectVideo,
}: IBottomSessionVideoListProps) => {
	const flatListRef = useRef<FlatList<IVideoItem> | null>(null);

	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);
	const [contentWidth, setContentWidth] = useState(0);
	const [layoutWidth, setLayoutWidth] = useState(0);

	const onScroll = useCallback(
		({
			nativeEvent: {
				contentOffset: { x: contentOffsetX },
				layoutMeasurement: { width: layoutWidth },
				contentSize: { width: contentWidth },
			},
		}: NativeSyntheticEvent<NativeScrollEvent>) => {
			setContentWidth(contentWidth);
			setLayoutWidth(layoutWidth);

			const threshold = 1;
			setShowLeftArrow(contentOffsetX > 0);
			setShowRightArrow(
				contentOffsetX + layoutWidth < contentWidth - threshold,
			);
		},
		[],
	);

	const scrollToLeft = useCallback(() => {
		flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
	}, []);

	const scrollToRight = useCallback(() => {
		if (flatListRef.current && contentWidth > layoutWidth) {
			flatListRef.current.scrollToOffset({
				animated: true,
				offset: contentWidth - layoutWidth,
			});
		}
	}, [contentWidth, layoutWidth]);

	useEffect(() => {
		if (contentWidth > layoutWidth) setShowRightArrow(true);
	}, [contentWidth, layoutWidth]);

	const handleLayout = useCallback(
		({
			nativeEvent: {
				layout: { width },
			},
		}: {
			nativeEvent: { layout: Layout };
		}) => {
			setLayoutWidth(width);
			if (contentWidth > width) {
				setShowRightArrow(true);
			}
		},
		[contentWidth],
	);

	const getItemLayout = (index: number) => ({
		length: horizontalScale(120),
		offset: horizontalScale(120) * index,
		index,
	});

	const modalRenderItem = ({ item, index }: IModerateItem) => {
		const dynamicTitle = `Part ${index + 1}`;
		return (
			<View style={styles.itemView}>
				<View
					style={[
						styles.itemContainer,
						selectedBrightCoveId === item.brightcoveId &&
							styles.selectedItem,
					]}
				>
					<TouchableWithoutFeedback
						onPress={() => {
							handleSelectVideo(item.brightcoveId);
						}}
					>
						<Image
							source={{
								uri: item?.poster,
							}}
							style={styles.image}
						/>
					</TouchableWithoutFeedback>
				</View>
				<RNText title={dynamicTitle} style={styles.sessionTitle} />
			</View>
		);
	};

	const renderArrow = (position: "left" | "right") => {
		const shouldShow = position === "left" ? showLeftArrow : showRightArrow;
		const onPress = position === "left" ? scrollToLeft : scrollToRight;
		if (!shouldShow) return null;
		return <ArrowButton onPress={onPress} position={position} />;
	};
	return (
		<Modal
			animationType="slide"
			transparent
			visible={isMultipleVideosModalVisible}
			onRequestClose={toggleVideosResponseModal}
			supportedOrientations={["portrait", "landscape"]}
		>
			<TouchableWithoutFeedback onPress={toggleVideosResponseModal}>
				<SafeAreaView style={styles.backdrop}>
					<TouchableWithoutFeedback style={styles.modalContainer}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<View style={styles.containerView}>
									<Pressable
										onPress={toggleVideosResponseModal}
									>
										<View style={styles.centerSlider}>
											<View style={styles.slider} />
										</View>
									</Pressable>
									<RNText
										title={strings.SESSION_PARTS}
										style={styles.titleStyle}
									/>
								</View>

								<View style={styles.flatlistContainer}>
									<FlatList
										ref={flatListRef}
										data={videoData}
										renderItem={modalRenderItem}
										keyExtractor={(item) =>
											item?.brightcoveId
										}
										horizontal
										showsHorizontalScrollIndicator={false}
										onScroll={onScroll}
										onLayout={handleLayout}
										getItemLayout={getItemLayout}
									/>

									{renderArrow("left")}
									{renderArrow("right")}
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default BottomSessionVideoList;

const styles = StyleSheet.create({
	arrowContainer: {
		alignItems: "center",
		backgroundColor: neutral.black,
		borderRadius: horizontalScale(5),
		height: verticalScale(100),
		justifyContent: "center",
		opacity: 0.73,
		padding: horizontalScale(5),
		position: "absolute",
		top: "8%",
		zIndex: 9999,
	},
	arrowLeftStyle: {
		borderBottomLeftRadius: horizontalScale(20),
		borderTopLeftRadius: horizontalScale(20),
		left: horizontalScale(10),
	},
	arrowRightStyle: {
		borderBottomRightRadius: horizontalScale(20),
		borderTopRightRadius: horizontalScale(20),
		right: horizontalScale(10),
	},
	backdrop: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	centerSlider: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: verticalScale(5),
	},
	centeredView: {
		alignItems: "center",
		backgroundColor: bg.fill.video,
		flex: 1,
		justifyContent: "center",
	},
	containerView: {
		alignItems: "center",
		justifyContent: "center",
		marginVertical: verticalScale(5),
	},
	flatlistContainer: {
		padding: horizontalScale(10),
	},
	flatlistContent: {
		paddingRight: horizontalScale(50),
	},
	image: {
		borderRadius: horizontalScale(18),
		height: "100%",
		width: "100%",
	},
	itemContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(20),
		height: verticalScale(100),
		justifyContent: "center",
		marginRight: horizontalScale(5),
		width: horizontalScale(150),
	},
	itemView: {
		columnGap: horizontalScale(10),
		marginRight: horizontalScale(10),
	},
	modalContainer: { flex: 1 },
	modalView: {
		backgroundColor: neutral.white,
		borderTopLeftRadius: horizontalScale(20),
		borderTopRightRadius: horizontalScale(20),
		bottom: 0,
		position: "absolute",
		width: "100%",
	},
	selectedItem: {
		borderColor: cta.fill.watch_recording,
		borderWidth: horizontalScale(3),
	},
	sessionTitle: {
		...md,
		lineHeight: verticalScale(20),
		...bold,
		color: neutral.black,
		marginVertical: verticalScale(5),
	},
	slider: {
		backgroundColor: neutral.grey_04,
		borderRadius: horizontalScale(100),
		height: verticalScale(4),
		marginTop: verticalScale(5),
		width: horizontalScale(64),
	},
	titleStyle: {
		...md,
		lineHeight: verticalScale(20),
		...semiBold,
		color: neutral.black,
		marginTop: verticalScale(5),
	},
});
