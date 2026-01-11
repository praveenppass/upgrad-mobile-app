import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import ProfilePicture, {
	IProfilePictureType,
} from "@components/Reusable/ProfilePicture";
import ProgressBar from "@components/Reusable/ProgressBar";
import RNText from "@components/Reusable/RNText";

import useGetUserType from "@hooks/useGetUserType";

import { horizontalScale, verticalScale } from "@utils/functions";

import { RootState } from "@redux/store/root.reducer";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { md, sm, bold, xxSm, regular } = commonStyles.text;

const { neutral } = colors;

interface IProfileHeaderProps {
	profileProgress?: number;
	userDetails: {
		email?: string | null;
		firstName?: string | null;
		lastName?: string | null;
		image?: string | null;
		initials?: string | null;
	};
}

interface IDisplayName {
	firstName?: string | null;
	lastName?: string | null;
}

const ProfileHeader = ({
	profileProgress,
	userDetails,
}: IProfileHeaderProps) => {
	const progress = Math.round(profileProgress || 0);

	const { isLearnUser } = useGetUserType();
	const { isDummyToken } = useSelector((state: RootState) => state.user);

	const displayName = ({ firstName, lastName }: IDisplayName): string => {
		if (firstName && lastName) return `${firstName} ${lastName}`;
		if (firstName) return firstName;
		if (lastName) return lastName;

		return strings.HELLO_GUEST;
	};

	return (
		<View style={styles.header}>
			<ProfilePicture type={IProfilePictureType.LARGE} />
			<View style={styles.headerContent}>
				<RNText
					style={styles.headerTitle}
					title={displayName({
						firstName: userDetails.firstName,
						lastName: userDetails.lastName,
					})}
					numberOfLines={2}
				/>
				{/* Progress bar commented : Hakuna Matata */}
				{!isDummyToken &&
					(isLearnUser ? (
						<ProgressBar
							progress={progress}
							// rightTextTitle={`${progress}%`}
							// rightTextStyle={styles.progressText}
							leftTextTitle={userDetails.email || ""}
							leftTextStyle={styles.emailText}
							showProgress={false}
						/>
					) : (
						<RNText style={styles.emailText}>
							{userDetails.email || ""}
						</RNText>
					))}
			</View>
		</View>
	);
};

export default memo(ProfileHeader);

const styles = StyleSheet.create({
	emailText: {
		...sm,
		...regular,
		color: neutral.grey_07,
	},
	header: {
		backgroundColor: neutral.white,
		borderTopEndRadius: horizontalScale(8),
		borderTopStartRadius: horizontalScale(8),
		flexDirection: "row",
		gap: horizontalScale(8),
		paddingBottom: verticalScale(2),
		paddingLeft: horizontalScale(13),
		paddingRight: horizontalScale(20),
		paddingTop: verticalScale(12),
	},
	headerContent: {
		flex: 1,
		gap: verticalScale(4),
	},

	headerTitle: {
		textTransform: "capitalize",
		...md,
		...bold,
	},

	progressText: {
		...xxSm,
		...regular,
	},
	skeltonStyle: {
		borderRadius: horizontalScale(90),
		height: horizontalScale(100),
		width: horizontalScale(100),
	},
});
