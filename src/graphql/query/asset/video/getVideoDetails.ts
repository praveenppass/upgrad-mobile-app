import { gql } from "@apollo/client";

const getVideoDetailsQuery = gql`
	query userMediaPlayerPreference(
		$where: UserMediaPlayerPreferenceWhereUniqueInput!
	) {
		userMediaPlayerPreference(where: $where) {
			id
			mediaProvider
			playbackSpeed
			volume
			videoQuality
			audioLanguage
		}
	}
`;

export interface IGetVideoDetailsQueryVariables {
	where: {
		mediaProvider: string | null;
		user: string | null;
	};
}

export interface IGetVideoDetailsQuery {
	userMediaPlayerPreference: {
		id: string | undefined;
		mediaProvider: string | undefined;
		playbackSpeed: number | undefined;
		volume: number | undefined;
		videoQuality: number | undefined;
		audioLanguage: string | undefined;
	};
}

export default getVideoDetailsQuery;
