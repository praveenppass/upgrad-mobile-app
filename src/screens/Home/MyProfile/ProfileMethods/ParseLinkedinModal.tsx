import React, { memo, useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { isLinkedInUrl } from "@constants/regex.constants";

import { colors } from "@assets/colors";
import { NotAttendedIconLxp } from "@assets/icons";
import { LinkedInLogo } from "@assets/icons/svg/studyPlan";
import { commonStyles } from "@assets/styles";

const { reg, sm, regular, semiBold } = commonStyles.text;
const { neutral } = colors;

const STRINGS = createStringConstants({
	linkedinModalTitle: "studyPlan.profileSetup.modals.linkedin.title",
	linkedinModalPlaceholder:
		"studyPlan.profileSetup.modals.linkedin.placeholder",
	linkedinModalUrlLabel: "studyPlan.profileSetup.modals.linkedin.urlLabel",
	linkedinModalImport: "studyPlan.profileSetup.modals.linkedin.import",
	linkedinModalCancel: "studyPlan.profileSetup.modals.linkedin.cancel",
	linkedinModalValidationError:
		"studyPlan.profileSetup.modals.linkedin.validationError",
	linkedinModalInvalidUrl:
		"studyPlan.profileSetup.modals.linkedin.invalidUrl",
});

interface ILinkedInFormData {
	url: string;
}

interface IParseLinkedinModal {
	isOpen: boolean;
	onBackPress: () => void;
	closeModal: () => void;
	handleLinkedInParsing: (url: string) => void;
	submitLinkedIn: () => void;
}

const ParseLinkedinModal = ({
	isOpen,
	onBackPress,
	closeModal,
	handleLinkedInParsing,
	submitLinkedIn,
}: IParseLinkedinModal) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
	} = useForm<ILinkedInFormData>({
		defaultValues: { url: "" },
		mode: "onBlur",
	});

	const onSubmit = useCallback(
		(data: ILinkedInFormData) => {
			const trimmedUrl = data.url.trim();
			if (isLinkedInUrl.test(trimmedUrl)) {
				handleLinkedInParsing(trimmedUrl);

				submitLinkedIn();
				reset();
			}
		},
		[handleLinkedInParsing, submitLinkedIn, reset],
	);

	const handleCancel = useCallback(() => {
		reset();
		closeModal();
	}, [reset, closeModal]);

	const validationRules = useMemo(
		() => ({
			required: getString(STRINGS.linkedinModalValidationError),
			validate: (value: string) =>
				isLinkedInUrl.test(value.trim()) ||
				getString(STRINGS.linkedinModalInvalidUrl),
		}),
		[],
	);

	return (
		<ActionModal
			isOpen={isOpen}
			onBackPress={onBackPress}
			closeModal={closeModal}
			style={styles.linkedinModalContainer}
		>
			<View style={styles.linkedinModalContent}>
				<RNText
					title={getString(STRINGS.linkedinModalTitle)}
					style={styles.linkedinModalTitle}
				/>

				<View style={styles.linkedinLogoContainer}>
					<LinkedInLogo
						width={horizontalScale(120)}
						height={verticalScale(40)}
					/>
				</View>

				<View style={styles.linkedinInputContainer}>
					<RNText
						title={getString(STRINGS.linkedinModalUrlLabel)}
						style={styles.linkedinInputLabel}
					/>

					<Controller
						control={control}
						name="url"
						rules={validationRules}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={[
									styles.linkedinTextInput,
									errors.url && styles.inValidUrl,
								]}
								placeholder={getString(
									STRINGS.linkedinModalPlaceholder,
								)}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								autoCapitalize="none"
								autoCorrect={false}
							/>
						)}
					/>

					{errors.url && (
						<View style={styles.inValidUrlTextContainer}>
							<NotAttendedIconLxp
								width={horizontalScale(16)}
								height={horizontalScale(16)}
								color={colors.state.error_red}
							/>
							<RNText
								title={errors.url.message}
								style={styles.inValidUrlText}
							/>
						</View>
					)}
				</View>

				<View style={styles.linkedinButtonContainer}>
					<CommonButton
						title={getString(STRINGS.linkedinModalCancel)}
						variant={IButtonVariant.Tertiary}
						onPress={handleCancel}
						style={styles.linkedinCancelButton}
					/>
					<CommonButton
						title={getString(STRINGS.linkedinModalImport)}
						variant={IButtonVariant.Primary}
						onPress={handleSubmit(onSubmit)}
						style={styles.linkedinImportButton}
						isDisabled={!isDirty}
					/>
				</View>
			</View>
		</ActionModal>
	);
};

export default memo(ParseLinkedinModal);

const styles = StyleSheet.create({
	inValidUrl: {
		borderColor: colors.state.error_red,
		borderWidth: horizontalScale(2),
	},
	inValidUrlText: {
		color: colors.state.error_red,
		...sm,
		...regular,
	},
	inValidUrlTextContainer: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(8),
		marginTop: verticalScale(8),
	},
	linkedinButtonContainer: {
		flexDirection: "row",
		gap: horizontalScale(12),
		marginTop: verticalScale(32),
	},
	linkedinCancelButton: {
		flex: 1,
	},
	linkedinImportButton: {
		flex: 1,
	},
	linkedinInputContainer: {
		marginTop: verticalScale(24),
	},
	linkedinInputLabel: {
		...sm,
		...semiBold,
		color: neutral.black,
		marginBottom: verticalScale(8),
	},
	linkedinLogoContainer: {
		alignItems: "center",
		marginTop: verticalScale(24),
	},
	linkedinModalContainer: {
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(0),
	},
	linkedinModalContent: {
		paddingBottom: verticalScale(40),
		paddingTop: verticalScale(24),
	},
	linkedinModalTitle: {
		...reg,
		...semiBold,
		color: neutral.black,
		textAlign: "center",
	},
	linkedinTextInput: {
		borderColor: neutral.grey_05,
		borderRadius: horizontalScale(8),
		borderWidth: 1,
		color: neutral.black,
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(12),
		...sm,
		...regular,
	},
});
