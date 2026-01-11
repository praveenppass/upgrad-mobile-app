import { DocumentPickerResponse } from "@react-native-documents/picker";
import { useCallback, useEffect, useState } from "react";
import { Asset } from "react-native-image-picker";
import { useDispatch } from "react-redux";

import {
	IFileUploadModalType,
	IParseFileStatus,
	IUploadedFileData,
} from "@screens/Home/MyProfile/ProfileMethods/ParseResumeModal";
import useFileUploadModalModel from "@screens/Home/MyProfile/ProfileMethods/ParseResumeModal/useParseResumeModalModel";

import { uploadFile } from "@services/uploadBase64";

import { useMedia } from "@hooks/useMedia";

import { formatBytes } from "@utils/functions";

import { userSlice } from "@redux/slices/user.slice";

interface IFileUploadModalController {
	isModalVisible: boolean;
	setIsModalVisible: (visible: boolean) => void;
	onParseFileStatusChange?: (status: IParseFileStatus) => void;
	skipParsing?: boolean;
	onFileUploaded?: (fileData: IUploadedFileData) => void;
	modalType: IFileUploadModalType;
}
const useFileUploadModalController = ({
	isModalVisible,
	setIsModalVisible,
	onParseFileStatusChange,
	skipParsing = false,
	onFileUploaded,
	modalType,
}: IFileUploadModalController) => {
	const [isError, setIsError] = useState(false);
	const [selectedFile, setSelectedFile] =
		useState<DocumentPickerResponse | null>(null);
	const dispatch = useDispatch();
	const [selectedImage, setSelectedImage] = useState<Asset | null>(null);

	const { parseFile, parseFileLoading, parsedFileData } =
		useFileUploadModalModel();
	const { chooseDocumentOrPDF, chooseMediaFromGallery } = useMedia();

	const handleModalClose = useCallback(() => setIsModalVisible(false), []);

	const handleFileSelection = useCallback(async () => {
		const res = await chooseDocumentOrPDF();
		if (!res) return;
		const file = res[0];
		if (!file || formatBytes(file.size || 0).size > 5) setIsError(true);

		setSelectedFile(file);
	}, [chooseDocumentOrPDF]);

	useEffect(() => {
		if (parseFileLoading)
			onParseFileStatusChange?.(IParseFileStatus.LOADING);
	}, [parseFileLoading, onParseFileStatusChange]);

	useEffect(() => {
		onParseFileStatusChange?.(IParseFileStatus.IDLE);
	}, []);

	const handleImageSelection = useCallback(async () => {
		const res = await chooseMediaFromGallery();
		if (!res) return;
		const file = res.assets?.[0];
		if (!file || formatBytes(file.fileSize || 0).size > 1) setIsError(true);

		setSelectedImage(file || null);
	}, [chooseMediaFromGallery]);

	const clearSelectedFile = useCallback(() => {
		setSelectedFile(null);
		setSelectedImage(null);
		setIsError(false);
	}, []);

	// const parseProfileImageCallback = useCallback(
	// 	 () => {} profile image upload logic
	// 	[],
	// );

	const submitFile = useCallback(async () => {
		// Handle image upload (profile picture)
		if (selectedImage && modalType === IFileUploadModalType.PROFILE_IMAGE) {
			const {
				data: { location },
			} = await uploadFile({
				file: {
					uri: selectedImage.uri || "",
					name: selectedImage.fileName || "",
					type: selectedImage.type || "",
					size: selectedImage.fileSize || 0,
				},
			});

			if (!location) return;

			const uploadedFileData: IUploadedFileData = {
				fileName: selectedImage.fileName || "",
				filePath: location,
				uploadedAt: new Date().toISOString(),
			};

			// If skipParsing, just return the file data
			if (skipParsing) {
				onFileUploaded?.(uploadedFileData);
				handleModalClose();
				return;
			}

			// Profile images don't need parsing, just close
			handleModalClose();
			return;
		}

		// Handle PDF/resume upload
		if (!selectedFile) return;

		const {
			data: { location },
		} = await uploadFile({
			file: {
				uri: selectedFile.uri,
				name: selectedFile.name || "",
				type: selectedFile.type || "",
				size: selectedFile.size || 0,
			},
		});

		if (!location) return;

		const uploadedFileData: IUploadedFileData = {
			fileName: selectedFile.name || "",
			filePath: location,
			uploadedAt: new Date().toISOString(),
		};

		// If skipParsing mode, just return the uploaded file
		if (skipParsing) {
			onFileUploaded?.(uploadedFileData);
			handleModalClose();
			return;
		}

		// Otherwise, parse the resume (original behavior)
		parseFile({
			variables: {
				resumeUrl: location,
			},
			onCompleted: (data) => {
				dispatch(
					userSlice.actions.setParsedProfileData(
						data.autofillProfile,
					),
				);
				onParseFileStatusChange?.(IParseFileStatus.COMPLETED);
			},
		});
	}, [
		selectedFile,
		selectedImage,
		skipParsing,
		onFileUploaded,
		parseFile,
		onParseFileStatusChange,
		modalType,
		handleModalClose,
	]);

	return {
		isModalVisible,
		setIsModalVisible,
		isError,
		parseFileLoading,
		handleModalClose,
		handleFileSelection,
		clearSelectedFile,
		submitFile,
		isFileSelected: !!selectedFile,
		selectedImage,
		handleImageSelection,
		parsedFileData,
	};
};

export default useFileUploadModalController;
