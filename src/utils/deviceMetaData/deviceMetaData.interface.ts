export interface IBrowserMetadata {
	timestamp: string;
	userAgent: string;

	screen: {
		width: number;
		height: number;
		availWidth: number;
		availHeight: number;
		colorDepth: number;
		pixelDepth: number;
	};
	timezone: {
		offset: number;
		locale: string;
	};
	performance: {
		connectionType: string | undefined;
	};
	device: {
		isMobile: boolean;
		isTouchDevice: boolean;
		appVersion: string;
		devicePlatform: string;
		platformVersion: string;
		deviceName: string;
	};
}
