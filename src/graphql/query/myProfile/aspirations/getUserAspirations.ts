import { gql } from "@apollo/client";

const getUserAspirationsQuery = gql`
	query userProfileCoursesProgramQuestions(
		$where: UserProfileCoursesProgramWhereInput
	) {
		userProfileCoursesProgramQuestions(where: $where) {
			id
			code
			name
			profileQuestions {
				question {
					id
					question
					description
					instruction
					type
					options {
						code
						option
						domain
					}
					submittedAnswer
					preferredAnswer
				}
			}
		}
	}
`;

export interface IGetUserAspirationsQueryVariables {
	where: {
		user: string;
		userProgram: string;
	};
}

export interface IAspirationOption {
	code: string;
	option: string;
	domain: string;
}

export interface IAspirationQuestion {
	id: string;
	question: string;
	description: string;
	type: string;
	instruction: string;
	options: IAspirationOption[];
	submittedAnswer: IAspirationOption;
	preferredAnswer: IAspirationOption;
}

export interface IProfileQuestion {
	question: IAspirationQuestion;
}

export interface IUserProfileCoursesProgram {
	id: string;
	code: string;
	name: string;
	profileQuestions: IProfileQuestion[];
}

export interface IGetUserAspirationsQuery {
	userProfileCoursesProgramQuestions: IUserProfileCoursesProgram;
}

export default getUserAspirationsQuery;
