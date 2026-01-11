import { Platform } from "react-native";
import RNFS from "react-native-fs";
import { zip } from "react-native-zip-archive";

import { Toast, ToastType } from "@components/Reusable/Toast";

import requestAndroidDownloadPermission from "@utils/requestAndroidDownloadPermission";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

interface IMultipleFile {
	url: string;
	fileName: string;
}

const STRINGS = createStringConstants({
	DOWNLOAD_ALL_SUCCESS: "common.resources.downloadAllSuccess",
	DOWNLOAD_ALL_FAILURE: "common.resources.downloadAllFailure",
});

const BASE_DOWNLOAD_DIR =
	Platform.select({
		ios: RNFS.DocumentDirectoryPath,
		android: RNFS.DownloadDirectoryPath,
	}) + "/upGrad";

const TEMP_DIR = `${BASE_DOWNLOAD_DIR}/temp`;

export const downloadFilesAsZip = async (files: IMultipleFile[]) => {
	try {
		requestAndroidDownloadPermission();

		const timestamp = Date.now();

		await RNFS.mkdir(TEMP_DIR);

		const downloadedFiles = [];

		for (const file of files) {
			const filePath = `${TEMP_DIR}/${file.fileName}`;

			try {
				const result = await RNFS.downloadFile({
					fromUrl: file.url,
					toFile: filePath,
				}).promise;

				if (result.statusCode === 200) downloadedFiles.push(filePath);
				else throw new Error();
			} catch (err) {
				downloadedFiles.push(null);
			}
		}

		const validFiles = downloadedFiles.filter((file) => file !== null);
		if (!validFiles.length)
			return Toast.showToast({
				message: getString(STRINGS.DOWNLOAD_ALL_FAILURE),
				type: ToastType.ERROR,
			});
		const zipPath = `${BASE_DOWNLOAD_DIR}/Resources_${timestamp}.zip`;
		await zip(validFiles, zipPath);

		await RNFS.unlink(TEMP_DIR);
		Toast.showToast({
			message: getString(STRINGS.DOWNLOAD_ALL_SUCCESS),
			type: ToastType.SUCCESS,
		});
	} catch (error) {
		Toast.showToast({
			message: getString(STRINGS.DOWNLOAD_ALL_FAILURE),
			type: ToastType.ERROR,
		});
	}
};
