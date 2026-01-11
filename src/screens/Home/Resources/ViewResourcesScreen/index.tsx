import React, { memo, useCallback, useState } from "react";
import {
	FlatList,
	ListRenderItem,
	Pressable,
	StyleSheet,
	View,
} from "react-native";

import useViewResourcesController from "@screens/Home/Resources/ViewResourcesScreen/useViewResourcesController";

import Loading from "@components/Reusable/Loading";
import RNText from "@components/Reusable/RNText";
import { Toast, ToastType } from "@components/Reusable/Toast";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { ISessionResource } from "@graphql/query/session/resources/sessionResources.interface";

import downloadDocument from "@services/downloadDocument";
import { downloadFilesAsZip } from "@services/downloadMultipleFiles";

import { HOME_ROUTES } from "@navigation/routes";
import useAppRoute from "@navigation/useAppRoute";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { FileFillIcon } from "@assets/icons/svg/common";
import { DownloadIcon } from "@assets/icons/svg/transcript";
import { strings } from "@assets/strings";
import { commonStyles } from "@assets/styles";

const { neutral, icon } = colors;
const { md, semiBold, sm, regular } = commonStyles.text;

const STRINGS = createStringConstants({
	resourcesList: "common.resources.resourcesList",
	downloadAll: "common.resources.downloadAll",
	viewResources: "common.resources.viewResources",
});

const RESOURCES_S3_URL = "https://dlqxh04pj7j0z.cloudfront.net/";

const getFileType = (url: string) => {
	const parts = url.split(".");
	if (!parts.length) return;

	return parts.pop()?.toLowerCase();
};

const downloadFile = async (url: string, fileName: string) => {
	const type = getFileType(url);
	await downloadDocument({
		fileUrl: url,
		fileName: fileName,
		fileExtension: type,
		errorCallback: () => {
			Toast.showToast({
				message: strings.ERROR_DESC,
				type: ToastType.ERROR,
			});
		},
	});
};

interface IResourceCard {
	url: string;
	fileName: string;
	isLastOddItem: boolean;
}

const ResourceCard = ({ url, fileName, isLastOddItem }: IResourceCard) => {
	const [downloading, setDownloading] = useState(false);

	const handleDownload = useCallback(async () => {
		setDownloading(true);
		await downloadFile(url, fileName);
		setDownloading(false);
	}, [url, fileName]);

	return (
		<Pressable
			onPress={handleDownload}
			style={[
				styles.cardWrapper,
				isLastOddItem && styles.singleCardCenter,
			]}
		>
			<View style={styles.card}>
				<FileFillIcon
					width={horizontalScale(36)}
					height={verticalScale(36)}
				/>
			</View>

			<View style={styles.cardContainer}>
				<RNText style={styles.cardText}>{fileName}</RNText>
				<View>
					{downloading ? (
						<Loading />
					) : (
						<DownloadIcon
							color={icon?.hovered}
							width={horizontalScale(14)}
							height={verticalScale(14)}
						/>
					)}
				</View>
			</View>
		</Pressable>
	);
};

const BodyComponent = () => {
	const route = useAppRoute<typeof HOME_ROUTES.ViewResourcesScreen>();
	const { eventType, sessionId } = route.params;

	const { resources, loading } = useViewResourcesController({
		eventType,
		sessionId,
	});

	const [downloadAllLoading, setDownloadAllLoading] = useState(false);

	const renderItem = useCallback<ListRenderItem<ISessionResource>>(
		({ item, index }) => {
			const isLastOddItem =
				resources.length % 2 !== 0 && index === resources.length - 1;

			const fileName = item.fileName.slice(0, 13);
			const url = `${RESOURCES_S3_URL}${item.url}`;

			return (
				<ResourceCard
					url={url}
					fileName={fileName}
					isLastOddItem={isLastOddItem}
				/>
			);
		},
		[resources],
	);

	const downloadAllFiles = useCallback(async () => {
		const files = resources.map((resource) => {
			const url = `${RESOURCES_S3_URL}${resource.url}`;

			return { url, fileName: resource.fileName };
		});

		setDownloadAllLoading(true);
		await downloadFilesAsZip(files);
		setDownloadAllLoading(false);
	}, [resources, setDownloadAllLoading]);

	if (loading)
		return (
			<View style={styles.loadingContainer}>
				<Loading />
			</View>
		);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<RNText
					title={getString(STRINGS.resourcesList)}
					style={styles.txt}
				/>

				<Pressable
					onPress={downloadAllFiles}
					style={styles.downloadButton}
				>
					{downloadAllLoading ? (
						<Loading />
					) : (
						<>
							<RNText
								title={getString(STRINGS.downloadAll)}
								style={styles.txt}
							/>
							<DownloadIcon
								color={neutral.black}
								width={horizontalScale(14)}
								height={verticalScale(14)}
							/>
						</>
					)}
				</Pressable>
			</View>

			<View style={styles.separator} />

			<FlatList
				data={resources}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				numColumns={2}
				columnWrapperStyle={styles.row}
				contentContainerStyle={styles.listContainer}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const ViewResourcesScreen = () => (
	<WithHeaderLxp
		BodyComponent={MemoizedBodyComponent}
		title={getString(STRINGS.viewResources)}
		showBack
		backgroundColor={neutral.grey_02}
	/>
);

export default memo(ViewResourcesScreen);

const styles = StyleSheet.create({
	card: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(8),
		flex: 1,
		height: verticalScale(100),
		justifyContent: "center",
		marginHorizontal: horizontalScale(4),
	},
	cardContainer: {
		alignItems: "center",
		backgroundColor: neutral.white,
		borderRadius: horizontalScale(4),
		elevation: 3,
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: horizontalScale(4),
		marginTop: verticalScale(10),
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(10),
		shadowColor: neutral.black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
	},
	cardText: {
		color: neutral.black,
		...sm,
		...regular,
		flexShrink: 1,
	},
	cardWrapper: {
		flexDirection: "column",
		flex: 0.5,
		marginBottom: verticalScale(12),
	},
	container: {
		flex: 1,
	},
	downloadButton: {
		alignItems: "center",
		borderColor: neutral.grey_08,
		borderRadius: horizontalScale(6),
		borderWidth: 1,
		columnGap: horizontalScale(8),
		flexDirection: "row",
		height: verticalScale(40),
		justifyContent: "center",
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(6),
		width: horizontalScale(140),
	},
	headerContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: verticalScale(16),
		paddingHorizontal: horizontalScale(20),
		paddingTop: verticalScale(24),
	},
	listContainer: {
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(16),
	},

	loadingContainer: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	row: {
		justifyContent: "space-between",
		marginBottom: verticalScale(12),
	},
	separator: {
		backgroundColor: neutral.grey_05,
		height: verticalScale(1),
		width: "100%",
	},
	singleCardCenter: {
		alignSelf: "center",
		width: "48%",
	},
	txt: {
		...semiBold,
		color: neutral.black,
	},
});
