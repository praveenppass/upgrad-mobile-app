import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Linking } from "react-native";
import {
	CustomRendererProps,
	TBlock,
	TNodeChildrenRenderer,
} from "react-native-render-html";

import renderHtmlStyles from "@components/Reusable/RenderHtml/renderHtml.styles";
import { isDownloadableFile } from "@components/Reusable/RenderHtml/renderHtml.utils";
import RNText from "@components/Reusable/RNText";
import { ToastType, useToast } from "@components/Reusable/Toast";

import downloadDocument from "@services/downloadDocument";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { isGoogleDocsUri } from "@constants/regex.constants";

import { strings } from "@assets/strings";

const CustomLinkRenderer = ({ tnode }: CustomRendererProps<TBlock>) => {
	const { showToast } = useToast();

	const navigation = useNavigation<RootHomeStackList>();
	const href = tnode.attributes?.href;

	const onEmailPress = (email: string) => {
		Linking.openURL(email);
	};

	const onDownloadDocument = (filePath: string) => {
		showToast({
			message: strings.DOWNLOADING,
			type: ToastType.SUCCESS,
		});
		downloadDocument({
			fileUrl: filePath,
			successCallback: () => {
				showToast({
					message: strings.DOWNLOAD_SUCCESS,
					type: ToastType.SUCCESS,
				});
			},
			errorCallback: () => {
				showToast({
					message: strings.DOWNLOAD_FAILED,
					type: ToastType.ERROR,
				});
			},
		});
	};

	const handlePress = () => {
		if (!href) return;
		if (href.match(isGoogleDocsUri)) return Linking.openURL(href);
		if (isDownloadableFile(href)) return onDownloadDocument(href);
		if (href.includes("mailto:")) return onEmailPress(href);
		navigation.navigate("WebViewModal", {
			name: "Link",
			url: href,
		});
	};

	return (
		<RNText onPress={handlePress} style={renderHtmlStyles.a}>
			<TNodeChildrenRenderer tnode={tnode} />
		</RNText>
	);
};

export default CustomLinkRenderer;
