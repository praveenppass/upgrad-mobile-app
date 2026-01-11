import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";

import downloadDocument from "@services/downloadDocument";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import { DownloadIcon } from "@assets/icons";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

interface IDownloadSourceFileProps {
	key?: string;
	filePath: string | null;
	fileTitle: string | null;
}

const {
	text: { medium, sm, md },
} = commonStyles;

const DownloadSourceCodeFile: React.FC<IDownloadSourceFileProps> = ({
	filePath,
	fileTitle,
}) => {
	const _fileTitle = fileTitle || strings.DOWNLOAD_SOURCE_CODE_FILE;
	const [loading, setLoading] = useState(false);
	const onDownloadSource = () => {
		const getFileExtension = filePath
			? filePath.split(".").pop()?.split(/\#|\?/)[0]
			: "";

		setLoading(true);
		downloadDocument({
			fileUrl: filePath || "",
			fileName: _fileTitle,
			fileExtension: getFileExtension,
			successCallback: () => setLoading(false),
			errorCallback: () => setLoading(false),
		});
	};
	return (
		<View style={styles.container}>
			{/* Text Content */}
			<RNText
				style={styles.textContent}
				ellipsizeMode="tail"
				numberOfLines={1} // Allows 2 lines of text
			>
				{_fileTitle}
			</RNText>

			{/* Icon on the Right */}
			<Pressable
				onPress={onDownloadSource}
				//disabled={loading}
			>
				{loading ? (
					<Loading
						imageStyle={styles.loading}
						style={styles.loadingContainer}
					/>
				) : (
					<DownloadIcon
						width={20}
						height={20}
						color={colors.neutral.grey_07}
					/>
				)}
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: colors.neutral.grey_03,
		borderColor: colors.neutral.grey_04,
		borderRadius: 4,
		borderWidth: 1,
		flexDirection: "row",
		gap: horizontalScale(8),
		marginVertical: verticalScale(8),
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(9),
	},
	loading: {
		height: horizontalScale(14),
		width: horizontalScale(14),
	},
	loadingContainer: {
		marginLeft: horizontalScale(16),
	},
	textContent: {
		color: colors.neutral.black,
		flexShrink: 1, // Ensures wrapping instead of overflow
		flex: 1, // Ensures text takes available space
		...medium,
		...md,
		lineHeight: verticalScale(19),
	},
});

export default React.memo(DownloadSourceCodeFile);
