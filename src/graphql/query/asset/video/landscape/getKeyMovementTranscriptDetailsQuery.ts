import { gql } from "@apollo/client";

const getKeyMovementTranscriptDetailsQuery = gql`
	query transcript($where: transcriptWhereUniqueInput!) {
		transcript(where: $where) {
			id
			brightcove
			keyMoments
			transcription
			summary
			createdAt
			updatedAt
		}
	}
`;

export default getKeyMovementTranscriptDetailsQuery;

export interface IGetKeyMovementTranscriptDetailsVariables {
	where: {
		brightcove: string;
	};
}
export interface IKeyMovementTranscriptDetails {
	transcript: {
		id: string;
		brightcove: string;
		keyMoments: {
			start: number;
			end: number;
			title: string;
		};
		transcription: string;
		summary: string;
	};
}
