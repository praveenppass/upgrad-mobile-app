import { useRoute } from "@react-navigation/native";
import React, { memo } from "react";

import useWorkExperienceController from "@screens/Tabs/MyProfile/WorkExperience/useWorkExperienceController";

import EditMyProfileDetails from "@components/MyProfile/common/EditMyProfileDetails";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

const BodyComponent = () => {
	const route =
		useRoute<RootHomeStackRouteProps<"MyProfileWorkExperience">>();
	const { workExperienceIndex } = route.params;
	const { fields, methods, onError, onSubmit, buttonDisabled, loading } =
		useWorkExperienceController({
			workExperienceIndex,
		});

	return (
		<EditMyProfileDetails
			fields={fields}
			methods={methods}
			onError={onError}
			onSubmit={onSubmit}
			submitDisabled={buttonDisabled}
			loading={loading}
		/>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const WorkExperience = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		title={strings.WORK_EXPERIENCE}
	/>
);

export default memo(WorkExperience);
