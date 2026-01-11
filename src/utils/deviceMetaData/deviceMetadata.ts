import NetInfo from "@react-native-community/netinfo";
import { Dimensions, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

import { IBrowserMetadata } from "@utils/deviceMetaData/deviceMetaData.interface";

/**
 * Get device metadata for React Native app using react-native-device-info
 * Maps to the exact BrowserMetadata interface structure
 */

const PRIMARY_LOCALE = "en-IN";

export const getDeviceMetadata = async (): Promise<IBrowserMetadata> => {
	// Get network information
	const netInfo = await NetInfo.fetch();

	// Get user agent
	const userAgent = DeviceInfo.getUserAgentSync();

	// Get timezone offset
	const timezoneOffset = new Date().getTimezoneOffset();

	// Get screen dimensions
	const { width: screenWidth, height: screenHeight } =
		Dimensions.get("screen");
	return {
		timestamp: new Date().toISOString(),
		userAgent,
		screen: {
			width: screenWidth,
			height: screenHeight,
			availWidth: screenWidth,
			availHeight: screenHeight,
			colorDepth: 24, // Not available in React Native, default to 24-bit
			pixelDepth: 24, // Not available in React Native, default to 24-bit
		},

		timezone: {
			offset: timezoneOffset,
			locale: PRIMARY_LOCALE,
		},
		performance: {
			connectionType: netInfo.type,
		},
		device: {
			isMobile: true, // Always true for React Native apps
			isTouchDevice: true, // Always true for React Native apps
			appVersion: DeviceInfo.getVersion(),
			devicePlatform: Platform.OS.toLowerCase(),
			platformVersion: DeviceInfo.getSystemVersion(),
			deviceName: `${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`,
		},
	};
};
