import { Document, Packer, Paragraph, TextRun } from "docx";
import { Platform } from "react-native";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

import { ToastType } from "@components/Reusable/Toast";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

interface IGenerateDocProps {
	title: string;
	data: {
		start: string;
		end: string;
		text: string;
		transcript: string;
	}[];
}
interface IGenerateDocWithToastProps extends IGenerateDocProps {
	showToast?: (args: { message: string; type: string }) => void;
}

const STRINGS = createStringConstants({
	NO_APP_FOUND: "studyPlan.container6.transcript.noAppFound",
	UNABLE_TO_DOWNLOAD: "studyPlan.container6.transcript.unableToDownload",
});

// Sanitize filename (no :, /, \, *, ?, ", <, >, |)
const sanitizeFileName = (name: string) => {
	return name.replace(/[/\\?%*:|"<>]/g, " ").trim();
};

const generateDoc = async ({
	title,
	data,
	showToast,
}: IGenerateDocWithToastProps) => {
	try {
		const paragraphs = data.map(
			(item) =>
				new Paragraph({
					children: [
						new TextRun({
							text: `${item.start} - ${item.end}`,
							bold: true,
							size: 24,
						}),
						new TextRun({
							text: item.text,
							bold: true,
							break: 1,
							size: 26,
						}),
						new TextRun({
							text: item.transcript,
							break: 1,
							size: 22,
						}),
					],
					spacing: { after: 200 },
				}),
		);

		const doc = new Document({
			sections: [
				{
					children: [
						new Paragraph({
							children: [
								new TextRun({
									text: title,
									bold: true,
									size: 28,
								}),
							],
						}),
						new Paragraph({ text: "" }),
						...paragraphs,
					],
				},
			],
		});

		const base64 = await Packer.toBase64String(doc);

		// ✅ Clean title before saving
		const safeTitle = sanitizeFileName(title || "Document");

		const path = Platform.select({
			android: `${RNFS.DownloadDirectoryPath}/${safeTitle}.docx`,
			ios: `${RNFS.DocumentDirectoryPath}/${safeTitle}.docx`,
		}) as string;

		await RNFS.writeFile(path, base64, "base64");

		if (Platform.OS === "android") {
			await RNFS.scanFile(path);
		}

		await FileViewer.open(path);
		return path;
	} catch (err: unknown) {
		if (
			err instanceof Error &&
			err.message.includes("No app associated with this mime type")
		) {
			showToast?.({
				message: getString(STRINGS.NO_APP_FOUND),
				type: ToastType.ERROR,
			});
		} else {
			showToast?.({
				message: getString(STRINGS.UNABLE_TO_DOWNLOAD),
				type: ToastType.ERROR,
			});
		}
	}
};

export { generateDoc };
