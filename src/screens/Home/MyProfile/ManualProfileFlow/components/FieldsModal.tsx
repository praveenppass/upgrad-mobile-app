import { useRoute } from "@react-navigation/native";
import React from "react";
import {
	FieldValues,
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
} from "react-hook-form";

import AddEducation from "@screens/Home/MyProfile/AddEducation";
import AddWorkExperience from "@screens/Home/MyProfile/AddWorkExperience";

import { IWorkExperienceItem } from "@components/Inputs/WorkExperienceCard";
import { IFieldConfig } from "@components/MyProfile/common/profile.interface";

import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

export interface IFieldsModalProps {
	fields: IFieldConfig[];
	methods: UseFormReturn<FieldValues>;
	onSubmit: SubmitHandler<FieldValues>;
	onError: SubmitErrorHandler<FieldValues>;
	onClose: () => void;
	title?: string;
	description?: string;
	onDataSaved?: (data: IWorkExperienceItem) => void;
}

const FieldsModal: React.FC = () => {
	const route =
		useRoute<RootHomeStackRouteProps<"ManualProfileFieldsModal">>();

	const {
		onDataSaved,
		workExperienceIndex,
		workExperienceItem,
		title,
		index,
		onSaveSuccess,
		educationItem,
	} = route.params || {};

	const isNewEntry =
		workExperienceIndex === undefined && workExperienceItem === undefined;

	return (
		<>
			{title === "Education Details" ? (
				<AddEducation
					index={index}
					educationItem={educationItem}
					onDataSuccess={onSaveSuccess}
				/>
			) : (
				<AddWorkExperience
					onDataSaved={onDataSaved}
					isNewEntry={isNewEntry}
					workExperienceIndex={workExperienceIndex}
					workExperienceItem={workExperienceItem}
				/>
			)}
		</>
	);
};

export default FieldsModal;
