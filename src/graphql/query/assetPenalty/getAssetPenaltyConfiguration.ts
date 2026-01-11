import { gql } from "@apollo/client";

const getAssetPenaltyConfigurationsQuery = gql`
	query assetPenaltyConfigurations(
		$where: [AssetPenaltyConfigurationsWhereInput!]
	) {
		assetPenaltyConfigurations(where: $where) {
			configurations {
				from
				to
				percentage
			}
		}
	}
`;

export interface IGetAssetPenaltyConfigurationsQueryVariables {
	where: [
		{
			program?: string;
			course?: string;
		},
	];
}

export interface IAssetPenaltyConfigurationsQuery {
	assetPenaltyConfigurations: IAssetPenaltyConfiguration[];
}

export interface IAssetPenaltyConfiguration {
	configurations: IConfiguration[];
}
export interface IConfiguration {
	from: number | null;
	to: number | null;
	percentage: number;
}

export default getAssetPenaltyConfigurationsQuery;
