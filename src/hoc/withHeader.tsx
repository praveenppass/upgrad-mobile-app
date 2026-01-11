import React from "react";
import { useSelector } from "react-redux";

import BasicHeader from "@components/Header/BasicHeader";
import CustomHeader from "@components/Header/CustomHeader";
import AppNetworkState from "@components/Reusable/AppNetworkState";
import CustomStatusBar from "@components/StatusBar";

import { type RootState } from "@redux/store/root.reducer";

import { type IWithHeaderProps } from "@interface/app.interface";

import { C } from "@assets/constants";

import { WithBackGroundGradient } from "./withBackGroundGradient";

const {
	strings,
	commonStyles: {
		text: { txtStart },
	},
} = C;

export const withHeader = ({
	isHomeHeader,
	BodyComponent,
	headerOptions,
	HeaderComponent,
	showHeaderFallback,
	colors,
	isGradientBackGround = true,
}: IWithHeaderProps) => {
	const {
		appNetworkStateModal: { visible },
	} = useSelector((state: RootState) => state.modal);
	const contentToRender =
		visible === false ? <AppNetworkState /> : <BodyComponent />;
	return (
		<>
			<CustomStatusBar />
			{isHomeHeader ? (
				<CustomHeader />
			) : HeaderComponent ? (
				<HeaderComponent />
			) : (
				<BasicHeader {...(headerOptions ?? {})} />
			)}
			{/* some pages header is not visible on app error state */}
			{showHeaderFallback && visible === false && (
				<BasicHeader
					isBack
					title={strings.BACK}
					titleStyle={txtStart}
				/>
			)}
			{isGradientBackGround ? (
				<WithBackGroundGradient
					contentToRender={contentToRender}
					colors={colors}
				/>
			) : (
				contentToRender
			)}
		</>
	);
};
