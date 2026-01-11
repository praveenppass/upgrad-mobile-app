import { useNavigation, useRoute } from "@react-navigation/native";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { MixedStyleRecord } from "react-native-render-html";
import { useSelector } from "react-redux";

import AttachmentChip from "@components/Chips/AttachmentChip";
import ProfileIconItem from "@components/Reusable/ProfileIconItem";
import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";

import {
	formatDate,
	getInitials,
	horizontalScale,
	parseTicketHTMLDescription,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { RootState } from "@redux/store/root.reducer";

import { IDateFormat } from "@interface/app.interface";
import { ITicketConversation } from "@interface/helpSupport.interface";
import {
	RootHomeStackList,
	RootHomeStackRouteProps,
} from "@interface/types/rootHomeStack.type";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { strings } from "@assets/strings";

const {
	themes: { bg, text, primary },
	commonStyles: {
		spacing: { m12, p10, g6 },
		align: { rowBetween, itemsCenter, selfEnd, fWrap, rowReverse, flex1 },
		text: { clrWhite, sm, reg, clrBlue, bold, clrLightBlue },
	},
} = C;

const SupportTicketCard = ({
	createdAt,
	createdBy,
	description,
	attachments,
}: ITicketConversation) => {
	const { navigate } = useNavigation<RootHomeStackList>();
	const { params } = useRoute<RootHomeStackRouteProps<"TicketDetails">>();
	const userId = useSelector((state: RootState) => state.user?.user?.id);
	const userImgUrl = useSelector(
		(state: RootState) => state.user?.user?.image,
	);

	const isSameUser = userId === createdBy?.id;
	const userImage = isSameUser ? userImgUrl : createdBy?.image;

	const bubbleWrapperStyle = StyleSheet.compose(
		g6,
		isSameUser ? rowBetween : styles.rowRev,
	);
	const bubbleStyle = StyleSheet.compose(
		styles.bubble,
		isSameUser ? styles.bgActive : null,
	);
	const bubbleTimeText = StyleSheet.compose(
		sm,
		isSameUser ? clrWhite : clrLightBlue,
	);
	const profileIconStyle = StyleSheet.compose(
		styles.profileContainer,
		styles.imgStyle,
	);
	const attachIconColor: string = isSameUser ? text.mintBlue : text.darkBlue;

	const textColor = isSameUser ? primary.color2 : text.steelBlue;
	let userProfileName = "";
	if (createdBy) {
		userProfileName = getInitials(
			createdBy?.name ?? `${createdBy?.firstName} ${createdBy?.lastName}`,
		);
	}
	const tagsStyles: MixedStyleRecord = {
		body: {
			color: textColor,
		},
	};

	const { details } = parseTicketHTMLDescription(description);

	return (
		<View style={styles.bubbleCard}>
			<View style={bubbleWrapperStyle}>
				<View style={bubbleStyle}>
					<RenderHtml content={details} />
					{attachments?.length > 0 && (
						<View style={[fWrap, g6]}>
							{attachments?.map((attachment) => {
								const type =
									attachment?.content_type ??
									attachment?.contentType;
								const fileUrl =
									attachment?.attachmentUrl ??
									attachment?.attachment_url;
								const onViewAttachment = () => {
									navigate("ImageViewScreen", {
										file: {
											fileUrl: fileUrl ?? "",
											contentType: type,
										},
										headerText: `${strings.TICKET_TXT}${params?.id}`,
									});
								};
								return (
									<AttachmentChip
										key={attachment.name}
										title={attachment.name}
										onTap={onViewAttachment}
										attachIconColor={attachIconColor}
										rootStyle={
											isSameUser
												? styles.attachIcon
												: null
										}
									/>
								);
							})}
						</View>
					)}
					<View style={selfEnd}>
						<RNText
							style={bubbleTimeText}
							title={formatDate(createdAt, IDateFormat.time)}
						/>
					</View>
				</View>
				<ProfileIconItem
					image={userImage}
					title={userProfileName}
					imageStyle={styles.imgStyle}
					textStyle={styles.profileTxt}
					containerStyle={profileIconStyle}
				/>
			</View>
		</View>
	);
};

export default memo(SupportTicketCard);

const styles = StyleSheet.create({
	attachIcon: {
		backgroundColor: bg.transparent,
		borderColor: text.mintBlue,
		elevation: 0,
	},
	bgActive: {
		backgroundColor: text.darkBlue,
	},
	bubble: {
		...g6,
		...p10,
		...flex1,
		backgroundColor: bg.chip,
		borderRadius: measures.BORDER.b10,
	},
	bubbleCard: {
		...m12,
	},
	imgStyle: {
		borderRadius: measures.BORDER.b90,
		height: horizontalScale(40),
		width: horizontalScale(40),
	},
	link: {
		color: colors.neutral.black,
	},
	profileContainer: {
		...itemsCenter,
		aspectRatio: 1 / 1,
		backgroundColor: primary.color1,
		borderRadius: measures.BORDER.b90,
	},
	profileTxt: {
		...reg,
		...bold,
		...clrBlue,
		textTransform: "uppercase",
	},
	rowRev: {
		...rowReverse,
		...itemsCenter,
	},
});
