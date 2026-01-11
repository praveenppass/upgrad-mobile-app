import { useRoute } from "@react-navigation/native";
import React, { memo } from "react";

import usePersonalDetailsController from "@screens/Tabs/MyProfile/PersonalDetails/usePersonalDetailsController";

import EditMyProfileDetails from "@components/MyProfile/common/EditMyProfileDetails";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

const BodyComponent = () => {
	const route =
		useRoute<RootHomeStackRouteProps<"MyProfilePersonalDetails">>();
	const params = route.params;
	const isStudyPlanBlocker = params?.isStudyPlanBlocker || false;

	const { fields, methods, onError, onSubmit, buttonDisabled, loading } =
		usePersonalDetailsController({
			isStudyPlanBlocker,
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

const PersonalDetails = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		title={strings.PERSONAL_DETAILS}
	/>
);

export default memo(PersonalDetails);
