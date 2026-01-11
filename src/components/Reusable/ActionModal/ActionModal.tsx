import React, { PropsWithChildren } from "react";
import {
	KeyboardAvoidingView,
	Modal,
	Pressable,
	View,
	ViewProps,
} from "react-native";
import {
	SafeAreaProvider,
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import GestureRecognizer, {
	GestureRecognizerProps,
} from "react-native-swipe-gestures";

import styles from "@components/Reusable/ActionModal/actionModalStyles";

export enum IActionModalKeyboardBehavior {
	PADDING = "padding",
	HEIGHT = "height",
}

interface ActionModalProps extends PropsWithChildren, ViewProps {
	isOpen: boolean;
	closeModal?: () => void;
	disableCloseOnSwipeDown?: boolean;
	onBackPress?: () => void;
	isWebView?: boolean;
	keyboardBehavior?: IActionModalKeyboardBehavior;
}

interface ActionModalContainerProps extends PropsWithChildren, ViewProps {
	closeModal?: () => void;
	isWebView?: boolean;
	keyboardBehavior?: IActionModalKeyboardBehavior;
}

interface WebViewActionModalContainerProps
	extends PropsWithChildren,
		ViewProps {
	closeModal?: () => void;
	keyboardBehavior?: IActionModalKeyboardBehavior;
}

const Swipeable = ({ children, ...props }: GestureRecognizerProps) => {
	const swipeableConfig = {
		velocityThreshold: 0.6,
		directionalOffsetThreshold: 120,
	};

	return (
		<GestureRecognizer
			config={swipeableConfig}
			{...props}
			style={styles.swipeableContainer}
		>
			{children}
		</GestureRecognizer>
	);
};

const WebViewActionModalContainer: React.FC<
	WebViewActionModalContainerProps
> = ({ children, style, closeModal, keyboardBehavior }) => {
	const { bottom } = useSafeAreaInsets();

	return (
		<SafeAreaProvider>
			<SafeAreaView
				style={styles.safeContainer}
				edges={["right", "left"]}
			>
				<View style={styles.modal}>
					<Pressable
						style={styles.pressableArea}
						onPress={() => closeModal?.()}
					/>
					<KeyboardAvoidingView
						style={styles.container}
						behavior={keyboardBehavior}
					>
						<View
							style={[
								styles.innerPressableContainer,
								style,
								{ paddingBottom: bottom },
							]}
						>
							{children}
						</View>
					</KeyboardAvoidingView>
				</View>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};
const ActionModalContainer: React.FC<ActionModalContainerProps> = ({
	children,
	closeModal,
	style,
	isWebView,
	keyboardBehavior,
}) => {
	const { bottom } = useSafeAreaInsets();

	if (isWebView)
		return (
			<WebViewActionModalContainer
				style={style}
				closeModal={closeModal}
				keyboardBehavior={keyboardBehavior}
			>
				{children}
			</WebViewActionModalContainer>
		);

	return (
		<SafeAreaProvider>
			<SafeAreaView
				style={styles.safeContainer}
				edges={["right", "left"]}
			>
				<Pressable style={styles.modal} onPress={() => closeModal?.()}>
					<KeyboardAvoidingView
						style={styles.container}
						behavior={keyboardBehavior}
					>
						<Pressable
							style={[
								styles.innerPressableContainer,
								style,
								{ paddingBottom: bottom },
							]}
						>
							{children}
						</Pressable>
					</KeyboardAvoidingView>
				</Pressable>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

const ActionModal: React.FC<ActionModalProps> = ({
	isOpen,
	closeModal,
	children,
	disableCloseOnSwipeDown,
	style,
	onBackPress,
	isWebView,
	keyboardBehavior = IActionModalKeyboardBehavior.PADDING,
}) => {
	return (
		<Modal
			statusBarTranslucent
			transparent
			visible={isOpen}
			animationType="fade"
			onRequestClose={() => onBackPress?.()}
			supportedOrientations={["portrait", "landscape"]}
		>
			{disableCloseOnSwipeDown ? (
				<ActionModalContainer
					closeModal={closeModal}
					style={style}
					isWebView={isWebView}
					keyboardBehavior={keyboardBehavior}
				>
					{children}
				</ActionModalContainer>
			) : (
				<Swipeable onSwipeDown={() => closeModal?.()}>
					<ActionModalContainer
						closeModal={closeModal}
						style={style}
						isWebView={isWebView}
						keyboardBehavior={keyboardBehavior}
					>
						{children}
					</ActionModalContainer>
				</Swipeable>
			)}
		</Modal>
	);
};

export default ActionModal;
