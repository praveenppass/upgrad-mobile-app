import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
	FieldValues,
	SubmitErrorHandler,
	SubmitHandler,
	UseControllerProps,
	UseFormReturn,
} from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";

import withFormContext from "@components/Inputs/withFormContext";
import WorkExperienceCard, {
	IWorkExperienceItem,
} from "@components/Inputs/WorkExperienceCard";
import { IFieldConfig } from "@components/MyProfile/common/profile.interface";
import RNText from "@components/Reusable/RNText";

import { HOME_ROUTES, ROOT_ROUTES } from "@navigation/routes";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { PlusIcon } from "@assets/icons";
import { commonStyles } from "@assets/styles";

const { sm, regular, md, semiBold, lg, lightBold } = commonStyles.text;

const { neutral, state } = colors;

export interface IActionCardInputProps extends UseControllerProps {
	isMandatory: boolean;
	label: string;
	title?: string;
	subtitle?: string;
	actionText?: string;
	description?: string;
	modalTitle?: string;
	modalDescription?: string;
	fields?: IFieldConfig[];
	methods?: UseFormReturn<FieldValues>;
	onSubmit?: SubmitHandler<FieldValues>;
	onError?: SubmitErrorHandler<FieldValues>;
	workExperienceItems?: IWorkExperienceItem[];
	onWorkExperienceAdd?: (data: IWorkExperienceItem) => void;
	onWorkExperienceDelete?: (id: string) => void;
	onWorkExperienceEdit?: (id: string) => void;
	handleAddEducation?: (data: IWorkExperienceItem, index?: number) => void;
}

const ActionCard = (props: IActionCardInputProps) => {
	const navigation = useNavigation();
	const {
		isMandatory,
		label,
		actionText,
		disabled,
		modalTitle,
		modalDescription,
		fields = [],
		workExperienceItems = [],
		onWorkExperienceAdd,
		onWorkExperienceDelete,
		onWorkExperienceEdit,
		handleAddEducation,
	} = props;

	const handlePress = useCallback(() => {
		(navigation.navigate as any)(ROOT_ROUTES.HomeStack, {
			screen: HOME_ROUTES.ManualProfileFieldsModal,
			params: {
				fields,
				title: modalTitle,
				description: modalDescription,
				onDataSaved: onWorkExperienceAdd,
				workExperienceIndex: undefined,
				workExperienceItem: undefined,
				index: 0,
				onSaveSuccess: handleAddEducation,
			},
		});
	}, [
		navigation,
		fields,
		modalTitle,
		modalDescription,
		onWorkExperienceAdd,
		handleAddEducation,
	]);

	return (
		<View style={styles.container}>
			{label && (
				<RNText style={styles.label}>
					{label}
					{isMandatory && <RNText style={styles.redColor}> *</RNText>}
				</RNText>
			)}

			{/* Add new work experience card */}
			<Pressable
				style={[styles.card, disabled && styles.cardDisabled]}
				onPress={handlePress}
				disabled={disabled}
			>
				<View style={styles.iconContainer}>
					<PlusIcon
						width={horizontalScale(24)}
						height={verticalScale(24)}
						color={neutral.black}
					/>
				</View>
				<RNText style={styles.actionText} title={actionText || "Add"} />
			</Pressable>

			{/* Render existing work experience cards */}
			{workExperienceItems.length > 0 && (
				<View style={styles.cardsContainer}>
					{workExperienceItems.map((item) => (
						<WorkExperienceCard
							key={item.id}
							item={item}
							onDelete={onWorkExperienceDelete}
							onEdit={onWorkExperienceEdit}
						/>
					))}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	actionText: {
		...sm,
		color: neutral.black,
		...lightBold,
		textAlign: "center",
	},
	card: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderColor: neutral.grey_06,
		borderRadius: horizontalScale(12),
		borderStyle: "solid",
		borderWidth: 2,
		height: verticalScale(108),
		justifyContent: "center",
		marginBottom: verticalScale(24),
		paddingHorizontal: horizontalScale(24),
		paddingVertical: verticalScale(24),
		width: horizontalScale(236),
	},
	cardDisabled: {
		opacity: 0.5,
	},
	cardsContainer: {
		width: "100%",
	},
	container: {
		alignItems: "center",
		marginBottom: verticalScale(8),
		width: "100%",
	},
	errorContainer: {
		alignItems: "center",
		flexDirection: "row",
		marginBottom: verticalScale(4),
		marginTop: verticalScale(4),
	},
	iconContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: verticalScale(12),
	},
	label: {
		...semiBold,
		color: neutral.black,
		...md,
		marginBottom: verticalScale(12),
	},
	redColor: {
		color: state.error_red,
	},
	subtitle: {
		...regular,
		color: neutral.grey_08,
		fontSize: md.fontSize,
		marginBottom: verticalScale(20),
		textAlign: "left",
	},
	title: {
		...semiBold,
		color: neutral.black,
		fontSize: lg.fontSize,
		marginBottom: verticalScale(8),
		textAlign: "left",
	},
});

export default withFormContext(ActionCard);
