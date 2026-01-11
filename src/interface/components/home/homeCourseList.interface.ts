import { IHomeLearnerCourses } from "@interface/myPrograms.interface";

export interface IHomeCourseList {
	title: string;
	showSearch?: boolean;
	onSearchPress?: () => void;
	courses: IHomeLearnerCourses["learnerCourses"]["result"];
	onFetchMore: () => void;
	referAndEarnIndex: number;
	loading: boolean;
	showReferAndEarnSkeleton?: boolean;
}

export interface IHomeCourseListSkeleton {
	showReferAndEarnSkeleton?: boolean;
}
