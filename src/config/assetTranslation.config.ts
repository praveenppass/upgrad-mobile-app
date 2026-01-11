import { IAssetType } from "@interface/asset.interface";

/**
 * Configuration for asset translation support
 *
 * IMPORTANT: This configuration defines which asset types support content translation.
 * As per current backend support, only these 4 asset types have translation:
 * - Video
 * - Online Editor
 * - File (Code Zip)
 * - Class Opinion
 *
 * To add translation support for new asset types in the future:
 * 1. Add the asset type to TRANSLATION_SUPPORTED_ASSET_TYPES array below
 * 2. Ensure the asset controller uses useAssetTranslation hook
 * 3. Pass translationLanguage parameter to the GraphQL query
 * 4. Backend should return translated content
 */
export const TRANSLATION_SUPPORTED_ASSET_TYPES: IAssetType[] = [
	IAssetType.VIDEO,
	IAssetType.ONLINE_EDITOR,
	IAssetType.CODE_ZIP, // "File" in backend
	IAssetType.CLASS_OPINION,
];

/**
 * Check if an asset type supports translation
 * @param assetType - The asset type to check
 * @returns boolean - true if translation is supported for this asset type
 */
export const isAssetTypeTranslatable = (assetType?: IAssetType): boolean => {
	if (!assetType) return false;
	return TRANSLATION_SUPPORTED_ASSET_TYPES.includes(assetType);
};

/**
 * Get list of asset types that don't support translation (for documentation/debugging)
 */
export const getUnsupportedAssetTypes = (): IAssetType[] => {
	return [
		IAssetType.PDF,
		IAssetType.PPT,
		IAssetType.SCORM,
		IAssetType.HTML_ZIP,
		IAssetType.ASSESSMENT,
		IAssetType.RECALL_QUIZ,
		IAssetType.ASSIGNMENT,
		IAssetType.PROJECT,
		IAssetType.HAND_ON,
	];
};

/**
 * Get display message for unsupported asset types
 */
export const getTranslationUnsupportedMessage = (
	assetType?: IAssetType,
): string => {
	return `Translation is not available for ${assetType} content yet.`;
};

/**
 * Feature configuration for asset translation
 */
export const TRANSLATION_CONFIG = {
	/**
	 * Global feature flag for asset translation
	 * Set to false to disable the entire translation feature
	 */
	ENABLE_ASSET_TRANSLATION: true,

	/**
	 * Minimum number of languages required to show the language switcher
	 * If a program has fewer languages, the switcher won't be displayed
	 */
	MIN_LANGUAGES_FOR_SWITCHER: 2,

	/**
	 * Show info message when viewing an asset type that doesn't support translation
	 * Set to true if you want to show "Translation not available" message
	 */
	SHOW_UNSUPPORTED_INFO: false,

	/**
	 * Auto-refetch asset data after language change
	 * Set to false if you want to manually control refetching
	 */
	AUTO_REFETCH_ON_LANGUAGE_CHANGE: true,
} as const;

/**
 * Helper to check if translation feature should be shown for a program
 * @param enableTranslation - Program's enableTranslation flag
 * @param languagesCount - Number of languages available in the program
 * @returns boolean - true if translation UI should be shown
 */
export const shouldShowTranslationUI = (
	enableTranslation: boolean | undefined,
	languagesCount: number,
): boolean => {
	if (!TRANSLATION_CONFIG.ENABLE_ASSET_TRANSLATION) return false;
	if (!enableTranslation) return false;
	return languagesCount >= TRANSLATION_CONFIG.MIN_LANGUAGES_FOR_SWITCHER;
};
