import { gql } from "@apollo/client";
export const createOnboardingOption = gql`
	mutation createOnboardingOption($data: createOnboardingOptionInput!) {
		createOnboardingOption(data: $data) {
			code
			name
		}
	}
`;
