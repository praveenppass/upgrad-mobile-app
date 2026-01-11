import { useCallback, useRef } from "react";
import { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BackHandler, NativeEventSubscription } from "react-native";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

/**
 * hook that dismisses the bottom sheet on the hardware back button press if it is visible
 * @param bottomSheetRef ref to the bottom sheet which is going to be closed/dismissed on the back press
 */

export const useBottomSheetBackHandler = (
	onDismiss: () => void,
	isVisible: boolean | null,
	bottomSheetRef: React.RefObject<BottomSheetMethods | null>,
) => {
	const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(
		null,
	);
	const handleSheetPositionChange = useCallback<
		NonNullable<BottomSheetModalProps["onChange"]>
	>(
		(index) => {
			const isBottomSheetVisible = index >= 0 || isVisible;
			if (isBottomSheetVisible && !backHandlerSubscriptionRef.current) {
				// setup the back handler if the bottom sheet is right in front of the user
				backHandlerSubscriptionRef.current =
					BackHandler.addEventListener("hardwareBackPress", () => {
						onDismiss();
						return true;
					});
			} else if (!isBottomSheetVisible) {
				backHandlerSubscriptionRef.current?.remove();
				backHandlerSubscriptionRef.current = null;
			}
		},
		[bottomSheetRef, backHandlerSubscriptionRef],
	);

	return { handleSheetPositionChange };
};
