import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import ConfirmationModal from "@components/Reusable/ConfirmationModal";
import ProgressBar from "@components/Reusable/ProgressBar";
import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { MenuListIcon, RecentIconOutlineDynamic } from "@assets/icons";
import { Books } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const { regular, semiBold, medium, reg, sm } = commonStyles.text;
const { neutral, state } = colors;

const STRINGS = createStringConstants({
	EXTENSIONS_USED: "studyPlan.container2.courseInfo.extensionsUsed",
});

/**
 * CourseInfoModal component that displays course information in a modal
 *
 * This modal shows:
 * - Title and progress bar
 * - Description text
 * - Duration and extension usage information
 *
 * @param {boolean} visible - Controls modal visibility
 * @param {() => void} onClose - Callback for when modal is closed
 * @param {string} title - Main title text
 * @param {string} description - Description text below progress bar
 * @param {number} progress - Progress percentage (0-100)
 * @param {string} duration - Duration text to display
 * @param {string} extensionsUsed - Number of extensions used
 * @param {string} maxExtensions - Maximum extensions allowed
 * @returns {JSX.Element} Rendered course info modal component
 */

interface IInfoRow {
	icon: React.ElementType;
	text: string;
}

interface ICourseInfoModal {
	visible: boolean;
	onClose: () => void;
	title: string;
	description: string;
	progress: number;
	duration: string;
	extensionsUsed: number;
	maxExtensions: number;
}

const InfoRow = ({ icon: IconComponent, text }: IInfoRow) => (
	<View style={styles.infoRow}>
		<IconComponent
			width={horizontalScale(14)}
			height={horizontalScale(14)}
			color={neutral.black}
		/>
		<RNText title={text} style={styles.infoText} />
	</View>
);

const MemoizedInfoRow = memo(InfoRow);

const CourseInfoModal = ({
	visible,
	onClose,
	title,
	description,
	progress,
	duration,
	extensionsUsed,
	maxExtensions,
}: ICourseInfoModal) => {
	const extensionText = useMemo(
		() =>
			`${getString(STRINGS.EXTENSIONS_USED)}: ${extensionsUsed}/${maxExtensions}`,
		[extensionsUsed, maxExtensions],
	);

	const hasValidMaxExtensions = maxExtensions > 0;

	return (
		<ConfirmationModal
			visible={visible}
			onClose={onClose}
			bgColor={state.warning_light_yellow}
			icon={Books}
		>
			<View style={styles.container}>
				<RNText title={title} style={styles.title} />

				<ProgressBar
					progress={progress}
					leftTextTitle={`${progress}%`}
					leftTextStyle={styles.progressText}
					activeProgressColor={neutral.black}
					inactiveProgressColor={neutral.grey_03}
					height={verticalScale(3)}
				/>

				<RNText title={description} style={styles.description} />

				<View style={styles.infoSection}>
					<MemoizedInfoRow
						icon={RecentIconOutlineDynamic}
						text={duration}
					/>
					{hasValidMaxExtensions && (
						<MemoizedInfoRow
							icon={MenuListIcon}
							text={extensionText}
						/>
					)}
				</View>
			</View>
		</ConfirmationModal>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: horizontalScale(10),
		width: "100%",
	},
	description: {
		...regular,
		...sm,
		color: neutral.black,
		lineHeight: verticalScale(19),
		marginVertical: verticalScale(24),
		textAlign: "justify",
	},
	infoRow: {
		alignItems: "center",
		flexDirection: "row",
		gap: horizontalScale(6),
	},
	infoSection: {
		gap: verticalScale(10),
		marginBottom: verticalScale(20),
		paddingHorizontal: horizontalScale(8),
	},
	infoText: {
		...regular,
		...sm,
		color: neutral.black,
	},
	progressText: {
		...medium,
		...sm,
		color: neutral.black,
		lineHeight: verticalScale(19),
	},
	title: {
		...semiBold,
		...reg,
		color: neutral.black,
		lineHeight: verticalScale(22),
		marginBottom: verticalScale(8),
		textAlign: "center",
	},
});

export default memo(CourseInfoModal);
