import { gql } from "@apollo/client";

const joinWorkShopSessionQuery = gql`
	mutation joinWorkShopSession($data: createWorkshopSessionAttendanceInput!) {
		createWorkshopSessionAttendance(data: $data) {
			id
		}
	}
`;

export default joinWorkShopSessionQuery;

export interface IJoinWorkShopSessionQuery {
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
