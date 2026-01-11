import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BackgroundTimer from "react-native-background-timer";

import RNText from "@components/Reusable/RNText";

import {
	formatTimeToHoursMinutesSecnds,
	horizontalScale,
	verticalScale,
} from "@utils/functions";

import { C } from "@assets/constants";
import { AssetTimerIcon, TimerRedIcon } from "@assets/icons";

interface TimerComponentProps {
	duration: number;
	type: string;
	onTimesUp: () => void;
}

const {
	colors: { neutral, state },
	commonStyles: {
		text: { regular, reg, md },
	},
} = C;

const TimerComponent: React.FC<TimerComponentProps> = ({
	duration,
	type,
	onTimesUp,
}) => {
	const [timer, setTimer] = useState<number | null>(null);
	const [hasCalledTimesUp, setHasCalledTimesUp] = useState<boolean>(false);
	const isLessThanTwoMinutes =
		timer && timer < 120 && type === "assessmentTimer";
	let timeout;

	useEffect(() => {
		if (duration) {
			setTimer(duration);
			setHasCalledTimesUp(false);
			BackgroundTimer.clearTimeout(timeout);
		}
	}, [duration]);

	useEffect(() => {
		if (timer === null || timer <= 0) {
			if (timer === 0 && !hasCalledTimesUp) {
				onTimesUp();
				setHasCalledTimesUp(true);
			}
			return;
		}

		timeout = BackgroundTimer.setTimeout(() => {
			setTimer((prev) => (prev !== null ? prev - 1 : null));
		}, 1000);

		return () => BackgroundTimer.clearTimeout(timeout);
	}, [timer, onTimesUp, hasCalledTimesUp]);

	const formattedTime =
		timer !== null ? formatTimeToHoursMinutesSecnds(timer) : null;

	// console.log("timer", timer);

	return (
		<>
			{duration ? (
				<View style={styles.container}>
					{type === "modalTimer" ? (
						<RNText style={styles.timeLeftText2}>
							You still have{" "}
							<RNText style={styles.boldText}>
								{formattedTime}
							</RNText>{" "}
							time left
						</RNText>
					) : (
						<>
							{isLessThanTwoMinutes ? (
								<TimerRedIcon />
							) : (
								<AssetTimerIcon />
							)}
							<RNText
								style={[
									styles.timerText,
									isLessThanTwoMinutes
										? styles.redText
										: styles.blacktext,
								]}
							>
								{formattedTime}
							</RNText>
						</>
					)}
				</View>
			) : (
				<></>
			)}
		</>
	);
};

export default memo(TimerComponent);

const styles = StyleSheet.create({
	blacktext: {
		color: neutral.black,
	},
	boldText: {
		color: neutral.black,
		fontWeight: "bold",
	},
	container: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(5),
		justifyContent: "center",
	},
	modalTimer: {
		...regular,
		...md,
	},
	redText: {
		color: state.error_red,
	},
	timeLeftText2: {
		color: neutral.grey_07,
		...md,
		fontWeight: "300",
		marginBottom: 10,
	},
	timerText: {
		...regular,
		...reg,
		lineHeight: verticalScale(18),
		marginRight: horizontalScale(5),
	},
});
