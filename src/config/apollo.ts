/*
 * APOLLO GRAPHQL  CONFIG
 */
import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Instana from "@instana/react-native-agent";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

import {
	DISABLE_NETWORK_ERROR_SCREEN,
	ErrorType,
} from "@screens/NetworkErrorScreen";

import { appNavigationRef } from "@navigation/NavigationContainer";
import { ROOT_ROUTES } from "@navigation/routes";

import { ENV } from "@config/env";
import { storage } from "@config/mmkvStorage";

import { authSlice } from "@redux/slices/auth.slice";
import { snackSlice } from "@redux/slices/snack.slice";
import { store } from "@redux/store/store";

import { APIErrorCodeEnum, ISnackType } from "@interface/app.interface";

import StorageKeys from "@constants/storage.constants";

import { strings } from "@assets/strings";

export const authLink = setContext(async (_, { headers = {} }) => {
	try {
		const user_token = await storage.getString(StorageKeys.USER_TOKEN);

		if (!user_token) return;

		return {
			headers: {
				...headers,
				role: "learner",
				authorization: `Bearer ${
					user_token && JSON.parse(String(user_token))?.access_token
				}`,
			},
		};
	} catch (err) {
		//
	}
});

const errorLink = onError(
	({ graphQLErrors, networkError, operation, forward }) => {
		if (graphQLErrors?.length) {
			const errorCode = graphQLErrors[0]?.extensions?.code;
			const isLearnerCourse =
				operation?.operationName === "learnerCourses";

			//* Logout User IF Error Code is UNAUTHENTICATED
			if (errorCode === APIErrorCodeEnum.UNAUTHENTICATED) {
				store.dispatch(authSlice.actions.logout());
				//* if Logout don't show SnackBar
				if (isLearnerCourse) {
					return;
				}
				store.dispatch(
					snackSlice.actions.showAlert({
						type: ISnackType.info,
						message: strings.TOKEN_EXPIRED_ERROR,
					}),
				);
				return;
			}

			if (!DISABLE_NETWORK_ERROR_SCREEN) {
				appNavigationRef.navigate(ROOT_ROUTES.NetworkErrorScreen, {
					errorType: ErrorType.SERVER,
					errorDetails: {
						type: "GraphQL Error",
						operation: {
							name: operation?.operationName,
							variables: operation?.variables,
						},
						errors: graphQLErrors,
						timestamp: new Date().toISOString(),
					},
				});

				graphQLErrors.forEach(({ message }) =>
					console.error(`[GraphQL error]: Message: ${message}`),
				);
			}

			if (networkError != null) {
				console.error(`[Network error]: ${networkError}`);

				let errorType: ErrorType;

				const status =
					"statusCode" in networkError
						? networkError.statusCode
						: undefined;

				if (!status || networkError.name === "NetworkError") {
					errorType = ErrorType.NETWORK;
				} else if (status >= 500) {
					errorType = ErrorType.SERVER;
				} else if (status >= 400) {
					errorType = ErrorType.CLIENT;
				} else {
					errorType = ErrorType.UNKNOWN;
				}

				if (!DISABLE_NETWORK_ERROR_SCREEN) {
					appNavigationRef.navigate(ROOT_ROUTES.NetworkErrorScreen, {
						errorType,
						errorDetails: {
							type: "Network Error",
							operation: {
								name: operation?.operationName,
								variables: operation?.variables,
							},
							networkError: {
								message: networkError.message,
								statusCode:
									"statusCode" in networkError
										? networkError.statusCode
										: undefined,
								name: networkError.name,
								stack: networkError.stack,
							},
							timestamp: new Date().toISOString(),
						},
					});
				}
			}

			graphQLErrors?.forEach(({ message, extensions }) => {
				Instana.reportEvent(
					`GraphQL error in ${operation.operationName}: ${message}`,
					{
						// Custom payload to inspect in Instana
						operationName: operation.operationName,
						variables: operation.variables,
						extensions,
					},
				);
			});
			if (networkError != null) {
				Instana.reportEvent("Network error", {
					details: String(networkError),
					operationName: operation?.operationName,
				});
			}
		}
	},
);

export const link = ApolloLink.from([
	authLink,
	errorLink,
	new HttpLink({ uri: `${ENV.endpoint}/graphql` }),
]);
export const qaLink = ApolloLink.from([
	authLink,
	errorLink,
	new HttpLink({ uri: `${ENV.assessmentServiceEndpoint}/graphql` }),
]);
export const cache = new InMemoryCache();
export const client = new ApolloClient({
	cache,
	link,
	name: `upGrad-Kh-learn-app-${Platform.OS}`,
	version: DeviceInfo.getVersion(),
});
export const customLinkClient = new ApolloClient({
	cache,
	link: qaLink,
	name: `upGrad-Kh-learn-app-${Platform.OS}`,
	version: DeviceInfo.getVersion(),
});
export const infinityHeaders = setContext((_, { headers }) => ({
	headers: {
		...headers,
		"x-tenant": "upgrad",
		role: "learner",
	},
}));

export const infinityLink = ApolloLink.from([
	infinityHeaders,
	errorLink,
	new HttpLink({ uri: `${ENV.infinityServiceEndPoint}/graphql` }),
]);

export const infinityClient = new ApolloClient({
	cache,
	link: infinityLink,
	name: `upGrad-Kh-learn-app-${Platform.OS}`,
	version: DeviceInfo.getVersion(),
});
