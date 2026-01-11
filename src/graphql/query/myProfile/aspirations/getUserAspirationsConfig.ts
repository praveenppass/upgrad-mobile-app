import { gql } from "@apollo/client";

const getUserAspirationsConfigQuery = gql`
	query userProfileConfigurationForLearner(
		$where: UserProfileConfigurationForLearnerWhereUniqueInput!
	) {
		userProfileConfigurationForLearner(where: $where) {
			aspiration {
				fields
			}
		}
	}
`;

type IUserAspirationFields =
	| "reason"
	| "domain"
	| "subDomain"
	| "city"
	| "openForInternship"
	| "optForPI"
	| "firstPreferredTimeForPI"
	| "secondPreferredTimeForPI";

interface IGetUserAspirationsConfigField {
	name: string;
	label: string;
	show: boolean;
	isMandatory: boolean;
	isDefault: boolean;
	order: number;
	type: string;
	subText?: string;
}

export interface IGetUserAspirationsConfigQueryVariables {
	where: {
		user: string;
		userProgram?: string; //TODO
	};
}

export interface IGetUserAspirationsConfigQuery {
	userProfileConfigurationForLearner: {
		aspiration: {
			fields: Record<
				IUserAspirationFields,
				IGetUserAspirationsConfigField
			>;
		};
	};
}

export default getUserAspirationsConfigQuery;
