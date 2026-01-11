import { AxiosProgressEvent } from "axios";
import BackgroundService from "react-native-background-actions";

import { uploadHttpClient } from "@utils/httpClientList";

import { ENV } from "@config/env";
import { storage } from "@config/mmkvStorage";

import StorageKeys from "@constants/storage.constants";

import { colors } from "@assets/colors";

const { bg } = colors;

const uploadBase64Func = async (body: { image: string }) => {
	try {
		const access_token = await storage.getString(StorageKeys.USER_TOKEN);
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${access_token}`,
		};
		const url = `${ENV.endpoint}/upload/uploadBase64`;
		return uploadHttpClient
			.post(url, body, { headers })
			.then((res) => res)
			.catch((err) => err);
	} catch (error) {
		return error;
	}
};

const uploadResume = async (
	body: FormData,
	onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
	try {
		const access_token = await storage.getString(StorageKeys.USER_TOKEN);
		const headers = {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${access_token}`,
		};
		const url = `${ENV.endpoint}/upload`;
		return uploadHttpClient
			.post(url, body, { headers, onUploadProgress })
			.then((res) => res)
			.catch((err) => err);
	} catch (error) {
		return error;
	}
};
export interface IUploadFileData {
	name: string;
	type: string;
	size: number;
	uri: string;
}
interface IUploadFile {
	file: IUploadFileData;
	onProgress?: (a: number) => void;
}

export interface IUploadFileResponse {
	data: {
		location: string | null;
	};
}

const uploadFile = async ({
	file,
	onProgress,
}: IUploadFile): Promise<IUploadFileResponse> => {
	const formData = new FormData();
	formData.append("upload", file);

	try {
		const token = await storage.getString(StorageKeys.USER_TOKEN);

		if (!token)
			return {
				data: {
					location: null,
				},
			};

		const headers = {
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${JSON.parse(token).access_token}`,
		};
		const url = `${ENV.endpoint}/upload/upload2`;

		const res = await uploadHttpClient.post(url, formData, {
			headers,
			onUploadProgress: (progressEvent) => {
				const percentComplete =
					(progressEvent.loaded / (progressEvent.total || 1)) * 100;

				onProgress?.(Math.round(+percentComplete));
			},
		});

		return res;
	} catch (error) {
		return {
			data: {
				location: null,
			},
		};
	}
};

const uploadFileInBackground = (
	file: IUploadFileData,
	onProgress?: (percent: number) => void,
): Promise<IUploadFileResponse> => {
	return new Promise((resolve, reject) => {
		const options = {
			taskName: "FileUpload",
			taskTitle: "Uploading File",
			taskDesc: `File Uploading ${file.name}`,
			taskIcon: {
				name: "ic_launcher",
				type: "mipmap",
			},
			color: bg.fill.logo,
			linkingURI: "upgrad://",
		};

		BackgroundService.start(async () => {
			try {
				const formData = new FormData();
				formData.append("upload", file);

				const res = await uploadResume(formData, (progressEvent) => {
					const percent =
						(progressEvent.loaded / (progressEvent.total || 1)) *
						100;

					onProgress?.(Math.round(percent));
					BackgroundService.updateNotification({
						taskDesc: `${file.name} ...`,
					});
				});

				resolve(res);
			} catch (error) {
				reject(error);
			} finally {
				await BackgroundService.stop();
			}
		}, options);
	});
};

export { uploadResume, uploadBase64Func, uploadFile, uploadFileInBackground };
