import {
	type AuthClientError,
	type AuthClientEvent,
} from "@react-keycloak/core/lib/types";
import { useDispatch } from "react-redux";

import { keycloak } from "@config/keycloack";
import { storage } from "@config/mmkvStorage";

import { authSlice } from "@redux/slices/auth.slice";
import { snackSlice } from "@redux/slices/snack.slice";
import { userSlice } from "@redux/slices/user.slice";

import { ISnackType } from "@interface/app.interface";
import { type IUserToken } from "@interface/user.interface";

import StorageKeys from "@constants/storage.constants";

import { C } from "@assets/constants";

import { strings } from "../assets/strings";
import { useAuthEvents } from "./useAuthEvents";

const useAuth = () => {
	const dispatch = useDispatch();
	const { onAuthSuccess } = useAuthEvents();

	const onKeyCloackEvent = async (
		event: AuthClientEvent,
		error?: AuthClientError,
	) => {
		if (error != null) {
			dispatch(
				snackSlice.actions.showAlert({
					type: ISnackType.error,
					message: `${error?.error_description}`,
				}),
			);
			return;
		}
		switch (event) {
			case "onAuthSuccess":
				onAuthSuccess();
				dispatch(authSlice.actions.onStartLoading());
				const token: IUserToken = {
					id_token: keycloak?.idToken as string,
					access_token: keycloak?.token as string,
					refresh_token: keycloak.refreshToken as string,
					userReferralCode: keycloak?.tokenParsed
						?.userReferralCode as string,
				};
				dispatch(
					snackSlice.actions.showAlert({
						type: ISnackType.success,
						message: strings.SUCCESSFULLY_LOGGED_IN,
					}),
				);
				dispatch(userSlice.actions.setToken(token));
				dispatch(userSlice.actions.getUser({}));
				break;

			case "onAuthRefreshSuccess":
				const refreshedToken: IUserToken = {
					access_token: keycloak?.token as string,
					id_token: keycloak?.idToken as string,
					refresh_token: keycloak.refreshToken as string,
					userReferralCode: keycloak?.tokenParsed
						?.userReferralCode as string,
				};
				dispatch(userSlice.actions.setToken(refreshedToken));
				break;

			case "onAuthRefreshError":
				dispatch(
					snackSlice.actions.showAlert({
						type: ISnackType.error,
						message: C.strings.AUTH_SESSION_EXPIRED,
					}),
				);
				break;

			case "onTokenExpired":
				// TODO need to remove session logging out and fix the refreshing token updated...
				dispatch(
					snackSlice.actions.showAlert({
						type: ISnackType.error,
						message: C.strings.AUTH_SESSION_EXPIRED,
					}),
				);
				await keycloak.updateToken(5000);
				break;

			case "onAuthError":
				dispatch(
					snackSlice.actions.showAlert({
						type: ISnackType.error,
						message: C.strings.LOGIN_FAILED,
					}),
				);
				break;
		}
	};

	return {
		onKeyCloackEvent,
	};
};

export { useAuth };
