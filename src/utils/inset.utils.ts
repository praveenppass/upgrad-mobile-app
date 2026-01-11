import {
	EdgeInsets,
	initialWindowMetrics,
} from "react-native-safe-area-context";

let insets: EdgeInsets = initialWindowMetrics?.insets || {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
};

export const setSafeAreaInsets = (newInsets: EdgeInsets) => {
	insets = newInsets;
};

export const getSafeAreaInsets = () => insets;
