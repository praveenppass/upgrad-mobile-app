import { gql } from "@apollo/client";

const updateContactDetailQuery = gql`
	mutation updateUser(
		$data: updateUserInput!
		$where: UserWhereUniqueInput!
	) {
		updateUser(data: $data, where: $where) {
			id
			image
			firstName
			lastName
			isd
			mobile
			timezone
			email
			dateOfBirth
			shortBio
			isProfileUpdate
			professionType
			telegram
			city {
				id
				name
			}
			country {
				id
				name
			}
			companyName
			designation
			experience {
				year
				month
			}
			stackOverflow
			linkedIn
			github
			gamificationProfile {
				id
				hasVisitedGamificationPage
			}
			profileSectionCompletion {
				personalDetails
				education
				workExperience
				aspiration
				contactDetails
			}
			isShowSectionDeadline
			showCareerCentrePopup
		}
	}
`;
export default updateContactDetailQuery;

export interface IUpdateContactDetailVariable {
	where: {
		id: string;
	};
	data: {
		alternateEmail: string;
		isd: string;
		mobile: string;
		whatsAppIsd: string;
		whatsAppMobile: string;
	};
}
