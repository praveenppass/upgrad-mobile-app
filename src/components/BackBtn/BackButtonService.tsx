import { BackHandler } from "react-native";

let backButtonPressCallback: (() => void) | null = null;

const setBackButtonPressCallback = (callback: () => void) => {
	backButtonPressCallback = callback;
};

const addBackButtonListener = () => {
	return BackHandler.addEventListener("hardwareBackPress", () => {
		if (backButtonPressCallback) {
			backButtonPressCallback();
		}
		return false;
	});
};

export { setBackButtonPressCallback, addBackButtonListener };
