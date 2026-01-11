import React, { createContext, ReactNode, useContext } from "react";

import { isAssetTypeTranslatable } from "@config/assetTranslation.config";

import { IAssetType } from "@interface/asset.interface";
import { ILanguage } from "@interface/userProgram.interface";

/**
 * Context for managing asset translation state
 * Provides translation configuration and current language to all asset components
 */
interface IAssetTranslationContext {
	// Program-level translation settings
	translationEnabled: boolean;
	availableLanguages: ILanguage[];
	selectedLanguage: ILanguage | null;
	defaultLanguage: ILanguage | null;

	// Current asset translation support
	currentAssetType: IAssetType | null;
	isCurrentAssetTranslatable: boolean;

	/**
	 * Get the translation language ID to pass to GraphQL queries
	 * Returns null if:
	 * - Translation is disabled for the program
	 * - Current asset type doesn't support translation
	 * - No language is selected
	 */
	getTranslationLanguageId: () => string | null;
}

export const AssetTranslationContext =
	createContext<IAssetTranslationContext | null>(null);

interface IAssetTranslationProvider {
	children: ReactNode;
	translationEnabled: boolean;
	availableLanguages: ILanguage[];
	selectedLanguage: ILanguage | null;
	defaultLanguage: ILanguage | null;
	currentAssetType: IAssetType | null;
}

/**
 * Provider component that wraps asset components to provide translation state
 *
 * Usage:
 * <AssetTranslationProvider
 *   translationEnabled={program.enableTranslation}
 *   availableLanguages={program.languages}
 *   selectedLanguage={userProgram.translationLanguage}
 *   defaultLanguage={program.languages[0]}
 *   currentAssetType={assetType}
 * >
 *   <AssetComponents />
 * </AssetTranslationProvider>
 */
export const AssetTranslationProvider = ({
	children,
	translationEnabled,
	availableLanguages,
	selectedLanguage,
	defaultLanguage,
	currentAssetType,
}: IAssetTranslationProvider) => {
	// Check if current asset type supports translation
	const isCurrentAssetTranslatable = isAssetTypeTranslatable(
		currentAssetType ?? undefined,
	);

	/**
	 * Returns the translation language ID for GraphQL queries
	 * Will return null if translation is not applicable
	 */
	const getTranslationLanguageId = (): string | null => {
		// Translation must be enabled at program level
		if (!translationEnabled) return null;

		// Current asset type must support translation
		if (!isCurrentAssetTranslatable) return null;

		// A language must be selected
		if (!selectedLanguage) return null;

		return selectedLanguage.id;
	};

	const value: IAssetTranslationContext = {
		translationEnabled,
		availableLanguages,
		selectedLanguage,
		defaultLanguage,
		currentAssetType,
		isCurrentAssetTranslatable,
		getTranslationLanguageId,
	};

	return (
		<AssetTranslationContext.Provider value={value}>
			{children}
		</AssetTranslationContext.Provider>
	);
};

/**
 * Hook to access translation context in asset components
 *
 * Usage in asset controllers:
 * ```typescript
 * const { getTranslationLanguageId, isCurrentAssetTranslatable } = useAssetTranslation();
 *
 * const { data } = useQuery(QUERY, {
 *   variables: {
 *     where: {
 *       ...otherFields,
 *       translationLanguage: getTranslationLanguageId(), // Will be null if not supported
 *     }
 *   }
 * });
 * ```
 *
 * @throws {Error} If used outside of AssetTranslationProvider
 */
export const useAssetTranslation = (): IAssetTranslationContext => {
	const context = useContext(AssetTranslationContext);

	if (!context) {
		throw new Error(
			"useAssetTranslation must be used within AssetTranslationProvider",
		);
	}

	return context;
};
