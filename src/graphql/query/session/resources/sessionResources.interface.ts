export interface ISessionResource {
	id: string;
	fileName: string;
	fileSize: string;
	url: string;
}

export interface ISessionResourcesResult {
	totalCount: number;
	result: ISessionResource[];
}
