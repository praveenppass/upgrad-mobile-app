import { gql } from "@apollo/client";

import { IBrowserMetadata } from "@utils/deviceMetaData/deviceMetaData.interface";

export const sendUserSessionAnalytics = gql`
	mutation createApplicationSession($data: CreateApplicationSessionInput) {
		createApplicationSession(data: $data) {
			id
		}
	}
`;
export default sendUserSessionAnalytics;

export interface ISendUserSessionAnalyticsMutationVariables {
	data: {
		deviceInfo: IBrowserMetadata;
		type: string;
	};
}

export interface ISendUserSessionAnalyticsMutation {
	id: string;
}
