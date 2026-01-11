/**
 * RTL (Right-to-Left) utilities for handling multilingual content
 * Provides content-level RTL styling without affecting app layout
 */
import { StyleProp, ViewStyle } from "react-native";

/**
 * Languages that use Right-to-Left writing direction
 * Supports both language codes and names
 */
const RTL_LANGUAGE_CODES = [
	"ar", // Arabic
	"he", // Hebrew
	"fa", // Persian/Farsi
	"ur", // Urdu
	"yi", // Yiddish
	"arc", // Aramaic
	"ckb", // Central Kurdish (Sorani)
	"dv", // Dhivehi/Maldivian
	"ku", // Kurdish
	"ps", // Pashto
	"sd", // Sindhi
];

const RTL_LANGUAGE_NAMES = [
	"arabic",
	"hebrew",
	"persian",
	"farsi",
	"urdu",
	"yiddish",
	"aramaic",
	"kurdish",
	"dhivehi",
	"maldivian",
	"pashto",
	"sindhi",
];

/**
 * Check if a language code or name is RTL
 * @param languageIdentifier - ISO 639-1 language code (e.g., 'ar', 'en') OR language name (e.g., 'Arabic', 'English')
 * @returns boolean - true if language is RTL
 */
export const isRTLLanguage = (
	languageIdentifier: string | null | undefined,
): boolean => {
	if (!languageIdentifier) return false;

	// Normalize to lowercase
	const normalized = languageIdentifier.toLowerCase().trim();

	// Extract base language code if it's a code with region (e.g., 'ar-SA' -> 'ar')
	const baseCode = normalized.split("-")[0];

	// Check if it's a known RTL language code
	if (RTL_LANGUAGE_CODES.includes(baseCode)) {
		return true;
	}

	// Check if the language name contains any RTL language name
	return RTL_LANGUAGE_NAMES.some((rtlName) => normalized.includes(rtlName));
};

/**
 * Get text alignment based on language direction
 * @param languageCode - ISO 639-1 language code
 * @returns 'left' | 'right'
 */
export const getTextAlign = (
	languageCode: string | null | undefined,
): "left" | "right" => {
	return isRTLLanguage(languageCode) ? "right" : "left";
};

/**
 * Get flex direction based on language direction
 * @param languageCode - ISO 639-1 language code
 * @returns 'row' | 'row-reverse'
 */
export const getFlexDirection = (
	languageCode: string | null | undefined,
): "row" | "row-reverse" => {
	return isRTLLanguage(languageCode) ? "row-reverse" : "row";
};

/**
 * Get writing direction for Text components
 * @param languageCode - ISO 639-1 language code
 * @returns 'ltr' | 'rtl'
 */
export const getWritingDirection = (
	languageCode: string | null | undefined,
): "ltr" | "rtl" => {
	return isRTLLanguage(languageCode) ? "rtl" : "ltr";
};

/**
 * Get padding/margin style based on language direction
 * Useful for dynamic spacing that should flip in RTL
 */
export const getDirectionalStyle = (
	languageCode: string | null | undefined,
	styles: {
		ltr: StyleProp<ViewStyle>;
		rtl: StyleProp<ViewStyle>;
	},
) => {
	return isRTLLanguage(languageCode) ? styles.rtl : styles.ltr;
};
