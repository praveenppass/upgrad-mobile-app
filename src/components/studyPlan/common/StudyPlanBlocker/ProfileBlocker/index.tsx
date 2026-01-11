import React, { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import CommonButton, { IButtonVariant } from "@components/Inputs/CommonButton";
import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";
import { IProfileConfigItem } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { AvatarStatusIcon } from "@assets/icons/svg/studyPlan";
import { commonStyles } from "@assets/styles";

const { reg, sm, regular, semiBold } = commonStyles.text;
const { neutral } = colors;

const AVATAR_ICON_DIMENSIONS = {
	width: horizontalScale(85),
	height: verticalScale(85),
};

interface IProfileBlockerProps {
	isVisible: boolean;
	onClose?: () => void;
	onNavigateToProfileSection: () => void;
	profileConfigList: IProfileConfigItem[];
}

const STRINGS = createStringConstants({
	title: "studyPlan.profileBlocker.title",
	subtitle: "studyPlan.profileBlocker.subtitle",
	accessPausedTitle: "studyPlan.profileBlocker.AccessPaused",
	accessPausedSubtitle: "studyPlan.profileBlocker.AccessPausedDescription",
	completeNow: "studyPlan.profileBlocker.completeNow",
	backToHome: "studyPlan.profileBlocker.backToHome",
});

const ProfileBlocker = ({
	isVisible,
	onClose,
	profileConfigList,
	onNavigateToProfileSection,
}: IProfileBlockerProps) => {
	const isAnyDeadlinePassed = useMemo(
		() =>
			profileConfigList
				// .filter((config) => !config.isCompleted)
				.some((config) => config.isDeadlinePassed),
		[profileConfigList],
	);

	const { title, subtitle } = useMemo(() => {
		if (isAnyDeadlinePassed) {
			return {
				title: getString(STRINGS.accessPausedTitle),
				subtitle: getString(STRINGS.accessPausedSubtitle),
			};
		}
		return {
			title: getString(STRINGS.title),
			subtitle: getString(STRINGS.subtitle),
		};
	}, [isAnyDeadlinePassed]);

	const handleCompleteNow = () => {
		onNavigateToProfileSection();
	};

	return (
		<ActionModal
			isOpen={isVisible}
			onBackPress={!isAnyDeadlinePassed ? onClose : undefined}
			closeModal={!isAnyDeadlinePassed ? onClose : undefined}
			style={styles.modalContainer}
		>
			<View style={styles.mainContainer}>
				<View style={styles.grayLine} />
				<View style={styles.profileIconContainer}>
					<AvatarStatusIcon
						width={AVATAR_ICON_DIMENSIONS.width}
						height={AVATAR_ICON_DIMENSIONS.height}
					/>
				</View>
				<View style={styles.headerContainer}>
					<RNText title={title} style={styles.headTxt} />
					<RNText title={subtitle} style={styles.subHeadTxt} />
				</View>
			</View>

			<View style={styles.buttonContainer}>
				{isAnyDeadlinePassed && onClose && (
					<CommonButton
						title={getString(STRINGS.backToHome)}
						variant={IButtonVariant.Tertiary}
						onPress={onClose}
						style={styles.button}
						testID="profile_blocker_back_to_home_button"
					/>
				)}
				<CommonButton
					title={getString(STRINGS.completeNow)}
					variant={IButtonVariant.Primary}
					style={styles.button}
					onPress={handleCompleteNow}
					testID="profile_blocker_complete_now_button"
				/>
			</View>
		</ActionModal>
	);
};

export default memo(ProfileBlocker);

const styles = StyleSheet.create({
	button: {
		flex: 1,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: horizontalScale(12),
	},
	grayLine: {
		alignSelf: "center",
		backgroundColor: neutral.grey_05,
		borderRadius: horizontalScale(4),
		height: verticalScale(4),
		marginHorizontal: horizontalScale(20),
		marginTop: verticalScale(8),
		width: horizontalScale(64),
	},
	headTxt: {
		color: neutral.black,
		textAlign: "center",
		...reg,
		...semiBold,
	},
	headerContainer: {
		alignItems: "center",
		gap: horizontalScale(8),
		marginTop: verticalScale(12),
		paddingHorizontal: horizontalScale(20),
	},
	mainContainer: {
		alignItems: "center",
		marginBottom: verticalScale(20),
	},
	modalContainer: {
		paddingHorizontal: horizontalScale(20),
		paddingVertical: verticalScale(0),
	},
	profileIconContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: verticalScale(20),
	},
	subHeadTxt: {
		color: neutral.grey_07,
		lineHeight: verticalScale(20),
		textAlign: "center",
		...sm,
		...regular,
	},
});
