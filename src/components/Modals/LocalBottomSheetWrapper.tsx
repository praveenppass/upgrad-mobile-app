import { C } from "@assets/constants";
import { useSelector } from "react-redux";
import { Keyboard, StyleSheet } from "react-native";
import { horizontalScale } from "@utils/functions";
import React, { memo, useCallback } from "react";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	type BottomSheetHandleProps,
} from "@gorhom/bottom-sheet";
import measures from "@utils/measures";
import { CustomBackdrop } from "./BottomSheetBackDrop/BottomSheetBackDrop";
import { RootState } from "@redux/store/root.reducer";
import { useBottomSheetBackHandler } from "@hooks/useBottomSheetBackHandler";
import { Portal } from "@gorhom/portal";

const {
	themes: { text, primary },
} = C;

export interface ILocalBottomSheetWrapperProps {
	index?: number; // initiate bottom sheet in closed state -1, 0, 1 etc.. -1 closed, 1 visible state not mandatory to send index
	children: JSX.Element;
	indicatorColor?: string;
	backgroundColor?: string;
	snapPoints?: Array<string | number>;
	useSnapPoints?: boolean;
	hideAction?: () => void;
	handleComponent?: React.FC<BottomSheetHandleProps>;
	enableSwipeToClose?: boolean;
	dismissible?: boolean;
	disableBackBtn?: boolean;
	bottomSheetRef: unknown;
	onSheetStateChange?: (index: number) => void;
}

const { SCREEN_HEIGHT } = measures;

function LocalBottomSheetWrapper({
	index,
	children,
	snapPoints,
	hideAction,
	useSnapPoints,
	handleComponent,
	indicatorColor = text.dark,
	backgroundColor = primary.color2,
	enableSwipeToClose = true,
	dismissible = true,
	bottomSheetRef,
	onSheetStateChange,
	disableBackBtn,
}: ILocalBottomSheetWrapperProps) {
	const bottomSheetBackGroundColor = useSelector(
		(state: RootState) => state.modal.bottomSheetBackGroundColor,
	);

	const onHide = useCallback(() => {
		if (hideAction) {
			hideAction();
		}
		Keyboard.dismiss();
		bottomSheetRef?.current?.close();
	}, []);

	const { handleSheetPositionChange } = useBottomSheetBackHandler(
		onHide,
		false,
		bottomSheetRef,
	);

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
		if (onSheetStateChange) {
			onSheetStateChange(index);
		}
		if (!disableBackBtn) {
			handleSheetPositionChange(index);
		}
	};

	return (
		<Portal>
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
				backgroundStyle={{
					backgroundColor:
						bottomSheetBackGroundColor || backgroundColor,
				}}
			>
				{children}
			</BottomSheet>
		</Portal>
	);
}

export default memo(LocalBottomSheetWrapper);

const styles = StyleSheet.create({
	indicatorStyle: {
		width: 64,
		height: horizontalScale(4),
	},
});
