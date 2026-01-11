import { useState } from "react";

import { ToastType, useToast } from "@components/Reusable/Toast";

import downloadDocument from "@services/downloadDocument";
import { IUploadFileData, uploadFile } from "@services/uploadBase64";

import { useMedia } from "@hooks/useMedia";

import { formatBytes } from "@utils/functions";

import { IFileTypeEnum } from "@interface/app.interface";

import { strings } from "@assets/strings";

export enum IUploadFileType {
	MEDIA = "media",
	PDF = "pdf",
}

export interface IUploadFile {
	fileName: string;
	filePath: string;
	uploadedAt: string;
}

interface IUseUploadInputContainer {
	fileType: IUploadFileType;
}

export const useUploadController = ({ fileType }: IUseUploadInputContainer) => {
	const [isUploading, setUploading] = useState(false);
	const { chooseMediaFromGallery, choosePdf } = useMedia();
	const { showToast } = useToast();

	const handleFileUpload = async (): Promise<IUploadFile | undefined> => {
		try {
			const uploadFunction =
				fileType === IUploadFileType.MEDIA
					? uploadMediaFile
					: uploadPdfFile;

			return await uploadFunction();
		} catch (error) {}
	};

	const uploadPdfFile = async (): Promise<IUploadFile | undefined> => {
		const res = await choosePdf();
		setUploading(true);

		if (!res) return;
		const file = res[0];
		if (!res || formatBytes(file?.size || 0).size > 3.0) return;

		const {
			data: { location },
		} = await uploadFile({
			file: file as IUploadFileData,
			onProgress: () => setUploading(false),
		});

		if (!file.name || !location) return;

		return {
			fileName: file.name,
			filePath: location,
			uploadedAt: new Date().toISOString(),
		};
	};

	const uploadMediaFile = async (): Promise<IUploadFile | undefined> => {
		const res = await chooseMediaFromGallery();

		if (!res?.assets) return;
		const choosenImage = res.assets[0];
		if (!res || formatBytes(choosenImage.fileSize || 0).size > 10.0) return;

		if (!choosenImage) return;
		const imageUploadRes = await uploadFile({
			file: {
				uri: choosenImage.uri || "",
				name: choosenImage.fileName || "",
				type: choosenImage.type || "",
				size: choosenImage.fileSize || 0,
			},
		});
		const imageUrl = imageUploadRes.data.location;

		if (!choosenImage.fileName || !imageUrl) return;
		return {
			fileName: choosenImage.fileName,
			filePath: imageUrl,
			uploadedAt: new Date().toISOString(),
		};
	};

	const downloadFile = (filePath: string) => {
		downloadDocument({
			fileUrl: filePath,
			fileName: "downloadFile",
			fileExtension:
				fileType === IUploadFileType.PDF
					? IFileTypeEnum.PDF
					: IFileTypeEnum.Image,
			errorCallback: () => {
				showToast({
					message: strings.ERROR_DESC,
					type: ToastType.ERROR,
				});
			},
		});
	};

	return {
		isUploading,
		downloadFile,
		handleFileUpload,
	};
};
