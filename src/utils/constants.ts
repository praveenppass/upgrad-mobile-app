import { Category } from "@interface/courseLibrary";

import { C } from "@assets/constants";
import {
	FaceBookIcon,
	GmailIcon,
	InstagramIcon,
	LinkedInCirceIcon,
	LogoWhatsApp,
	XIcon,
} from "@assets/icons";

const { strings } = C;
const COURSE_FALL_BACK_IMG =
	"https://www.legendsoflearning.com/wp-content/uploads/2020/10/benefits-of-online-learning-graphic.png";
const APP_NAME = "upGrad";
const UPGRAD_LEARN = "upgrad";
const SUPPORT_EMAIL = "support@knowledgehut.com";
const DEFAULT_COUNTRY_CODE = "+91";
const LINKEDIN_ORG_ID = "2339512";
const DEFAULT_WEB_URL = "https://www.knowledgehut.com/";
const UPGRAD_REFER_LINK = "https://www.upgrad.com/refer-and-earn/";
const UPGRAD_MARKETING_URL = "https://www.upgrad.com/";
const ANDROID_PLAY_STORE_LINK =
	"https://play.google.com/store/apps/details?id=com.upgrad.student";
const IOS_APP_STORE_LINK = "https://apps.apple.com/in/app/upgrad/id1191301447";

// Base URL for loading large images hosted on S3 (over 5KB)
const S3_BUCKET_BASE_URL =
	"https://upgrad-mobile-app.s3.ap-south-1.amazonaws.com";

const PaceHolderCategory: Category = {
	id: undefined,
	name: strings.ALL_COURSE,
};

const SOCIAL_LINKS = {
	whatsAppIndiaCommunity: "https://chat.whatsapp.com/FbrVlt0O2MN7pNAkoPgWuJ",
	whatsAppGlobalCommunity: "https://chat.whatsapp.com/KwAwv3ffD5ILsSlLiuhEp2",
	telegramCommunity: "https://t.me/knowledgehut_upgrad",
};

const REFER_SCREEN_ICONS = [
	{ icon: LogoWhatsApp({}) },
	{ icon: GmailIcon({}) },
	{ icon: InstagramIcon({}) },
	{ icon: LinkedInCirceIcon({}) },
	{ icon: XIcon({}) },
	{ icon: FaceBookIcon({}) },
];

export const REFER_AND_EARN_URL = "https://www.upgrad.com/refer-and-earn/";
export const EXPLORE_COURSES_URL = "https://www.upgrad.com/";

export const UPGRAD_SUPPORT_EMAIL = "techsupport@upgrad.com";

const STUDY_PLAN_BLOCKER_STORAGE_KEY = "learningDateExist";

export {
	COURSE_FALL_BACK_IMG,
	APP_NAME,
	SUPPORT_EMAIL,
	DEFAULT_COUNTRY_CODE,
	PaceHolderCategory,
	SOCIAL_LINKS,
	REFER_SCREEN_ICONS,
	LINKEDIN_ORG_ID,
	DEFAULT_WEB_URL,
	UPGRAD_REFER_LINK,
	UPGRAD_MARKETING_URL,
	ANDROID_PLAY_STORE_LINK,
	IOS_APP_STORE_LINK,
	UPGRAD_LEARN,
	STUDY_PLAN_BLOCKER_STORAGE_KEY,
	S3_BUCKET_BASE_URL,
};
