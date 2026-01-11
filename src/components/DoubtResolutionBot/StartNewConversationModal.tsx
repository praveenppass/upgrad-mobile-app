import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	KeyboardAvoidingView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import {
	ButtonText,
	ButtonType,
	IconType,
} from "@components/DoubtResolutionBot/doubtResolutionBot.interface";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import {
	NegativeFeedbackIcon,
	NeutralFeedbackIcon,
	PositiveFeedbackIcon,
} from "@assets/icons/img";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { reg, semiBold, md, regular, sm } = commonStyles.text;

const { neutral, icon } = colors;

interface FeedbackPayload {
	input: {
		feed_back: string;
		thread_id: string;
		chat_rating: number;
	};
}

interface StartNewConversationModalProps {
	visible: boolean;
	onClose: () => void;
	onConfirm: () => void;
	threadId: string | null;
	messagesLength: number;
	submitFeedbackRequest: (payload: {
		input: FeedbackPayload;
	}) => Promise<Response | null>;
	setIsCoachModeEnabled: (value: boolean) => void;
}

const StartNewConversationModal: React.FC<StartNewConversationModalProps> = ({
	visible,
	onClose,
	onConfirm,
	threadId,
	messagesLength,
	submitFeedbackRequest,
	setIsCoachModeEnabled,
}) => {
	const [feedbackModal, setFeedbackModal] = useState(false);
	const [answer, setAnswer] = useState("");
	const [zoomedIcon, setZoomedIcon] = useState<IconType | null>(null);
	const icons: IconType[] = [
		IconType.Positive,
		IconType.Neutral,
		IconType.Negative,
	];
	const scaleValues = {
		[IconType.Positive]: useRef(new Animated.Value(1)).current,
		[IconType.Neutral]: useRef(new Animated.Value(1)).current,
		[IconType.Negative]: useRef(new Animated.Value(1)).current,
	};

	const isMessageLengthLessThanOrEqualToOne = messagesLength <= 1;
	const shouldApplyConditionalSubmit =
		feedbackModal &&
		(zoomedIcon === null || (zoomedIcon === IconType.Negative && !answer));
	const isButtonDisabled =
		(zoomedIcon === IconType.Negative && !answer) ||
		(zoomedIcon === null && feedbackModal);

	useEffect(() => {
		if (feedbackModal) {
			resetZoom();
		}
	}, [feedbackModal]);

	const resetZoom = () => {
		icons.forEach((key) => {
			Animated.timing(scaleValues[key], {
				toValue: 1,
				duration: 150,
				useNativeDriver: true,
			}).start();
		});
		setZoomedIcon(null);
	};

	const getButtonText = (buttonType: ButtonType): ButtonText => {
		if (feedbackModal) {
			return buttonType === ButtonType.LEFT
				? ButtonText.CANCEL
				: ButtonText.SUBMIT;
		}
		return buttonType === ButtonType.LEFT ? ButtonText.NO : ButtonText.YES;
	};

	const handleInputChange = (text: string) => {
		setAnswer(text);
	};

	const toggleZoom = (selectedIcon: IconType) => {
		Object.values(IconType).forEach((key) => {
			Animated.timing(scaleValues[key], {
				toValue: key === selectedIcon ? 1.3 : 1,
				duration: 150,
				useNativeDriver: true,
			}).start();
		});
		setZoomedIcon(selectedIcon);
	};

	const handleConfirmOrSubmitAction = () => {
		const buttonText = getButtonText(ButtonType.RIGHT);

		switch (buttonText) {
			case ButtonText.SUBMIT:
				return submitFeedback();
			case ButtonText.YES:
				return isMessageLengthLessThanOrEqualToOne
					? onClose()
					: setFeedbackModal(true);
			default:
				setFeedbackModal(true);
		}
	};

	const submitFeedback = async () => {
		const payload = {
			input: {
				feed_back: answer,
				thread_id: threadId ?? "",
				chat_rating:
					zoomedIcon === IconType.Negative
						? 1
						: zoomedIcon === IconType.Neutral
							? 2
							: 3,
			},
		};

		try {
			const response = await submitFeedbackRequest(payload);

			if (response?.status === 200) {
				onConfirm();
				setZoomedIcon(null);
				setAnswer("");
				setFeedbackModal(false);
				setIsCoachModeEnabled(false);
				onClose();
			}
		} catch (error) {}
	};

	return (
		<>
			<ConfirmationModal
				visible={visible}
				onClose={() => {
					onClose();
					setZoomedIcon(null);
				}}
			>
				{feedbackModal ? (
					<>
						<RNText
							title={strings.APPRECIATE_FEEDBACK_TEXT}
							style={styles.heading}
						/>

						<RNText
							title={strings.USER_FEEDBACK_MODAL_HEADING}
							style={styles.description}
						/>
						<View style={styles.iconContainer}>
							{Object.values(IconType).map((iconType) => (
								<TouchableOpacity
									key={iconType}
									onPress={() => toggleZoom(iconType)}
								>
									<Animated.Image
										source={
											iconType === IconType.Positive
												? PositiveFeedbackIcon
												: iconType === IconType.Neutral
													? NeutralFeedbackIcon
													: NegativeFeedbackIcon
										}
										resizeMode="contain"
										style={[
											styles.animatedIcon,
											{
												transform: [
													{
														scale: scaleValues[
															iconType
														],
													},
												],
											},
										]}
									/>
								</TouchableOpacity>
							))}
						</View>

						{zoomedIcon === IconType.Negative ? (
							<>
								<KeyboardAvoidingView>
									<TextInput
										style={styles.openResponseInput}
										editable={true}
										onChangeText={handleInputChange}
										value={answer ? answer : ""}
										maxLength={200}
										multiline={true}
										spellCheck={false}
										numberOfLines={10}
										selectTextOnFocus={false}
										keyboardType={"ascii-capable"}
										placeholder={strings.REASON_TEXT}
									/>
									<RNText style={styles.maxLimitStyle}>
										{strings.MAX_LIMIT_TEXT}
									</RNText>
								</KeyboardAvoidingView>
							</>
						) : (
							<></>
						)}
					</>
				) : (
					<>
						<RNText
							title={strings.NEW_CONVERSATION_START_BOT}
							style={styles.heading}
						/>

						<RNText
							title={strings.PREVIOUS_CHAT_HISTORY_LOST_TEXT}
							style={styles.description}
						/>
					</>
				)}

				<View style={styles.containerBoxes}>
					<TouchableOpacity
						style={styles.modalFullWidthButton}
						onPress={() => {
							onClose();
							setFeedbackModal(false);
							setZoomedIcon(null);
						}}
					>
						<RNText
							style={[
								styles.modalButtonText,
								{ color: neutral.black },
							]}
						>
							{getButtonText(ButtonType.LEFT)}
						</RNText>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.modalFullWidthButton,
							styles.yesButtonStyle,
							...(shouldApplyConditionalSubmit
								? [styles.conditionalSubmit]
								: []),
						]}
						disabled={isButtonDisabled}
						onPress={handleConfirmOrSubmitAction}
					>
						<RNText
							style={[
								styles.modalButtonText,
								{ color: neutral.white },
							]}
						>
							{getButtonText(ButtonType.RIGHT)}
						</RNText>
					</TouchableOpacity>
				</View>
			</ConfirmationModal>
		</>
	);
};

export default StartNewConversationModal;

const styles = StyleSheet.create({
	animatedIcon: {
		height: moderateScale(40),
		width: moderateScale(40),
	},
	conditionalSubmit: {
		backgroundColor: icon.disable,
		borderWidth: 0,
	},
	containerBoxes: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(12),
	},
	description: {
		...regular,
		...sm,
		lineHeight: verticalScale(15),
		paddingBottom: verticalScale(36),
	},
	heading: {
		lineHeight: verticalScale(20),
		...semiBold,
		...reg,
		color: neutral.black,
		paddingBottom: verticalScale(18),
		paddingHorizontal: horizontalScale(45),
		paddingTop: verticalScale(30),
		textAlign: "center",
	},
	iconContainer: {
		flexDirection: "row",
		height: verticalScale(50),
		justifyContent: "space-around",
		marginBottom: verticalScale(10),
		paddingHorizontal: horizontalScale(80),
		width: horizontalScale(360),
	},
	maxLimitStyle: {
		...regular,
		...sm,
		lineHeight: verticalScale(14),
		marginBottom: verticalScale(30),
	},
	modalButtonText: {
		...semiBold,
		...md,
		lineHeight: verticalScale(21),
	},
	modalFullWidthButton: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderColor: neutral.black,
		borderRadius: 5,
		borderWidth: 1,
		color: neutral.white,
		flex: 1,
		marginBottom: verticalScale(14),
		padding: horizontalScale(15),
	},
	openResponseInput: {
		backgroundColor: neutral.white,
		borderColor: neutral.grey_04,
		borderRadius: 8,
		borderWidth: 1,
		...regular,
		...sm,
		height: verticalScale(120),
		lineHeight: verticalScale(19),
		marginBottom: verticalScale(10),
		padding: verticalScale(10),
		textAlignVertical: "top",
		width: verticalScale(320),
	},
	yesButtonStyle: {
		backgroundColor: neutral.black,
		borderColor: neutral.black,
		borderWidth: 1,
		marginBottom: verticalScale(15),
	},
});
