import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";

import updateTranslationLanguageForUserProgramMutation, {
	IUpdateTranslationLanguageResponse,
	IUpdateTranslationLanguageVariables,
} from "@graphql/mutation/userProgram/updateTranslationLanguage";

import { ILanguage } from "@interface/userProgram.interface";

interface IUseAssetLanguageSwitcher {
	userProgramId: string;
	enableTranslation: boolean;
	languages: ILanguage[];
	originalLanguage: ILanguage;
	currentTranslationLanguage: ILanguage | null | undefined;
	onLanguageChanged: () => void;
}

const useAssetLanguageSwitcher = ({
	userProgramId,
	enableTranslation,
	languages,
	originalLanguage,
	currentTranslationLanguage,
	onLanguageChanged,
}: IUseAssetLanguageSwitcher) => {
	const [isLanguageSelectorVisible, setLanguageSelectorVisible] =
		useState(false);
	const [isConfirmationVisible, setConfirmationVisible] = useState(false);
	const [pendingLanguage, setPendingLanguage] = useState<ILanguage | null>(
		null,
	);

	const [updateLanguage, { loading: updatingLanguage }] = useMutation<
		IUpdateTranslationLanguageResponse,
		IUpdateTranslationLanguageVariables
	>(updateTranslationLanguageForUserProgramMutation);

	const multilingualEnabled =
		enableTranslation && (languages?.length ?? 0) >= 2;

	const defaultLanguage = originalLanguage;

	const selectedLanguage = currentTranslationLanguage ?? originalLanguage;

	const openLanguageSelector = useCallback(() => {
		setLanguageSelectorVisible(true);
	}, []);

	const closeLanguageSelector = useCallback(() => {
		setLanguageSelectorVisible(false);
	}, []);

	const handleLanguageSelect = useCallback(
		async (language: ILanguage) => {
			closeLanguageSelector();

			if (language.id === selectedLanguage?.id) {
				return;
			}

			if (language.id === originalLanguage.id) {
				await updateLanguage({
					variables: {
						where: { id: userProgramId },
						data: { translationLanguage: null },
					},
				});

				onLanguageChanged();
				return;
			}

			setPendingLanguage(language);
			setConfirmationVisible(true);
		},
		[
			selectedLanguage,
			originalLanguage,
			userProgramId,
			updateLanguage,
			onLanguageChanged,
			closeLanguageSelector,
		],
	);

	const handleConfirmLanguageSwitch = useCallback(async () => {
		if (!pendingLanguage) return;

		const languageToSet = pendingLanguage;

		setConfirmationVisible(false);
		setPendingLanguage(null);

		const updateLanguageMutation = async () => {
			const languageId =
				languageToSet.id === originalLanguage.id
					? null
					: languageToSet.id;

			await updateLanguage({
				variables: {
					where: { id: userProgramId },
					data: { translationLanguage: languageId },
				},
			});

			onLanguageChanged();
		};

		await updateLanguageMutation();
	}, [
		pendingLanguage,
		originalLanguage,
		userProgramId,
		updateLanguage,
		onLanguageChanged,
	]);

	const handleCancelLanguageSwitch = useCallback(() => {
		setConfirmationVisible(false);
		setPendingLanguage(null);
	}, []);

	return {
		multilingualEnabled,
		languages,
		selectedLanguage,
		defaultLanguage,
		isLanguageSelectorVisible,
		isConfirmationVisible,
		pendingLanguage,
		updatingLanguage,

		openLanguageSelector,
		closeLanguageSelector,
		handleLanguageSelect,
		handleConfirmLanguageSwitch,
		handleCancelLanguageSwitch,
	};
};

export default useAssetLanguageSwitcher;
