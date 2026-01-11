import React from "react";

import {
	IGetShareIcon,
	IShareType,
} from "@components/Reusable/ShareButton/shareButton.interface";

import { LinkedInInvertedIcon, XOutlineIcon } from "@assets/icons/svg/social";

export const getShareIcon = ({
	shareType,
	width,
	height,
	color,
}: IGetShareIcon) => {
	const props = { width, height, color };

	switch (shareType) {
		case IShareType.LINKEDIN:
			return <LinkedInInvertedIcon {...props} />;
		case IShareType.X:
			return <XOutlineIcon {...props} />;
		default:
			return null;
	}
};
