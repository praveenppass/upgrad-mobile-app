import React, { useCallback, useEffect, useState } from "react";
import { PanResponder, StyleSheet, View } from "react-native";

import { colors } from "@assets/colors";

interface SeekerProps {
	currentTime: number;
	duration: number;
	subAssets: Array<{ asset: { name: string; loadAt: number } }>;
	videoSeek: (arg0: number) => void;
	customSeekbarStyles: {};
}
const { state, neutral } = colors;

export const Seeker = ({
	currentTime,
	duration,
	subAssets,
	videoSeek,
	customSeekbarStyles,
}: SeekerProps) => {
	const [seekerPosition, setSeekerPosition] = useState(0);
	const [seekerWidth, setSeekerWidth] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	const updateSeekerPosition = useCallback(
		(position = 0) => {
			const clampedPosition = Math.max(
				0,
				Math.min(position, seekerWidth),
			);
			setSeekerPosition(clampedPosition);
		},
		[seekerWidth],
	);

	const calculateTimeFromSeekerPosition = () => {
		const percent = seekerPosition / seekerWidth;
		return duration * percent;
	};

	const seekPanResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onMoveShouldSetPanResponder: () => true,
		onPanResponderGrant: (evt) => {
			setIsDragging(true);

			const position = evt.nativeEvent.locationX;
			updateSeekerPosition(position);
		},
		onPanResponderMove: (evt) => {
			const position = evt.nativeEvent.locationX;
			updateSeekerPosition(position);
		},
		onPanResponderRelease: () => {
			const time = calculateTimeFromSeekerPosition();
			videoSeek(time);
			setIsDragging(false);
		},
	});
	useEffect(() => {
		if (!isDragging && duration > 0 && seekerWidth > 0) {
			const percent = currentTime / duration;
			const position = percent * seekerWidth;
			setSeekerPosition(Math.max(0, Math.min(position, seekerWidth)));
		}
	}, [currentTime, duration, seekerWidth, isDragging]);

	if (!seekPanResponder) {
		return null;
	}

	const seekerStyle = [
		styles.seekbarFill,
		{
			width: seekerPosition > 0 ? seekerPosition : 0,
			backgroundColor: "#FFF",
		},
	];

	const seekerPositionStyle = [
		styles.seekbarHandle,
		{
			left: Math.max(0, Math.min(seekerPosition, seekerWidth - 10)),
		},
	];

	const seekerPointerStyle = [
		styles.seekbarCircle,
		{ backgroundColor: "#FFF" },
	];

	const highlightMarkers = subAssets.map((subAsset, index) => {
		const { loadAt } = subAsset;

		const left =
			duration > 0 && seekerWidth > 0
				? (loadAt / duration) * seekerWidth
				: 0;

		return (
			<View
				key={index}
				style={[
					styles.highlightMarker,
					{ left: !isNaN(left) ? left : 0 },
				]}
			/>
		);
	});

	return (
		<View
			style={[styles.seekbarContainer, customSeekbarStyles]}
			{...seekPanResponder.panHandlers}
			{...styles.generalControls}
		>
			<View
				style={styles.seekbarTrack}
				onLayout={(event) => {
					setSeekerWidth(event.nativeEvent.layout.width);
				}}
				pointerEvents={"none"}
			>
				<View style={seekerStyle} pointerEvents={"none"} />
			</View>
			<View
				style={[
					styles.seekbarFill,
					{ width: seekerPosition > 0 ? seekerPosition : 0 },
				]}
			/>
			{highlightMarkers}
			<View style={seekerPositionStyle} pointerEvents={"none"}>
				<View style={seekerPointerStyle} pointerEvents={"none"} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	seekbarContainer: {
		flex: 1,
		flexDirection: "row",
		borderRadius: 4,
		height: 20,
		alignItems: "center",
		width: "95%",
		alignSelf: "center",
	},
	seekbarTrack: {
		backgroundColor: neutral.grey_09,
		height: 4,
		position: "relative",
		width: "100%",
	},
	seekbarFill: {
		backgroundColor: neutral.white,
		height: 4,
		width: "100%",
	},
	seekbarHandle: {
		position: "absolute",
		marginLeft: -7,
		height: 28,
		width: 28,
	},
	seekbarCircle: {
		borderRadius: 10,
		position: "relative",
		top: 8.5,
		left: 8,
		height: 10,
		width: 10,
	},
	generalControls: {
		flex: 1,
		flexDirection: "row",
		borderRadius: 4,
		overflow: "hidden",
	},
	highlightMarker: {
		position: "absolute",
		width: 4,
		height: 4,
		backgroundColor: state.warning_yellow,
		top: 6,
		marginTop: 2,
	},
});

export default Seeker;
