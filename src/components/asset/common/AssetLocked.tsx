import React from "react";
import { StyleSheet, View } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";
import { formatDateByTime } from "@utils/timezoneHelper";

import { AssetLockType } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { LockedIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const {
	text: { regular, md, semiBold, xlg, medium },
} = commonStyles;

const { neutral } = colors;

const getTitleAndDescription = (type: AssetLockType) => {
	switch (type) {
		case AssetLockType.PREVIOUS_INCOMPLETE_ASSET:
			return {
				title: strings.PREV_RESOURCE_PENDING,
				description: strings.NOT_COMPLETED_DES,
			};

		case AssetLockType.PAST_DEADLINE_ASSET:
			return {
				title: strings.CONTENT_EXPIRED,
				description: strings.ASSET_AVAIL_UNTIL,
				description2: strings.NO_LONGER_AVAIL,
			};

		case AssetLockType.YET_TO_START_ASSET:
			return {
				title: strings.COMING_SOON,
				description: strings.ASSET_AVAIL_ON,
				description2: strings.PLEASE_CHECK_BACK,
			};
		default:
			return {
				title: "",
				description: "",
			};
	}
};

interface IAssetLocked {
	assetLockType: AssetLockType;
	date?: string;
}

const AssetLocked: React.FC<IAssetLocked> = ({
	assetLockType = AssetLockType.PREVIOUS_INCOMPLETE_ASSET,
	date,
}) => {
	const { title, description, description2 } =
		getTitleAndDescription(assetLockType);

	return (
		<View style={styles.container}>
			<LockedIcon
				height={verticalScale(120)}
				width={horizontalScale(180)}
			/>
			<RNText style={styles.title}>{title}</RNText>
			<RNText title={description} style={styles.description}>
				{[
					AssetLockType.PAST_DEADLINE_ASSET,
					AssetLockType.YET_TO_START_ASSET,
				].includes(assetLockType) && (
					<>
						<RNText
							style={styles.descriptionHighlight}
							title={date ? formatDateByTime(date) : ""}
						/>
						<RNText title={description2} />
					</>
				)}
			</RNText>
		</View>
	);
};

export default AssetLocked;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: horizontalScale(24),
	},
	description: {
		...md,
		...regular,
		color: neutral.grey_07,
		lineHeight: verticalScale(18),
		marginTop: verticalScale(12),
		textAlign: "center",
	},
	descriptionHighlight: {
		color: neutral.black,
		...medium,
	},
	title: {
		...semiBold,
		...xlg,
		color: neutral.black,
		lineHeight: verticalScale(27),
		marginTop: verticalScale(12),
		textAlign: "center",
	},
});
