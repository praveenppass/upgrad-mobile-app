import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import RNText from "@components/Reusable/RNText";
import Skeleton from "@components/Skeleton/Skeleton";

import { useAnalytics } from "@hooks/useAnalytics";
import { useProfileEvents } from "@hooks/useProfileEvents";

import {
	horizontalScale,
	moderateScale,
	verticalScale,
} from "@utils/functions";
import measures from "@utils/measures";

import { modalSlice } from "@redux/slices/modal.slice";
import { RootState } from "@redux/store/root.reducer";

import { type BasicHeaderProps } from "@interface/app.interface";
import { IEventName } from "@interface/events.interface";
import { type RootNavParamsList } from "@interface/types/rootStack.type";

import { colors } from "@assets/colors";
import { C } from "@assets/constants";
import { ArrowLeft, UpGradLogo } from "@assets/icons";

const {
	themes: { primary, bg, text },
	commonStyles: {
		text: { bold, clrBlack, md, txtStart, reg, txtCenter },
		spacing: { p6, pl8, mt4, pr8, mr10, ml6, pb4, ml12 },
		align: { itemsCenter, rowBetween, row, flex1, overFlowHidden, flex2 },
	},
} = C;

const {
	BORDER: { b8 },
} = measures;

const BasicHeader = ({
	title,
	isShadow,
	leftAction,
	titleStyle,
	rightAction,
	isBack = false,
	mainContainerStyle,
	midActionStyle,
	eventsParams,
	duration,
	rightActionStyle,
	backButtonText,
	backButtonTextStyle,
	leftActionContainerStyle,
	icon,
	isBackColor,
	isBackLoading,
	myAccount,
	sectionName,
}: BasicHeaderProps) => {
	const dispatch = useDispatch();
	const { trackEvent } = useAnalytics();
	const { goBack, navigate } = useNavigation<RootNavParamsList>();
	const onNavigateHome = () => {
		navigate("HomeStack");
	};
	const { onModalClose } = useProfileEvents();
	const modalVisibleValues = useSelector((state: RootState) => state.modal);

	const goBackEvent = () => {
		const isModalActive = Object.values(modalVisibleValues).find(
			(value) => value === true,
		);
		if (isModalActive) {
			dispatch(modalSlice.actions.hideModals());
		} else {
			goBack();
		}
		if (myAccount) {
			onModalClose(sectionName);
		} else {
			trackEvent({
				eventName: IEventName.BACK_BUTTON,
				eventData: eventsParams,
			});
		}
	};

	const ICON_DIMENSIONS = {
		width: 20,
		height: 20,
	};

	const backgroundColor = isBackLoading
		? colors.neutral.grey_06
		: colors.neutral.black;

	const showRight = (rightActionStyle ?? rightAction) ? true : false;
	const showLeft = (leftAction ?? isBack ?? backButtonText) ? true : false;

	return (
		<View style={[isShadow && [pb4, styles.bgParent], overFlowHidden]}>
			<View
				style={[
					p6,
					pl8,
					pr8,
					rowBetween,
					styles.container,
					mainContainerStyle,
					{ backgroundColor },
				]}
			>
				{showLeft && (
					<View style={[flex1, leftActionContainerStyle]}>
						{leftAction ??
							(isBack ? (
								isBackLoading ? (
									<View style={styles.containerSkeleton}>
										<Skeleton
											style={styles.courseTextSkeleton}
										/>
									</View>
								) : (
									<TouchableOpacity
										onPress={goBackEvent}
										style={
											backButtonText
												? [row, ml12]
												: [
														styles.backButton,
														itemsCenter,
													]
										}
									>
										<ArrowLeft
											{...ICON_DIMENSIONS}
											color={
												isBackColor ?? text.steelBlue
											}
										/>
										{backButtonText && (
											<RNText
												numberOfLines={1}
												title={backButtonText}
												style={[
													styles.title,
													backButtonTextStyle,
												]}
											/>
										)}
									</TouchableOpacity>
								)
							) : (
								<TouchableOpacity
									style={itemsCenter}
									onPress={onNavigateHome}
								>
									<UpGradLogo
										color={colors.icon.default_red}
									/>
								</TouchableOpacity>
							))}
					</View>
				)}

				{title && (
					<View style={[flex2, midActionStyle]}>
						<View style={row}>
							<RNText
								numberOfLines={1}
								title={title ?? ""}
								style={[styles.title, titleStyle]}
							/>
							{icon ? icon : null}
						</View>
						{duration ? (
							<RNText
								numberOfLines={1}
								title={`${duration}`}
								style={styles.duration}
							/>
						) : null}
					</View>
				)}

				{showRight && (
					<View
						style={[
							styles.rightActionStyle,
							rightActionStyle,
							!rightAction && flex1,
						]}
					>
						{rightAction && rightAction}
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	backButton: {
		height: 40,
		width: 40,
	},
	bgParent: {
		// backgroundColor: bg.primary,
		// height: moderateScale(60),
	},
	container: {
		backgroundColor: primary.color2,
		elevation: 4,
		height: moderateScale(56),
		shadowColor: primary.color3,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: Platform.OS === "ios" ? 0.2 : 0.5,
		shadowRadius: Platform.OS === "ios" ? 1.5 : 5,
	},
	containerSkeleton: {
		backgroundColor: colors.neutral.grey_06,
		minHeight: verticalScale(50),
		width: measures.SCREEN_WIDTH,
	},
	courseTextSkeleton: {
		borderRadius: b8,
		height: verticalScale(18),
		marginLeft: horizontalScale(8),
		marginTop: verticalScale(16),
		width: horizontalScale(9),
	},
	duration: {
		width: "100%",
		...txtStart,
		...md,
		...mt4,
		...bold,
		color: text.skyBlue,
	},
	rightActionStyle: {
		...row,
		...ml6,
		flex: 1.5,
	},
	title: {
		width: "auto",
		...txtCenter,
		...mr10,
		...reg,
		...bold,
		...clrBlack,
	},
});

export default memo(BasicHeader);
