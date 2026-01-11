import { gql } from "@apollo/client";

import { IAssetStatusEnum, IAssetType } from "@interface/asset.interface";

const getContainer3ProgramCardListQuery = gql`
	query getContainer3ProgramCardList(
		$where: UserProgramContainerWhereInput!
	) {
		userProgramContainers(where: $where) {
			code
			name
			aliasName
			asset {
				name
				code
				assetType {
					type
				}
				activity {
					enableLock
					status
					level1
					level2
					level3
					level4
					elective
					electiveGroup
					track
					trackGroup
				}
			}
			activity {
				progress
				enableLock
				status
			}
			label
			isOptional
		}
	}
`;

export default getContainer3ProgramCardListQuery;

export interface IGetContainer3ProgramCardListQueryVariables {
	where: {
		id: string;
		level1: string;
		level2: string;
		levelLimit: number;
		trackGroup?: string;
		track?: string;
		elective?: string;
		electiveGroup?: string;
	};
}

export interface IGetContainer3ProgramCardListQueryData {
	userProgramContainers: IUserProgramCardListContainer[];
}

export interface IUserProgramCardListContainer {
	code: string;
	name: string;
	aliasName: string;
	asset: {
		name: string;
		code: string;
		assetType: {
			type: IAssetType;
		};
		activity: {
			status: IAssetStatusEnum;
			enableLock: boolean;
			level1: string;
			level2: string;
			level3: string;
			level4: string;
			elective: string;
			electiveGroup: string;
			track: string;
			trackGroup: string;
		};
	};
	activity: {
		progress: number;
		enableLock: boolean;
		status: IAssetStatusEnum;
	};
	label: string;
	isOptional?: boolean;
}
