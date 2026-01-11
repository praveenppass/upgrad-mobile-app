import { gql } from "@apollo/client";

const getUserProfileConfigurationQuery = gql`
	query userProfileConfiguration(
		$where: UserProfileConfigurationWhereUniqueInput!
	) {
		userProfileConfiguration(where: $where) {
			personalDetails {
				hasDeadline
				dueByDays
			}
			workExperience {
				hasDeadline
				dueByDays
			}
			education {
				hasDeadline
				dueByDays
			}
			aspiration {
				hasDeadline
				dueByDays
			}
			contactDetails {
				hasDeadline
				dueByDays
			}
		}
	}
`;

export default getUserProfileConfigurationQuery;

export interface IUserProfileConfiguration {
	userProfileConfiguration: {
		aspiration: {
			dueByDays: number;
			hasDeadline: boolean;
		};
		contactDetails: {
			dueByDays: number;
			hasDeadline: boolean;
		};
		education: {
			dueByDays: number;
			hasDeadline: boolean;
		};
		personalDetails: {
			dueByDays: number;
			hasDeadline: boolean;
		};
		workExperience: {
			dueByDays: number;
			hasDeadline: boolean;
		};
	};
}
