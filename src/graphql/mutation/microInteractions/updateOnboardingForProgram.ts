import { gql } from "@apollo/client";

export const updateOnboardingForProgram = gql`
	mutation updateUserProgram(
		$where: UserProgramWhereUniqueInput!
		$data: updateUserProgramInput
	) {
		updateUserProgram(where: $where, data: $data) {
			id
		}
	}
`;

export interface IUpdateOnboardingForProgramVariables {
	data: {
		firstAccessedAt?: string;
		firstAssetNotificationViewedAt?: string;
	};
	where: {
		id: string;
	};
}

export interface IUpdateOnboardingForProgramMutation {
	id: string;
}
