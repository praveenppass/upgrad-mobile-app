import React from "react";
import { C } from "@assets/constants";
import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";
import {
	AssessmentIcon,
	AssessmentIconOutline,
	AssetCardLockedIcon,
	AssignmentIcon,
	AssignmentIconOutline,
	AssignmentNotSupportIcon,
	CheckMarkGreenCircleIcon,
	CodeZipIcon,
	CodeZipIconOutline,
	FlashCardsIcon,
	FlashCardsIconOutLine,
	HTMLZipIcon,
	HTMLZipIconOutline,
	HandsOnAssetIcon,
	HandsOnAssetIconOutline,
	HandsOnNotSupportIcon,
	OnlineEditorIcon,
	OnlineEditorIconOutline,
	PDFIcon,
	PDFIconOutline,
	ProjectIcon,
	ProjectIconOutline,
	ProjectNotSupportIcon,
	ReadingMaterialIcon,
	RecallQuizIcon,
	RecallQuizIconOutline,
	SuperAssetIcon,
	SuperAssetIconOutline,
	VideoIcon,
	VideoIconOutline,
} from "@assets/icons";

const {
	themes: { bg, text, border },
} = C;

const createAssetIconColor = (state: IAssetStatusEnum) => {
	switch (state) {
		case IAssetStatusEnum.completed:
			return border.green;
		case IAssetStatusEnum.started:
			return bg.orange;
		case IAssetStatusEnum.notStarted:
			return text.steelBlue;
		case IAssetStatusEnum.locked:
			return text.steelBlue;
		case IAssetStatusEnum.sequentialLock:
			return text.steelBlue;
		case IAssetStatusEnum.inProgress:
			return text.steelBlue;
		case IAssetStatusEnum.resumeAsset:
			return text.black;
		default:
			return text.white;
	}
};

const createNotSupportAssetIcon = (type: IAssetType) => {
	switch (type) {
		case IAssetType.ASSIGNMENT:
			return <AssignmentNotSupportIcon />;
		case IAssetType.HAND_ON:
			return <HandsOnNotSupportIcon />;
		case IAssetType.PROJECT:
			return <ProjectNotSupportIcon />;
		default:
			break;
	}
};

const createAssetIcon = (
	type: IAssetType,
	state?: IAssetStatusEnum,
	disabled?: boolean = false,
	yetToStart?: boolean = false,
	dimensions?: { width: number; height: number },
	color?: string,
) => {
	if (state === IAssetStatusEnum.completed) {
		return (
			<CheckMarkGreenCircleIcon color={border.green} {...dimensions} />
		);
	}
	if (disabled || (yetToStart && type !== IAssetType.ASSESSMENT)) {
		return <AssetCardLockedIcon color={text.steelBlue} {...dimensions} />;
	}
	switch (type) {
		case IAssetType.ASSESSMENT:
			return state === IAssetStatusEnum.notStarted ? (
				<AssessmentIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<AssessmentIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.VIDEO:
			return state === IAssetStatusEnum.notStarted ? (
				<VideoIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<VideoIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.RECALL_QUIZ:
			return state === IAssetStatusEnum.notStarted ? (
				<RecallQuizIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<RecallQuizIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.ASSIGNMENT:
			return state === IAssetStatusEnum.notStarted ? (
				<AssignmentIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<AssignmentIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.READING_MATERIAL:
			return state === IAssetStatusEnum.notStarted ? (
				<ReadingMaterialIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<ReadingMaterialIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.FLASH_CARD:
			return state === IAssetStatusEnum.notStarted ? (
				<ReadingMaterialIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<ReadingMaterialIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.SCROM:
			return state === IAssetStatusEnum.notStarted ? (
				<FlashCardsIconOutLine
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<FlashCardsIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.PDF:
			return state === IAssetStatusEnum.notStarted ? (
				<PDFIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<PDFIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.HTML_ZIP:
			return state === IAssetStatusEnum.notStarted ? (
				<HTMLZipIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<HTMLZipIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.ONLINE_EDITOR:
			return state === IAssetStatusEnum.notStarted ? (
				<OnlineEditorIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<OnlineEditorIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.PROJECT:
			return state === IAssetStatusEnum.notStarted ? (
				<ProjectIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<ProjectIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.CODE_ZIP:
			return state === IAssetStatusEnum.notStarted ? (
				<CodeZipIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<CodeZipIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.SUPER_ASSET:
			return state === IAssetStatusEnum.notStarted ? (
				<SuperAssetIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<SuperAssetIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		case IAssetType.HAND_ON:
			return state === IAssetStatusEnum.notStarted ? (
				<HandsOnAssetIconOutline
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			) : (
				<HandsOnAssetIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
		default:
			return (
				<AssessmentIcon
					color={color ? color : createAssetIconColor(state)}
					{...dimensions}
				/>
			);
	}
};

export { createAssetIcon, createNotSupportAssetIcon };
