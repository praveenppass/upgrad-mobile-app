import { AssetTranslationContext } from "@contexts/AssetTranslationContext";
import { useContext, useMemo } from "react";

import {
	getFlexDirection,
	getTextAlign,
	getWritingDirection,
	isRTLLanguage,
} from "@utils/rtl.utils";

/**
 * Hook to get RTL styling for content based on selected translation language
 * Works without app restart - only affects content styling
 *
 * Safe to use outside AssetTranslationProvider - returns LTR defaults
 *
 * Usage:
 * ```typescript
 * const { isRTL, textAlign, writingDirection, flexDirection } = useContentRTL();
 *
 * <Text style={{ textAlign, writingDirection }}>
 *   {arabicOrEnglishContent}
 * </Text>
 * ```
 */
export const useContentRTL = () => {
	// Use useContext directly instead of useAssetTranslation to avoid throwing error
	// This allows the hook to work outside of AssetTranslationProvider
	const context = useContext(AssetTranslationContext);

	// If outside provider, return null - will default to LTR
	const selectedLanguage = context?.selectedLanguage ?? null;

	// Use language name since ILanguage has { id, name } but not code
	// Our isRTLLanguage utility supports both codes and names (e.g., 'ar' or 'Arabic')
	const languageIdentifier = selectedLanguage?.name ?? null;

	const isRTL = useMemo(() => {
		return isRTLLanguage(languageIdentifier);
	}, [languageIdentifier]);

	const textAlign = useMemo(() => {
		return getTextAlign(languageIdentifier);
	}, [languageIdentifier]);

	const writingDirection = useMemo(() => {
		return getWritingDirection(languageIdentifier);
	}, [languageIdentifier]);

	const flexDirection = useMemo(() => {
		return getFlexDirection(languageIdentifier);
	}, [languageIdentifier]);

	return {
		isRTL,
		textAlign,
		writingDirection,
		flexDirection,
		languageCode: languageIdentifier,
	};
};

export default useContentRTL;
