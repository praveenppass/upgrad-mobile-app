import { gql } from "@apollo/client";

const addDropdownQuery = gql`
	mutation createOnboardingOption($data: createOnboardingOptionInput!) {
		createOnboardingOption(data: $data) {
			code
			name
		}
	}
`;

export default addDropdownQuery;

export interface IAddDropdownVariable {
	createOnboardingOption: {
		code: string;
		name: string;
	};
}
