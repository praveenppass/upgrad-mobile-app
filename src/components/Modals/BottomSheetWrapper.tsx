import { C } from "@assets/constants";
import { useDispatch, useSelector } from "react-redux";
import { Keyboard, StyleSheet } from "react-native";
import { horizontalScale } from "@utils/functions";
import { modalSlice } from "@redux/slices/modal.slice";
import React, { memo, useCallback, useEffect } from "react";
import { type BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	type BottomSheetHandleProps,
} from "@gorhom/bottom-sheet";
import measures from "@utils/measures";
import { CustomBackdrop } from "./BottomSheetBackDrop/BottomSheetBackDrop";
import { RootState } from "@redux/store/root.reducer";
import { useBottomSheetBackHandler } from "@hooks/useBottomSheetBackHandler";

const {
	themes: { text, primary },
} = C;

interface BottomSheetWrapperProps {
	index?: number; // initiate bottom sheet in closed state -1, 0, 1 etc.. -1 closed, 1 visible state not mandatory to send index
	isVisible: boolean | null;
	children: JSX.Element;
	indicatorColor?: string;
	backgroundColor?: string;
	snapPoints?: Array<string | number>;
	useSnapPoints?: boolean;
	hideAction?: () => void;
	handleComponent?: React.FC<BottomSheetHandleProps>;
	enableSwipeToClose?: boolean;
	dismissible?: boolean;
}

const { SCREEN_HEIGHT } = measures;

function BottomSheetWrapper({
	index,
	children,
	isVisible,
	snapPoints,
	hideAction,
	useSnapPoints,
	handleComponent,
	indicatorColor = text.dark,
	backgroundColor = primary.color2,
	enableSwipeToClose = true,
	dismissible = true,
}: BottomSheetWrapperProps) {
	const dispatch = useDispatch();
	const { bottomSheetBackGroundColor } = useSelector(
		(state: RootState) => state.modal,
	);
	const bottomSheetRef = React.useRef<BottomSheetMethods>(null);

	const onShow = useCallback(() => {
		bottomSheetRef.current?.expand();
	}, []);

	const onHide = useCallback(() => {
		if (hideAction) {
			hideAction();
		}
		Keyboard.dismiss();
		dispatch(modalSlice.actions.hideModals());
		bottomSheetRef.current?.close();
	}, []);

	const { handleSheetPositionChange } = useBottomSheetBackHandler(
		onHide,
		isVisible,
		bottomSheetRef,
	);
	useEffect(() => {
		if (isVisible === null) {
			return;
		}
		if (isVisible) {
			onShow();
		} else {
			onHide();
		}
	}, [isVisible]);

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{...props}
				onPress={onHide}
				appearsOnIndex={0}
				opacity={0.6}
				disappearsOnIndex={-1}
				pressBehavior={dismissible ? "close" : "none"}
			>
				<CustomBackdrop {...props} />
			</BottomSheetBackdrop>
		),
		[],
	);

	const onChange = (index: number) => {
		if (index === -1 && isVisible) {
			onHide();
		}
		handleSheetPositionChange(index);
	};

	return (
		<BottomSheet
			index={index ?? -1}
			ref={bottomSheetRef}
			snapPoints={useSnapPoints ? snapPoints : undefined}
			maxDynamicContentSize={
				useSnapPoints ? undefined : SCREEN_HEIGHT * 0.85
			}
			enableDynamicSizing={useSnapPoints ? false : true}
			handleComponent={handleComponent}
			enablePanDownToClose={enableSwipeToClose}
			backdropComponent={renderBackdrop}
			onChange={onChange}
			handleIndicatorStyle={[
				styles.indicatorStyle,
				{
					backgroundColor: indicatorColor,
				},
			]}
			backgroundStyle={
				bottomSheetBackGroundColor
					? { backgroundColor: bottomSheetBackGroundColor }
					: {
							backgroundColor,
					  }
			}
		>
			{children}
		</BottomSheet>
	);
}

export default memo(BottomSheetWrapper);

const styles = StyleSheet.create({
	indicatorStyle: {
		width: 64,
		opacity: 0.12,
		height: horizontalScale(4),
	},
});
