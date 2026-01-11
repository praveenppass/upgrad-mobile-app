import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import GroupMemberInitials from "@components/asset/task/common/groupSubmission/GroupMemberInitials";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const { neutral, cta } = colors;

const {
	text: { regular, md },
} = commonStyles;

interface IGroupMember {
	firstName: string;
	lastName?: string | null;
	active?: boolean;
}

interface IGroupSubmissionDetailsModalProps {
	data: IGroupMember[];
	onClose: () => void;
	visible: boolean;
}

const getInitials = (firstName: string, lastName?: string | null) =>
	`${firstName.charAt(0).toUpperCase()}${lastName ? lastName.charAt(0).toUpperCase() : ""}`;

const getFullName = (member: IGroupMember) => {
	return member.firstName + (member.lastName ? ` ${member.lastName}` : "");
};

const renderItem = ({ item, index }: { item: IGroupMember; index: number }) => {
	return (
		<View style={styles.rowContainer}>
			<GroupMemberInitials
				initials={getInitials(item.firstName, item.lastName)}
				index={index}
			/>
			<RNText style={styles.textStyle} title={getFullName(item)} />
		</View>
	);
};

const GroupSubmissionDetailsModal: React.FC<
	IGroupSubmissionDetailsModalProps
> = ({ data, visible, onClose }) => (
	<ActionModal isOpen={visible} closeModal={onClose}>
		<View style={styles.indicatorStyle} />
		<FlatList
			data={data}
			style={styles.listStyle}
			renderItem={renderItem}
			keyExtractor={(_, index) => index.toString()}
			showsVerticalScrollIndicator={false}
		/>
	</ActionModal>
);

const styles = StyleSheet.create({
	indicatorStyle: {
		alignSelf: "center",
		backgroundColor: neutral.grey_05,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(8),
		width: horizontalScale(64),
	},
	listStyle: {
		marginTop: verticalScale(36),
	},
	rowContainer: {
		alignItems: "center",
		flexDirection: "row",
		marginBottom: verticalScale(16),
	},
	textStyle: {
		color: cta.text.default_secondary,
		...md,
		...regular,
		lineHeight: verticalScale(21),
		marginLeft: horizontalScale(8),
		textAlign: "center",
	},
});

export default GroupSubmissionDetailsModal;
