import { gql } from "@apollo/client";

import { ILanguage } from "@interface/userProgram.interface";

const updateTranslationLanguageForUserProgramMutation = gql`
	mutation updateTranslationLanguageForUserProgram(
		$where: UserProgramWhereUniqueInput!
		$data: UpdateTranslationLanguageForUserProgramInput!
	) {
		updateTranslationLanguageForUserProgram(where: $where, data: $data) {
			id
			translationLanguage {
				id
				name
			}
		}
	}
`;

export default updateTranslationLanguageForUserProgramMutation;

export interface IUpdateTranslationLanguageVariables {
	where: {
		id: string;
	};
	data: {
		translationLanguage: string | null;
	};
}

export interface IUpdateTranslationLanguageResponse {
	updateTranslationLanguageForUserProgram: {
		id: string;
		translationLanguage: ILanguage | null;
	};
}
