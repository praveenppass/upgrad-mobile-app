import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Loading from "@components/Reusable/Loading";
import ScreenWrapper from "@components/Reusable/ScreenWrapper";

import {
	AUTH_ROUTES,
	HOME_ROUTES,
	HOME_TAB_ROUTES,
	ROOT_ROUTES,
} from "@navigation/routes";
import useAppNavigation from "@navigation/useAppNavigation";

import { handleUserLogin } from "@utils/web.utils";

import { RootState } from "@redux/store/root.reducer";

import { colors } from "@assets/colors";

const { neutral } = colors;

const PostEnrollScreen: React.FC = () => {
	const navigation = useAppNavigation();

	const { omsAuthToken, token } = useSelector(
		(state: RootState) => state.user,
	);

	useEffect(() => {
		if (!omsAuthToken)
			return navigation.replace(ROOT_ROUTES.AuthStack, {
				screen: AUTH_ROUTES.WelcomeScreen,
			});

		if (token.access_token && token.refresh_token)
			return navigation.replace(ROOT_ROUTES.HomeStack, {
				screen: HOME_ROUTES.MainTabs,
				params: {
					screen: HOME_TAB_ROUTES.MyPrograms,
				},
			});

		handleUserLogin({
			authToken: omsAuthToken,
			enableAuthNavigation: true,
		});
	}, []);

	return (
		<ScreenWrapper style={styles.container}>
			<Loading style={styles.loaderStyle} />
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: neutral.white,
		flex: 1,
	},
	loaderStyle: {
		flex: 1,
	},
});

export default PostEnrollScreen;
