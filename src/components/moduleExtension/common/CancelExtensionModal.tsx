import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

import ExtensionModalButtons from "@components/moduleExtension/common/ExtensionModalButtons";
import ExtensionModalInfo from "@components/moduleExtension/common/ExtensionModalInfo";
import { ICancelExtensionModal } from "@components/moduleExtension/common/index.interface";
import styles from "@components/moduleExtension/common/index.style";
import PenaltyDetails from "@components/moduleExtension/common/PenaltyDetails";
import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import RNText from "@components/Reusable/RNText";

import useGetTimezone from "@hooks/useGetTimezone";

import { IDateFormat } from "@interface/app.interface";

import { colors } from "@assets/colors";
import { IMAGE_URLS } from "@assets/icons/img";
import { strings } from "@assets/strings";

const { state } = colors;

const CancelExtensionModal = ({
	moduleName,
	totalCompletedGradableAssetsCount,
	totalGradableAssetsCount,
	initialDueDate,
	penaltyInfo,
	onClose,
	isVisible,
	onAccept,
}: ICancelExtensionModal) => {
	const { name: userTimezone } = useGetTimezone();
	const date = moment(initialDueDate)
		.tz(userTimezone)
		.format(IDateFormat.date);

	const [isOpen, setIsOpen] = useState(false);

	const togglePenaltyDetails = () => setIsOpen(!isOpen);

	useEffect(() => {
		if (isVisible) setIsOpen(false);
	}, [isVisible]);

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
					title={`${strings.CANCEL_EXTENSION}?`}
					style={styles.modalHeading}
				/>

				<ExtensionModalInfo
					moduleName={moduleName}
					dueDate={date}
					totalCompletedGradableAssetsCount={
						totalCompletedGradableAssetsCount
					}
					totalGradableAssetsCount={totalGradableAssetsCount}
					isExtended
				/>
				<View style={styles.percentagePenaltyNotice}>
					<RNText
						title={`${strings.COMPLETE_BY_DUE_DATE_MESSAGE} `}
						style={styles.percentagePenaltyNoticeText}
					>
						{!isOpen ? (
							<RNText
								title={strings.KNOW_MORE}
								style={styles.knowMore}
								onPress={() => togglePenaltyDetails()}
							/>
						) : (
							<></>
						)}
					</RNText>
				</View>
				{isOpen ? (
					<PenaltyDetails
						penaltyInfo={penaltyInfo || []}
						togglePenaltyDetails={togglePenaltyDetails}
					/>
				) : (
					<></>
				)}
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

export default CancelExtensionModal;
