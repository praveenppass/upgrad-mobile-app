import { gql } from "@apollo/client";

const getUserWorkExperienceConfigQuery = gql`
	query userProfileConfigurationForLearner(
		$where: UserProfileConfigurationForLearnerWhereUniqueInput!
	) {
		userProfileConfigurationForLearner(where: $where) {
			workExperience {
				fields
			}
		}
	}
`;

type IUserWorkExperienceFields =
	| "isWorking"
	| "experience"
	| "designation"
	| "organization"
	| "industry"
	| "workDomain"
	| "package"
	| "startsAt"
	| "endsAt"
	| "noticePeriod"
	| "hasReimbursementPolicy"
	| "hasProgramFeeReimbursement";

interface IGetUserWorkExperienceConfigField {
	name: string;
	label: string;
	show: boolean;
	isMandatory: boolean;
	isDefault: boolean;
	order: number;
	type: string;
	subText?: string;
}

export interface IGetUserWorkExperienceConfigQueryVariables {
	where: {
		user: string;
		userProgram?: string; //TODO
	};
}

export interface IGetUserWorkExperienceConfigQuery {
	userProfileConfigurationForLearner: {
		workExperience: {
			fields: Record<
				IUserWorkExperienceFields,
				IGetUserWorkExperienceConfigField
			>;
		};
	};
}

export default getUserWorkExperienceConfigQuery;
