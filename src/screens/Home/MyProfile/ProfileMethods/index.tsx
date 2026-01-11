import React, { memo, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import ParseLinkedinModal from "@screens/Home/MyProfile/ProfileMethods/ParseLinkedinModal";
import ParseLoader from "@screens/Home/MyProfile/ProfileMethods/ParseLoader";
import FileUploadModal, {
	IFileUploadModalType,
} from "@screens/Home/MyProfile/ProfileMethods/ParseResumeModal";
import useProfileMethodsController from "@screens/Home/MyProfile/ProfileMethods/useProfileMethodsController";

import RNText from "@components/Reusable/RNText";

import { WithHeaderLxp } from "@hoc/withHeaderLxp";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import {
	FastestIcon,
	FastIcon,
	FillOutManuallyIcon,
	LinkedInIcon,
	SlowIcon,
	UploadResumeIcon,
} from "@assets/icons/svg/studyPlan";
import { commonStyles } from "@assets/styles";

const { reg, sm, regular, semiBold } = commonStyles.text;
const { neutral, highlight } = colors;

const STRINGS = createStringConstants({
	title: "studyPlan.profileSetup.title",
	mainQuestion: "studyPlan.profileSetup.mainQuestion",
	description: "studyPlan.profileSetup.description",
	linkedinTitle: "studyPlan.profileSetup.options.linkedin.title",
	linkedinDescription: "studyPlan.profileSetup.options.linkedin.description",
	linkedinSpeedText: "studyPlan.profileSetup.options.linkedin.speedText",
	resumeTitle: "studyPlan.profileSetup.options.resume.title",
	resumeDescription: "studyPlan.profileSetup.options.resume.description",
	resumeSpeedText: "studyPlan.profileSetup.options.resume.speedText",
	manualTitle: "studyPlan.profileSetup.options.manual.title",
	manualDescription: "studyPlan.profileSetup.options.manual.description",
	manualSpeedText: "studyPlan.profileSetup.options.manual.speedText",
});

interface IOptionCardData {
	id: string;
	title: string;
	icon: React.ComponentType<{ width: number; height: number }>;
	speedIcon: React.ComponentType<{ width: number; height: number }>;
	speedText: string;
	speedTagStyle: object;
	speedTextStyle: object;
	onPress: () => void;
}

const OptionCard = memo(
	({
		data,
		isBottomCard = false,
	}: {
		data: IOptionCardData;
		isBottomCard?: boolean;
	}) => {
		const Icon = data.icon;
		const SpeedIcon = data.speedIcon;

		return (
			<Pressable
				style={[styles.optionCard, isBottomCard && styles.bottomCard]}
				onPress={data.onPress}
			>
				<View style={styles.iconContainer}>
					<Icon
						width={horizontalScale(40)}
						height={verticalScale(40)}
					/>
				</View>
				<RNText title={data.title} style={styles.optionTitle} />
				<View style={[styles.speedTag, data.speedTagStyle]}>
					<SpeedIcon
						width={horizontalScale(18)}
						height={verticalScale(18)}
					/>
					<RNText
						title={data.speedText}
						style={data.speedTextStyle}
					/>
				</View>
			</Pressable>
		);
	},
);

OptionCard.displayName = "OptionCard";

interface IProfileMethodsProps {
	onLinkedInImport: () => void;
	onResumeUpload: () => void;
	onManualEntry: () => void;
}

const BodyComponent = ({
	onLinkedInImport,
	onResumeUpload,
	onManualEntry,
}: IProfileMethodsProps) => {
	const optionsData = useMemo<IOptionCardData[]>(
		() => [
			{
				id: "linkedin",
				title: getString(STRINGS.linkedinTitle),
				icon: LinkedInIcon,
				speedIcon: FastestIcon,
				speedText: getString(STRINGS.linkedinSpeedText),
				speedTagStyle: styles.fastestTag,
				speedTextStyle: styles.speedText,
				onPress: onLinkedInImport,
			},
			{
				id: "resume",
				title: getString(STRINGS.resumeTitle),
				icon: UploadResumeIcon,
				speedIcon: FastIcon,
				speedText: getString(STRINGS.resumeSpeedText),
				speedTagStyle: styles.fastTag,
				speedTextStyle: styles.speedText,
				onPress: onResumeUpload,
			},
			{
				id: "manual",
				title: getString(STRINGS.manualTitle),
				icon: FillOutManuallyIcon,
				speedIcon: SlowIcon,
				speedText: getString(STRINGS.manualSpeedText),
				speedTagStyle: styles.slowTag,
				speedTextStyle: styles.speedText,
				onPress: onManualEntry,
			},
		],
		[onLinkedInImport, onResumeUpload, onManualEntry],
	);

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<RNText
					title={getString(STRINGS.mainQuestion)}
					style={styles.title}
				/>
				<RNText
					title={getString(STRINGS.description)}
					style={styles.subtitle}
				/>

				<View style={styles.optionsContainer}>
					<View style={styles.topRow}>
						<OptionCard data={optionsData[0]} />
						<OptionCard data={optionsData[1]} />
					</View>
					<View style={styles.bottomRow}>
						<OptionCard data={optionsData[2]} isBottomCard />
					</View>
				</View>
			</View>
		</View>
	);
};

const MemoizedBodyComponent = memo(BodyComponent);

const ProfileMethods = () => {
	const {
		handleLinkedInClose,
		isLinkedInModalVisible,
		setIsLinkedInModalVisible,
		handleLinkedInParsing,
		parseLinkedinLoading,
		setIsModalVisible,
		isModalVisible,
		isParseFileLoading,
		setParseFileStatus,
		navigateToManualProfileFlow,
	} = useProfileMethodsController();

	return (
		<>
			{parseLinkedinLoading || isParseFileLoading ? (
				<ParseLoader
					linkedinLoading={parseLinkedinLoading}
					resumeLoading={isParseFileLoading}
				/>
			) : (
				<WithHeaderLxp
					BodyComponent={() => (
						<MemoizedBodyComponent
							onLinkedInImport={() =>
								setIsLinkedInModalVisible(true)
							}
							onResumeUpload={() => setIsModalVisible(true)}
							onManualEntry={navigateToManualProfileFlow}
						/>
					)}
					showBack
				/>
			)}
			<ParseLinkedinModal
				isOpen={isLinkedInModalVisible}
				onBackPress={handleLinkedInClose}
				closeModal={handleLinkedInClose}
				handleLinkedInParsing={handleLinkedInParsing}
				submitLinkedIn={handleLinkedInClose}
			/>

			<FileUploadModal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				modalType={IFileUploadModalType.RESUME}
				onParseFileStatusChange={setParseFileStatus}
			/>
		</>
	);
};

export default memo(ProfileMethods);

const styles = StyleSheet.create({
	bottomCard: {
		flex: 0,
		width: horizontalScale(160),
	},
	bottomRow: {
		alignItems: "center",
	},
	container: {
		flex: 1,
	},
	contentContainer: {
		paddingHorizontal: horizontalScale(20),
		paddingTop: verticalScale(24),
	},
	fastTag: {
		backgroundColor: colors.state.success_light_green,
	},
	fastestTag: {
		backgroundColor: colors.state.success_light_green,
	},
	iconContainer: {
		marginBottom: verticalScale(12),
	},
	optionCard: {
		alignItems: "center",
		backgroundColor: highlight.bg_blue,
		borderRadius: horizontalScale(4),
		flex: 1,
		paddingHorizontal: horizontalScale(16),
		paddingVertical: verticalScale(12),
	},
	optionTitle: {
		color: neutral.black,
		marginBottom: verticalScale(12),
		textAlign: "center",
		...sm,
		...semiBold,
	},
	optionsContainer: {
		gap: verticalScale(20),
		marginBottom: verticalScale(20),
	},
	slowTag: {
		backgroundColor: colors.bg.fill.expired,
	},
	speedTag: {
		alignItems: "center",
		borderRadius: horizontalScale(10),
		flexDirection: "row",
		gap: horizontalScale(4),
		paddingHorizontal: horizontalScale(12),
		paddingVertical: verticalScale(6),
	},
	speedText: {
		color: neutral.black,
		...sm,
		...regular,
	},
	subtitle: {
		color: neutral.grey_07,
		lineHeight: verticalScale(20),
		marginBottom: verticalScale(32),
		textAlign: "left",
		...sm,
		...regular,
	},
	title: {
		color: neutral.black,
		marginBottom: verticalScale(12),
		textAlign: "left",
		...reg,
		...semiBold,
	},
	topRow: {
		flexDirection: "row",
		gap: horizontalScale(16),
	},
});
