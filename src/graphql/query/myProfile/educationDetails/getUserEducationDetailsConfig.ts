import { gql } from "@apollo/client";

const getUserEducationDetailsConfigQuery = gql`
	query userProfileConfigurationForLearner(
		$where: UserProfileConfigurationForLearnerWhereUniqueInput!
	) {
		userProfileConfigurationForLearner(where: $where) {
			education {
				fields
			}
		}
	}
`;

type IUserEducationDetailsFields =
	| "recentEducation"
	| "university"
	| "degree"
	| "fromYear"
	| "toYear"
	| "field"
	| "intermediateBoard"
	| "academicStream"
	| "percentage";

interface IGetUserEducationDetailsConfigField {
	name: string;
	label: string;
	show: boolean;
	isMandatory: boolean;
	isDefault: boolean;
	order: number;
	type: string;
	subText?: string;
}

export interface IGetUserEducationDetailsConfigQueryVariables {
	where: {
		user: string;
		userProgram?: string; //TODO
	};
}

export interface IGetUserEducationDetailsConfigQuery {
	userProfileConfigurationForLearner: {
		education: {
			fields: Record<
				IUserEducationDetailsFields,
				IGetUserEducationDetailsConfigField
			>;
		};
	};
}

export default getUserEducationDetailsConfigQuery;
