import crashlytics from "@react-native-firebase/crashlytics";
import React, { useMemo, useState } from "react";
import {
	ImageResizeMode,
	ImageSourcePropType,
	ImageStyle,
	StyleProp,
	Text,
	View,
	ViewStyle,
} from "react-native";
import FastImage from "react-native-fast-image";

import { colors } from "@assets/colors";
import { strings } from "@assets/strings";

/**
 * Props interface for the SafeImage component
 */
interface SafeImageProps {
	source: ImageSourcePropType;
	imageStyle?: StyleProp<ImageStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	fallbackComponent?: React.ReactNode;
	resizeMode?: ImageResizeMode;
}

/**
 * Default text style for the fallback message
 */
const fallbackTextStyle = {
	color: colors.neutral.grey_06,
	textAlign: "center" as const,
};

/**
 * A robust image component that handles loading errors gracefully with automatic fallback UI.
 *
 * This component wraps React Native's Image and provides comprehensive error handling, fallback UI,
 * and crashlytics logging for debugging image loading issues. It prevents app crashes
 * when images fail to load and provides a consistent fallback experience across the app.
 *
 * Features:
 * - Automatic error detection and handling
 * - URI validation for remote images and base64 data URIs
 * - Support for both HTTP/HTTPS URLs and base64 encoded images
 * - Customizable fallback components
 * - Crashlytics integration for debugging
 * - Graceful degradation on network issues
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with remote image
 * <SafeImage
 *   source={{ uri: "https://example.com/image.jpg" }}
 *   imageStyle={styles.image}
 * />
 *
 * // With base64 image
 * <SafeImage
 *   source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==" }}
 *   imageStyle={styles.image}
 * />
 *
 * // With custom fallback component
 * <SafeImage
 *   source={{ uri: "https://example.com/image.jpg" }}
 *   imageStyle={styles.image}
 *   fallbackComponent={<Text>Custom fallback</Text>}
 * />
 *
 * // With custom resize mode
 * <SafeImage
 *   source={{ uri: "https://example.com/image.jpg" }}
 *   resizeMode="contain"
 *   imageStyle={styles.image}
 * />
 * ```
 *
 * @param props - The component props
 * @param props.source - The image source (remote URI or local asset)
 * @param props.imageStyle - Styles for the image
 * @param props.containerStyle - Styles for the container
 * @param props.fallbackComponent - Custom fallback component
 * @param props.resizeMode - Image resize mode
 *
 * @returns A React component that renders an image with fallback handling
 *
 * @since 1.0.0
 * @author Lex Mobile App Team
 */
const SafeImage: React.FC<SafeImageProps> = ({
	source,
	imageStyle,
	containerStyle,
	fallbackComponent,
	resizeMode = "cover",
}) => {
	/**
	 * State to track if the image has failed to load
	 */
	const [hasError, setHasError] = useState(false);

	/**
	 * Validates if the remote URI is valid for loading.
	 * Checks if the URI is a string and starts with 'http' for remote images or 'data:' for base64 images.
	 * Local assets are always considered valid.
	 *
	 * @memoized
	 */
	const isRemoteUriValid = useMemo(() => {
		if (typeof source === "object" && source && "uri" in source) {
			const uri = source.uri;
			if (typeof uri === "string") {
				const trimmedUri = uri.trim();
				return (
					trimmedUri.startsWith("http") ||
					trimmedUri.startsWith("data:")
				);
			}
			return true;
		}
		return true; // Local assets are always valid
	}, [source]);

	/**
	 * Handles image loading errors by setting error state and logging to crashlytics.
	 * This function is called when Image fails to load the image.
	 *
	 * @private
	 */
	const handleError = () => {
		setHasError(true);
		let uri = "unknown";
		if (typeof source === "object" && source && "uri" in source) {
			uri = source.uri || "unknown";
		}
		crashlytics().log(`Image load error for URI: ${uri}`);
		crashlytics().recordError(
			new Error(`Image failed to load URI: ${uri}`),
		);
	};

	// Show fallback if URI is invalid or image failed to load
	if (!isRemoteUriValid || hasError) {
		return (
			<View style={containerStyle}>
				{fallbackComponent ?? (
					<Text style={fallbackTextStyle}>
						{strings.IMAGE_NOT_AVAILABLE}
					</Text>
				)}
			</View>
		);
	}

	// Render the image if everything is valid
	return (
		<View style={containerStyle}>
			<FastImage
				source={source}
				style={imageStyle}
				resizeMode={resizeMode}
				onError={handleError}
			/>
		</View>
	);
};

export default SafeImage;
