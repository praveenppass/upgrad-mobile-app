import { gql } from "@apollo/client";

const getUserContactDetailsConfigQuery = gql`
	query userProfileConfigurationForLearner(
		$where: UserProfileConfigurationForLearnerWhereUniqueInput!
	) {
		userProfileConfigurationForLearner(where: $where) {
			contactDetails {
				fields
			}
		}
	}
`;

type IUserContactDetailsFields =
	| "email"
	| "mobile"
	| "whatsAppMobile"
	| "alternateEmail";

interface IGetUserContactDetailsConfigField {
	name: string;
	label: string;
	show: boolean;
	isMandatory: boolean;
	isDefault: boolean;
	order: number;
	type: string;
	subText?: string;
}

export interface IGetUserContactDetailsConfigQueryVariables {
	where: {
		user: string;
		userProgram?: string; //TODO
	};
}

export interface IGetUserContactDetailsConfigQuery {
	userProfileConfigurationForLearner: {
		contactDetails: {
			fields: Record<
				IUserContactDetailsFields,
				IGetUserContactDetailsConfigField
			>;
		};
	};
}

export default getUserContactDetailsConfigQuery;
