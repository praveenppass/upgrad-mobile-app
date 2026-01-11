// English locale strings export
import academicPlanner from "@strings/locales/en/academicPlanner";
import asset from "@strings/locales/en/asset";
import auth from "@strings/locales/en/auth";
import common from "@strings/locales/en/common";
import home from "@strings/locales/en/home";
import profile from "@strings/locales/en/profile";
import studyPlan from "@strings/locales/en/studyPlan";

// Infer the type from actual string objects
const strings = {
	common,
	auth,
	academicPlanner,
	asset,
	home,
	profile,
	studyPlan,
} as const;

export default strings;
