import { gql } from "@apollo/client";

import { IGender } from "@screens/Tabs/MyProfile/PersonalDetails/usePersonalDetailsController";

const getUserPersonalDetailsQuery = gql`
	query user($where: UserWhereUniqueInput!) {
		user(where: $where) {
			id
			firstName
			lastName
			image
			isd
			mobile
			email
			# aadhaar
			pincode
			kaggle
			address
			gender
			nationality {
				id
				name
			}
			telegram
			resume
			dateOfBirth
			timezone
			country {
				id
				name
				isd
			}
			stateRef {
				id
				name
				slug
			}
			city {
				id
				name
				wsmInfo {
					id
				}
			}
			linkedIn
			github
			stackOverflow
			userProfileResume {
				resumes {
					fileName
					filePath
					uploadedAt
					_isDeleted
				}
			}
		}
	}
`;

export interface IGetUserPersonalDetailsQueryVariables {
	where: {
		id: string;
	};
}
export interface IGetUserPersonalDetailsQuery {
	user: {
		firstName: string | null;
		lastName: string | null;
		image: string | null;
		// aadhaar: string | null;
		pincode: number;
		kaggle: string | null;
		address: string | null;
		gender: IGender | null;
		nationality: {
			id: string;
			name: string;
		} | null;
		telegram: string | null;
		userProfileResume: {
			resumes: {
				fileName: string;
				filePath: string;
				uploadedAt: string;
				_isDeleted: boolean;
			}[];
		} | null;
		dateOfBirth: string | null;
		timezone: string | null;
		country: {
			id: string;
			name: string;
			isd: string;
		} | null;
		stateRef: {
			id: string;
			name: string;
			slug: string;
		} | null;
		city: {
			id: string;
			name: string;
			wsmInfo: {
				id: number;
			};
		} | null;
		linkedIn: string | null;
		github: string | null;
		stackOverflow: string | null;
	};
}

export default getUserPersonalDetailsQuery;
