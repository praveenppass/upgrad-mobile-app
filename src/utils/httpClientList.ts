import { createHttpClient } from "@utils/httpClient";

import { ENV } from "@config/env";

export const authHttpClient = createHttpClient({
	baseURL: ENV.ugAuthServiceUrl,
});
export const assessmentHttpClient = createHttpClient({
	baseURL: ENV.assessmentServiceEndpoint,
});
export const sathiHttpClient = createHttpClient({
	baseURL: ENV.sathiBotServiceUrl,
	timeout: 30_000,
});
export const otpHttpClient = createHttpClient({ baseURL: ENV.otpService });
export const ugUserServiceHttpClient = createHttpClient({
	baseURL: ENV.ugUserServiceUrl,
});
export const brightcoveHttpClient = createHttpClient({
	baseURL: ENV.brightCoveEndpoint || "",
});

export const ugCourseServiceHttpClient = createHttpClient({
	baseURL: ENV.ugCourseServiceUrl,
});

export const httpClient = createHttpClient();

export const httpClientWithoutTimeout = createHttpClient({
	timeout: 0,
});

/**
 * @deprecated
 * uploadHttpClient is deprecated. Use httpClientWithoutTimeout directly instead.
 */
export const uploadHttpClient = httpClientWithoutTimeout;

export const httpClientWithoutNetworkErrorScreen = createHttpClient({
	bypassNetworkErrorScreen: true,
});

export const productivityGPTApiHttpClient = createHttpClient({
	baseURL: ENV.productivityGPTApiUrl,
});
