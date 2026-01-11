import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { commonStyles } from "@assets/styles";

const STRINGS = createStringConstants({
	SUBMIT_BUTTON: "studyPlan.moduleFeedback.questionnaire.submitButton",
	FEEDBACK_LABEL:
		"studyPlan.moduleFeedback.questionnaire.feedbackTextField.label",
	FEEDBACK_PLACEHOLDER:
		"studyPlan.moduleFeedback.questionnaire.feedbackTextField.placeholder",
});

interface IQuestionnaire {
	rating: number;
	onSubmit: (optionSelected?: string, otherDetails?: string) => void; // ✅ simplified
	options: string[];
	question: string;
}

interface IQuestionnaireFormData {
	option: string;
	otherDetails?: string;
}

interface IFeedbackTextField {
	value?: string;
	onChange: (value: string) => void;
}

const FeedbackTextField = ({ value, onChange }: IFeedbackTextField) => (
	<>
		<RNText
			style={styles.textInputLabel}
			title={getString(STRINGS.FEEDBACK_LABEL)}
		/>
		<TextInput
			style={styles.textInput}
			placeholder={getString(STRINGS.FEEDBACK_PLACEHOLDER)}
			placeholderTextColor={colors.neutral.grey_05}
			value={value}
			onChangeText={onChange}
			multiline
			numberOfLines={4}
			textAlignVertical="top"
		/>
	</>
);

enum IFeedbackType {
	OPTION = "option",
	OTHER_DETAILS = "otherDetails",
}

const Questionnaire = ({
	rating,
	onSubmit,
	options,
	question,
}: IQuestionnaire) => {
	const { control, handleSubmit, watch } = useForm<IQuestionnaireFormData>({
		mode: "onChange",
		defaultValues: {
			[IFeedbackType.OPTION]: undefined,
			[IFeedbackType.OTHER_DETAILS]: undefined,
		},
	});

	const selectedOption = watch(IFeedbackType.OPTION);
	const otherDetails = watch(IFeedbackType.OTHER_DETAILS);
	const othersOption = options[options.length - 1];
	const showOthersInput = selectedOption === othersOption;

	const isSubmitDisabled =
		!selectedOption ||
		(selectedOption === othersOption && !otherDetails?.trim());

	// ✅ Pass only the option + text to parent
	const onFormSubmit = handleSubmit((data) => {
		onSubmit(data.option, data.otherDetails);
	});

	const renderRadioOptions = ({ onChange, value }: IFeedbackTextField) => (
		<View style={styles.optionsContainer}>
			{options.map((option) => {
				const isOptionSelected = value === option;
				return (
					<Pressable
						key={option}
						style={styles.radioOption}
						onPress={() => onChange(option)}
					>
						<View
							style={[
								styles.radioCircle,
								isOptionSelected && styles.radioCircleSelected,
							]}
						>
							{isOptionSelected && (
								<View style={styles.radioDot} />
							)}
						</View>
						<RNText style={styles.optionLabel} title={option} />
					</Pressable>
				);
			})}
		</View>
	);

	if (rating <= 0) return null;

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<RNText style={styles.questionLabel} title={question} />
				<Controller
					control={control}
					name={IFeedbackType.OPTION}
					render={({ field }) => renderRadioOptions(field)}
				/>

				{showOthersInput && (
					<Controller
						control={control}
						name={IFeedbackType.OTHER_DETAILS}
						render={({ field }) => <FeedbackTextField {...field} />}
					/>
				)}
			</View>

			<CommonButton
				variant={IButtonVariant.Secondary}
				onPress={onFormSubmit}
				title={getString(STRINGS.SUBMIT_BUTTON)}
				isDisabled={isSubmitDisabled}
			/>
		</View>
	);
};

export default Questionnaire;

const styles = StyleSheet.create({
	container: {
		gap: verticalScale(40),
		paddingHorizontal: horizontalScale(20),
		paddingTop: verticalScale(24),
	},
	contentContainer: {
		gap: verticalScale(16),
	},
	optionLabel: {
		color: colors.neutral.black,
		flex: 1,
		marginLeft: horizontalScale(6),
		...commonStyles.text.sm,
		...commonStyles.text.regular,
	},
	optionsContainer: {
		gap: verticalScale(12),
		marginTop: verticalScale(12),
	},
	questionLabel: {
		color: colors.neutral.black,
		...commonStyles.text.md,
		...commonStyles.text.medium,
	},
	radioCircle: {
		alignItems: "center",
		borderColor: colors.neutral.grey_07,
		borderRadius: horizontalScale(12),
		borderWidth: horizontalScale(1),
		height: horizontalScale(12),
		justifyContent: "center",
		width: horizontalScale(12),
	},
	radioCircleSelected: {
		borderColor: colors.neutral.black,
	},
	radioDot: {
		backgroundColor: colors.neutral.black,
		borderRadius: horizontalScale(6),
		height: horizontalScale(5),
		width: horizontalScale(5),
	},
	radioOption: {
		alignItems: "center",
		flexDirection: "row",
	},
	textInput: {
		backgroundColor: colors.neutral.white,
		borderColor: colors.neutral.grey_07,
		borderRadius: horizontalScale(8),
		borderWidth: 1,
		color: colors.neutral.black,
		fontSize: horizontalScale(14),
		minHeight: verticalScale(100),
		padding: horizontalScale(12),
	},
	textInputLabel: {
		color: colors.neutral.black,
		marginTop: verticalScale(8),
		...commonStyles.text.md,
		...commonStyles.text.medium,
	},
});
