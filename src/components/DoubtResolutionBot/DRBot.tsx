import { set } from "lodash";
import React, { useRef } from "react";
import {
	FlatList,
	ImageBackground,
	Linking,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import {
	DRBotProps,
	Message,
	MessageItem,
	userType,
	voteType,
} from "@components/DoubtResolutionBot/doubtResolutionBot.interface";
import styles from "@components/DoubtResolutionBot/DRBot.styles";
import ExitCoachModeModal from "@components/DoubtResolutionBot/ExitCoachModeModal";
import NegativeResponseFeedbackModal from "@components/DoubtResolutionBot/NegativeResponseFeedbackModal";
import SpeechToText from "@components/DoubtResolutionBot/SpeechToText";
import StartNewConversationModal from "@components/DoubtResolutionBot/StartNewConversationModal";
import useDRBotController from "@components/DoubtResolutionBot/useDRBotController";
import VoiceValidationModal from "@components/DoubtResolutionBot/VoiceValidationModal";
import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import {
	BotArrowUpIcon,
	BotCloseIcon,
	BotStartNewConversationIcon,
	ChatbotCoachModeIcon, // ChatbotCoachModeIcon,
	ChatBotIcon,
	CopyFeedbackIcon,
	MicIcon,
	ThumbsDownFeedbackActiveIcon,
	ThumbsDownFeedbackIcon,
	ThumbsUpFeedbackActiveIcon,
	ThumbsUpFeedbackIcon,
} from "@assets/icons";
import { BotHeaderIcon, CoachModeHeader, IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";

const { neutral, icon, cta } = colors;

const DRBot: React.FC<DRBotProps> = ({
	onClose,
	programName,
	workshopId,
	workshopCode,
	assetCode,
	courseId,
	moduleId,
	sessionId,
	segmentId,
	learningPathId,
	assetType,
	programCode,
	programId,
	buildPath,
	pageUrlFromStudyPlan,
}) => {
	const flatListRef = useRef<FlatList<Message>>(null);

	const ICON_DIMENSIONS = {
		width: horizontalScale(24),
		height: verticalScale(24),
	};

	const {
		submitFeedbackRequest,
		isKeyboardVisible,
		timestamp,
		handleSelectQuestion,
		shouldShowBotResponseActions,
		handlePositiveFeedbackForResponse,
		messages,
		threadId,
		handleScroll,
		handleEmailPress,
		welcome,
		startnewChat,
		handleSend,
		input,
		handleCopy,
		isBotTyping,
		handleInputChange,
		setOpenNegativeFeedbackModal,
		openNegativeFeedbackModal,
		handleNegativeFeedbackForResponse,
		scrollToLatestMessage,
		startNew,
		setStartNew,
		extractEmails,
		messageLengthIsEqualToOne,
		messageList,
		handleConfirmFeedback,
		hasVisibleCustomPrompts,
		openExitCoachModeModal,
		setOpenExitCoachModeModal,
		isCoachModeEnabled,
		handleExitCoachMode,
		setIsCoachModeEnabled,
		enableInputField,
		isMicTextEmpty,
		isSpeech,
		toggleSpeech,
		onMicSave,
		handleValidationClose,
	} = useDRBotController({
		assetCode,
		learningPathId,
		programName,
		workshopId,
		workshopCode,
		courseId,
		moduleId,
		sessionId,
		segmentId,
		programCode,
		programId,
		flatListRef,
		assetType,
		buildPath,
		pageUrlFromStudyPlan,
	});

	const renderBotResponse = ({ item }: { item: MessageItem }) => {
		const email = extractEmails(item.text)?.[0];
		const textExceptEmail = item?.text?.split(email);

		const shouldRenderPrompts =
			item.customPrompts &&
			Array.isArray(item.customPrompts) &&
			item.showPrompt !== false;

		return (
			<Pressable>
				{item?.sender === userType.BOT ? (
					<>
						<View style={styles.botResponseContainer}>
							<View style={styles.botIconView}>
								{isCoachModeEnabled ? (
									<ChatbotCoachModeIcon
										{...ICON_DIMENSIONS}
									/>
								) : (
									<ChatBotIcon {...ICON_DIMENSIONS} />
								)}
							</View>
							<TouchableOpacity
								style={styles.botResponseView}
								onPressIn={() => handleSelectQuestion(item)}
							>
								<RNText style={styles.botResponseText}>
									{item?.text ? (
										<>
											<RenderHtml
												content={
													textExceptEmail[0] || ""
												}
											/>
											{email && (
												<RNText
													style={styles.emailText}
													onPress={() =>
														handleEmailPress(email)
													}
												>
													{email}
												</RNText>
											)}
											<RenderHtml
												content={
													textExceptEmail[1] || ""
												}
											/>
										</>
									) : (
										strings.THINKING
									)}
								</RNText>
							</TouchableOpacity>
						</View>

						{welcome &&
							item.prompts &&
							Array.isArray(item.prompts) &&
							item.prompts.map((label: string, index: number) => (
								<TouchableOpacity
									key={index}
									style={styles.radioPressable}
									onPress={() => handleSend(label)}
								>
									<RNText style={styles.radioTextStyles}>
										{label}
									</RNText>
								</TouchableOpacity>
							))}

						{shouldRenderPrompts &&
							item.customPrompts?.map((prompt, index: number) => (
								<TouchableOpacity
									key={index}
									style={styles.radioPressable}
									onPress={() =>
										handleSend(
											prompt.label,
											prompt.code,
											prompt.value,
										)
									}
								>
									<RNText
										style={[
											styles.radioTextStyles,
											prompt.disabled &&
												styles.promptTextStyle,
										]}
									>
										{prompt.label}
									</RNText>
								</TouchableOpacity>
							))}

						{shouldShowBotResponseActions(item) ? (
							<View
								style={styles.botResponseFeedbackIconsContainer}
							>
								<TouchableOpacity
									onPress={() => handleCopy(item?.text)}
								>
									<CopyFeedbackIcon
										height={20}
										width={20}
										color={neutral.black}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										handlePositiveFeedbackForResponse(item)
									}
								>
									{item?.vote === voteType.UP ? (
										<ThumbsUpFeedbackActiveIcon
											height={20}
											width={20}
										/>
									) : (
										<ThumbsUpFeedbackIcon
											height={20}
											width={20}
										/>
									)}
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										handleNegativeFeedbackForResponse(item)
									}
								>
									{item?.vote === voteType.DOWN ? (
										<ThumbsDownFeedbackActiveIcon
											height={20}
											width={20}
										/>
									) : (
										<ThumbsDownFeedbackIcon
											height={20}
											width={20}
										/>
									)}
								</TouchableOpacity>
							</View>
						) : null}
					</>
				) : (
					<View style={styles.userQuestion}>
						<RNText style={styles.userText}>
							{item?.text || ""}
						</RNText>
					</View>
				)}
			</Pressable>
		);
	};

	return (
		<>
			<View
				style={
					isKeyboardVisible
						? styles.chatContainerMinHeight
						: styles.chatContainerMaxHeight
				}
			>
				<ImageBackground
					source={
						isCoachModeEnabled ? CoachModeHeader : BotHeaderIcon
					}
					resizeMode="cover"
					imageStyle={styles.imageStyle}
				>
					<View style={styles.container}>
						<View style={styles.botNameContainer}>
							<RNText style={styles.upGradText}>
								{strings.UPGRAD}
							</RNText>
							<RNText style={styles.maiAskText}>
								{strings.MAI_ASK}
							</RNText>
						</View>
						<View style={styles.iconContainer}>
							<TouchableOpacity
								onPress={() => setStartNew(!startNew)}
								style={styles.iconPadding}
								hitSlop={10}
								disabled={messageLengthIsEqualToOne}
							>
								<BotStartNewConversationIcon
									color={
										messageLengthIsEqualToOne
											? icon.disable
											: neutral.white
									}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={onClose}
								style={styles.iconPadding}
							>
								<BotCloseIcon />
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>

				<View style={styles.dividerContainer}>
					{isCoachModeEnabled ? (
						<RNText style={styles.coachModeText}>
							{strings.YOU_ARE_IN_COACH_MODE_NOW}
						</RNText>
					) : (
						<>
							<View style={styles.divider} />
							<Text style={styles.timestamp}>{timestamp}</Text>
							<View style={styles.divider} />
						</>
					)}
				</View>

				<FlatList
					data={messageList}
					contentContainerStyle={styles.scrollView}
					ref={flatListRef}
					keyExtractor={(_item, index) => index.toString()}
					onContentSizeChange={scrollToLatestMessage}
					renderItem={renderBotResponse}
					onScroll={handleScroll}
					scrollEventThrottle={16}
					onScrollToIndexFailed={() => {
						return;
					}}
				/>
				{isCoachModeEnabled ? (
					<Pressable
						style={styles.exitCoachModeButton}
						onPress={() => setOpenExitCoachModeModal(true)}
					>
						<RNText style={styles.exitCoachModeButtonText}>
							{strings.EXIT_COACH_MODE}
						</RNText>
						<BotCloseIcon
							height={8}
							width={8}
							color={neutral.white}
						/>
					</Pressable>
				) : null}
				<View style={styles.footerContainer}>
					{isSpeech ? (
						<SpeechToText
							onSave={onMicSave}
							onCancel={toggleSpeech}
						/>
					) : (
						<View
							style={{
								...styles.inputContainer,
								backgroundColor:
									isBotTyping || hasVisibleCustomPrompts
										? icon.disable
										: neutral.white,
							}}
						>
							<TextInput
								placeholder={
									hasVisibleCustomPrompts
										? strings.SELECT_FROM_OPTIONS
										: strings.ASK_ME
								}
								style={[
									styles.textInput,
									isKeyboardVisible || enableInputField
										? styles.textInputWithKeyboardOpen
										: null,
									isBotTyping || hasVisibleCustomPrompts
										? styles.textInputWhenBotThinking
										: null,
								]}
								editable={
									!isBotTyping && !hasVisibleCustomPrompts
								}
								value={input ?? ""}
								onChangeText={handleInputChange}
								placeholderTextColor={cta.fill.disable}
								multiline={true}
								numberOfLines={10}
								autoComplete="off"
								autoCorrect={false}
								keyboardType={"ascii-capable"}
							/>

							<TouchableOpacity
								style={[
									styles.micButton,
									isKeyboardVisible || enableInputField
										? styles.sendButtonWhenKeyboardVisible
										: null,
								]}
								onPress={toggleSpeech}
							>
								<MicIcon />
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.sendButton,
									isKeyboardVisible || enableInputField
										? styles.sendButtonWhenKeyboardVisible
										: null,
								]}
								// disabled={!input || hasVisibleCustomPrompts}
								onPress={() => handleSend()}
							>
								<BotArrowUpIcon
									color={
										input && !hasVisibleCustomPrompts
											? neutral.black
											: icon.disable
									}
								/>
							</TouchableOpacity>
						</View>
					)}

					{!isKeyboardVisible ? (
						<RNText style={styles.linkText}>
							{strings.YODA_BETA_TEXT}
							<RNText
								style={styles.privacyPolicy}
								onPress={() =>
									Linking.openURL(
										strings.UPGRAD_PRIVACY_POLICY,
									)
								}
							>
								{strings.UPGRAD_PRIVACY_POLICY_TEXT}
							</RNText>
						</RNText>
					) : (
						<></>
					)}
				</View>
			</View>

			<ExitCoachModeModal
				visible={openExitCoachModeModal}
				onClose={() => setOpenExitCoachModeModal(false)}
				onConfirm={handleExitCoachMode}
			/>

			<NegativeResponseFeedbackModal
				visible={openNegativeFeedbackModal}
				onClose={() => setOpenNegativeFeedbackModal(false)}
				onConfirm={handleConfirmFeedback}
			/>

			<StartNewConversationModal
				visible={startNew}
				onClose={() => setStartNew(false)}
				onConfirm={startnewChat}
				threadId={threadId}
				submitFeedbackRequest={submitFeedbackRequest}
				messagesLength={messages?.length}
				setIsCoachModeEnabled={setIsCoachModeEnabled}
			/>

			<VoiceValidationModal
				visible={isMicTextEmpty}
				onClose={() => handleValidationClose()}
			/>
		</>
	);
};

export default DRBot;
