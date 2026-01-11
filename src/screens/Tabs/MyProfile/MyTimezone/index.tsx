import React, { memo } from "react";

import EditMyProfileDetails from "@components/MyProfile/common/EditMyProfileDetails";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { strings } from "@assets/strings";

import useMyTimezoneController from "./useMyTimezoneController";

const BodyComponent = () => {
	const { fields, methods, onError, onSubmit, buttonDisabled, loading } =
		useMyTimezoneController();

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

const MyTimezone = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		title={strings.MY_TIMEZONE}
	/>
);

export default memo(MyTimezone);
