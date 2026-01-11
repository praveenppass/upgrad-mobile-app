import { gql } from "@apollo/client";

const manageProfileResume = gql`
	mutation manageProfileResume($where: ManageProfileResumeWhereInput!) {
		manageProfileResume(where: $where) {
			id
		}
	}
`;
export default manageProfileResume;

export interface IManageProfileResumeResponse {
	manageProfileResume: {
		id: string;
	};
}
