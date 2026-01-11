import {
	IFeedbackData,
	IProfileBlockerData,
	ISurveyBlockerData,
} from "@components/studyPlan/common/StudyPlanBlocker/studyPlanBlocker.interface";

import { IGetCourseAssetBasicDetailsQuery } from "@graphql/query/asset/basicDetails/getCourseAssetBasicDetails";
import { IGetProgramAssetBasicDetailsQuery } from "@graphql/query/asset/basicDetails/getProgramAssetBasicDetails";

import useAssetLanguageSwitcher from "@hooks/useAssetLanguageSwitcher";

import { LearningPathType } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";
import { ILanguage } from "@interface/userProgram.interface";

export interface IUseContainer6Component {
	assetCode: string;
	courseId: string | null;
	moduleId: string | null;
	sessionId: string | null;
	segmentId: string | null;
	learningPathType: LearningPathType;
	learningPathCode: string;
	learningPathId: string;
	learningPathName: string;
	assetBasicDetails:
		| IGetProgramAssetBasicDetailsQuery["getAssetFromUserProgram"]
		| IGetCourseAssetBasicDetailsQuery["getAssetFromUserCourse"]
		| null;
	refetchAssetBasicDetails: () => Promise<void>;
	assetBasicDetailsLoading: boolean;
	isPostSubmission: boolean;
	workshopId: string;
	workshopCode: string;
	userProgramId?: string;
	surveyBlockerData: ISurveyBlockerData | null;
	profileBlockerData: IProfileBlockerData | null;
	shouldShowFirstAssetCompletionModal: boolean;
	feedbackData: IFeedbackData | null;
	attemptID: string;
	learningPathDetails:
		| IGetProgramAssetBasicDetailsQuery["userProgram"]
		| IGetCourseAssetBasicDetailsQuery["userCourse"]
		| null;
	translationData: {
		enableTranslation: boolean;
		languages: ILanguage[];
		translationLanguage: ILanguage | null;
	} | null;
	languageSwitcher: ReturnType<typeof useAssetLanguageSwitcher>;
}

export interface IAssetRendererProps {
	type?: IAssetType;
	props: {
		assetCode: string;
		courseId: string;
		moduleId: string;
		sessionId: string;
		segmentId: string;
		learningPathType: LearningPathType;
		learningPathId: string;
		recallQuizCode?: string;
		assessmentCode?: string;
		ispostSubmission?: boolean;
		isPostRecallSubmission?: boolean;
		attemptID?: string;
	};
}
