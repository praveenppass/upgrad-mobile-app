import React, {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useState,
} from "react";
import { Animated, StyleSheet } from "react-native";

import RNText from "@components/Reusable/RNText";

import { horizontalScale, verticalScale } from "@utils/functions";

import { colors } from "@assets/colors";
import {
	CrossCircleIcon,
	InfoCircleIcon,
	SuccessIconLxp,
	WarningLxpIcon,
} from "@assets/icons";
import text from "@assets/styles/text.styles";

const { semiBold } = text;

export enum ToastType {
	ERROR,
	SUCCESS,
	WARNING,
	INFO,
}

interface IToastContextType {
	showToast: (options: IShowToastOptions) => void;
}

type IToastProvider = PropsWithChildren;

export interface IShowToastOptions {
	message: string;
	type: ToastType;
	duration?: number;
}

interface IToastState {
	visible: boolean;
	message: string;
	type: ToastType;
}

// Toast ref implementation for external usage
type ToastRef = {
	showToast: (options: IShowToastOptions) => void;
};

const toastRef: ToastRef = {
	showToast: () => {
		// Initial implementation that does nothing until provider is initialized
		// Will be replaced when ToastProvider mounts
	},
};

export const Toast = {
	showToast: (options: IShowToastOptions) => toastRef.showToast(options),
};

const getColorsBasedOnType = (type: ToastType) => {
	switch (type) {
		case ToastType.ERROR:
			return {
				backgroundColor: colors.state.error_light_red,
				borderColor: colors.state.error_red,
				Icon: CrossCircleIcon,
			};

		case ToastType.SUCCESS:
			return {
				backgroundColor: colors.state.success_light_green,
				borderColor: colors.state.success_green,
				Icon: SuccessIconLxp,
			};

		case ToastType.WARNING:
			return {
				backgroundColor: colors.state.warning_light_yellow,
				borderColor: colors.state.warning_yellow,
				Icon: WarningLxpIcon,
			};
		case ToastType.INFO:
			return {
				backgroundColor: colors.neutral.grey_02,
				borderColor: colors.state.info_grey,
				Icon: InfoCircleIcon,
			};
	}
};

const ToastContext = createContext<IToastContextType | undefined>(undefined);

export const useToast = (): IToastContextType => {
	const context = useContext(ToastContext);
	if (!context)
		throw new Error("useToast must be used within a ToastProvider");

	return context;
};

export const ToastProvider: React.FC<IToastProvider> = ({ children }) => {
	const [toast, setToast] = useState<IToastState>({
		visible: false,
		message: "",
		type: ToastType.WARNING,
	});
	const [fadeAnim] = useState(new Animated.Value(0));

	const showToast = useCallback(
		({ message, duration = 3000, type }: IShowToastOptions) => {
			setToast({ visible: true, message, type });

			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}).start(() => {
				setTimeout(() => {
					hideToast();
				}, duration - 200);
			});
		},
		[fadeAnim],
	);

	const hideToast = useCallback(() => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start(() =>
			setToast({ visible: false, message: "", type: ToastType.WARNING }),
		);
	}, [fadeAnim]);

	// Update the toastRef with the current showToast function
	React.useEffect(() => {
		toastRef.showToast = showToast;
		return () => {
			toastRef.showToast = () => {
				// Reset to no-op function when provider unmounts
			};
		};
	}, [showToast]);

	const { backgroundColor, borderColor, Icon } = getColorsBasedOnType(
		toast.type,
	);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{toast.visible ? (
				<Animated.View
					style={[
						styles.toastContainer,
						{ opacity: fadeAnim, backgroundColor, borderColor },
					]}
				>
					<Icon
						width={horizontalScale(18)}
						height={horizontalScale(18)}
						color={colors.neutral.white}
					/>
					<RNText style={styles.toastText} title={toast.message} />
				</Animated.View>
			) : (
				<></>
			)}
		</ToastContext.Provider>
	);
};

const styles = StyleSheet.create({
	toastContainer: {
		alignItems: "center",
		borderRadius: horizontalScale(40),
		borderWidth: horizontalScale(1),
		bottom: verticalScale(90),
		columnGap: horizontalScale(6),
		flexDirection: "row",
		justifyContent: "center",
		left: horizontalScale(10),
		paddingHorizontal: horizontalScale(10),
		paddingVertical: verticalScale(14),
		position: "absolute",
		right: horizontalScale(10),
	},
	toastText: {
		color: colors.neutral.grey_07,
		...semiBold,
		flexShrink: 1,
	},
});
