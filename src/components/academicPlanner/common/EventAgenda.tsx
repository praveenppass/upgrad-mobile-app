import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { TextStyle } from "react-native";

import RenderHtml from "@components/Reusable/RenderHtml";
import RNText from "@components/Reusable/RNText";
import { ToastType, useToast } from "@components/Reusable/Toast";

import downloadDocument from "@services/downloadDocument";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { IFileTypeEnum } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { CircleDownloadIcon, PDFIcon } from "@assets/icons/svg/transcript";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { sm, regular, medium } = commonStyles.text;
const { content, neutral } = colors;

export interface IEventAgenda {
	agenda: string;
	agendaDoc?: {
		filePath: string;
	};
}

interface IEventAgendaProps {
	agenda?: IEventAgenda;
	style?: TextStyle;
}

const STRINGS = createStringConstants({
	agenda: "common.agenda",
});

const EventAgenda = ({ agenda, style }: IEventAgendaProps) => {
	const { showToast } = useToast();

	const filePath = agenda?.agendaDoc?.filePath;

	const downloadFile = () => {
		downloadDocument({
			fileUrl: filePath,
			fileName: "agendaFile",
			fileExtension: IFileTypeEnum.PDF,
			errorCallback: () => {
				showToast({
					message: strings.ERROR_DESC,
					type: ToastType.ERROR,
				});
			},
		});
	};

	const renderAgendaDownload = useCallback(() => {
		return (
			<View style={styles.container}>
				<View style={styles.leftSection}>
					<PDFIcon />
					<RNText
						title={getString(STRINGS.agenda)}
						style={styles.agendaTxt}
					/>
				</View>
				<Pressable onPress={downloadFile}>
					<CircleDownloadIcon />
				</Pressable>
			</View>
		);
	}, []);

	if (!agenda) return null;

	return (
		<>
			<RNText
				title={getString(STRINGS.agenda)}
				style={[style, styles.titleStyle]}
			/>
			{agenda?.agenda ? (
				<RenderHtml content={agenda?.agenda ?? ""} />
			) : null}
			{filePath ? renderAgendaDownload() : null}
		</>
	);
};

const styles = StyleSheet.create({
	agendaTxt: {
		...sm,
		...medium,
		color: neutral.black,
	},
	container: {
		alignItems: "center",
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(8),
		flexDirection: "row",
		justifyContent: "space-between",
		padding: horizontalScale(10),
	},
	leftSection: {
		alignItems: "center",
		columnGap: horizontalScale(8),
		flexDirection: "row",
	},
	titleStyle: {
		...sm,
		...regular,
		alignSelf: "flex-start",
		backgroundColor: neutral.grey_02,
		borderRadius: horizontalScale(4),
		color: content.text.body_grey_07,
		lineHeight: verticalScale(15),
		marginBottom: verticalScale(6),
		paddingHorizontal: horizontalScale(4),
		paddingVertical: verticalScale(2),
	},
});

export default EventAgenda;
