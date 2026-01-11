import moment from "moment-timezone";
import React from "react";
import { Image, View } from "react-native";

import ExtensionModalButtons from "@components/moduleExtension/common/ExtensionModalButtons";
import ExtensionModalInfo from "@components/moduleExtension/common/ExtensionModalInfo";
import { IExtendDeadlineModal } from "@components/moduleExtension/common/index.interface";
import styles from "@components/moduleExtension/common/index.style";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";

const { state } = colors;

const ExtendDeadlineModal = ({
	moduleName,
	extendedDueDate,
	totalCompletedGradableAssetsCount,
	totalGradableAssetsCount,
	penaltyPercentage,
	onClose,
	onAccept,
	isVisible,
}: IExtendDeadlineModal) => {
	const { name: userTimezone } = useGetTimezone();
	const date = moment(extendedDueDate)
		.tz(userTimezone)
		.format(IDateFormat.date);

	return (
		<ConfirmationModal
			visible={isVisible}
			onClose={onClose}
			bgColor={state.warning_light_yellow}
		>
			<View style={styles.modal}>
				<Image
					source={{ uri: IMAGE_URLS.CALENDAR_ILLUSTRATION }}
					style={styles.imageStyle}
				/>
				<RNText
					title={`${strings.DEADLINE}?`}
					style={styles.modalHeading}
				/>

				<ExtensionModalInfo
					moduleName={moduleName}
					dueDate={date}
					totalCompletedGradableAssetsCount={
						totalCompletedGradableAssetsCount
					}
					totalGradableAssetsCount={totalGradableAssetsCount}
				/>
				<RNText
					title={`${strings.COMPLETE_BY_EXTENDED_DUE_DATE} Late submissions will incur a ${penaltyPercentage}% penalty.`}
					style={styles.percentagePenaltyNotice}
				/>
				<ExtensionModalButtons
					acceptHandler={onAccept}
					rejectHandler={onClose}
				/>
				<RNText
					title={strings.EXTENSION_APPLIED_FOR_GROUP}
					style={styles.groupSubmission}
				/>
			</View>
		</ConfirmationModal>
	);
};

export default ExtendDeadlineModal;
