import { BottomSheetHandleProps } from "@gorhom/bottom-sheet";
import { type AnimationObject } from "lottie-react-native";
import {
	type ColorValue,
	type StyleProp,
	type TextStyle,
	type ViewStyle,
} from "react-native";
import { SvgProps } from "react-native-svg";

import { type IAssetType } from "./asset.interface";
import { ICalendarTab } from "./calendar.interface";

enum IEnv {
	prod = "prod",
	stage = "stage",
}

enum ISnackType {
	info = "info",
	error = "error",
	success = "success",
	handsUp = "handsUp",
}

enum IPostType {
	info = "info",
	error = "error",
	success = "success",
}

enum PlatformType {
	IOS = "ios",
	Android = "android",
	Web = "web",
	Other = "other",
}

enum ICourseVariantEnum {
	SIMPLE_KH = "simple-kh",
	OUTCOME_DRIVEN = "outcome-driven",
	BUNDLE = "bundle",
	MILESTONE = "milestone",
	FREE = "free",
}

enum IDeliveryType {
	SELF_PACED_ONLY = "selfpaced-only",
	SELF_PACED_LVC = "selfpaced-lvc",
}

enum ICourseAccessType {
	TRIAL = "trial",
	PAID = "paid",
}

enum IWebViewEventEnum {
	START_ASSESSMENT = "START_ASSESSMENT",
	START_RECALL_QUIZ = "START_RECALL_QUIZ",
	SUBMIT_ASSESSMENT = "SUBMIT_ASSESSMENT",
	SUBMIT_RECALL_QUIZ = "SUBMIT_RECALL_QUIZ",
	RETAKE_ASSESSMENT = "RETAKE_ASSESSMENT",
	VIEW_ASSESSMENT_REPORT = "VIEW_ASSESSMENT_REPORT",
}

enum IModalName {
	AppModalView = "AppModalView",
}

enum IDateFormat {
	onlyDate = "D",
	onlyDay = "ddd",
	onlyZone = "A",
	year = "YYYY",
	time = "h:mm A",
	date = "D MMMM YYYY",
	dob = "DD-MM-YYYY",
	monthWithYear = "MMMM YYYY",
	dayAndHour = "D MMM, hh:mm A",
	dayAndDate = "dddd, D MMMM YYYY",
	dateWithTime = "D MMMM YYYY, h:mm A",
	weekDateTime = "dddd, D MMMM YYYY, h:mm A",
}

interface ISnackBar {
	open: boolean;
	message: string;
	type: ISnackType;
	isOnTop?: boolean;
}

// interface IAssessment {
// 	value: string;
// 	submitted: boolean;
// 	type: IAssessmentType
// }

interface PostData {
	data: any;
	errors: any;
}

interface AssessmentData {
	data: any;
	errors: any;
}

interface QueryResult<T> {
	data: T;
	errors: [];
}

interface BasicHeaderProps {
	title?: string;
	isBack?: boolean;
	isBackColor?: string;
	isBackLoading?: boolean;
	loading?: boolean;
	isShadow?: boolean;
	leftAction?: JSX.Element;
	rightAction?: JSX.Element;
	titleStyle?: StyleProp<TextStyle>;
	duration?: number | string | JSX.Element;
	mainContainerStyle?: StyleProp<ViewStyle>;
	rightActionStyle?: StyleProp<ViewStyle>;
	midActionStyle?: StyleProp<ViewStyle>;
	leftActionContainerStyle?: StyleProp<ViewStyle>;
	eventsParams?: Record<string, unknown>;
	backButtonText?: string;
	backButtonTextStyle?: StyleProp<TextStyle>;
	icon?: JSX.Element;
	myAccount?: boolean;
	sectionName?: string;
	setShowPostScreen?: (value: boolean) => void;
	setUpdateAttemptId?: (value: any) => void;
	assessmentID?: string;
	handleSubmit?: (value: boolean) => void;
	attemptId?: string;
	unansweredCount?: number;
	notVisitedCount?: number;
	quizscreen?: any;
	isBackColorQuiz?: any;
	finishEnabled?: any;
	submit?: any;
}

interface IWithHeaderProps {
	isHomeHeader?: boolean;
	showHeaderFallback?: boolean;
	headerOptions?: BasicHeaderProps;
	BodyComponent: React.FunctionComponent;
	HeaderComponent?: React.FunctionComponent;
	colors?: (string | number)[];
	isGradientBackGround?: boolean;
}

interface IStreakPoint {
	id: number;
	day: number;
	points: number;
}
interface ICustomHeaderProps {
	isBack?: boolean;
}

interface IAppModalViewType {
	children: JSX.Element;
	title: string;
}

interface IWeekItemCard {
	week: string;
	subTitle: string;
	description: string;
}

interface IButtonProps {
	title: string;
	isWhite?: boolean;
	icon?: JSX.Element;
	rightIcon?: JSX.Element;
	isDisabled?: boolean;
	isOutLineButton?: boolean;
	isTransparent?: boolean;
	onBtnHandler: () => void;
	titleStyle?: StyleProp<TextStyle>;
	btnStyle?: StyleProp<ViewStyle>;
	isLoading?: boolean;
	setupDateState?: (e: any) => void;
	updateState?: boolean;
	isExtensionDisable?: boolean;
}

enum ITopicState {
	completed = "completed",
	started = "started",
	notStarted = "notStarted",
	locked = "locked",
	sequentialLock = "sequentialLock",
}

enum IEntranceAnimation {
	SlideInUp = "slideInUp",
	FlipInX = "flipInX",
	FadeIn = "fadeIn",
	FadeOut = "fadeOut",
	SlideDown = "slideOutDown",
}

enum CoursesKeyPointEnum {
	totalAssessments = "totalAssessments",
}

enum APIErrorCodeEnum {
	UNAUTHENTICATED = "UNAUTHENTICATED",
}

interface IAppModalViewParams {
	AppModalView: IApModalParams;
}

interface IApModalParams {
	title: string;
	children: JSX.Element;
	isHeaderShadow?: boolean;
	height?: string | number;
}

interface IAppNetworkStatus {
	visible: boolean;
	tryAgainFunc?: () => void;
	type: "error" | "network";
}

interface IAuthApiRes {
	registrationId: string;
	registrationStatus: string;

	status: string;
	message: string;
}

interface IHalfBottomSheetType {
	icon?: JSX.Element;
	title?: string;
	subTitle?: string;
	description?: string;
	isBottomBtnWhite?: boolean;
	showBottomButton?: boolean;
	customSubTitle?: JSX.Element;
	buttonText?: string;
	onButtonPress?: () => void;
	primaryButtonText?: string;
	primaryButtonPress?: () => void;
	btnStyle?: StyleProp<ViewStyle>;
	iconViewStyle?: StyleProp<ViewStyle>;
	primaryBtnStyle?: StyleProp<ViewStyle>;
	backGroundColor?: ColorValue | undefined;
	backGroundSVGHeight?: number;
	rootStyle?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
	subTitleStyle?: StyleProp<TextStyle>;
	bottomSheetVisible?: boolean;
	secondaryButtonLoading?: boolean;
	primaryButtonLoading?: boolean;
	indicatorColor?: string;
	svgStyle?: StyleProp<ViewStyle>;
	backgroundColor?: string;
	handleComponent?: React.FC<BottomSheetHandleProps>;
	lottieIcon?: string | AnimationObject | { uri: string };
}

interface IMenuItem {
	title: string;
	isSelected?: boolean;
	value?: string;
	iconColor?: string;
	style?: StyleProp<ViewStyle>;
	Icon?: (props: SvgProps) => Element;
}

interface IWebEventType {
	event?: IWebViewEventEnum;
	assessmentType?: IAssetType;
}

type ITabPressEvent = {
	defaultPrevented: boolean;
	preventDefault: () => void;
	target: string;
	type: "tabPress";
};

enum IUpcomingEventEnum {
	JOIN_EVENT = "Join",
	PLAY_RECORD = "Play Record",
	VIEW_DETAILS = "View Details",
	SUBMIT_RECALL_QUIZ = "SUBMIT_RECALL_QUIZ",
	RETAKE_ASSESSMENT = "RETAKE_ASSESSMENT",
	VIEW_ASSESSMENT_REPORT = "VIEW_ASSESSMENT_REPORT",
}

enum ISortByVariable {
	UPCOMING_EVENT = "_gte",
	PASS_EVENT = "_lt",
}

enum ISortByVariable1 {
	RECENT = "_gte",
	UPVOTES = "_lt",
}

interface IFilterOptions {
	title?: string;
	isSelected?: boolean;
	value?: string | string[];
}

interface ITechnicalCourses {
	name?: string;
	code?: string | number;
	isSelected?: boolean;
}

interface IButtonProps {
	title: string;
	isWhite?: boolean;
	icon?: JSX.Element;
	rightIcon?: JSX.Element;
	isDisabled?: boolean;
	isOutLineButton?: boolean;
	isTransparent?: boolean;
	onBtnHandler: () => void;
	titleStyle?: StyleProp<TextStyle>;
	btnStyle?: StyleProp<ViewStyle>;
	isLoading?: boolean;
}

interface ISelectedSession {
	selectedTabName?: ICalendarTab;
	count?: number;
}

enum IFileTypeEnum {
	PDF = ".pdf",
	Word = ".docx",
	WordOld = ".doc",
	Excel = ".xlsx",
	ExcelOld = ".xls",
	PowerPoint = ".pptx",
	PowerPointOld = ".ppt",
	Image = ".jpg",
	Zip = ".zip",
	CSV = ".csv",
	Rar = ".rar",
	Text = ".txt",
	Epub = ".epub",
}

interface IProfileButtonList {
	title: string;
	icon?: JSX.Element;
	value: string;
}

interface IMyAccountList {
	id: number;
	title: string;
	subtitle: string;
	startYear: string;
	endYear?: string;
}
interface IMarketingBanner {
	id: string;
	title: string;
	description: string;
	btnText: string;
	imagePath: string;
	isRefer: boolean;
}
interface IDeleteAccountFeedBack {
	feedback?: string;
	selectedOption?: string;
}

interface ITicketLoaderData {
	id: string;
	cardStyle: ViewStyle;
	directionStyle: ViewStyle;
}

interface IEmojiFeedback {
	id: string;
	icon: JSX.Element;
	name: string;
}

interface IUpdateAssetParams {
	asset: string;
	superAssetCode: string;
	completedStatus?: string;
	assetType?: IAssetType;
}

enum QUIZ_TYPE {
	QUIZ = "QUIZ",
	POLL = "POLL",
	FEEDBACK = "FEEDBACK",
	REPORT = "REPORT",
}

enum LearningPathType {
	PROGRAM = "PROGRAM",
	COURSE = "COURSE",
}

enum AssetLockType {
	PREVIOUS_INCOMPLETE_ASSET,
	PAST_DEADLINE_ASSET,
	YET_TO_START_ASSET,
}
enum QuizAnswerStatus {
	CORRECT = "correct",
	INCORRECT = "incorrect",
	NO_RESPONSE = "no_response",
}
enum BottomButton {
	VERIFY = "Verify",
	NEXT = "Next",
	PREV = "Prev",
	SKIP = "Skip",
	FINISH = "FINISH",
	TIMES_UP = "TIMES UP",
	SUBMIT_ASSESMENT = "SUBMIT ASSESMENT",
	MODAL_OKAY_NAVIGATE = "MODAL_OKAY_NAVIGATE",
	CLOSE = "Close",
}
enum TimerFinish {
	TIMER_FINISH = "TIMER FINISH",
}
export {
	type PostData,
	type AssessmentData,
	type IPostType,
	IEnv,
	ISnackType,
	ITopicState,
	IDateFormat,
	type ITicketLoaderData,
	// type IAssessment,
	type ISnackBar,
	type IAuthApiRes,
	type QueryResult,
	type IStreakPoint,
	type IApModalParams,
	type IAppNetworkStatus,
	type ICustomHeaderProps,
	type IAppModalViewType,
	IModalName,
	type IAppModalViewParams,
	type IHalfBottomSheetType,
	type BasicHeaderProps,
	type IWithHeaderProps,
	type IWeekItemCard,
	IEntranceAnimation,
	CoursesKeyPointEnum,
	ICourseVariantEnum,
	type IMenuItem,
	type IWebEventType,
	IWebViewEventEnum,
	APIErrorCodeEnum,
	ICourseAccessType,
	IDeliveryType,
	ISortByVariable1,
	type ITabPressEvent,
	type IFilterOptions,
	IUpcomingEventEnum,
	type IButtonProps,
	ISortByVariable,
	type ISelectedSession,
	IFileTypeEnum,
	type IProfileButtonList,
	type IMyAccountList,
	type IDeleteAccountFeedBack,
	type IMarketingBanner,
	type ITechnicalCourses,
	type IUpdateAssetParams,
	type IEmojiFeedback,
	QUIZ_TYPE,
	PlatformType,
	LearningPathType,
	AssetLockType,
	QuizAnswerStatus,
	BottomButton,
	TimerFinish,
};
