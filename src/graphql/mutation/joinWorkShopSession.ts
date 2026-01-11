import { gql } from "@apollo/client";

export const joinWorkShopSession = gql`
	mutation joinWorkShopSession($data: createWorkshopSessionAttendanceInput!) {
		createWorkshopSessionAttendance(data: $data) {
			id
		}
	}
`;
export interface IJoinWorkshopSessionResponse {
	createWorkshopSessionAttendance: {
		id: string;
	};
}

export interface IJoinWorkshopSessionVariables {
	data: {
		user?: string;
		status: string;
		workshopSession: string;
		workshop: string;
	};
}
