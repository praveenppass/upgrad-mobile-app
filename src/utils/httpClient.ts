import axios, {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

import {
	DISABLE_NETWORK_ERROR_SCREEN,
	ErrorType,
} from "@screens/NetworkErrorScreen";

import { appNavigationRef } from "@navigation/NavigationContainer";
import { ROOT_ROUTES } from "@navigation/routes";

import { storage } from "@config/mmkvStorage";

import StorageKeys from "@constants/storage.constants";

/**
 * Extended Axios internal request configuration with custom auth token skipping
 * @interface CustomInternalAxiosRequestConfig
 * @extends {InternalAxiosRequestConfig}
 */
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
	/** Whether to skip adding the default authorization token */
	skipDefaultAuthToken?: boolean;
}

/**
 * Extended Axios request configuration with custom auth token skipping
 * @interface CustomAxiosRequestConfig
 * @extends {AxiosRequestConfig}
 */
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
	/** Whether to skip adding the default authorization token */
	skipDefaultAuthToken?: boolean;
}

/**
 * Creates an HTTP client with automatic authentication, error handling, and navigation
 *
 * Features:
 * - Automatic Bearer token injection from storage
 * - Global error handling with navigation to error screen
 * - Request/response interceptors
 * - Configurable base URL and timeout
 *
 * @param {string} [baseURL] - Optional base URL for all requests
 *
 * @returns {Object} HTTP client object with CRUD methods
 * @returns {Function} returns.get - GET request method
 * @returns {Function} returns.post - POST request method
 * @returns {Function} returns.put - PUT request method
 * @returns {Function} returns.delete - DELETE request method
 * @returns {Function} returns.patch - PATCH request method
 *
 * @example
 * ```typescript
 * const httpClient = createHttpClient({ baseURL: 'https://api.example.com' });
 *
 * // GET request
 * const response = await httpClient.get<User>('/users/1');
 *
 * // POST request with custom config
 * const newUser = await httpClient.post<CreateUserRequest, User>(
 *   '/users',
 *   userData,
 *   { skipDefaultAuthToken: true }
 * );
 * ```
 */

interface ICreateHttpClient {
	baseURL?: string;
	timeout?: number;
	bypassNetworkErrorScreen?: boolean;
}
export const createHttpClient = (props?: ICreateHttpClient) => {
	const { baseURL, timeout, bypassNetworkErrorScreen } = props || {};
	const defaultHttpClient = axios.create({
		baseURL,
		timeout: timeout ?? 10_000,
		headers: {
			"Content-Type": "application/json",
		},
	});

	defaultHttpClient.interceptors.request.use(
		async (config: CustomInternalAxiosRequestConfig) => {
			const userToken = await storage.getString(StorageKeys.USER_TOKEN);
			const access_token = userToken
				? JSON.parse(userToken).access_token
				: null;
			if (
				access_token &&
				config.headers &&
				!config.skipDefaultAuthToken
			) {
				config.headers.Authorization = `Bearer ${access_token}`;
			}
			delete config.skipDefaultAuthToken;
			return config;
		},
		(error: AxiosError) => Promise.reject(error),
	);

	defaultHttpClient.interceptors.response.use(
		(response: AxiosResponse) => response,
		(error: AxiosError) => {
			const status = error?.response?.status;

			let errorType: ErrorType;
			if (!error.response) errorType = ErrorType.NETWORK;
			else if (status && status >= 500) errorType = ErrorType.SERVER;
			else if (status && status >= 400) errorType = ErrorType.CLIENT;
			else errorType = ErrorType.UNKNOWN;

			if (bypassNetworkErrorScreen || DISABLE_NETWORK_ERROR_SCREEN)
				return Promise.reject(error);

			appNavigationRef.navigate(ROOT_ROUTES.NetworkErrorScreen, {
				errorType,
				errorDetails: {
					error,
					timestamp: new Date().toISOString(),
				},
			});

			return Promise.reject(error);
		},
	);

	const httpClient = {
		get: <T>(url: string, config?: CustomAxiosRequestConfig) =>
			defaultHttpClient.get<T>(url, config),

		post: <TRequest, TResponse>(
			url: string,
			data?: TRequest,
			config?: CustomAxiosRequestConfig,
		) => defaultHttpClient.post<TResponse>(url, data, config),

		put: <TRequest, TResponse>(
			url: string,
			data?: TRequest,
			config?: CustomAxiosRequestConfig,
		) => defaultHttpClient.put<TResponse>(url, data, config),

		delete: <T>(url: string, config?: CustomAxiosRequestConfig) =>
			defaultHttpClient.delete<T>(url, config),

		patch: <TRequest, TResponse>(
			url: string,
			data?: TRequest,
			config?: CustomAxiosRequestConfig,
		) => defaultHttpClient.patch<TResponse>(url, data, config),
	};

	return httpClient;
};
