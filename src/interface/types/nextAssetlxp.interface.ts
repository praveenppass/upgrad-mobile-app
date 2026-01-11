export interface IResumeAssetLxp {
    userProgramNextAsset?: IUserProgramNextAsset;
}

export interface IUserProgramNextAsset {
    asset?: Asset;
    parent?: Parent;
    activity?: Activity;
}

export interface Activity {
    level?: number;
    level1?: string;
    level2?: string;
    level3?: null;
    level4?: null;
    status?: string;
    isUpgraded?: boolean;
    enableLock?: null;
    startsAt?: null;
    endsAt?: Date;
    availableTill?: null;
}

export interface Asset {
    code?: string;
    name?: string;
    assetType?: AssetType;
}

export interface AssetType {
    type?: string;
}

export interface Parent {
    name?: string;
    label?: string;
}
