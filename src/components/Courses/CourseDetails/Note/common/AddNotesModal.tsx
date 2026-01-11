import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, TextInput, View } from "react-native";

import styles from "@components/Courses/CourseDetails/Note/common/modalstyle";
import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import AuthInputError from "@components/Reusable/AuthInputError";
import RNText from "@components/Reusable/RNText";

import { C } from "@assets/constants";
import { strings } from "@assets/strings";

const {
	themes: { text },
} = C;

interface IEditItem {
	id?: string | null;
	title?: string;
	content?: string;
}

interface IAddNotesModal {
	noteType: string;
	editNoteItem?: IEditItem;
	handleConfirmationModal: (val: boolean) => void;
	handleApiCall: (title: string, notes: string) => void;
}

enum NotesType {
	GenerateNotes = "GeneralNotes",
	Notes = "Notes",
}

interface FormInputs {
	title: string;
	notes: string;
}

const AddNotesModal = ({
	noteType,
	editNoteItem,
	handleConfirmationModal,
	handleApiCall,
}: IAddNotesModal) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormInputs>({
		defaultValues: { title: "", notes: "" },
	});

	useEffect(() => {
		if (editNoteItem) {
			reset({
				title: editNoteItem.title || "",
				notes: editNoteItem.content || "",
			});
		} else {
			reset({ title: "", notes: "" });
		}
	}, [editNoteItem, reset]);

	const onSubmit = (data: FormInputs) => {
		handleApiCall(data.title, data.notes);
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={styles.modalContainer}
			keyboardVerticalOffset={100}
		>
			<View style={styles.headerContainer}>
				<RNText
					style={styles.notesTitle}
					title={
						editNoteItem?.id ? strings.EDIT_NOTE : strings.ADD_NOTE
					}
				/>
			</View>

			{noteType !== NotesType.Notes && (
				<Controller
					control={control}
					name="title"
					rules={{
						required: strings.HEADING_CAN_BE_EMPTY,
						maxLength: {
							value: 80,
							message: strings.FIELD_NOT_BE_EXCEED_CHARACTER,
						},
						validate: (value) => {
							return (
								value.trim().length > 0 ||
								strings.FIELD_CAN_NOT_BE_EMPTY
							);
						},
					}}
					render={({ field: { onChange, value } }) => (
						<TextInput
							style={[styles.textInput, styles.shadowEffect]}
							value={value}
							onChangeText={onChange}
							placeholder={strings.TYPE_THE_HEADING}
							placeholderTextColor={text.steelBlue}
						/>
					)}
				/>
			)}
			{errors.title && (
				<AuthInputError message={errors.title.message as string} />
			)}

			<Controller
				control={control}
				name="notes"
				rules={{
					required: strings.NOTE_CAN_BE_EMPTY,
					validate: (value) => {
						return (
							value.trim().length > 0 ||
							strings.FIELD_CAN_NOT_BE_EMPTY
						);
					},
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						multiline
						style={[
							styles.textInput,
							styles.shadowEffect,
							styles.textFieldHieght,
						]}
						value={value}
						onChangeText={onChange}
						placeholder={strings.NOTE_PLACEHOLDER}
						placeholderTextColor={text.steelBlue}
						textAlignVertical="top"
					/>
				)}
			/>
			{errors.notes && (
				<AuthInputError message={errors.notes.message as string} />
			)}

			<View style={editNoteItem?.id ? styles.btnView : styles.addBtnView}>
				{editNoteItem?.id && (
					<CommonButton
						title={strings.DELETE_TEXT}
						onPress={() => handleConfirmationModal(true)}
						variant={IButtonVariant.Tertiary}
						style={styles.btn}
					/>
				)}
				<CommonButton
					title={strings.SAVE_NOTE}
					onPress={handleSubmit(onSubmit)}
					variant={IButtonVariant.Secondary}
					style={styles.btn}
				/>
			</View>
		</KeyboardAvoidingView>
	);
};

export default AddNotesModal;
