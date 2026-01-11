import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

import AttachmentButton from "@components/Chips/AttachmentButton";
import AttachmentChip from "@components/Chips/AttachmentChip";
import AuthInputError from "@components/Reusable/AuthInputError";
import RNText from "@components/Reusable/RNText";
import ProfileInput from "@components/Reusable/TextInput/ProfileInput";

import { IAttachment } from "@interface/helpSupport.interface";

import { C } from "@assets/constants";
import { ArrowDownIcon } from "@assets/icons";
import { strings } from "@assets/strings";

import {
	ICreateTicketFormData,
	ICreateTicketFormDataError,
} from "../RaiseATicketController";
import { RAISE_ISSUE_DESCRIPTION_MAX_LENGTH } from "../RaiseATicketViewModel";

const {
	themes: { text },
	commonStyles: {
		align: { fWrap },
		spacing: { mt12, mv12, mt6 },
		text: { txtEnd },
	},
} = C;

interface IRaiseTicketForm {
	formData: ICreateTicketFormData | undefined;
	onChangeSubject: (text: string) => void;
	onChangeDescription: (text: string) => void;
	openCategorySheet: () => void;
	openCourseSheet: () => void;
	addAttachments: () => void;
	removeAttachment: (index: number) => void;
	createTicketFormError: ICreateTicketFormDataError | undefined;
	onViewAttachment: (item: IAttachment) => void;
	onSubmitSubject: () => void;
	onSubmitDescription: () => void;
}

const RaiseTicketForm = ({
	formData,
	onChangeSubject,
	openCategorySheet,
	openCourseSheet,
	onChangeDescription,
	addAttachments,
	onViewAttachment,
	removeAttachment,
	onSubmitSubject,
	onSubmitDescription,
	createTicketFormError,
}: IRaiseTicketForm) => {
	const renderRight = () => <ArrowDownIcon color={text.steelBlue} />;
	const rightIcon = <TextInput.Icon icon={renderRight} />;

	return (
		<>
			<View>
				<ProfileInput
					editable={false}
					isButton
					mandatory={true}
					label={strings.SELECT_COURSE_PROGRAM}
					rootViewStyle={mt12}
					isError={!!createTicketFormError?.userProgramError}
					rightIcon={rightIcon}
					value={formData?.userProgram?.text ?? ""}
					placeholder={strings.SELECT_OPTION}
					onInputHandler={() => {}}
					onInputClick={openCourseSheet}
				/>
				<AuthInputError
					message={createTicketFormError?.userProgramError}
				/>
				<ProfileInput
					editable={false}
					isButton
					mandatory={true}
					label={strings.SELECT_CATEGORY}
					rootViewStyle={mt12}
					isError={!!createTicketFormError?.categoryError}
					rightIcon={rightIcon}
					value={formData?.category?.text ?? ""}
					placeholder={strings.SELECT_OPTION}
					onInputHandler={() => {}}
					onInputClick={openCategorySheet}
				/>
				<AuthInputError
					message={createTicketFormError?.categoryError}
				/>
				<ProfileInput
					isButton={false}
					mandatory={true}
					multiline={false}
					rootViewStyle={mt12}
					numberOfLines={10}
					label={strings.SUBJECT}
					isError={!!createTicketFormError?.subjectError}
					value={formData?.subject ?? ""}
					placeholder={strings.SUBJECT}
					onSubmit={onSubmitSubject}
					onInputHandler={(text) => onChangeSubject(text)}
				/>
				<AuthInputError message={createTicketFormError?.subjectError} />
				<ProfileInput
					isButton={false}
					mandatory={true}
					numberOfLines={10}
					rootViewStyle={mt12}
					multiline={true}
					inputStyle={{ height: 207 }}
					label={strings.DESCRIPTION_ONLY}
					isError={!!createTicketFormError?.descriptionError}
					value={formData?.description ?? ""}
					placeholder={strings.TYPE_HERE}
					onSubmit={onSubmitDescription}
					onInputHandler={(text) => onChangeDescription(text)}
				/>
				<RNText
					style={[mt6, txtEnd]}
					title={`${
						formData?.description?.length || 0
					} / ${RAISE_ISSUE_DESCRIPTION_MAX_LENGTH}`}
				/>
				<AuthInputError
					message={createTicketFormError?.descriptionError}
				/>
			</View>
			<View style={[mt12, fWrap]}>
				{formData?.attachments?.map((item, index) => {
					const onRemoveTap = () => {
						removeAttachment(index);
					};
					const onTap = () => {
						onViewAttachment(item);
					};
					return (
						<AttachmentChip
							onTap={onTap}
							key={`${index}`}
							title={item?.name || ""}
							onRemoveTap={onRemoveTap}
						/>
					);
				})}
			</View>
			{createTicketFormError?.attachmentsError && (
				<View style={mv12}>
					<AuthInputError
						message={createTicketFormError?.attachmentsError}
					/>
				</View>
			)}
			<AttachmentButton onPressBtn={addAttachments} />
		</>
	);
};

export default RaiseTicketForm;
