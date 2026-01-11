
export interface IUserProfileCompletionStatus {
    data?: IUserProfileCompletionStatusData;
}

export interface IUserProfileCompletionStatusData {
    userProfileCompletionStatus?: UserProfileCompletionStatus;
}

export interface UserProfileCompletionStatus {
    completionPercentage?: number;
}
