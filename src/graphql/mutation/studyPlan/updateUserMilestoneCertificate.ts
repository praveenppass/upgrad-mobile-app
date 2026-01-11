import { gql } from "@apollo/client";

const updateUserMilestoneCertificate = gql`
	mutation updateUserMilestoneCertificate(
		$data: UserMilestoneCertificateUpdateInput!
		$where: UserMilestoneCertificateWhereUniqueInput!
	) {
		updateUserMilestoneCertificate(data: $data, where: $where) {
			id
		}
	}
`;

export default updateUserMilestoneCertificate;

export interface IUpdateUserMilestoneCertificateVariables {
	data: {
		isNotified: boolean;
	};
	where: {
		userProgram: string;
		level1: string;
	};
}

export interface IUpdateUserMilestoneCertificateMutation {
	id: string;
}
