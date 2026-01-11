import { gql } from "@apollo/client";

const updateProfileSectionStatusMutation = gql`
	mutation UpdateProfileSectionStatus(
		$data: UpdateProfileSectionStatusInput!
	) {
		updateProfileSectionStatus(data: $data) {
			success
		}
	}
`;

export default updateProfileSectionStatusMutation;

export interface IUpdateProfileSectionStatusMutationVariables {
	data: {
		section: string;
		isCompleted: boolean;
	};
}

export interface IUpdateProfileSectionStatusMutation {
	success: boolean;
}
