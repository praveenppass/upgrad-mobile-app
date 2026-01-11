import React, { useEffect, useRef } from "react";
import {
	FlatList,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Pressable,
	StyleSheet,
	View,
} from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";
import { formatWithTimeZone } from "@utils/timezoneHelper";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import {
	ChatAlertIcon,
	ChatDisableIcon,
	ChatIcon,
	CloseIcon,
} from "@assets/icons";
import { DoubtIcon, LikeIcon } from "@assets/icons/svg/transcript";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, bg, state, highlight, icon } = colors;
const { sm, md, medium, regular, xxSm } = commonStyles.text;

const STRINGS = createStringConstants({
	DOUBT: "studyPlan.container6.transcript.Doubt",
	ANSWERED_LIVE: "studyPlan.container6.transcript.answerLive",
	ANSWER: "studyPlan.container6.transcript.answer",
	ANSWERED_BY_MODERATOR: "studyPlan.container6.transcript.answerByModerator",
});

const getInitials = (name: string): string => {
	const parts = name.trim().split(" ");
	if (parts.length === 0) return "?";
	const first = parts[0]?.[0] || "";
	const last = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";
	return `${first}${last}`.toUpperCase();
};

const parseMessageText = (rawMessage: string): string => {
	try {
		const parsed = JSON.parse(rawMessage);
		return parsed.message;
	} catch (e) {
		return rawMessage;
	}
};

type MessageItem = {
	key: {
		fromUser: number;
		createdAt: string;
	};
	message: string;
	senderName: string;
	messageId: string;
};

interface IChatProps {
	currentUserId: string;
	isVisible?: boolean;
	onClose: () => void;
	messages: MessageItem[];
	handleLoadMoreMessages: () => void;
}

const ChatConversation = ({
	currentUserId,
	onClose,
	isVisible,
	messages,
	handleLoadMoreMessages,
}: IChatProps) => {
	const flatListRef = useRef<FlatList>(null);

	useEffect(() => {
		scrollToBottom();
	}, []);

	const messageList = messages.sort(
		(a, b) => a.key.createdAt - b.key.createdAt,
	);
	const scrollToBottom = () => {
		flatListRef.current?.scrollToEnd({ animated: true });
	};

	const renderItem = ({ item }: { item: MessageItem }) => {
		const isCurrentUser =
			String(item.key.fromUser) === String(currentUserId);
		const initials = getInitials(item.senderName);
		const message = parseMessageText(item.message);
		const time = formatWithTimeZone(item?.key?.createdAt);

		let type = "";
		let questionText = "";
		let answerText = "";
		let voteCount = 0;
		let answeredVerbally = false;
		try {
			const outer = JSON.parse(item.message);
			type = outer?.type || "";
			const inner = outer?.message ? JSON.parse(outer.message) : {};
			questionText = inner?.questionText || "";
			answerText = inner?.answerText || "";
			voteCount = inner?.voteCount || 0;
			answeredVerbally = inner?.answeredVerbally;
		} catch (e) {}

		return (
			<View
				style={[
					styles.messageRow,
					isCurrentUser ? styles.rightAlign : styles.leftAlign,
				]}
			>
				<View style={styles.messageGroup}>
					{!isCurrentUser && (
						<View style={styles.initialsCircle}>
							<RNText
								title={initials}
								style={styles.initialsText}
							/>
						</View>
					)}
					<View
						style={[
							styles.msgView,
							isCurrentUser && styles.leftMargin,
						]}
					>
						<View
							style={[
								styles.rowContainer,
								isCurrentUser
									? styles.rowFlex
									: styles.rowReverse,
							]}
						>
							<RNText
								title={time}
								style={[
									styles.nameText,
									isCurrentUser && styles.rightAlign,
								]}
							/>
							<RNText
								title={item.senderName}
								style={[
									styles.nameText,
									isCurrentUser && styles.rightAlign,
								]}
							/>
						</View>

						<View style={[styles.messageBubble, styles.shadow]}>
							{type === "DOUBT" ? (
								<>
									<View style={styles.titleView}>
										<View style={styles.doubtWrapper}>
											<View style={styles.doubtContainer}>
												<DoubtIcon
													height={12}
													width={12}
												/>
												<RNText
													title={getString(
														STRINGS.DOUBT,
													)}
													style={styles.doubtTxt}
												/>
											</View>

											{answeredVerbally ? (
												<View style={styles.anserView}>
													<ChatIcon
														color={
															state.success_green
														}
														height={12}
														width={12}
													/>
													<RNText
														title={getString(
															STRINGS.ANSWERED_LIVE,
														)}
														style={
															styles.greenAnsTxt
														}
													/>
												</View>
											) : null}
										</View>

										{voteCount ? (
											<View style={styles.likeContainer}>
												<RNText
													title={voteCount}
													style={styles.voteTxt}
												/>
												<LikeIcon />
											</View>
										) : null}
									</View>

									<RNText
										title={questionText}
										style={styles.messageText}
									/>
									{answerText ? (
										<View style={styles.doubtView}>
											<RNText
												title={`${getString(STRINGS.ANSWER)}: `}
												style={[
													styles.messageText,
													{
														color: neutral.grey_07,
													},
												]}
											>
												<RNText
													title={answerText}
													style={styles.ansTxt}
												/>
											</RNText>
											<View style={styles.moderatorView}>
												<RNText
													title={getString(
														STRINGS.ANSWERED_BY_MODERATOR,
													)}
													style={styles.moderateTxt}
												/>
												<RNText
													title={time}
													style={styles.moderateTxt}
												/>
											</View>
										</View>
									) : null}
								</>
							) : (
								<RNText
									title={message}
									style={styles.messageText}
								/>
							)}
						</View>
					</View>
					{isCurrentUser ? (
						<View style={styles.initialsCircle}>
							<RNText
								title={initials}
								style={styles.initialsText}
							/>
						</View>
					) : null}
				</View>
			</View>
		);
	};

	const ListEmptyComponent = () => {
		return (
			<View style={styles.noChatContainer}>
				<ChatAlertIcon />
				<RNText
					title={strings.THERE_ARE_NO_CHAT_TO_DISPLAY}
					style={styles.noChatText}
				/>
			</View>
		);
	};

	return (
		<Modal
			visible={isVisible}
			animationType="slide"
			transparent
			statusBarTranslucent
			onRequestClose={onClose}
			supportedOrientations={["portrait", "landscape"]}
		>
			<View style={styles.modalOverlay}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : undefined}
					style={styles.keyboardAvoidingContainer}
				>
					<View style={styles.container}>
						<View style={styles.header}>
							<View style={styles.chatTitle}>
								<ChatIcon />
								<RNText
									title={strings.CHAT}
									style={styles.chatText}
								/>
							</View>
							<Pressable hitSlop={10} onPress={onClose}>
								<CloseIcon />
							</Pressable>
						</View>

						<FlatList
							ref={flatListRef}
							data={messageList}
							renderItem={renderItem}
							keyExtractor={(item) => item.messageId}
							contentContainerStyle={styles.chatListContainer}
							onContentSizeChange={scrollToBottom}
							showsVerticalScrollIndicator={false}
							onEndReached={handleLoadMoreMessages}
							ListEmptyComponent={ListEmptyComponent}
						/>

						<View style={styles.footer}>
							<View style={styles.disabledRow}>
								<ChatDisableIcon />
								<RNText
									title={strings.CHAT_IS_DISABLED}
									style={styles.disableChatTxt}
								/>
							</View>
							<RNText
								title={strings.SINCE_THE_SESSION_HAS_ENDED}
								style={styles.greyTxt}
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
			</View>
		</Modal>
	);
};

export default ChatConversation;

const styles = StyleSheet.create({
	ansTxt: {
		color: neutral.grey_06,
		marginTop: verticalScale(8),
		...sm,
		...regular,
		marginBottom: verticalScale(4),
	},
	anserView: {
		alignItems: "center",
		columnGap: horizontalScale(4),
		flexDirection: "row",
	},
	chatListContainer: {
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(8),
	},
	chatText: {
		color: neutral.black,
		...sm,
		...medium,
	},
	chatTitle: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(8),
	},
	container: {
		backgroundColor: neutral.white,
		borderTopLeftRadius: horizontalScale(8),
		borderTopRightRadius: horizontalScale(8),
		height: verticalScale(400),
		overflow: "hidden",
	},
	disableChatTxt: {
		color: neutral.black,
		...sm,
		...medium,
	},
	disabledRow: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(10),
		marginBottom: verticalScale(4),
	},
	doubtContainer: {
		alignItems: "center",
		backgroundColor: highlight.bg_brown,
		borderRadius: horizontalScale(4),
		columnGap: horizontalScale(4),
		flexDirection: "row",
		marginRight: horizontalScale(8),
		overflow: "hidden",
		paddingHorizontal: horizontalScale(4),
	},
	doubtTxt: {
		...regular,
		...sm,
		color: neutral.black,
	},
	doubtView: {
		borderColor: neutral.grey_03,
		borderLeftWidth: horizontalScale(2),
		marginLeft: horizontalScale(28),
	},
	doubtWrapper: {
		alignItems: "center",
		flexDirection: "row",
		width: "85%",
	},
	footer: {
		alignItems: "center",
		backgroundColor: neutral.grey_02,
		height: verticalScale(66),
		paddingVertical: verticalScale(10),
	},
	greenAnsTxt: {
		color: state.success_green,
		...regular,
		...sm,
	},
	greyTxt: {
		color: neutral.grey_06,
		...xxSm,
		...regular,
	},
	header: {
		alignItems: "center",
		borderBottomColor: neutral.grey_03,
		borderBottomWidth: horizontalScale(1),
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(15),
	},
	initialsCircle: {
		alignItems: "center",
		backgroundColor: bg.fill.lecture_bg,
		borderRadius: horizontalScale(16),
		height: horizontalScale(32),
		justifyContent: "center",
		marginHorizontal: horizontalScale(6),
		width: horizontalScale(32),
	},
	initialsText: {
		color: neutral.black,
		...sm,
		...medium,
	},
	keyboardAvoidingContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
	leftAlign: {
		justifyContent: "flex-start",
	},
	leftMargin: {
		marginLeft: horizontalScale(50),
	},
	likeContainer: {
		alignItems: "center",
		columnGap: horizontalScale(2),
		flexDirection: "row",
		justifyContent: "flex-end",
		paddingHorizontal: horizontalScale(4),
		paddingVertical: verticalScale(2),
	},
	messageBubble: {
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(10),
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(10),
	},
	messageGroup: {
		alignItems: "center",
		columnGap: horizontalScale(8),
		flexDirection: "row",
	},
	messageRow: {
		alignItems: "flex-end",
		flexDirection: "row",
		marginVertical: verticalScale(4),
		width: "100%",
	},

	messageText: {
		color: neutral.black,
		...sm,
		...regular,
		marginBottom: verticalScale(4),
		marginLeft: horizontalScale(4),
	},
	modalOverlay: {
		backgroundColor: bg.fill.video,
		flex: 1,
		justifyContent: "flex-end",
	},
	moderateTxt: {
		...xxSm,
		...regular,
		color: neutral.grey_05,
		marginTop: verticalScale(8),
	},
	moderatorView: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		marginLeft: horizontalScale(4),
		width: "100%",
	},
	msgView: {
		flexDirection: "column",
		gap: verticalScale(4),
		width: "72%",
	},
	nameText: {
		color: neutral.grey_06,
		...xxSm,
		...regular,
		marginTop: verticalScale(10),
	},
	noChatContainer: {
		alignItems: "center",
		flex: 1,
		height: verticalScale(250),
		justifyContent: "center",
	},
	noChatText: {
		color: neutral.grey_06,
		marginTop: verticalScale(8),
		...md,
		...regular,
	},
	rightAlign: {
		alignSelf: "flex-end",
	},
	rightInitialsCircle: {
		alignItems: "center",
		backgroundColor: bg.fill.profile_bg,
		borderRadius: horizontalScale(16),
		height: horizontalScale(32),
		justifyContent: "center",
		width: horizontalScale(32),
	},
	rowContainer: {
		justifyContent: "space-between",
	},
	rowFlex: {
		flexDirection: "row",
	},
	rowReverse: {
		flexDirection: "row-reverse",
	},
	shadow: {
		borderRadius: horizontalScale(8),
		shadowColor: neutral.black,
		...Platform.select({
			ios: {
				shadowOffset: { width: 0, height: verticalScale(2) },
				shadowOpacity: 0.2,
				shadowRadius: horizontalScale(3),
			},
			android: {
				elevation: horizontalScale(4),
			},
		}),
	},
	titleView: {
		alignItems: "center",
		columnGap: horizontalScale(4),
		flexDirection: "row",
		marginBottom: verticalScale(12),
		width: "100%",
	},
	voteTxt: {
		...sm,
		...medium,
		color: icon.default_red,
	},
});
