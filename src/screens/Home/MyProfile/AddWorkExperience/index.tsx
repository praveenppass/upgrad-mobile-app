import React, { memo } from "react";

import useAddWorkExperienceController from "@screens/Home/MyProfile/AddWorkExperience/useAddWorkExperienceController";

import { IWorkExperienceItem } from "@components/Inputs/WorkExperienceCard";
import EditMyProfileDetails from "@components/MyProfile/common/EditMyProfileDetails";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { strings } from "@assets/strings";

interface IAddWorkExperienceProps {
	onDataSaved?: (data: IWorkExperienceItem) => void;
	workExperienceIndex?: number;
	workExperienceItem?: IWorkExperienceItem;
	isNewEntry?: boolean;
}

const AddWorkExperience: React.FC<IAddWorkExperienceProps> = ({
	onDataSaved,
	workExperienceIndex,
	workExperienceItem,
	isNewEntry = false,
}) => {
	const { fields, methods, onError, onSubmit, buttonDisabled, loading } =
		useAddWorkExperienceController({
			workExperienceIndex: workExperienceIndex ?? 0,
			workExperienceItem,
			onDataSaved,
			isNewEntry,
		});

	return (
		<WithHeaderLxp
			BodyComponent={() => (
				<EditMyProfileDetails
					fields={fields}
					methods={methods}
					onError={onError}
					onSubmit={onSubmit}
					submitDisabled={buttonDisabled}
					loading={loading}
				/>
			)}
			showBack
			title={strings.WORK_EXPERIENCE}
		/>
	);
};

export default memo(AddWorkExperience);
