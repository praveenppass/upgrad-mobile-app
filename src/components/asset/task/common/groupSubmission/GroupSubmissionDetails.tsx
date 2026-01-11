import React, { useState } from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";

import GroupMemberInitials, {
	GroupMemberInitialsSkeleton,
} from "@components/asset/task/common/groupSubmission/GroupMemberInitials";
import GroupNotAssigned from "@components/asset/task/common/groupSubmission/GroupNotAssigned";
import GroupSubmissionDetailsModal from "@components/asset/task/common/groupSubmission/GroupSubmissionDetailsModal";
import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { cta } = colors;

const {
	text: { regular, xxSm },
} = commonStyles;

interface IGroupSubmissionDetails {
	data: {
		firstName: string;
		lastName?: string | null;
		active?: boolean;
	}[];
	loading?: boolean;
	style?: StyleProp<ViewStyle>;
}

const getInitials = (firstName: string, lastName?: string | null) =>
	`${firstName.charAt(0).toUpperCase()}${lastName ? lastName.charAt(0).toUpperCase() : ""}`;

interface IGroupSubmissionDetailsSkeleton {
	style?: StyleProp<ViewStyle>;
}

const GroupSubmissionsDetailsSkeleton = ({
	style,
}: IGroupSubmissionDetailsSkeleton) => (
	<View style={style}>
		<View style={styles.rowContainer}>
			{new Array(3).fill(1).map((_, index) => (
				<GroupMemberInitialsSkeleton
					key={index}
					style={styles.memberInitialsStyle}
				/>
			))}

			<Skeleton style={[styles.pressable, styles.skeletonText]} />
		</View>
	</View>
);

const GroupSubmissionDetails: React.FC<IGroupSubmissionDetails> = ({
	data,
	loading,
	style,
}) => {
	const [viewDetails, setViewDetails] = useState(false);

	if (loading) return <GroupSubmissionsDetailsSkeleton style={style} />;

	if (!data.length) return <GroupNotAssigned style={style} />;

	const newData = data.slice(0, data.length > 3 ? 2 : 3);

	return (
		<View style={style}>
			<View style={styles.rowContainer}>
				{newData.map((item, index) => {
					return (
						<GroupMemberInitials
							key={index}
							initials={getInitials(
								item.firstName,
								item.lastName,
							)}
							active={item.active}
							index={index}
							style={styles.memberInitialsStyle}
						/>
					);
				})}
				{data.length > 3 && (
					<GroupMemberInitials
						initials={`+${data.length - 2}`}
						index={2}
						style={styles.memberInitialsStyle}
					/>
				)}
				<Pressable
					onPress={() => setViewDetails(true)}
					style={styles.pressable}
				>
					<RNText
						style={styles.viewDetailsText}
						title={strings.VIEW_DETAILS}
					/>
				</Pressable>
			</View>
			<GroupSubmissionDetailsModal
				visible={viewDetails}
				data={data}
				onClose={() => setViewDetails(false)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	memberInitialsStyle: {
		marginLeft: -horizontalScale(3),
	},
	pressable: {
		marginLeft: horizontalScale(3),
	},
	rowContainer: {
		alignItems: "center",
		flexDirection: "row",
		marginLeft: horizontalScale(3),
	},
	skeletonText: {
		height: verticalScale(10),
		width: horizontalScale(60),
	},
	viewDetailsText: {
		color: cta.text.default_secondary,
		...xxSm,
		...regular,
		lineHeight: verticalScale(24),
		textAlign: "center",
		textDecorationLine: "underline",
	},
});

export default GroupSubmissionDetails;
