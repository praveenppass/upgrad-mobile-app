import { gql } from "@apollo/client";

const updateMediaplayerQuery = gql`
	mutation manageUserMediaPlayerPreference(
		$where: UserMediaPlayerPreferenceWhereUniqueInput!
		$data: ManageUserMediaPlayerPreferenceInput!
	) {
		manageUserMediaPlayerPreference(where: $where, data: $data) {
			id
		}
	}
`;

export interface IUpdateMediaplayerQueryVariables {
	data: {
		mediaProvider: string;
		volume?: number;
		playbackSpeed?: number;
	};
	where: {
		mediaProvider: string;
		user: string | null;
	};
}

export interface IUpdateMediaplayerQuery {
	id: string;
}

export default updateMediaplayerQuery;
