// import React from "react";
// import { C } from "@assets/constants";
// import { View, StyleSheet, SafeAreaView, Platform } from "react-native";
// import { moderateScale } from "@utils/functions";
// import { ArtifactsBottomSheetBG } from "@assets/icons";
// import RNText from "@components/Reusable/RNText";
// import measures from "@utils/measures";
// import CustomButton from "@components/Reusable/Buttons/CustomButton";
// import { useDispatch, useSelector } from "react-redux";
// import { modalSlice } from "@redux/slices/modal.slice";
// import { type RootState } from "@redux/store/root.reducer";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import LottieView from "lottie-react-native";
// import { BottomSheetScrollView, useBottomSheet } from "@gorhom/bottom-sheet";
// import { IHalfBottomSheetType } from "@interface/app.interface";
// const { SCREEN_WIDTH } = measures;
// const {
// 	themes: { primary },
// 	commonStyles: {
// 		align: { flex1, alignCenter, selfCenter },
// 		spacing: { mt32, mt10, mb8, mt16, mb20, mb10 },
// 		text: {
// 			bold,
// 			clrBlack,
// 			clrDarkBlack,
// 			md,
// 			reg,
// 			xxlg,
// 			clrGray,
// 			txtCenter,
// 		},
// 	},
// } = C;
// interface IHalfBottomSheetProps extends IHalfBottomSheetType {
// 	isScreen?: boolean;
// 	closeManually?: boolean;
// 	backGroundSVGWidth?: number;
// 	closeSheet?: () => void;
// }
// function HalfBottomSheetBody(props: IHalfBottomSheetProps) {
// 	const dispatch = useDispatch();
// 	const insets = useSafeAreaInsets();
// 	const options = useSelector(
// 		(state: RootState) => state.modal.bottomSheetOptions,
// 	);
// 	const { isScreen = false, backGroundSVGWidth } = props;
// 	const {
// 		icon,
// 		title,
// 		subTitle,
// 		description,
// 		buttonText,
// 		btnStyle,
// 		primaryButtonText,
// 		primaryBtnStyle,
// 		customSubTitle,
// 		backGroundColor,
// 		rootStyle,
// 		titleStyle,
// 		subTitleStyle,
// 		onButtonPress,
// 		primaryButtonPress,
// 		backGroundSVGHeight,
// 		iconViewStyle,
// 		lottieIcon,
// 		showBottomButton,
// 		isBottomBtnWhite,
// 		primaryButtonLoading,
// 		secondaryButtonLoading,
// 		closeSheet,
// 		closeManually = false,
// 	} = options ?? props;
// 	const closeBottomSheet = () => {
// 		if (closeSheet && !closeManually) {
// 			closeSheet();
// 			return;
// 		}
// 		if (options) dispatch(modalSlice.actions.hideModals());
// 		setTimeout(() => {
// 			dispatch(modalSlice.actions.clearBottomSheetOptions());
// 		}, 1000);
// 	};
// 	const closeModalSheet = () => {
// 		if (!showBottomButton) {
// 			closeBottomSheet();
// 		}
// 		if (onButtonPress) {
// 			onButtonPress();
// 		}
// 	};
// 	const onPrimaryBtnPress = () => {
// 		closeBottomSheet();
// 		if (primaryButtonPress) {
// 			primaryButtonPress();
// 		}
// 	};
// 	const showBottomSection = !isScreen
// 		? true
// 		: showBottomButton
// 		? true
// 		: false;
// 	return (
// 		<View style={[style.rootView, rootStyle]}>
// 			<View style={style.bgStyle}>
// 				{!isScreen && (
// 					<ArtifactsBottomSheetBG
// 						width={
// 							backGroundSVGWidth
// 								? backGroundSVGWidth
// 								: SCREEN_WIDTH
// 						}
// 						height={backGroundSVGHeight ?? moderateScale(100)}
// 						color={backGroundColor}
// 					/>
// 				)}
// 			</View>
// 			<View style={style.mainView}>
// 				{lottieIcon && Platform.OS !== "ios" ? (
// 					<LottieView
// 						source={lottieIcon}
// 						autoPlay
// 						style={style.lottieViewStyle}
// 						loop
// 					/>
// 				) : (
// 					<View style={iconViewStyle}>{icon ?? null}</View>
// 				)}
// 				<RNText
// 					title={title ?? ""}
// 					style={[
// 						style.titleStyle,
// 						titleStyle,
// 						!customSubTitle && !description && !subTitle && mb20,
// 					]}
// 				/>
// 				{customSubTitle && customSubTitle}
// 				{subTitle && (
// 					<RNText
// 						title={subTitle}
// 						style={[style.subTitleStyle, subTitleStyle]}
// 					/>
// 				)}
// 				{description && (
// 					<RNText
// 						title={description}
// 						style={style.descriptionStyle}
// 					/>
// 				)}
// 				{showBottomSection && (
// 					<SafeAreaView
// 						style={[
// 							flex1,
// 							style.buttonView,
// 							{ marginBottom: insets.bottom },
// 						]}
// 					>
// 						{primaryButtonText && (
// 							<View style={style.buttonWidth}>
// 								<CustomButton
// 									isLoading={primaryButtonLoading}
// 									title={primaryButtonText}
// 									onBtnHandler={onPrimaryBtnPress}
// 									btnStyle={[
// 										style.buttonWidth,
// 										style.primaryBtnStyle,
// 										primaryBtnStyle,
// 									]}
// 								/>
// 							</View>
// 						)}
// 						{buttonText && (
// 							<CustomButton
// 								isLoading={secondaryButtonLoading}
// 								isOutLineButton
// 								title={buttonText ?? ""}
// 								isWhite={isBottomBtnWhite ?? true}
// 								onBtnHandler={closeModalSheet}
// 								btnStyle={[
// 									style.btnStyle,
// 									style.buttonWidth,
// 									btnStyle,
// 								]}
// 							/>
// 						)}
// 					</SafeAreaView>
// 				)}
// 			</View>
// 		</View>
// 	);
// }
// const style = StyleSheet.create({
// 	btnStyle: {
// 		width: "100%",
// 		...mb8,
// 		...mt16,
// 	},
// 	lottieViewStyle: {
// 		height: moderateScale(72),
// 		width: moderateScale(72),
// 	},
// 	buttonWidth: {
// 		width: SCREEN_WIDTH * 0.9,
// 	},
// 	buttonView: {
// 		alignContent: "center",
// 		justifyContent: "flex-end",
// 	},
// 	primaryBtnStyle: {
// 		borderRadius: measures.BORDER.b6,
// 		width: "100%",
// 	},
// 	rootView: {
// 		...flex1,
// 		width: "100%",
// 		backgroundColor: primary.color2,
// 	},
// 	bgStyle: {
// 		position: "absolute",
// 		top: 0,
// 	},
// 	mainView: {
// 		...alignCenter,
// 		...flex1,
// 	},
// 	titleStyle: {
// 		...xxlg,
// 		...bold,
// 		...mt10,
// 		...clrBlack,
// 		...txtCenter,
// 		...selfCenter,
// 		maxWidth: "75%",
// 		lineHeight: moderateScale(30),
// 	},
// 	subTitleStyle: {
// 		...md,
// 		...mt10,
// 		...mb10,
// 		...clrGray,
// 		...txtCenter,
// 		maxWidth: "90%",
// 		lineHeight: moderateScale(22),
// 	},
// 	descriptionStyle: {
// 		marginBottom: 10,
// 		...reg,
// 		...mt32,
// 		...txtCenter,
// 		...clrDarkBlack,
// 	},
// });
// const HalfBottomSheet = (props: IHalfBottomSheetProps) => {
// 	const { forceClose } = useBottomSheet();
// 	const closeSheet = () => forceClose();
// 	return (
// 		<BottomSheetScrollView bounces={false}>
// 			<HalfBottomSheetBody {...props} closeSheet={closeSheet} />
// 		</BottomSheetScrollView>
// 	);
// };
// export { HalfBottomSheet, HalfBottomSheetBody };
import { BottomSheetScrollView, useBottomSheet } from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import React from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "@components/Reusable/Buttons/CustomButton";
import RNText from "@components/Reusable/RNText";

import { moderateScale } from "@utils/functions";
import measures from "@utils/measures";

import { modalSlice } from "@redux/slices/modal.slice";
import { type RootState } from "@redux/store/root.reducer";

import { IHalfBottomSheetType } from "@interface/app.interface";

import { C } from "@assets/constants";
import { ArtifactsBottomSheetBG } from "@assets/icons";

const { SCREEN_WIDTH } = measures;

const {
	themes: { primary },
	commonStyles: {
		align: { flex1, alignCenter, selfCenter },
		spacing: { mt32, mt10, mb8, mt16, mb20, mb10 },
		text: {
			bold,
			clrBlack,
			clrDarkBlack,
			md,
			reg,
			xxlg,
			clrGray,
			txtCenter,
		},
	},
} = C;

interface IHalfBottomSheetProps extends IHalfBottomSheetType {
	isScreen?: boolean;
	closeManually?: boolean;
	backGroundSVGWidth?: number;
	closeSheet?: () => void;
}

const HalfBottomSheetBody = (props: IHalfBottomSheetProps) => {
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();
	const options = useSelector(
		(state: RootState) => state.modal.bottomSheetOptions,
	);
	const { isScreen = false, backGroundSVGWidth } = props;
	const {
		icon,
		title,
		subTitle,
		description,
		buttonText,
		btnStyle,
		primaryButtonText,
		primaryBtnStyle,
		customSubTitle,
		backGroundColor,
		rootStyle,
		titleStyle,
		subTitleStyle,
		onButtonPress,
		primaryButtonPress,
		backGroundSVGHeight,
		iconViewStyle,
		lottieIcon,
		showBottomButton,
		isBottomBtnWhite,
		primaryButtonLoading,
		secondaryButtonLoading,
		customView,
		hideCancelBtn,
		closeSheet,
		closeManually = false,
	} = options ?? props;

	const closeBottomSheet = () => {
		if (closeSheet && !closeManually) {
			closeSheet();
			return;
		}
		if (options) dispatch(modalSlice.actions.hideModals());
		setTimeout(() => {
			dispatch(modalSlice.actions.clearBottomSheetOptions());
		}, 1000);
	};

	const closeModalSheet = () => {
		if (!showBottomButton) {
			closeBottomSheet();
		}
		if (onButtonPress) {
			onButtonPress();
		}
	};

	const onPrimaryBtnPress = () => {
		closeBottomSheet();
		if (primaryButtonPress) {
			primaryButtonPress();
		}
	};
	const showBottomSection = !isScreen
		? true
		: showBottomButton
			? true
			: false;
	return (
		<View style={[style.rootView, rootStyle]}>
			<View style={style.bgStyle}>
				{!isScreen && (
					<ArtifactsBottomSheetBG
						width={
							backGroundSVGWidth
								? backGroundSVGWidth
								: SCREEN_WIDTH
						}
						height={backGroundSVGHeight ?? moderateScale(100)}
						color={backGroundColor}
					/>
				)}
			</View>
			<View style={style.mainView}>
				{lottieIcon && Platform.OS !== "ios" ? (
					<LottieView
						source={lottieIcon}
						autoPlay
						style={style.lottieViewStyle}
						loop
					/>
				) : (
					<View style={iconViewStyle}>{icon ?? null}</View>
				)}
				<RNText
					title={title ?? ""}
					style={[
						style.titleStyle,
						titleStyle,
						!customSubTitle && !description && !subTitle && mb20,
					]}
				/>
				{customSubTitle && customSubTitle}
				{subTitle && (
					<RNText
						title={subTitle}
						style={[style.subTitleStyle, subTitleStyle]}
					/>
				)}
				{description && (
					<RNText
						title={description}
						style={style.descriptionStyle}
					/>
				)}
				{customView}
				{showBottomSection && (
					<SafeAreaView
						style={[
							flex1,
							style.buttonView,
							{ marginBottom: insets.bottom },
						]}
					>
						{primaryButtonText && (
							<View style={style.buttonWidth}>
								<CustomButton
									isLoading={primaryButtonLoading}
									title={primaryButtonText}
									onBtnHandler={onPrimaryBtnPress}
									btnStyle={[
										style.buttonWidth,
										style.primaryBtnStyle,
										primaryBtnStyle,
									]}
								/>
							</View>
						)}
						{buttonText && !hideCancelBtn && (
							<CustomButton
								isLoading={secondaryButtonLoading}
								isOutLineButton
								title={buttonText ?? ""}
								isWhite={isBottomBtnWhite ?? true}
								onBtnHandler={closeModalSheet}
								btnStyle={[
									style.btnStyle,
									style.buttonWidth,
									btnStyle,
								]}
							/>
						)}
					</SafeAreaView>
				)}
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	bgStyle: {
		position: "absolute",
		top: 0,
	},
	btnStyle: {
		width: "100%",
		...mb8,
		...mt16,
	},
	buttonView: {
		alignContent: "center",
		justifyContent: "flex-end",
	},
	buttonWidth: {
		width: SCREEN_WIDTH * 0.9,
	},
	descriptionStyle: {
		marginBottom: 10,
		...reg,
		...mt32,
		...txtCenter,
		...clrDarkBlack,
	},
	lottieViewStyle: {
		height: moderateScale(72),
		width: moderateScale(72),
	},
	mainView: {
		...alignCenter,
		...flex1,
	},
	primaryBtnStyle: {
		borderRadius: measures.BORDER.b6,
		width: "100%",
	},
	rootView: {
		...flex1,
		backgroundColor: primary.color2,
		width: "100%",
	},
	subTitleStyle: {
		...md,
		...mt10,
		...mb10,
		...clrGray,
		...txtCenter,
		lineHeight: moderateScale(22),
		maxWidth: "90%",
	},
	titleStyle: {
		...xxlg,
		...bold,
		...mt10,
		...clrBlack,
		...txtCenter,
		...selfCenter,
		lineHeight: moderateScale(30),
		maxWidth: "75%",
	},
});

const HalfBottomSheet = (props: IHalfBottomSheetProps) => {
	const { forceClose } = useBottomSheet();

	const closeSheet = () => forceClose();

	return (
		<BottomSheetScrollView bounces={false}>
			<HalfBottomSheetBody {...props} closeSheet={closeSheet} />
		</BottomSheetScrollView>
	);
};

export { HalfBottomSheet, HalfBottomSheetBody };
