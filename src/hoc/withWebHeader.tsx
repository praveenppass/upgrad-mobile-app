import React from "react";
import { ColorValue } from "react-native";

import WebHeader from "@components/Header/WebHeader";
import ScreenWrapper from "@components/Reusable/ScreenWrapper";

interface IWithWebHeaderProps {
	BodyComponent: React.FunctionComponent;
	isGuest: boolean;
	showBack?: boolean;
	title?: string;
	showCourses?: boolean;
	toggleMegaMenu?: () => void;
	centerLogo?: boolean;
	showRightSection?: boolean;
	removeBottomInset?: boolean;
	backgroundColor?: ColorValue;
	headerBackgroundColor?: ColorValue;
}
const WithWebHeader = ({
	BodyComponent,
	isGuest,
	showBack,
	title,
	showCourses,
	toggleMegaMenu,
	centerLogo,
	showRightSection,
	removeBottomInset,
	headerBackgroundColor,
	backgroundColor,
}: IWithWebHeaderProps) => (
	<ScreenWrapper
		removeBottomInset={removeBottomInset}
		backgroundColor={backgroundColor}
		headerBackgroundColor={headerBackgroundColor}
	>
		<WebHeader
			isGuest={isGuest}
			showBack={showBack}
			title={title}
			showCourses={showCourses}
			toggleMegaMenu={toggleMegaMenu}
			centerLogo={centerLogo}
			showRightSection={showRightSection}
		/>
		<BodyComponent />
	</ScreenWrapper>
);

export default WithWebHeader;
