// Offline assets (under 5KB) — bundled locally in the app
import { S3_BUCKET_BASE_URL } from "@utils/constants";

import Books from "../img/books.webp";
import BotHeaderIcon from "../img/bot-header.webp";
import CancelRedExcalmation from "../img/cancel-exclamation-red.webp";
import ClientError from "../img/client-error.webp";
import CoachModeHeader from "../img/coach-mode-bot-header.webp";
import CorrectAnswerIcon from "../img/correct-answer.webp";
import QuestionFeedbackIcon from "../img/feedback-icon.webp";
import IncorrectAnswerIcon from "../img/incorrect-answer.webp";
import LoadingIcon from "../img/loading.webp";
import Logout from "../img/logout.webp";
import NegativeFeedbackIcon from "../img/negative-feedback-icon.webp";
import NetworkError from "../img/network-error.webp";
import NeutralFeedbackIcon from "../img/neutral-feedback-icon.webp";
import NotEnrolledUserImage from "../img/not-enrolled-user-image.webp";
import PDFIcon from "../img/pdf.webp";
import PlayIcon from "../img/play-icon.webp";
import PositiveFeedbackIcon from "../img/positive-feedback-icon.webp";
import ProgramUpgraded from "../img/program-upgraded.webp";
import SuccessGreenTickNoShadow from "../img/success-green-no-shadow.webp";
import SuccessGreenTick from "../img/success-green-tick.webp";
import UpGradLegacy from "../img/upgrad-legacy.webp";

// Remote image paths (stored in S3) — should be under /img folder
const IMAGE_TAILS = {
	ASSESSMENT: `/img/assessment-submit.webp`,
	ASSESSMENT_SUBMITTED: `/img/assessment-submitted.webp`,
	BOT_HEADER: `/img/bot-header.webp`,
	CALENDAR_ILLUSTRATION: `/img/calendar-illustration.webp`,
	CALENDER: `/img/calender.webp`,
	CELEBRATION_CALENDER: `/img/celebration-calendar.webp`,
	DESKTOP_ICON: `/img/desktop-icon.webp`,
	DESKTOP_SPECIALIZATION_ICON: `/img/desktop-specialization-icon.webp`,
	GIFT_IMAGE: `/img/gift.webp`,
	GPT_FRAME: `/img/gpt-frame.webp`,
	HIDEN_OPINION_ICON: `/img/hiden-opinion.png`,
	NOTES_ICON: `/img/notes-icon.webp`,
	SEARCH_COURSE: `/img/search-course.webp`,
	SKIP_WARNING_SIGN: `/img/skip-warning-image.webp`,
	TIMES_UP: `/img/times-up-icon.webp`,
	UPDATE_ICON: `/img/update-app.webp`,
	WARNING: `/img/warning.webp`,
	UG_APP_BANNER: `/img/ug-app-banner.webp`,

	// Micro Interactions
	BIRTHDAY_BANNER: `/img/birthday-banner.webp`,
	CLASSROOM_INTRO: `/img/classroom-intro.webp`,
	COURSE_COMPLETION_BG: `/img/course-completion-bg.webp`,
	COURSE_COMPLETION_TEXT: `/img/course-completion-text.webp`,
	FIRST_ASSET_COMPLETION: `/img/first-asset-completion.webp`,
	FULL_MARKS_ASSESSMENTS_BANNER: `/img/full-marks-assessments-banner.webp`,
	FULL_MARKS_RECALL_QUIZ_BANNER: `/img/full-marks-recall-quiz-banner.webp`,
	INTRO_MODAL_HEADING: `/img/intro-modal-heading.webp`,
	LAST_ASSET_BG: `/img/last-asset-bg.webp`,
	LAST_ASSET_TEXT: `/img/last-asset-text.webp`,
	MODULE_FEEDBACK_BANNER: `/img/module-feedback-banner.webp`,
	MODULE_FEEDBACK_CLOUD1: `/img/module-feedback-modal-cloud1.webp`,
	MODULE_FEEDBACK_CLOUD2: `/img/module-feedback-modal-cloud2.webp`,
	ONBOARDING_MODAL_BG: `/img/onboarding-modal-bg.webp`,
	SUBMIT_ASSIGNMENT_BANNER: `/img/submit-assignment-banner.webp`,
};

// Final exportable object containing full URLs for S3 images
export const IMAGE_URLS = Object.fromEntries(
	Object.entries(IMAGE_TAILS).map(([key, path]) => [
		key,
		`${S3_BUCKET_BASE_URL}${path}`,
	]),
);

// Exporting local image imports for direct use in components
export {
	CancelRedExcalmation,
	LoadingIcon,
	NegativeFeedbackIcon,
	NetworkError,
	NeutralFeedbackIcon,
	PlayIcon,
	PositiveFeedbackIcon,
	SuccessGreenTick,
	SuccessGreenTickNoShadow,
	NotEnrolledUserImage,
	ClientError,
	UpGradLegacy,
	Books,
	ProgramUpgraded,
	CorrectAnswerIcon,
	QuestionFeedbackIcon,
	IncorrectAnswerIcon,
	CoachModeHeader,
	BotHeaderIcon,
	PDFIcon,
	Logout,
};
