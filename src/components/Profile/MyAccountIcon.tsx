import React, { memo } from "react";
import { C } from "@assets/constants";
import { horizontalScale } from "@utils/functions";
import {
	Flag,
	StarIcon,
	AboutIcon,
	HeartIcon,
	SettingIcon,
	WorkExpIcon,
	EducationIcon,
	AdditionalIcon,
	CertificateIcon,
} from "@assets/icons";

const { strings } = C;

const PROFILE_ICON_SIZE = {
	width: horizontalScale(24),
	height: horizontalScale(24),
};

const MyAccountIcon = ({ title }: { title: string }) => {
	switch (title) {
		case strings.ABOUT:
		case strings.PERSONAL_DETAILS:
			return <AboutIcon {...PROFILE_ICON_SIZE} />;
		case strings.EDUCATION:
			return <EducationIcon {...PROFILE_ICON_SIZE} />;
		case strings.WORK_EXP:
			return <WorkExpIcon {...PROFILE_ICON_SIZE} />;
		case strings.SKILLS:
			return <StarIcon {...PROFILE_ICON_SIZE} />;
		case strings.SETTINGS:
			return <SettingIcon {...PROFILE_ICON_SIZE} />;
		case strings.ADDITIONAL_INFO:
		case strings.ADDITIONAL_INFO_PROFILE:
			return <AdditionalIcon {...PROFILE_ICON_SIZE} />;
		case strings.CERTIFICATE:
		case strings.CERTIFICATES:
			return <CertificateIcon {...PROFILE_ICON_SIZE} />;
		case strings.CAREER_PROFILE:
			return <Flag {...PROFILE_ICON_SIZE} />;
		case strings.AREA_OF_INTEREST:
		case strings.AREA_OF_INTEREST_:
			return <HeartIcon {...PROFILE_ICON_SIZE} />;
		default:
			return <></>;
	}
};

export default memo(MyAccountIcon);
