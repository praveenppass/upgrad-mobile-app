import { Platform } from "react-native";
import RNFetchBlob, { ReactNativeBlobUtilConfig } from "react-native-blob-util";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

import requestAndroidDownloadPermission from "@utils/requestAndroidDownloadPermission";

export interface DownloadDocumentProps {
	fileUrl: string;
	successCallback?: () => void;
	errorCallback?: () => void;
	fileName?: string;
	fileExtension?: string;
}

const getFileInfo = (fileUrl: string) => {
	const fileInfo = fileUrl.split(/[#?]/)[0].split(".");

	const fileExtension = fileInfo[fileInfo.length - 1].trim();
	const fileName = fileInfo[fileInfo.length - 2].trim().split("/").pop();

	return [fileName, fileExtension];
};

const {
	config,
	fs: {
		dirs: { DocumentDir, LegacyDownloadDir },
	},
} = RNFetchBlob;

const downloadDocument = async ({
	fileUrl,
	successCallback,
	errorCallback,
	fileName,
	fileExtension,
}: DownloadDocumentProps) => {
	try {
		requestAndroidDownloadPermission();

		const date = new Date();

		const [fileNameExtract, fileExtensionExtract] = getFileInfo(
			fileUrl.trim(),
		);

		const extension =
			fileExtension?.replace(".", "") || fileExtensionExtract;

		const safeFileName =
			(
				fileName ||
				(fileNameExtract && decodeURI(fileNameExtract))
			)?.replace(/[^a-zA-Z0-9.\-_ ]/g, "_") || "";

		let mimeType = "";

		if (extension && ["png", "jpg", "jpeg"].includes(extension)) {
			mimeType = "image/*";
		} else if (extension === "pdf") {
			mimeType = "application/pdf";
		}

		const directoryPath = Platform.select({
			ios: DocumentDir,
			android: LegacyDownloadDir,
		});

		const folderPath = `${directoryPath}/upGrad`;

		const folderExists = await RNFS.exists(folderPath);
		if (!folderExists) await RNFS.mkdir(folderPath);
		const filePath = `${folderPath}/${
			safeFileName || Math.random() * 1000
		}_${Math.floor(date.getTime() + date.getSeconds() / 2)}.${extension}`;

		const configOptions = Platform.select({
			ios: {
				fileCache: true,
				path: filePath,
				appendExt: "png",
				notification: true,
			},
			android: {
				fileCache: true,
				appendExt: "png",
				addAndroidDownloads: {
					path: filePath,
					useDownloadManager: true,
					mediaScannable: true,
					notification: true,
					mime: mimeType,
				},
			},
		});

		const response = await config(
			configOptions as ReactNativeBlobUtilConfig,
		).fetch("GET", fileUrl.trim());
		if (extension !== "zip") {
			FileViewer.open(response.data);
		}
		successCallback?.();
	} catch (ex) {
		errorCallback?.();
	}
};

export default downloadDocument;
