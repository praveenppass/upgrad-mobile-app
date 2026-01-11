import React from "react";
import { SvgProps } from "react-native-svg";

import InProgressIndicator from "@components/Reusable/InProgressIndicator";

import { horizontalScale, verticalScale } from "@utils/functions";

import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

import { colors } from "@assets/colors";
import {
	AssessmentIconOutline,
	AssetCardLockedIcon,
	AssignmentIconOutline,
	CodeZipIconOutline,
	FlashCardsIcon,
	FlashCardsIconOutLine,
	HandsOnAssetIconOutline,
	HTMLZipIconOutline,
	OnlineEditorIconOutline,
	PDFIconOutline,
	ProjectIconOutline,
	ReadingMaterialIcon,
	RecallQuizIconOutline,
	SuccessOutlineIcon,
	SuperAssetIconOutline,
	VideoIconOutline,
} from "@assets/icons";

interface IStudyPlanAssetIcon {
	assetType?: IAssetType;
	assetStatus?: IAssetStatusEnum;
	isLocked?: boolean;
}

const { neutral, state } = colors;

const ICON_DEFAULT_PROPS = {
	width: horizontalScale(16),
	height: verticalScale(16),
	color: neutral.grey_08,
};

const StudyPlanAssetIcon = ({
	assetType,
	assetStatus,
	isLocked = false,
}: IStudyPlanAssetIcon) => {
	if (assetStatus === IAssetStatusEnum.inProgress && !isLocked)
		return <InProgressIndicator />;

	let Icon: React.FC<SvgProps> | null = null;
	let iconProps = {
		...ICON_DEFAULT_PROPS,
	};
	if (assetType) {
		switch (assetType) {
			case IAssetType.ASSESSMENT:
				Icon = AssessmentIconOutline;
				break;

			case IAssetType.VIDEO:
				Icon = VideoIconOutline;
				break;

			case IAssetType.RECALL_QUIZ:
				Icon = RecallQuizIconOutline;
				break;

			case IAssetType.ASSIGNMENT:
				Icon = AssignmentIconOutline;
				break;

			case IAssetType.PROJECT:
				Icon = ProjectIconOutline;
				break;

			case IAssetType.CODE_ZIP:
				Icon = CodeZipIconOutline;
				break;

			case IAssetType.SUPER_ASSET:
				Icon = SuperAssetIconOutline;
				break;

			case IAssetType.HAND_ON:
				Icon = HandsOnAssetIconOutline;
				break;

			case IAssetType.READING_MATERIAL:
				Icon = ReadingMaterialIcon;
				break;

			case IAssetType.FLASH_CARD:
				Icon = FlashCardsIconOutLine;
				break;

			case IAssetType.SCROM:
				Icon = FlashCardsIcon;
				break;

			case IAssetType.PDF:
				Icon = PDFIconOutline;
				break;

			case IAssetType.HTML_ZIP:
				Icon = HTMLZipIconOutline;
				break;

			case IAssetType.ONLINE_EDITOR:
				Icon = OnlineEditorIconOutline;
				break;
			default:
				Icon = AssessmentIconOutline;
				break;
		}
	}

	if (assetStatus === IAssetStatusEnum.completed) {
		Icon = SuccessOutlineIcon;
		iconProps = {
			...iconProps,
			width: horizontalScale(14),
			height: verticalScale(14),
			color: state.success_green,
		};
	}
	if (isLocked) {
		Icon = AssetCardLockedIcon;
		iconProps = {
			...iconProps,
			width: horizontalScale(12),
			height: verticalScale(15),
			color: neutral.grey_06,
		};
	}

	if (!Icon) return null;

	return <Icon {...iconProps} />;
};

export default StudyPlanAssetIcon;
