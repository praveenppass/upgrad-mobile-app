import { gql } from "@apollo/client";

const cancelMentorshipSessionQuery = gql`
	mutation cancelMentorshipSession(
		$where: SessionWhereUniqueInput!
		$data: CancelSessionInput!
	) {
		cancelMentorshipSession(where: $where, data: $data) {
			name
			order
		}
	}
`;

export default cancelMentorshipSessionQuery;

export interface ICancelMentorshipSessionQuery {
	cancelMentorshipSession: {
		name: string;
		order: number;
	};
}

export interface ICancelMentorshipSessionQueryVariables {
	data: {
		remarks: string;
	};
	where: {
		id: string;
	};
}
