import { C } from "@assets/constants";
import { ArrowIcon, PlusIcon } from "@assets/icons";
import RNText from "@components/Reusable/RNText";
import { moderateScale } from "@utils/functions";
import measures from "@utils/measures";
import React, { useState, useEffect, memo } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	LayoutChangeEvent,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	interpolate,
} from "react-native-reanimated";

const {
	themes: { bg, primary, border },
	commonStyles: {
		align: { row, flex1 },
		spacing: { pv16, ph10, mr10 },
	},
} = C;

const ARROW_DIMENSION = {
	width: 14,
	height: 14,
};
const {
	BORDER: { b8 },
} = measures;

interface AccordionProps {
	headerText?: string;
	parentContainerStyles?: StyleProp<ViewStyle>;
	bodyStyles?: StyleProp<ViewStyle>;
	headerStyles?: StyleProp<ViewStyle>;
	headerTextStyles?: StyleProp<ViewStyle>;
	headerIconStyles?: StyleProp<ViewStyle>;
	customHeaderComponent?: JSX.Element;
	footerComponent?: JSX.Element;
	onPress?: () => void;
	isOpen?: boolean | null;
	duration?: number;
	children: JSX.Element;
	onChange?: (isOpen: boolean) => void;
	disabled?: boolean;
	isSelected?: boolean;
}

const Accordion = ({
	parentContainerStyles,
	bodyStyles,
	headerText,
	headerStyles,
	headerTextStyles,
	headerIconStyles,
	customHeaderComponent,
	footerComponent,
	isOpen = null,
	onPress,
	duration = 200,
	children,
	disabled,
	onChange,
	isSelected,
}: AccordionProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const animatedHeightValue = useSharedValue(0);
	const bodyHeight = useSharedValue(0);

	const headerPressHandler = () => {
		if (typeof isOpen === "boolean") {
			toggleOpen();
		} else {
			toggleOpen();
		}
		if (typeof onPress === "function") {
			onPress();
		}
	};

	const toggleOpen = () => {
		toggleAnimationValue(!open);
		setOpen(!open);
	};

	const toggleAnimationValue = (
		isLocalOpen: boolean,
		triggerOnChange: boolean = true,
	) => {
		if (onChange && triggerOnChange) {
			onChange(isLocalOpen);
		}
		if (isLocalOpen) {
			animatedHeightValue.value = withTiming(1, {
				duration,
			});
		} else {
			animatedHeightValue.value = withTiming(0, {
				duration,
			});
		}
	};

	const animatedHeight = useAnimatedStyle(() => {
		const height = interpolate(
			animatedHeightValue.value,
			[0, 1],
			[0, bodyHeight.value],
		);
		const marginTop = interpolate(
			animatedHeightValue.value,
			[0, 1],
			[0, 10],
		);
		return {
			height,
			marginTop,
		};
	});

	const animatedRotation = useAnimatedStyle(() => {
		const rotate = interpolate(animatedHeightValue.value, [0, 1], [0, 180]);
		return {
			transform: [{ rotate: `${rotate}deg` }],
		};
	});

	useEffect(() => {
		if (typeof isOpen === "boolean") {
			toggleAnimationValue(isOpen, false);
		}
	}, [isOpen]);

	const onLayout = (event: LayoutChangeEvent) => {
		bodyHeight.value = event.nativeEvent.layout.height;
	};

	return (
		<View
			style={[
				parentContainerStyles,
				isSelected && styles.selectedAccordionStyle,
			]}
		>
			{customHeaderComponent ? (
				<TouchableWithoutFeedback
					style={styles.touchableAreaStyle}
					disabled={disabled}
					onPress={headerPressHandler}
				>
					<View>{customHeaderComponent}</View>
				</TouchableWithoutFeedback>
			) : (
				<TouchableOpacity
					style={[styles.header, headerStyles]}
					disabled={disabled}
					onPress={headerPressHandler}
				>
					{customHeaderComponent ? (
						customHeaderComponent
					) : (
						<RNText
							title={headerText || ""}
							style={[styles.headerText, headerTextStyles]}
						/>
					)}
					<Animated.View style={[animatedRotation, headerIconStyles]}>
						<ArrowIcon {...ARROW_DIMENSION} color={bg.grey} />
					</Animated.View>
				</TouchableOpacity>
			)}
			<Animated.View
				style={[styles.bodyContainer, animatedHeight, bodyStyles]}
			>
				<View style={styles.body} onLayout={onLayout}>
					{children}
				</View>
			</Animated.View>
			{footerComponent && footerComponent}
		</View>
	);
};

const styles = StyleSheet.create({
	touchableAreaStyle: {
		...row,
	},
	header: {
		flexDirection: "row",
		borderRadius: b8,
		shadowColor: primary.color3,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
		shadowRadius: 3,
		elevation: 8,
		backgroundColor: primary.color2,
		...ph10,
		...pv16,
	},
	headerText: {
		...flex1,
		color: primary.color3,
		...mr10,
	},
	bodyContainer: {
		borderRadius: b8,
		overflow: "hidden",
	},
	body: {
		position: "absolute",
		width: "100%",
	},
	selectedAccordionStyle: {
		borderWidth: moderateScale(1),
		borderColor: "grey",
		borderRadius: b8,
		elevation: 3
	},
});

export default memo(Accordion);

