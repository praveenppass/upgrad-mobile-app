import { gql } from "@apollo/client";

export const cancelSessionForMentoringSession = gql`
	mutation cancelSessionForMentoringSession(
		$where: CancelSessionForMentoringSessionWhereInput!
		$data: CancelSessionForMentoringSessionInput!
	) {
		cancelSessionForMentoringSession(where: $where, data: $data) {
			id
		}
	}
`;
