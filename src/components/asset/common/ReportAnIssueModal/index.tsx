import React from "react";
import { FormProvider } from "react-hook-form";
import { View } from "react-native";

import { IUseReportAnIssueModal } from "@components/asset/common/ReportAnIssueModal/index.interface";
import styles from "@components/asset/common/ReportAnIssueModal/index.style";
import {
	REPORT_AN_ISSUE_INPUT_FIELD_RULES,
	REPORT_ERROR_ISSUE_TYPES,
} from "@components/asset/common/ReportAnIssueModal/index.util";
import useReportAnIssueModalController from "@components/asset/common/ReportAnIssueModal/useReportAnIssueModalController";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import RadioInput, { IRadioInputSize } from "@components/Inputs/RadioInput";
import TextInput from "@components/Inputs/TextInput";
import RNText from "@components/Reusable/RNText";

import { strings } from "@assets/strings";

const ReportAnIssueModal = (props: IUseReportAnIssueModal) => {
	const {
		handleSubmitButtonPress,
		buttonDisabled,
		buttonText,
		methods,
		handleCloseModal,
	} = useReportAnIssueModalController(props);

	return (
		<>
			<View style={styles.handle} />
			<View style={styles.container}>
				<View>
					<RNText
						title={strings.REPORT_AN_ISSUE}
						style={styles.headingText}
					/>
					<RNText
						title={strings.REPORTING_AN_ISSUE_ON + props.assetName}
						style={styles.subHeadingText}
					/>
				</View>

				<FormProvider {...methods}>
					<RadioInput
						name="issueType"
						values={REPORT_ERROR_ISSUE_TYPES}
						isMandatory
						label={strings.WHAT_TYPE_OF_ISSUE_ARE_YOU_REPORTING}
						rules={REPORT_AN_ISSUE_INPUT_FIELD_RULES}
						verticalValues
						size={IRadioInputSize.SMALL}
					/>
					<TextInput
						placeholder={`${strings.DESCRIPTION_ONLY} *`}
						name="issueDescription"
						isMandatory
						style={styles.textInput}
						multiline
						rules={REPORT_AN_ISSUE_INPUT_FIELD_RULES}
					/>
				</FormProvider>
			</View>
			<View style={styles.btnContainer}>
				<CommonButton
					title={strings.CANCEL}
					onPress={handleCloseModal}
					variant={IButtonVariant.Tertiary}
					style={styles.btnStyle}
				/>
				<CommonButton
					title={buttonText}
					onPress={handleSubmitButtonPress}
					variant={IButtonVariant.Secondary}
					isDisabled={buttonDisabled}
					style={styles.btnStyle}
				/>
			</View>
		</>
	);
};

export default ReportAnIssueModal;
