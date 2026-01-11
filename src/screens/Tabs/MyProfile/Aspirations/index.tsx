import { useRoute } from "@react-navigation/native";
import React, { memo } from "react";

import useAspirationsController from "@screens/Tabs/MyProfile/Aspirations/useAspirationsController";

import EditMyProfileDetails from "@components/MyProfile/common/EditMyProfileDetails";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { RootHomeStackRouteProps } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

const BodyComponent = () => {
	const route = useRoute<RootHomeStackRouteProps<"MyProfileAspirations">>();
	const { learningPathId, learningPathCode, workshopId, learningPathType } =
		route.params;

	const { fields, methods, onError, onSubmit, buttonDisabled, loading } =
		useAspirationsController({
			learningPathId,
			learningPathCode,
			workshopId,
			learningPathType,
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

const Aspirations = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		title={strings.ASPIRATIONS_MY_ACCOUNT}
	/>
);

export default memo(Aspirations);
