import React, { memo } from "react";
import {
	FieldValues,
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
} from "react-hook-form";

import useAddEducationController from "@screens/Home/MyProfile/AddEducation/useAddEducationController";

import EditMyProfileDetails from "@components/MyProfile/common/EditMyProfileDetails";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { ICPSEducationDetails } from "@services/cpsService";

import { strings } from "@assets/strings";

interface IAddEducation {
	index?: number;
	educationItem?: ICPSEducationDetails;
	onDataSuccess?: (data: ICPSEducationDetails, index: number) => void;
}

const AddEducation = ({
	index,
	educationItem,
	onDataSuccess,
}: IAddEducation) => {
	const { fields, methods, onError, onSubmit, buttonDisabled, loading } =
		useAddEducationController({
			educationIndex: index ?? 0,
			educationItem,
			onDataSuccess: onDataSuccess ?? (() => {}),
		});

	console.log("educationItem in AddEducation:", educationItem);
	return (
		<WithHeaderLxp
			BodyComponent={() => (
				<EditMyProfileDetails
					fields={fields}
					methods={methods as UseFormReturn<FieldValues>}
					onError={onError as SubmitErrorHandler<FieldValues>}
					onSubmit={onSubmit as SubmitHandler<FieldValues>}
					submitDisabled={buttonDisabled}
					loading={loading}
				/>
			)}
			showBack
			title={strings.EDUCATION}
		/>
	);
};

// Added a comment to trigger re-evaluation
export default memo(AddEducation);
