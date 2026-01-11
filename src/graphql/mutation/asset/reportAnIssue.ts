import { gql } from "@apollo/client";

const reportAnIssueQuery = gql`
	mutation createReportTicket($data: CreateTicketInput!) {
		createTicket(data: $data) {
			id
		}
	}
`;

export default reportAnIssueQuery;

type ILearningPathKey = { userProgram: string } | { userCourse: string };

export interface IReportAnIssueQueryVariables {
	data: {
		subject: string;
		description: string;
		category: string;
		asset: string;
		attachments: {
			size: number;
			key: string;
			name: string;
		}[];
		qId?: number;
		assetLink?: string;
	} & ILearningPathKey;
}

export interface IReportAnIssueQuery {
	id: string;
}
