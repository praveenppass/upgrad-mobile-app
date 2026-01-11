import React, { memo } from "react";

import useContactDetailsController from "@screens/Tabs/MyProfile/ContactDetails/useContactDetailsController";

import EditMyProfileDetails from "@components/MyProfile/common/EditMyProfileDetails";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { strings } from "@assets/strings";

const BodyComponent = () => {
	const { fields, methods, onError, onSubmit, buttonDisabled, loading } =
		useContactDetailsController();

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

const ContactDetails = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		showBack
		title={strings.CONTACT_DETAILS}
	/>
);

export default memo(ContactDetails);
