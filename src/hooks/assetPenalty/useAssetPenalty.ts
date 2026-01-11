import { useEffect } from "react";

import { IUseAssetPenalty } from "@hooks/assetPenalty/assetPenalty.interface";
import { getAssetPenalties } from "@hooks/assetPenalty/assetPenalty.util";
import useAssetModel from "@hooks/assetPenalty/useAssetPenaltyModel";

/**
 * Custom hook: `useAssetPenalty`
 *
 * This hook is responsible for retrieving and calculating asset penalties based on due dates.
 * It utilizes the `useAssetModel` hook to fetch penalty data and computes both current and reverted penalties.
 *
 * - `penalties`: Represents the actual penalties applicable to the asset before any cancellation or extension.
 * - `revertedPenalties`: Represents the penalties applicable if the due date is extended or canceled.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {string | null} params.dueDate - The original due date of the asset.
 * @param {string | null} params.extendedDueDate - The extended due date of the asset, if applicable.
 * @param {boolean} params.isDueDateExtended - A flag indicating whether the due date has been extended.
 * @param {string} params.learningPathCode - The identifier for the program or course.
 * @param {boolean} params.isProgram - A flag to determine if the learning path is a program (true) or a course (false).
 * @param {IAssetPenaltyConfigurationsQuery} [params.penaltyConfigurationData | undefined] - Optional penalty configuration data.
 *
 * @returns {Object} An object containing:
 * - `loadingAssetPenalty` (boolean): Indicates if penalty data is currently being loaded.
 * - `penalties` (IAssetPenaltyItem[]): Computed penalties for the current due date extension state.
 * - `revertedPenalties` (IAssetPenaltyItem[]): Computed penalties assuming the opposite due date extension state.
 */

const useAssetPenalty = ({
	dueDate,
	extendedDueDate,
	isDueDateExtended,
	learningPathCode,
	isProgram,
	penaltyConfigurationData,
}: IUseAssetPenalty) => {
	const {
		getAssetPenalty,
		penaltyConfigurationData: internalPenaltyConfigurationData,
		loadingAssetPenalty,
	} = useAssetModel();

	const finalPenaltyConfigurationData =
		penaltyConfigurationData || internalPenaltyConfigurationData;

	useEffect(() => {
		if (!learningPathCode || !dueDate) return;

		getAssetPenalty({
			variables: {
				where: [
					{
						...(isProgram
							? { program: learningPathCode }
							: { course: learningPathCode }),
					},
				],
			},
		});
	}, [learningPathCode, dueDate]);

	const commonProps = {
		penaltyConfigurationData: finalPenaltyConfigurationData,
		dueDate,
		extendedDueDate,
	};

	const penalties = getAssetPenalties({
		...commonProps,
		isDueDateExtended,
	});

	const revertedPenalties = getAssetPenalties({
		...commonProps,
		isDueDateExtended: !isDueDateExtended,
	});

	return {
		loadingAssetPenalty,
		penalties,
		revertedPenalties,
	};
};

export default useAssetPenalty;
