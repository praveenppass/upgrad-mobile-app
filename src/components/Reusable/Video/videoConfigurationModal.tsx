import React, { useState } from "react";
import {
	FlatList,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { moderateScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { PlayPauseIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const ICON_SIZE = {
	width: 20,
	height: 20,
};
// Example Icon Library

const data = [
	// { id: "1", icon: "home", title: "Video Quality", rightText: "Go" },
	{
		id: "2",
		icon: <PlayPauseIcon {...ICON_SIZE} />,
		title: "Playback Speed",
		rightText: "Edit",
	},
];

const { neutral } = colors;

const playback_data = [
	{
		id: 1,
		title: "0.5x",
		value: 0.5,
	},
	{
		id: 2,
		title: "Normal",
		value: 1,
	},
	{
		id: 3,
		title: "1.25x",
		value: 1.25,
	},
	{
		id: 4,
		title: "1.5x",
		value: 1.5,
	},
	{
		id: 5,
		title: "2x",
		value: 2,
	},
];

const {
	text: { semiBold, md, sm },
} = commonStyles;

const ListItem = ({ item, setRenderScreen, playSpeedRate }) => {
	const type = item?.title?.replace(" ", "")?.toLowerCase();
	const _playbackSpeed =
		type === RenderscreenEnum.playbackspeed &&
		playSpeedRate &&
		playback_data.find((i) => i.value === playSpeedRate);
	return (
		<Pressable onPress={() => setRenderScreen(item.title)}>
			<View style={styles.item}>
				<RNText style={styles.icon}>{item.icon}</RNText>

				<RNText style={styles.title}>{item.title}</RNText>
				<RNText style={styles.rightText}>
					{_playbackSpeed?.title || ""}
				</RNText>
			</View>
		</Pressable>
	);
};

const PlaybackItem = ({
	item,
	selectOptions,
	playSpeedRate,
}: {
	playSpeedRate: number;
	selectOptions: (data: { type: string; value: number }) => void;
}) => (
	<TouchableOpacity
		onPress={() =>
			selectOptions({
				type: RenderscreenEnum.playbackspeed,
				value: item.value,
			})
		}
	>
		<View style={styles.item}>
			<Text
				style={[
					styles.title,
					item.value === playSpeedRate && { fontWeight: "bold" },
				]}
			>
				{item.title}
			</Text>
		</View>
	</TouchableOpacity>
);

enum RenderscreenEnum {
	intital = "intital",
	playbackspeed = "playbackspeed",
	videoquality = "videoquality",
}

interface IVideoConfigurationProps {
	isVideoConfigModal: boolean;
	selectOptions: (data: { type: string; value: number }) => void;
	closeModal: (data: boolean) => void;
	playSpeedRate: number;
	isFullscreen: boolean | undefined;
}

const VideoconfigurationModal = ({
	isVideoConfigModal,
	selectOptions,
	closeModal,
	playSpeedRate,
	isFullscreen,
}: IVideoConfigurationProps) => {
	const [renderScreen, setRenderScreen] = useState(RenderscreenEnum.intital);
	const type = renderScreen?.replace(" ", "")?.toLowerCase();
	const { bottom } = useSafeAreaInsets();

	const renderComponent = (t, item) => {
		switch (t) {
			case RenderscreenEnum.intital:
				return (
					<ListItem
						playSpeedRate={playSpeedRate}
						setRenderScreen={setRenderScreen}
						item={item}
					/>
				);
			case RenderscreenEnum.playbackspeed:
				return (
					<PlaybackItem
						playSpeedRate={playSpeedRate}
						selectOptions={selectOptions}
						item={item}
					/>
				);
		}
	};
	const renderData = (t) => {
		switch (t) {
			case RenderscreenEnum.intital:
				return data;
			case RenderscreenEnum.playbackspeed:
				return playback_data;
			default:
				return data;
		}
	};
	const render_data = renderData(type);
	const findIcon = data.find((i) => i?.title === renderScreen);

	return (
		<ActionModal
			isOpen={isVideoConfigModal}
			closeModal={() => closeModal(true)}
			style={[styles.modal, { width: isFullscreen ? "60%" : "100%" }]}
		>
			{type !== RenderscreenEnum.intital && (
				<View style={styles.iconTextView}>
					{findIcon?.icon}
					<RNText style={styles.playBackTitle}>{renderScreen}</RNText>
				</View>
			)}
			<FlatList
				data={render_data}
				style={{
					padding: moderateScale(20),
					paddingBottom: Platform.OS === "ios" ? bottom - bottom : 20,
				}}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <>{renderComponent(type, item)}</>}
			/>
		</ActionModal>
	);
};
const styles = StyleSheet.create({
	icon: {
		marginRight: 10,
	},
	iconTextView: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		padding: moderateScale(20),
	},
	item: {
		alignItems: "center",
		flexDirection: "row",
		padding: 15,
	},
	modal: {
		alignSelf: "center",
		paddingHorizontal: 0,
		paddingVertical: 0,
	},
	playBackTitle: {
		marginLeft: moderateScale(5),
		...md,
		...semiBold,
		color: neutral.black,
	},
	rightText: {
		color: neutral.grey_07,
		...sm,
	},
	title: {
		color: neutral.black,
		flex: 1,
		...md,
		fontWeight: "normal",
	},
});

export default VideoconfigurationModal;
