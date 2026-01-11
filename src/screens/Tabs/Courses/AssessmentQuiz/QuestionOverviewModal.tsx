import React, { useEffect, useState } from "react";
import {
	FlatList,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import {
	horizontalScale,
	moderateScale,
	removeHtmlTags,
	verticalScale,
} from "@utils/functions";

import { QuestionStatusEnum } from "@interface/assessment.interface";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import {
	AnsweredChipIcon,
	AssetOverviewIcon,
	BookmarkChipIcon,
	GridInactiveIcon,
	ListInactiveIcon,
	ListViewIcon,
	NotAnsweredChipIcon,
} from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const {
	themes: {
		text: { darkBlue },
	},
} = C;

const { reg, lg, md } = commonStyles.text;

enum QUESTION {
	ALL = "All",
	MARKED = "Marked",
	ANSWERED_TAB = "Answered",
	NOT_ANSWERED_TAB = "Not Answered",
}

interface IQuestion {
	questionId: string;
	status: QuestionStatusEnum;
	questionInfo?: {
		question: string;
	};
	isPinned?: boolean;
}
const ICON_DIMENSIONS = {
	height: horizontalScale(20),
	width: horizontalScale(20),
};
interface IQuestionModalProps {
	bookMakerArray?: string[];
	questions?: IQuestion[];
	onClose: (data: string) => void;
	questionActiveIndex: number;
	setquestionAtiveIndex: (data: number) => void;
	selectedAnswer:
		| { [questionId: string]: { questionId: string; answer: string[] } }
		| undefined;
}

const QuestionOverviewModal = ({
	bookMakerArray,
	onClose,
	questions,
	questionActiveIndex,
	setquestionAtiveIndex,
	selectedAnswer,
}: IQuestionModalProps) => {
	const [filter, setFilter] = useState(QUESTION.ALL);
	const [question, setQuestion] = useState<IQuestion[]>();
	const [isGridView, setIsGridView] = useState(true);

	const isAnswwred = (questionID: string) => {
		const findAnswer =
			Object.keys(selectedAnswer || {}).length > 0 &&
			selectedAnswer?.[questionID];
		return findAnswer || null;
	};

	useEffect(() => {
		switch (filter) {
			case QUESTION.MARKED: {
				const markedQuestion = questions
					?.filter((i: IQuestion) =>
						bookMakerArray?.includes(i?.questionId),
					)
					.map((book: IQuestion) => ({
						...book,
						isPinned:
							bookMakerArray?.includes(book.questionId) ?? false,
					}));
				setQuestion(markedQuestion);
				break;
			}
			case QUESTION.ANSWERED_TAB: {
				const answeredQuestion = questions
					?.filter((i: IQuestion) => selectedAnswer?.[i?.questionId])
					.map((book: IQuestion) => ({
						...book,
						isPinned:
							bookMakerArray?.includes(book.questionId) ?? false,
					}));
				setQuestion(answeredQuestion);
				break;
			}
			case QUESTION.NOT_ANSWERED_TAB: {
				const notQuestion = questions
					?.filter((i: IQuestion) => !selectedAnswer?.[i?.questionId])
					.map((book: IQuestion) => ({
						...book,
						isPinned:
							bookMakerArray?.includes(book.questionId) ?? false,
					}));
				setQuestion(notQuestion);
				break;
			}
			default: {
				const updateQuestion = questions?.map((i: IQuestion) => ({
					...i,
					isPinned: bookMakerArray?.includes(i.questionId) ?? false,
				}));
				setQuestion(updateQuestion);
				break;
			}
		}
	}, [filter, questions, selectedAnswer, bookMakerArray]);

	const findIndex = (questionID: string) => {
		const find = questions?.findIndex(
			(i: IQuestion) => i?.questionId === questionID,
		);
		return find ?? -1;
	};

	const handleQuestionPress = (questionId: string) => {
		const index = findIndex(questionId);
		if (index !== -1) {
			setquestionAtiveIndex(index);
		}
		onClose("");
	};

	const activeQuestion = questions?.[questionActiveIndex];
	const PrimaryIcon = isGridView ? AssetOverviewIcon : GridInactiveIcon;
	const SecondaryIcon = isGridView
		? ListInactiveIcon
		: () => <ListViewIcon {...ICON_DIMENSIONS} color={darkBlue} />;

	return (
		<ActionModal
			isOpen={true}
			closeModal={() => onClose("")}
			onBackPress={() => onClose("")}
			style={styles.modalStyle}
		>
			<View style={styles.modalContent}>
				<View style={styles.modalContainer}>
					<RNText style={styles.modalTitle}>
						{strings.QUESTION_OVERVIEW}
					</RNText>
				</View>
				<TouchableOpacity
					onPress={() => setIsGridView(!isGridView)}
					style={styles.switchView}
				>
					<PrimaryIcon {...ICON_DIMENSIONS} />
					<SecondaryIcon {...ICON_DIMENSIONS} />
				</TouchableOpacity>
			</View>

			<View style={styles.chipsContainer}>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.scrollgap}
				>
					<TouchableOpacity
						style={[
							styles.chip,
							filter === QUESTION.ALL && styles.allChip,
						]}
						onPress={() => setFilter(QUESTION.ALL)}
					>
						<View
							style={[
								styles.allFilter,
								{
									backgroundColor:
										filter === QUESTION.ALL
											? colors.neutral.white
											: colors.neutral.black,
								},
							]}
						/>
						<RNText
							style={{
								color:
									filter === QUESTION.ALL
										? colors.neutral.white
										: colors.neutral.black,
							}}
						>
							{QUESTION.ALL}
						</RNText>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.chip,
							filter === QUESTION.MARKED && styles.markedChip,
						]}
						onPress={() => setFilter(QUESTION.MARKED)}
					>
						<BookmarkChipIcon
							color={
								filter === QUESTION.MARKED
									? colors.neutral.white
									: colors.logo.linkedin
							}
						/>
						<RNText
							style={{
								color:
									filter === QUESTION.MARKED
										? colors.neutral.white
										: colors.neutral.grey_06,
							}}
						>
							{QUESTION.MARKED}
						</RNText>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.chip,
							filter === QUESTION.ANSWERED_TAB &&
								styles.answeredChip,
						]}
						onPress={() => setFilter(QUESTION.ANSWERED_TAB)}
					>
						<AnsweredChipIcon
							color={
								filter === QUESTION.ANSWERED_TAB
									? colors.neutral.white
									: colors.state.success_green
							}
						/>

						<RNText
							style={{
								color:
									filter === QUESTION.ANSWERED_TAB
										? colors.neutral.white
										: colors.neutral.grey_06,
							}}
						>
							{QUESTION.ANSWERED_TAB}
						</RNText>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.chip,
							filter === QUESTION.NOT_ANSWERED_TAB &&
								styles.notAnseredChip,
						]}
						onPress={() => setFilter(QUESTION.NOT_ANSWERED_TAB)}
					>
						<NotAnsweredChipIcon
							color={
								filter === QUESTION.NOT_ANSWERED_TAB
									? colors.neutral.white
									: colors.neutral.grey_05
							}
						/>

						<RNText
							style={{
								color:
									filter === QUESTION.NOT_ANSWERED_TAB
										? colors.neutral.white
										: colors.neutral.grey_06,
							}}
						>
							{QUESTION.NOT_ANSWERED_TAB}
						</RNText>
					</TouchableOpacity>
				</ScrollView>
			</View>

			<View style={styles.container}>
				<FlatList
					data={question}
					key={isGridView ? "grid" : "list"}
					scrollEnabled={!isGridView}
					numColumns={isGridView ? 6 : 1}
					renderItem={({ item }) => (
						<>
							{isGridView ? (
								<TouchableOpacity
									onPress={() =>
										handleQuestionPress(item?.questionId)
									}
								>
									<View
										style={[
											styles.questionBox,
											isAnswwred(item?.questionId) &&
												styles.answeredQuestionBoxList,
											[
												QuestionStatusEnum.NOT_ANSWERED,
												QuestionStatusEnum.NOT_VISITED,
											].includes(item.status) &&
												styles.unansweredQuestionBox,
											item.isPinned &&
												styles.markedQuestionBox,
											activeQuestion?.questionId ===
												item?.questionId &&
												styles.activeQuestionBox,
										]}
									>
										{item.isPinned && (
											<View style={styles.bookmarkIcon}>
												<BookmarkChipIcon
													color={colors.logo.linkedin}
												/>
											</View>
										)}
										<RNText
											style={[
												styles.questionText,
												activeQuestion?.questionId ===
													item?.questionId &&
													styles.activeQuestionText,
											]}
										>
											{findIndex(item?.questionId) + 1}
										</RNText>
									</View>
								</TouchableOpacity>
							) : (
								<ScrollView
									contentContainerStyle={
										styles.listScrollview
									}
								>
									<TouchableOpacity
										style={styles.listScrollview}
										onPress={() =>
											handleQuestionPress(
												item?.questionId,
											)
										}
									>
										<View
											style={[
												styles.questionBoxList,
												item.status ===
													QuestionStatusEnum.ANSWERED &&
													styles.answeredQuestionBoxList,
												[
													QuestionStatusEnum.NOT_ANSWERED,
													QuestionStatusEnum.NOT_VISITED,
												].includes(item.status) &&
													styles.unansweredQuestionBox,
												item.isPinned &&
													styles.markedQuestionBox,
												activeQuestion?.questionId ===
													item?.questionId &&
													styles.activeQuestionBox,
											]}
										>
											{item.isPinned && (
												<View
													style={styles.bookmarkIcon}
												>
													<BookmarkChipIcon
														color={
															colors.logo.linkedin
														}
													/>
												</View>
											)}
											<RNText
												style={[
													styles.questionText,
													activeQuestion?.questionId ===
														item?.questionId &&
														styles.activeQuestionText,
												]}
											>
												{findIndex(item?.questionId) +
													1}
											</RNText>
										</View>

										<View
											style={styles.questionTextListView}
										>
											<RNText
												style={styles.questionTextList}
												numberOfLines={1}
												ellipsizeMode="tail"
											>
												{removeHtmlTags(
													item?.questionInfo
														?.question || "",
												)}
											</RNText>
										</View>
									</TouchableOpacity>
								</ScrollView>
							)}
						</>
					)}
					contentContainerStyle={styles.questionGrid}
				/>
			</View>
		</ActionModal>
	);
};

export default QuestionOverviewModal;

const styles = StyleSheet.create({
	activeQuestionBox: {
		alignItems: "center",
		backgroundColor: colors.neutral.black,
	},
	activeQuestionText: {
		color: colors.neutral.white,
		...reg,
	},
	allChip: {
		backgroundColor: colors.neutral.black,
	},
	allFilter: {
		borderRadius: 10,
		height: 10,
		width: 10,
	},

	answeredChip: {
		backgroundColor: colors.state.success_green,
	},
	answeredQuestionBoxList: {
		backgroundColor: colors.state.success_light_green,
		borderColor: colors.state.success_green,
		borderWidth: 1,
	},
	bookmarkIcon: {
		bottom: verticalScale(28),
		left: verticalScale(25),
		position: "absolute",
	},

	chip: {
		alignItems: "center",
		borderColor: colors.neutral.grey_05,
		borderRadius: moderateScale(16),
		borderWidth: 1,
		flexDirection: "row",
		...md,
		gap: moderateScale(10),
		justifyContent: "center",
		paddingHorizontal: moderateScale(9),
		paddingVertical: moderateScale(5),
	},
	chipsContainer: {
		gap: moderateScale(10),
		padding: moderateScale(7),
		paddingHorizontal: horizontalScale(17),
	},
	container: {
		height: verticalScale(500),
		paddingRight: horizontalScale(12),
		paddingVertical: verticalScale(12),
	},

	listScrollview: {
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
	},
	markedChip: {
		backgroundColor: colors.logo.linkedin,
	},
	markedQuestionBox: {
		borderWidth: 1,
	},
	modalContainer: {
		alignItems: "flex-start",
		flexDirection: "row",
		gap: 10,
		justifyContent: "flex-end",
		marginHorizontal: verticalScale(5),
	},
	modalContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
		paddingRight: horizontalScale(12),
	},
	modalStyle: {
		paddingHorizontal: 10,
	},

	modalTitle: {
		color: colors.neutral.black,
		...lg,
		fontWeight: "bold",
	},
	notAnseredChip: {
		backgroundColor: colors.neutral.grey_05,
	},

	questionBox: {
		alignItems: "center",
		borderColor: colors.neutral.grey_05,
		borderRadius: 5,
		borderWidth: 1,
		height: verticalScale(40),
		justifyContent: "center",
		margin: 8.5,
		width: horizontalScale(40),
	},
	questionBoxList: {
		alignItems: "center",
		borderRadius: 5,
		height: verticalScale(40),
		justifyContent: "center",
		margin: 5,
		width: horizontalScale(40),
	},
	questionGrid: {
		margin: verticalScale(5),
		width: "100%",
	},
	questionText: {
		color: colors.neutral.black,
		...reg,
	},
	questionTextList: {
		color: colors.neutral.black,
		...reg,
		fontWeight: "400",
	},
	questionTextListView: { flex: 1 },
	row: {
		justifyContent: "space-between",
	},
	scrollgap: {
		gap: 20,
	},
	switchView: {
		flexDirection: "row",
		gap: horizontalScale(10),
	},
	unansweredQuestionBox: {
		borderColor: colors.neutral.grey_05,
		borderWidth: 1,
	},
});
