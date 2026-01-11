import { gql } from "@apollo/client";

const updateVolumeAttemptQuery = gql`
	mutation manageUserMediaPlayerPreference(
		$where: UserMediaPlayerPreferenceWhereUniqueInput!
		$data: ManageUserMediaPlayerPreferenceInput!
	) {
		manageUserMediaPlayerPreference(where: $where, data: $data) {
			id
		}
	}
`;

export interface IUpdateVolumeProgressQueryVariables {
	data: {
		mediaProvider: string;
		volume: number;
	};
	where: {
		mediaProvider: string;
		user: string;
	};
}

export interface IUpdateVolumeProgressQuery {
	id: string;
}

export default updateVolumeAttemptQuery;
