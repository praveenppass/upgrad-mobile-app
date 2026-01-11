import React from "react";
import { Pressable, View } from "react-native";

import { IPenaltyDetails } from "@components/moduleExtension/common/index.interface";
import styles from "@components/moduleExtension/common/index.style";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { ArrowUpIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const { neutral } = colors;

const PenaltyDetails = ({
	penaltyInfo,
	togglePenaltyDetails,
}: IPenaltyDetails) => (
	<View style={styles.penaltyDetailsDropDown}>
		<RNText
			title={strings.PENALTY_TIME_FRAMES}
			style={styles.penaltyDetailsDropDownHeading}
		/>
		<View>
			{penaltyInfo.map((penaltyPercentage, index) => (
				<View key={index} style={styles.penaltyItem}>
					<RNText
						title={penaltyPercentage.penalty}
						style={styles.penaltyItemString}
					/>

					<RNText
						title={`${penaltyPercentage.percentage}%`}
						style={styles.penaltyItemPercentage}
					/>
				</View>
			))}
		</View>
		<Pressable onPress={togglePenaltyDetails} style={styles.hideBtn}>
			<ArrowUpIcon
				color={neutral.grey_08}
				height={verticalScale(5)}
				width={horizontalScale(8)}
			/>
			<RNText title={strings.HIDE} style={styles.hideBtnText} />
		</Pressable>
	</View>
);

export default PenaltyDetails;
