import { gql } from "@apollo/client";

const getUserPersonalDetailsConfigQuery = gql`
	query userProfileConfigurationForLearner(
		$where: UserProfileConfigurationForLearnerWhereUniqueInput!
	) {
		userProfileConfigurationForLearner(where: $where) {
			personalDetails {
				fields
			}
		}
	}
`;

type IUserPersonalDetailsFields =
	| "firstName"
	| "lastName"
	| "fathersName"
	| "dateOfBirth"
	// | "aadhaar"
	| "address"
	| "city"
	| "country"
	| "gender"
	| "github"
	| "image"
	| "kaggle"
	| "linkedIn"
	| "nationality"
	| "pincode"
	| "resume"
	| "stackOverflow"
	| "telegram"
	// | "timezone"
	| "state";

interface IGetUserPersonalDetailsConfigField {
	name: string;
	label: string;
	show: boolean;
	isMandatory: boolean;
	isDefault: boolean;
	order: number;
	type: string;
	subText?: string;
}

export interface IGetUserPersonalDetailsConfigQueryVariables {
	where: {
		user: string;
		userProgram?: string; //TODO
	};
}

export interface IGetUserPersonalDetailsConfigQuery {
	userProfileConfigurationForLearner: {
		personalDetails: {
			fields: Record<
				IUserPersonalDetailsFields,
				IGetUserPersonalDetailsConfigField
			>;
		};
	};
}

export default getUserPersonalDetailsConfigQuery;
