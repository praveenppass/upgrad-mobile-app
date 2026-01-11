import React, { memo } from "react";
import {
	FlatList,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

import { IAnswerOption } from "@screens/Tabs/Courses/Recallquiz/useRecallquizController";

import ActionModal from "@components/Reusable/ActionModal/ActionModal";
import RNText from "@components/Reusable/RNText";

import {
	horizontalScale,
	removeHtmlTags,
	verticalScale,
} from "@utils/functions";

import { colors } from "@assets/colors";
import { InfoLxp } from "@assets/icons";
import { CorrectAnswerIcon, IncorrectAnswerIcon } from "@assets/icons/img";
import { commonStyles } from "@assets/styles";

const { neutral } = colors;
const { sm, lg, reg, semiBold, regular, lightBold } = commonStyles.text;

interface IPageDataItem {
	icon?: boolean;
	heading?: string | null;
	content?: string | null;
	backgroundColor?: string;
}
interface IFeedbackModalProps {
	isVisible: boolean;
	feedbackData: {
		heading?: string | null;
		icon?: IAnswerOption | null;
		pageData?: IPageDataItem[];
	};
	onClose?: (type?: string | null) => void;
}

const renderAnswerIcon = (icon?: IAnswerOption | null) => {
	switch (icon) {
		case IAnswerOption.CORRECT:
			return (
				<Image
					source={CorrectAnswerIcon}
					resizeMode="contain"
					style={styles.feedbackIconStyle}
				/>
			);
		case IAnswerOption.INCORRECT:
			return (
				<Image
					source={IncorrectAnswerIcon}
					resizeMode="contain"
					style={styles.feedbackIconStyle}
				/>
			);
		default:
			return null;
	}
};

const FeedbackModal = ({
	isVisible,
	onClose,
	feedbackData,
}: IFeedbackModalProps) => {
	const { heading, pageData, icon } = feedbackData || {};
	return (
		<ActionModal
			closeModal={onClose}
			isOpen={isVisible}
			onBackPress={onClose}
			disableCloseOnSwipeDown
		>
			<View style={styles.container}>
				<View style={styles.headingContainer}>
					<RNText style={styles.mainHeading}>{heading}</RNText>
					{renderAnswerIcon(icon)}
				</View>

				{pageData?.map((section: IPageDataItem, index: number) => (
					<View
						key={index}
						style={[
							styles.explanationSection,
							{ backgroundColor: section.backgroundColor },
						]}
					>
						{section.heading && (
							<View style={styles.sectionTitleContainer}>
								{section.icon && (
									<InfoLxp color={neutral.grey_07} />
								)}
								<RNText style={styles.sectionTitle}>
									{section.heading}
								</RNText>
							</View>
						)}
						{section.content ? (
							<ScrollView style={styles.scrollView}>
								<Pressable>
									<RNText style={styles.explanationText}>
										{removeHtmlTags(section.content)}
									</RNText>
								</Pressable>
							</ScrollView>
						) : null}
					</View>
				))}
			</View>
		</ActionModal>
	);
};

export default memo(FeedbackModal);

const styles = StyleSheet.create({
	container: {
		paddingVertical: verticalScale(20),
	},
	explanationSection: {
		borderColor: neutral.grey_03,
		borderRadius: horizontalScale(8),
		borderWidth: 2,
		marginBottom: verticalScale(12),
		paddingLeft: horizontalScale(16),
		paddingVertical: verticalScale(16),
	},
	explanationText: {
		...lightBold,
		...reg,
		color: neutral.black,
		lineHeight: verticalScale(20),
	},
	feedbackIconStyle: {
		height: verticalScale(20),
		width: horizontalScale(20),
	},
	headingContainer: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: verticalScale(20),
	},
	mainHeading: {
		...lg,
		...semiBold,
		color: neutral.black,
		textAlign: "center",
	},
	scrollView: {
		flexGrow: 1,
		maxHeight: verticalScale(100),
	},
	sectionTitle: {
		...sm,
		...regular,
		color: neutral.grey_07,
		marginBottom: verticalScale(8),
	},
	sectionTitleContainer: {
		flexDirection: "row",
		gap: horizontalScale(5),
	},
});
