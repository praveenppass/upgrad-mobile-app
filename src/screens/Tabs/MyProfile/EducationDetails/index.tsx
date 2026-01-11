import { useRoute } from "@react-navigation/native";
import React, { memo } from "react";

import useEducationDetailsController from "@screens/Tabs/MyProfile/EducationDetails/useEducationDetailsController";

import EditMyProfileDetails from "@components/MyProfile/common/EditMyProfileDetails";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

const BodyComponent = () => {
	const route =
		useRoute<RootHomeStackRouteProps<"MyProfileEducationDetails">>();
	const { educationDetailsIndex } = route.params;

	const { fields, methods, onError, onSubmit, buttonDisabled, loading } =
		useEducationDetailsController({
			educationDetailsIndex,
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

const EducationDetails = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		title={strings.EDUCATION}
	/>
);

export default memo(EducationDetails);
