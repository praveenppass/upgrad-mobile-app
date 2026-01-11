import { useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";

/**
 * KeyboardState represents the current state of the on-screen keyboard.
 * @property {boolean} isKeyboardVisible - True if the keyboard is currently visible, false otherwise.
 * @property {number} keyboardHeight - The height of the keyboard in pixels. Zero if the keyboard is hidden.
 */
type KeyboardState = {
	/**
	 * Indicates whether the keyboard is currently visible.
	 */
	isKeyboardVisible: boolean;
	/**
	 * The height of the keyboard in pixels. Zero if the keyboard is hidden.
	 */
	keyboardHeight: number;
};

/**
 * useKeyboard is a custom React hook for React Native that tracks the visibility and height of the on-screen keyboard.
 *
 * This hook:
 * - Listens for keyboard show and hide events on both iOS and Android platforms.
 * - Provides a boolean indicating if the keyboard is visible.
 * - Provides the current keyboard height in pixels (0 if hidden).
 * - Handles platform-specific event differences automatically.
 * - Cleans up event listeners on unmount to prevent memory leaks.
 *
 * @returns {KeyboardState} An object containing:
 *   - `isKeyboardVisible`: Whether the keyboard is currently visible.
 *   - `keyboardHeight`: The height of the keyboard in pixels (0 if hidden).
 *
 * @example
 * // Example usage in a functional component:
 * const { isKeyboardVisible, keyboardHeight } = useKeyboard();
 *
 * return (
 *   <View style={{ marginBottom: isKeyboardVisible ? keyboardHeight : 0 }}>
 *     // Your content
 *   </View>
 * );
 *
 * // You can use isKeyboardVisible to conditionally render or adjust UI elements when the keyboard is open.
 */
const useKeyboard = (): KeyboardState => {
	const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
	const [keyboardHeight, setKeyboardHeight] = useState(0);

	const onKeyboardShow = useCallback((event: KeyboardEvent) => {
		setIsKeyboardVisible((prev) => {
			if (!prev) return true;
			return prev;
		});
		setKeyboardHeight((prev) => {
			if (prev !== event.endCoordinates.height)
				return event.endCoordinates.height;
			return prev;
		});
	}, []);

	const onKeyboardHide = useCallback(() => {
		setIsKeyboardVisible((prev) => {
			if (prev) return false;
			return prev;
		});
		setKeyboardHeight((prev) => {
			if (prev !== 0) return 0;
			return prev;
		});
	}, []);

	useEffect(() => {
		// Use platform-specific keyboard events for best UX
		const showEvent =
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvent =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		const showListener = Keyboard.addListener(showEvent, onKeyboardShow);
		const hideListener = Keyboard.addListener(hideEvent, onKeyboardHide);

		return () => {
			showListener.remove();
			hideListener.remove();
		};
	}, [onKeyboardShow, onKeyboardHide]);

	// Memoize the return value to avoid unnecessary re-renders
	return useMemo(
		() => ({ isKeyboardVisible, keyboardHeight }),
		[isKeyboardVisible, keyboardHeight],
	);
};

export default useKeyboard;
