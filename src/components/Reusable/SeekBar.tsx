import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	gestureHandlerRootHOC,
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
	State,
	TapGestureHandler,
	TapGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";

interface ISeekBar {
	progress: number;
	onProgressChanged?: (value: number) => void;
	onProgressChangedEnd?: (value: number) => void;
	onProgressChangedStart?: () => void;
}

const SeekBar: React.FC<ISeekBar> = ({
	progress,
	onProgressChanged,
	onProgressChangedEnd,
	onProgressChangedStart,
}) => {
	const [trackWidth, setTrackWidth] = useState(0);
	const panRef = useRef<PanGestureHandler>(null);

	const [position, setPosition] = useState(0);

	useEffect(() => {
		const initialPosition = (progress / 100) * trackWidth;
		setPosition(initialPosition);
	}, [trackWidth, progress]); //TODO check

	const handleGestureEvent = (event: PanGestureHandlerGestureEvent) => {
		const { x } = event.nativeEvent;

		const newPosition = Math.max(0, Math.min(x, trackWidth));

		setPosition(newPosition);

		const percentage = (newPosition / trackWidth) * 100;
		onProgressChanged?.(percentage);
	};

	const handleTap = (event: TapGestureHandlerStateChangeEvent) => {
		if (event.nativeEvent.state === State.ACTIVE) {
			const { x } = event.nativeEvent;

			const newPosition = Math.max(0, Math.min(x, trackWidth));
			setPosition(newPosition);

			const percentage = (newPosition / trackWidth) * 100;
			onProgressChanged?.(percentage);
			onProgressChangedEnd?.(percentage);
		}
	};

	const handleGestureStateChange = (event: PanGestureHandlerGestureEvent) => {
		if (event.nativeEvent.state === State.END) {
			const percentage = (position / trackWidth) * 100;
			onProgressChangedEnd?.(percentage);
		} else if (event.nativeEvent.state === State.BEGAN)
			onProgressChangedStart?.();
	};

	return (
		<View
			style={styles.container}
			onLayout={(event) => {
				setTrackWidth(event.nativeEvent.layout.width);
			}}
		>
			<TapGestureHandler onHandlerStateChange={handleTap}>
				<View>
					<PanGestureHandler
						ref={panRef}
						onGestureEvent={handleGestureEvent}
						onHandlerStateChange={handleGestureStateChange}
					>
						<View style={styles.trackContainer}>
							<View style={styles.track} />
							<View
								style={[
									styles.trackOverlay,
									{ width: position },
								]}
								pointerEvents="none"
							/>
							<View
								style={[
									styles.seekBarIcon,
									{ left: position - horizontalScale(6) },
								]}
							/>
						</View>
					</PanGestureHandler>
				</View>
			</TapGestureHandler>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		position: "relative",
	},
	seekBarIcon: {
		backgroundColor: colors.primary.red_05,
		borderRadius: horizontalScale(10),
		height: horizontalScale(10),
		position: "absolute",
		width: horizontalScale(10),
	},
	track: {
		backgroundColor: colors.neutral.grey_06,
		borderRadius: horizontalScale(2),
		height: verticalScale(2),
	},
	trackContainer: {
		height: verticalScale(16),
		justifyContent: "center",
	},
	trackOverlay: {
		backgroundColor: colors.neutral.white,
		borderRadius: horizontalScale(2),
		height: verticalScale(2),
		position: "absolute",
	},
});

export default gestureHandlerRootHOC(SeekBar);
