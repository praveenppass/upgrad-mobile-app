import ReadMore from "@fawazahmed/react-native-read-more";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { styles } from "@components/asset/classOpinion";
import RNText from "@components/Reusable/RNText";
import SafeImage from "@components/Reusable/SafeImage";

import { IClassOpinionResponse } from "@graphql/query/asset/classOpinion/getClassOpinionResponses";

import { formatResponseTime } from "@utils/timezoneHelper";

import { colors } from "@assets/colors";
import { EditIcon } from "@assets/icons";
import { strings } from "@assets/strings";

const { neutral } = colors;

interface IOpinionListItem {
	item: IClassOpinionResponse;
	editable: boolean;
	onEditIconPress: () => void;
}

const OpinionListItem: React.FC<IOpinionListItem> = ({
	item,
	editable,
	onEditIconPress,
}) => {
	const { createdBy, response, updatedAt } = item;
	const nameInitials =
		`${createdBy?.firstName?.[0] || ""}${createdBy?.lastName?.[0] || ""}`.toUpperCase();

	const userAvatarFallback = (
		<View style={styles.avatarStyle}>
			<RNText title={nameInitials} style={styles.labelStyle} />
		</View>
	);

	return (
		<View style={styles.commentView}>
			<View style={styles.commentSubView}>
				<View style={styles.avatarContainer}>
					<SafeImage
						source={{ uri: createdBy?.image || "" }}
						imageStyle={styles.avatarImageStyle}
						fallbackComponent={userAvatarFallback}
					/>
				</View>
				<View style={styles.profileRowStyle}>
					<RNText
						title={`${createdBy?.firstName || ""} ${createdBy?.lastName || ""}${editable ? " (me)" : ""}`}
						style={styles.textNameStyle}
					/>
					<View style={styles.verDividerStyle} />
					<View style={styles.editView}>
						<RNText
							title={formatResponseTime(updatedAt || "")}
							style={styles.textTimeStyle}
						/>
						{editable && (
							<TouchableOpacity onPress={onEditIconPress}>
								<EditIcon color={neutral.grey_06} />
							</TouchableOpacity>
						)}
					</View>
				</View>
			</View>
			<ReadMore
				numberOfLines={3}
				style={styles.commentStyle}
				seeLessText={strings.VIEW_LESS}
				seeMoreText={strings.VIEW_MORE}
				seeMoreStyle={[styles.seeMoreLess]}
				seeLessStyle={[styles.seeMoreLess]}
			>
				{response}
			</ReadMore>
		</View>
	);
};
export default OpinionListItem;
