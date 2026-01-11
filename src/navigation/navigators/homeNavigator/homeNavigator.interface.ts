import type {
	NavigatorScreenParams,
	RouteProp,
} from "@react-navigation/native";
import type {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import type { FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";

import { IWorkExperienceItem } from "@components/Inputs/WorkExperienceCard";
import { IFieldConfig } from "@components/MyProfile/common/profile.interface";
import { IProfileConfigItem } from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import { ICPSEducationDetails } from "@services/cpsService";

import { IHomeTabNavigatorParamList } from "@navigation/navigators/homeTabNavigator/homeTabNavigator.interface";
import { HOME_ROUTES } from "@navigation/routes";

import { LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";
import { IEventType } from "@interface/components/academicPlanner/events.interface";
import { IEducation } from "@interface/user.interface";

import { ProfileSectionType } from "@constants/profile.constants";

const {
	MainTabs,
	CourseDetailsScreen,
	TicketView,
	HelpSupport,
	TicketTab,
	TicketDetails,
	RaiseATicketView,
	SearchCourses,
	LectureDetailsScreen,
	AssessmentQuizScreen,
	RecallQuizScreen,
	MyProfileScreen,
	EducationViewScreen,
	WorkExperienceViewScreen,
	CertificateViewScreen,
	AspirationsViewScreen,
	MyProfilePersonalDetails,
	ProfileMethods,
	ManualProfileFlow,
	ManualProfileFieldsModal,
	MyProfileWorkExperience,
	MyProfileTimezone,
	MyProfileEducationDetails,
	MyProfileContactDetails,
	MyProfileAspirations,
	PlayVideoLandscape,
	MyAccount,
	Container1Screen,
	Container2Screen,
	Container3Screen,
	Container6Screen,
	ProfileWebView,
	ViewResourcesScreen,
} = HOME_ROUTES;

export type IHomeStackNativeParamList = {
	[MainTabs]: NavigatorScreenParams<IHomeTabNavigatorParamList>;
	[Container6Screen]: {
		assetType: IAssetType;
		assetCode: string;
		courseId: string | null;
		moduleId: string | null;
		sessionId: string | null;
		segmentId: string | null;
		learningPathType: LearningPathType;
		learningPathId: string;
		learningPathCode: string;
		learningPathName: string;
		ispostSubmission?: boolean;
		isPostRecallSubmission?: boolean;
		elective: string;
		electiveGroup: string;
		track: string;
		trackGroup: string;
		workshopId: string;
		attemptID?: string | null;
		workshopCode: string;
		userProgramId?: string;
	};
	[CourseDetailsScreen]: {
		courseID: string;
		courseVariant: string;
		courseName: string;
		isSpecialization?: boolean;
	};
	[Container1Screen]: {
		learningPathType: LearningPathType;
		learningPathId: string;
		learningPathName: string;
	};
	[Container2Screen]: {
		learningPathType: LearningPathType;
		learningPathId: string;
		learningPathName: string;
		learningPathCode: string;
		workshopId: string;
		workshopCode: string;
		userProgramId?: string;
	};
	[Container3Screen]: {
		learningPathId: string;
		learningPathType: LearningPathType;
		learningPathName: string;
		learningPathCode: string;
		workshopId: string;
		courseCode: string;
		trackCode?: string;
		electiveCode?: string;
		trackGroupCode?: string;
		electiveGroupCode?: string;
		workshopCode: string;
		userProgramId?: string;
	};
	[TicketView]: undefined;
	[HelpSupport]: undefined;
	[TicketTab]: undefined;
	[TicketDetails]: {
		id?: string;
		category?: string;
		courseName?: string;
	};
	[RaiseATicketView]: undefined;
	[SearchCourses]: undefined;
	[LectureDetailsScreen]: {
		userProgramId: string;
		level1Id: string;
		courseName?: string;
		courseLabel?: string;
	};
	[AssessmentQuizScreen]: {
		assessmentID: string | null;
		attemptId: string | null;
		assetCode: string;
		courseId: string | null;
		moduleId: string | null;
		sessionId: string | null;
		segmentId: string | null;
		learningPathType: LearningPathType;
		learningPathId: string;
		learningPathName: string;
		workshopId: string;
		workshopCode: string;
		learningPathCode: string;
		userProgramId?: string;

		elective: string;
		electiveGroup: string;
		track: string;
		trackGroup: string;

		comboCurriculumCode?: string;
	};
	[RecallQuizScreen]: {
		assessmentID: string | null;
		attemptID: string | null;
		assetCode: string;
		courseId: string | null;
		moduleId: string | null;
		sessionId: string | null;
		segmentId: string | null;
		learningPathType: LearningPathType;
		learningPathId: string;
		learningPathName: string;
		previewMode: boolean;
		workshopId: string;
		workshopCode: string;
		learningPathCode: string;
		userProgramId?: string;

		elective: string;
		electiveGroup: string;
		track: string;
		trackGroup: string;

		comboCurriculumCode?: string;
	};
	[MyProfileScreen]: undefined;
	[EducationViewScreen]: undefined;
	[WorkExperienceViewScreen]: undefined;
	[CertificateViewScreen]: undefined;
	[AspirationsViewScreen]: undefined;
	[MyProfilePersonalDetails]:
		| {
				isStudyPlanBlocker: boolean;
		  }
		| undefined;
	ProfileMethods:
		| {
				profileConfigList?: IProfileConfigItem[];
				learningPathId?: string;
				learningPathCode?: string;
				workshopId?: string;
				learningPathType?: LearningPathType;
				learningPathName?: string;
				workshopCode?: string;
		  }
		| undefined;
	ManualProfileFlow: {
		profileConfigList?: IProfileConfigItem[];
		learningPathId?: string;
		learningPathCode?: string;
		learningPathName?: string;
		workshopId?: string;
		workshopCode?: string;
		learningPathType?: LearningPathType;
	};
	ManualProfileFieldsModal: {
		fields: IFieldConfig[];
		methods: UseFormReturn<FieldValues>;
		onSubmit: (data: FieldValues) => void;
		onError: (errors: FieldErrors<FieldValues>) => void;
		title?: string;
		description?: string;
		index?: number;
		onSaveSuccess?: (data: IEducation, index?: number) => void;
		onDataSaved?: (data: IWorkExperienceItem) => void;
		workExperienceIndex?: number;
		workExperienceItem?: IWorkExperienceItem;
		educationItem?: ICPSEducationDetails;
	};
	[MyProfileWorkExperience]: {
		workExperienceIndex: number;
	};
	[MyProfileTimezone]: undefined;
	[MyProfileEducationDetails]: {
		educationDetailsIndex: number;
	};
	[MyProfileContactDetails]: undefined;
	[MyProfileAspirations]: {
		learningPathId: string;
		learningPathType: LearningPathType;
		learningPathCode: string;
		workshopId?: string;
	};
	[PlayVideoLandscape]: {
		transcriptDetailsId: string | undefined;
		brightCoveId: string | undefined;
		seekTime: number;
		status: string | undefined;
		assetCode: string | undefined;
		learningPathId: string | undefined;
		superAssetCode?: string | undefined;
		isProgram: boolean;
		isOptional: boolean;
	};
	[MyAccount]: undefined;
	[ProfileWebView]: {
		section: ProfileSectionType;
		title: string;
	};
	[ViewResourcesScreen]: {
		eventType: IEventType;
		sessionId: string;
	};
};

export type IHomeStackNativeNavigationProp =
	NativeStackNavigationProp<IHomeStackNativeParamList>;

export type IHomeStackNativeRoute<
	RouteName extends keyof IHomeStackNativeParamList,
> = RouteProp<IHomeStackNativeParamList, RouteName>;

export type IHomeStackNativeScreen<T extends keyof IHomeStackNativeParamList> =
	NativeStackScreenProps<IHomeStackNativeParamList, T>;
