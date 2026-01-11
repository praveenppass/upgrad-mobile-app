import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import CircleProgressBar from "@components/Reusable/CircleProgressBar/CircleProgressBar";
import ProfileIconHeader from "@components/Reusable/ProfileIconHeader";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";
import measures from "@utils/measures";

import { type RootState } from "@redux/store/root.reducer";

import { C } from "@assets/constants";

const {
	strings,
	themes: { text, border, snackbar },
	commonStyles: {
		spacing: { g4, pv12, ph20, ml16, mt8, ph8 },
		align: { flex1, row, justifyCenter, alignCenter, selfCenter },
		text: {
			w600,
			reg,
			md,
			sm,
			lineHeight19,
			lightBold,
			clrWhite,
			bold,
			clrBlack,
		},
	},
	colors: { neutral },
} = C;

type IProfileHeaderProps = {
	profileProgress?: number;
	onEditHandler: () => void;
};

const {
	BORDER: { b2, b18, b90 },
} = measures;

const ProfileHeader = ({ profileProgress }: IProfileHeaderProps) => {
	const {
		uploadImageLoader,
		user: { email, firstName, lastName, designation },
	} = useSelector((state: RootState) => state.user);

	const progress = Math.round(profileProgress || 0);
	const badgeBackgroundColor = {
		backgroundColor: progress < 20 ? border.pink : snackbar.success,
	};

	return (
		<View style={[pv12, ph20, row, styles.header]}>
			{uploadImageLoader ? (
				<Skeleton style={styles.skeltonStyle} />
			) : (
				<CircleProgressBar
					progress={progress}
					radius={horizontalScale(52)}
					strokeWidth={horizontalScale(8)}
					progressBarColors={{
						active: border.green,
					}}
					textStyle={styles.progressText}
				>
					<View>
						<ProfileIconHeader picDimensions />
						<View
							style={[styles.bageViewStyle, badgeBackgroundColor]}
						>
							<RNText
								style={[sm, lineHeight19, lightBold, clrWhite]}
								title={`${progress}%`}
							/>
						</View>
					</View>
				</CircleProgressBar>
			)}

			<View style={[flex1, ml16, g4, justifyCenter]}>
				<View style={styles.nameView}>
					<RNText
						style={[w600, reg, styles.headerTitle]}
						title={
							firstName
								? `${firstName} ${lastName ? lastName : ""}`
								: strings.LEARNER
						}
						numberOfLines={2}
					/>
				</View>
				<RNText style={styles.headerSubText} title={email} />
				<RNText
					style={[styles.headerSubText, mt8]}
					title={designation}
				/>
			</View>
		</View>
	);
};

export default memo(ProfileHeader);

const styles = StyleSheet.create({
	bageViewStyle: {
		bottom: -11,
		position: "absolute",
		...justifyCenter,
		...selfCenter,
		...ph8,
		borderColor: neutral.white,
		borderRadius: b18,
		borderWidth: b2,
	},
	header: {
		backgroundColor: neutral.white,
	},
	headerSubText: {
		...md,
		color: text.steelBlue,
	},
	headerTitle: {
		textTransform: "capitalize",
	},
	nameView: { ...row, ...alignCenter, width: horizontalScale(180) },
	progressText: {
		...md,
		...bold,
		...clrBlack,
	},
	skeltonStyle: {
		borderRadius: horizontalScale(90),
		height: verticalScale(100),
		width: horizontalScale(100),
	},
});
