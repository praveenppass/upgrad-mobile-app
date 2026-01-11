export interface IupdateSubAssetForUserProgramQueryVariables {
	data: {
		status: string;
		response?: string | null;
	};
	where: {
		subAsset: string;
		userProgram: string;
		asset: string;
		superAssetCode?: string;
	};
}

export interface IupdateSubAssetForUserCourseQueryVariables {
	data: {
		status: string;
		response?: string | null;
	};
	where: {
		subAsset: string;
		userCourse: string;
		asset: string;
	};
}
