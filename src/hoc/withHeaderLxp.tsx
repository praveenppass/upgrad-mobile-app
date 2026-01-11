import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ColorValue, StatusBar } from "react-native";
import { useSelector } from "react-redux";

import Header from "@components/Header/Header";
import AppNetworkState from "@components/Reusable/AppNetworkState";
import ScreenWrapper from "@components/Reusable/ScreenWrapper";

import { type RootState } from "@redux/store/root.reducer";

interface IWithHeaderLxp {
	BodyComponent: React.FunctionComponent;
	showBack?: boolean;
	title?: string;
	showDismiss?: boolean;
	showProfile?: boolean;
	dark?: boolean;
	showHome?: boolean;
	loading?: boolean;
	rightIcon?: React.FunctionComponent;
	onRightIconPress?: () => void;
	removeBackground?: boolean;
	showBottomShadow?: boolean;
	removeBottomInset?: boolean;
	headerBackgroundColor?: ColorValue;
	backgroundColor?: ColorValue;
}

export const WithHeaderLxp = ({
	BodyComponent,
	showBack,
	title,
	showProfile,
	showDismiss,
	dark,
	showHome,
	loading,
	rightIcon,
	onRightIconPress,
	removeBackground,
	showBottomShadow,
	removeBottomInset,
	headerBackgroundColor,
	backgroundColor,
}: IWithHeaderLxp) => {
	const {
		appNetworkStateModal: { visible },
	} = useSelector((state: RootState) => state.modal);

	const contentToRender =
		visible === false ? <AppNetworkState /> : <BodyComponent />;

	useFocusEffect(
		useCallback(() => {
			StatusBar.pushStackEntry({ barStyle: "dark-content" });
		}, []),
	);

	return (
		<ScreenWrapper
			removeBottomInset={removeBottomInset}
			backgroundColor={backgroundColor}
			headerBackgroundColor={headerBackgroundColor}
		>
			<Header
				showBack={showBack}
				title={title}
				showDismiss={showDismiss}
				showProfile={showProfile}
				dark={dark}
				showHome={showHome}
				loading={loading}
				rightIcon={rightIcon}
				onRightIconPress={onRightIconPress}
				removeBackground={removeBackground}
				showBottomShadow={showBottomShadow}
			/>
			{contentToRender}
		</ScreenWrapper>
	);
};
