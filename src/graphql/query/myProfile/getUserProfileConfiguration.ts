import { gql } from "@apollo/client";

const getUserProfileConfigurationQuery = gql`
	query userProfileConfigurationForLearner(
		$where: UserProfileConfigurationForLearnerWhereUniqueInput!
	) {
		userProfileConfigurationForLearner(where: $where) {
			personalDetails {
				fields
			}
			workExperience {
				fields
			}
			contactDetails {
				fields
			}
			education {
				fields
			}
		}
	}
`;

// Field types from individual config files
type IUserPersonalDetailsFields =
	| "firstName"
	| "lastName"
	| "fathersName"
	| "dateOfBirth"
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
	| "state";

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

type IUserContactDetailsFields =
	| "email"
	| "mobile"
	| "whatsAppMobile"
	| "alternateEmail";

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

interface IGetUserProfileConfigurationField {
	name: string;
	label: string;
	show: boolean;
	isMandatory: boolean;
	isDefault: boolean;
	order: number;
	type: string;
	subText?: string;
}

export interface IGetUserProfileConfigurationQueryVariables {
	where: {
		user: string;
		userProgram?: string;
	};
}

export interface IGetUserProfileConfigurationQuery {
	userProfileConfigurationForLearner: {
		personalDetails: {
			fields: Record<
				IUserPersonalDetailsFields,
				IGetUserProfileConfigurationField
			>;
		};
		workExperience: {
			fields: Record<
				IUserWorkExperienceFields,
				IGetUserProfileConfigurationField
			>;
		};
		contactDetails: {
			fields: Record<
				IUserContactDetailsFields,
				IGetUserProfileConfigurationField
			>;
		};
		education: {
			fields: Record<
				IUserEducationDetailsFields,
				IGetUserProfileConfigurationField
			>;
		};
	};
}

export default getUserProfileConfigurationQuery;
