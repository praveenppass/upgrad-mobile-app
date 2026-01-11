import { gql } from "@apollo/client";

const updateUserProgramAspirationsMutation = gql`
	mutation createUserCourseProfileResponseForProfileBlocker(
		$data: CreateUserCourseProfileResponseInput!
	) {
		createUserCourseProfileResponseForProfileBlocker(data: $data) {
			course
			program
			userCourse
			userProgram
			workshop
			response {
				question {
					id
					options {
						code
					}
				}
			}
		}
	}
`;

export default updateUserProgramAspirationsMutation;

export interface IUpdateUserProgramAspirationsQueryVariables {
	data: {
		profileResponse: {
			workshop?: string;
			program?: string;
			userProgram?: string;
			userCourse?: string;
			course?: string;
			isCompleted?: boolean;
			hasMandatoryProfileQuestion?: boolean;
			response: {
				question: string;
				questionType: string;
				answerOption: string;
			}[];
		};
	};
}

export interface IUpdateUserProgramAspirationsQuery {
	createUserCourseProfileResponseForProfileBlocker: {
		course: string;
		program: string;
		userCourse: string;
		userProgram: string;
		response: {
			question: {
				id: string;
				options: {
					code: string;
				}[];
			};
			workshop: string;
		}[];
	};
}
