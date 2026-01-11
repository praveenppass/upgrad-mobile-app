import React from "react";
import { View } from "react-native";

import { IExtensionModalInfo } from "@components/moduleExtension/common/index.interface";
import styles from "@components/moduleExtension/common/index.style";
import RNText from "@components/Reusable/RNText";

import { strings } from "@assets/strings";

const ExtensionModalInfo = ({
	moduleName,
	dueDate,
	isExtended,
	totalCompletedGradableAssetsCount,
	totalGradableAssetsCount,
}: IExtensionModalInfo) => {
	const dueDateText = isExtended
		? `${strings.DUE_DATE}: ${dueDate}`
		: `${strings.EXTENDED_DUE_DATE}: ${dueDate}`;

	return (
		<View style={styles.detailTextContainer}>
			<RNText
				title={`${strings.MODULE_TITLE}: ${moduleName}`}
				style={styles.detailText}
			/>
			<RNText
				title={`${strings.ASSESSMENTS}: ${totalCompletedGradableAssetsCount} / ${totalGradableAssetsCount}`}
				style={[styles.detailText, styles.detailSubtext]}
			/>
			<RNText
				title={dueDateText}
				style={[styles.detailText, styles.detailSubtext]}
			/>
		</View>
	);
};

export default ExtensionModalInfo;
