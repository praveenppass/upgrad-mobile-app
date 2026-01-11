import { Platform } from "react-native";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

import requestAndroidDownloadPermission from "@utils/requestAndroidDownloadPermission";

import { IFileTypeEnum } from "@interface/app.interface";

export interface DownloadFileProps {
	base64File: string;
	successCallback?: () => void;
	errorCallback?: () => void;
	fileName?: string;
	fileExtension?: IFileTypeEnum;
}

const downloadBase64File = async ({
	base64File,
	successCallback,
	errorCallback,
	fileName,
	fileExtension,
}: DownloadFileProps) => {
	try {
		requestAndroidDownloadPermission();

		const directoryPath = Platform.select({
			ios: RNFS.DocumentDirectoryPath,
			android: RNFS.DownloadDirectoryPath,
		});

		const date = new Date();
		const name = `${fileName}${date.getTime()}`;
		const folderPath = `${directoryPath}/upGrad`;
		const filePath = `${folderPath}/${name}${fileExtension || ""}`;

		const folderExists = await RNFS.exists(folderPath);
		if (!folderExists) await RNFS.mkdir(folderPath);

		await RNFS.writeFile(filePath, base64File, "base64");
		FileViewer.open(filePath);

		successCallback?.();
	} catch (error) {
		errorCallback?.();
	}
};

export default downloadBase64File;
