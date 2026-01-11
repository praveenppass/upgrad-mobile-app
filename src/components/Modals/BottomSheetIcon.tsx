import React from "react";

import {
	ArtifactsIcon,
	NotFoundAssetIcon,
	FreeTrialClockIcon,
	LockedIcon,
} from "@assets/icons";
import { moderateScale } from "@utils/functions";

interface SVGWithHeight {
	width?: number;
	height?: number;
}

function AssetNotFoundSVG({ width, height }: SVGWithHeight) {
	return (
		<NotFoundAssetIcon
			{...{
				width: width ?? moderateScale(130),
				height: height ?? moderateScale(130),
			}}
		/>
	);
}

function ArtifactsIconSVG({ width, height }: SVGWithHeight) {
	return (
		<ArtifactsIcon
			{...{
				width: width ?? moderateScale(100),
				height: height ?? moderateScale(100),
			}}
		/>
	);
}

function FreeTrialIconSVG({ width, height }: SVGWithHeight) {
	return (
		<FreeTrialClockIcon
			{...{
				width: width ?? moderateScale(120),
				height: height ?? moderateScale(120),
			}}
		/>
	);
}

function LockedIconSVG({ width, height }: SVGWithHeight) {
	return (
		<LockedIcon
			{...{
				width: width ?? moderateScale(120),
				height: height ?? moderateScale(120),
			}}
		/>
	);
}

export { AssetNotFoundSVG, ArtifactsIconSVG, FreeTrialIconSVG, LockedIconSVG };
