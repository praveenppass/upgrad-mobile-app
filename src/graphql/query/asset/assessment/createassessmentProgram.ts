import { gql } from "@apollo/client";

const createAssessmentDetailsQueryForProgram = gql`
	mutation createAssessmentAttempt($input: CreateAssessmentAttemptInput!) {
		createAssessmentAttempt(input: $input) {
			url
		}
	}
`;

export interface ICreateAssessmentDetailsQueryForProgramQueryVariables {
	input: {
		assessment: string;
		meta: {
			asset: string;
			user: string;
			program: string;
			userProgram: string;
			learnerCourse: string;
			workshop: string;
			deliveryType: string;
			level1: string | null;
			level2: string | null;
			level3: string | null;
			level4: string | null;
			version?: number | null;
		};
	};
}

export interface ICreateAssessmentDetailsQueryForProgram {
	createAssessmentAttempt: {
		url: string;
	};
}

export default createAssessmentDetailsQueryForProgram;
