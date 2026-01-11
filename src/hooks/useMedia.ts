import * as DocumentPicker from "@react-native-documents/picker";
import { Platform } from "react-native";
import {
	ImageLibraryOptions,
	launchImageLibrary,
} from "react-native-image-picker";
import * as mime from "react-native-mime-types";
import { useDispatch } from "react-redux";

import { AppStateManager } from "@hooks/useAppState";

import { snackSlice } from "@redux/slices/snack.slice";

import { ISnackType } from "@interface/app.interface";

import { strings } from "@assets/strings";

const options: ImageLibraryOptions = {
	mediaType: "photo",
	includeBase64: true,
};

function getIosMineType(value: string) {
	const mimeTypes = {
		allFiles: "*/*",
		audio: "audio/*",
		csv: "text/csv",
		doc: "application/msword",
		docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		images: "image/*",
		pdf: "application/pdf",
		plainText: "text/plain",
		ppt: "application/vnd.ms-powerpoint",
		pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		video: "video/*",
		xls: "application/vnd.ms-excel",
		xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		zip: "application/zip",
	};

	for (const [key, val] of Object.entries(mimeTypes)) {
		if (val === value) {
			return key;
		}
	}

	return "";
}

const useMedia = () => {
	const dispatch = useDispatch();

	const onShowError = (message: string) => {
		dispatch(
			snackSlice.actions.showAlert({
				type: ISnackType.error,
				message: message,
			}),
		);
	};

	const chooseMediaFromGallery = () => {
		AppStateManager.setIsAppStateBlocked(true);
		return launchImageLibrary(options, (response) => {
			AppStateManager.setIsAppStateBlocked(false);
			if (response.didCancel) {
				return;
			} else if (response?.errorMessage) {
				onShowError(strings.WENT_WRONG);
			} else {
				return response?.assets?.[0]?.base64;
			}
		});
	};

	const chooseDocumentOrPDF = async () => {
		try {
			return await DocumentPicker.pick({
				type: [
					"application/rtf",
					"text/rtf",
					"public.rtf",
					DocumentPicker.types.doc,
					DocumentPicker.types.docx,
					DocumentPicker.types.pdf,
				],
				// allowMultiSelection: false,
			});
		} catch (error) {
			return;
		}
	};

	const choosePdf = async () => {
		try {
			return await DocumentPicker.pick({
				//There can me more options as well
				type: [
					DocumentPicker.types.pdf,
					DocumentPicker.types.doc,
					DocumentPicker.types.docx,
				],
			});
		} catch (error) {
			return;
		}
	};

	const choosePdfAndPng = async () => {
		try {
			return await DocumentPicker.pick({
				//There can me more options as well
				type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
			});
		} catch (error) {
			return;
		}
	};

	const chooseVideo = async () => {
		try {
			return await DocumentPicker.pick({
				//There can me more options as well
				type: [DocumentPicker.types.video],
			});
		} catch (error) {
			return;
		}
	};

	const chooseImage = async () => {
		try {
			return await DocumentPicker.pick({
				type: [DocumentPicker.types.images],
			});
		} catch (error) {
			return;
		}
	};

	const chooseFile = async (fileTypes?: string[]) => {
		try {
			const type = fileTypes
				?.map((item: string) => {
					if (Platform.OS === "ios") {
						return item.endsWith(".mp4")
							? DocumentPicker.types.video
							: DocumentPicker.types[
									getIosMineType(mime.lookup(item) as string)
								];
					} else {
						return item.endsWith(".mp4")
							? "video/*"
							: ((mime.lookup(item) as string) ?? "");
					}
				})
				.filter((item) => item);

			return await DocumentPicker.pick(
				fileTypes?.length
					? {
							type: type,
						}
					: {},
			);
		} catch (error) {
			return;
		}
	};

	return {
		choosePdf,
		chooseMediaFromGallery,
		chooseFile,
		chooseVideo,
		choosePdfAndPng,
		chooseDocumentOrPDF,
		chooseImage,
	};
};

export { useMedia };
