import {
	IEmojiFeedback,
	IFilterOptions,
	IMenuItem,
	IProfileButtonList,
} from "@interface/app.interface";
import { IDropDownData, IQuestion } from "@interface/user.interface";

import { C } from "@assets/constants";
import {
	DisappointedFeedbackIcon,
	DullFeedbackIcon,
	HappyFeedbackIcon,
	SatisfactoryFeedbackIcon,
} from "@assets/icons";

const { strings, themes } = C;

export const loaderData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const loaderData1 = [0, 1, 2, 3, 4];

export const REPORT_ISSUE_DATA: IMenuItem[] = [
	{
		title: strings.TECHNICAL_ERROR,
		value: strings.TECHNICAL_ERROR,
		isSelected: false,
	},
	{
		title: strings.OVERALL_CONTENT_ERROR,
		value: strings.OVERALL_CONTENT_ERROR,
		isSelected: false,
	},
];

export const REPORT_ISSUE_QUIZ_DATA: IMenuItem[] = [
	{
		title: strings.TECHNICAL_ERROR,
		value: strings.TECHNICAL_ERROR,
		isSelected: false,
	},
	{
		title: strings.OVERALL_CONTENT_ERROR,
		value: strings.OVERALL_CONTENT_ERROR,
		isSelected: false,
	},
];

export const EMOJI_FEEDBACK_DATA: IEmojiFeedback[] = [
	{
		id: "1",
		icon: DisappointedFeedbackIcon({ color: themes.bg.transparent }),
		name: strings.DISAPPOINTED,
	},
	{
		id: "2",
		icon: DullFeedbackIcon({ color: themes.bg.transparent }),
		name: strings.DULL,
	},
	{
		id: "3",
		icon: SatisfactoryFeedbackIcon({ color: themes.bg.transparent }),
		name: strings.SATISFACTORY,
	},
	{
		id: "4",
		icon: HappyFeedbackIcon({ color: themes.bg.transparent }),
		name: strings.HAPPY,
	},
	{
		id: "5",
		icon: DisappointedFeedbackIcon({ color: themes.bg.transparent }),
		name: strings.WOW,
	},
];

export const ATTACH_FILE_ITEM: IMenuItem = {
	title: strings.ATTACH_SCREENSHOT,
	value: strings.ATTACH_SCREENSHOT,
	isSelected: false,
};

export const EDIT_PROFILE_OPTION_LIST: IProfileButtonList[] = [
	{
		title: strings.UPDATE_PROFILE_PICTURE,
		value: strings.UPDATE_PROFILE_PICTURE,
	},
	{
		title: strings.VIEW_PROFILE_PICTURE,
		value: strings.VIEW_PROFILE_PICTURE,
	},
	{
		title: strings.REMOVE_PROFILE_PICTURE,
		value: strings.REMOVE_PROFILE_PICTURE,
	},
];

export const GENDER_DATA = [
	{
		id: strings.MALE,
		name: strings.MALE,
	},
	{
		id: strings.FEMALE,
		name: strings.FEMALE,
	},
	{
		id: strings.OTHERS,
		name: strings.OTHERS,
	},
];

export const YES_NO_LIST = [
	{
		id: strings.YES,
		name: strings.YES,
	},
	{
		id: strings.NO,
		name: strings.NO,
	},
];

export const CODING_REQUIRED_LIST = [
	{
		id: strings.NEVER,
		name: strings.NEVER,
		code: strings.NEVER?.toLowerCase(),
	},
	{
		id: strings.OCCASIONALLY,
		name: strings.OCCASIONALLY,
		code: strings.OCCASIONALLY?.toLowerCase(),
	},
	{
		id: strings.DAILY,
		name: strings.DAILY,
		code: strings.DAILY?.toLowerCase(),
	},
];

export const PROFESSION = [
	{
		id: strings.STUDENT,
		name: strings.STUDENT,
	},
	{
		id: strings.FRESHER,
		name: strings.FRESHER,
	},
	{
		id: strings.WORKING_PROFESSIONAL,
		name: strings.WORKING_PROFESSIONAL,
	},
];

export const EXPERIENCE_DATA: IDropDownData[] = [
	{
		id: strings.EXP_L1,
		name: strings.EXP_L1,
	},
	{
		id: strings.EXP_L2,
		name: strings.EXP_L2,
	},
	{
		id: strings.EXP_L3,
		name: strings.EXP_L3,
	},
	{
		id: strings.EXP_L4,
		name: strings.EXP_L4,
	},
	{
		id: strings.EXP_L5,
		name: strings.EXP_L5,
	},
];

export const PREFERRED_WORK_MODE_DATA: IDropDownData[] = [
	{
		id: strings.ANY,
		name: strings.ANY,
	},
	{
		id: strings.REMOTE,
		name: strings.REMOTE,
	},
	{
		id: strings.ONSITE,
		name: strings.ONSITE,
	},
	{
		id: strings.HYBRID,
		name: strings.HYBRID,
	},
];

export const NOTICE_PERIOD_DATA: IDropDownData[] = [
	{
		id: strings.NOTICE_PERIOD_L1,
		name: strings.NOTICE_PERIOD_L1,
	},
	{
		id: strings.NOTICE_PERIOD_L2,
		name: strings.NOTICE_PERIOD_L2,
	},
	{
		id: strings.NOTICE_PERIOD_L3,
		name: strings.NOTICE_PERIOD_L3,
	},
	{
		id: strings.NOTICE_PERIOD_L4,
		name: strings.NOTICE_PERIOD_L4,
	},
];

const CTC_LIST_DATA: IDropDownData[] = [
	{
		id: strings.CTC_L1,
		name: strings.CTC_L1,
	},
	{
		id: strings.CTC_L2,
		name: strings.CTC_L2,
	},
	{
		id: strings.CTC_L3,
		name: strings.CTC_L3,
	},
	{
		id: strings.CTC_L4,
		name: strings.CTC_L4,
	},
	{
		id: strings.CTC_L5,
		name: strings.CTC_L5,
	},
	{
		id: strings.CTC_L6,
		name: strings.CTC_L6,
	},
	{
		id: strings.CTC_L7,
		name: strings.CTC_L7,
	},
	{
		id: strings.CTC_L8,
		name: strings.CTC_L8,
	},
	{
		id: strings.CTC_L9,
		name: strings.CTC_L9,
	},
	{
		id: strings.CTC_L10,
		name: strings.CTC_L10,
	},
];

export const CURRENT_CTC_DATA: IDropDownData[] = [
	...CTC_LIST_DATA,
	{
		id: strings.NOT_APPLICABLE,
		name: strings.NOT_APPLICABLE,
	},
];

export const EXPECTED_CTC_DATA: IDropDownData[] = [
	...CTC_LIST_DATA,
	{
		id: strings.NEGOTIABLE,
		name: strings.NEGOTIABLE,
	},
];

export const shadowOptions = {
	topShadow: { bottom: false, end: false, start: false, top: true },
	bottomShadow: { bottom: true, end: false, start: false, top: false },
	noShadow: { bottom: false, end: false, start: false, top: false },
};

export const FILTER_OPTIONS: IFilterOptions[] = [
	{
		isSelected: false,
		title: strings.IN_PROGRESS,
		value: ["in-progress"],
	},
	{
		isSelected: false,
		title: strings.UPCOMING,
		value: ["yet-to-start", "scheduled", "request-to-rescheduled"],
	},
	{
		isSelected: false,
		title: strings.COMPLETED,
		value: ["completed"],
	},
	{
		isSelected: false,
		title: strings.CANCELLED,
		value: ["cancelled"],
	},
];

export const getAdditionalOptions = (
	dropdownTypeOrLabel: string,
	question: IQuestion,
) => {
	// Options coming from db
	if (question?.options && question?.options?.length) {
		return question?.options;
	}

	// Options stored in FE
	switch (dropdownTypeOrLabel) {
		case `What's your primary reason for joining this program?`:
			return joinProgram;

		case "When do you like to learn?":
			return weekDaysOptions;

		case "How many hours would you want to study daily?":
			return studyHoursOptions;

		case "What time would you like to start learning?":
			return learningTimeOptions;

		case "Does your organization reimburse for employee upskilling?":
		case "Are you open to Internships?":
		// case 'Do you see a possibility of an internal transition within your organisation in the program domain?':
		case "Opt-In for Personalized Industry Sessions with an Expert?":
		case "Has your organization reimbursed your program fees?":
		case "Are you interested in sales role?":
		case "Can your organization internally transition you to the program domain?":
			return yesOrNoOptions;

		case "Preferred Domain":
			return domainOptions;

		// case 'What are your top two preferred time slots for Personalised Industry (PI) Sessions?':
		case "What is your first preferred time slot for the PI session?":
		case "What is your second preferred time slot for the PI session?":
			return timeSlotsOptions;

		case "What is your preferred internship duration?":
			return internshipDurationOptions;

		default:
			return [{ "-": "-" }];
	}
};

export const joinProgram = [
	{
		id: "1",
		name: "To perform better at my existing job role through upskilling",
	},
	{
		id: "2",
		name: "To perform better at my existing job role through upskilling",
	},
	{
		id: "3",
		name: "To become more employable and stay relevant in the future but not looking for transition immediately",
	},
	{
		id: "4",
		name: "To make a switch to a new role in the same or another company",
	},
	{ id: "5", name: "To get a promotion/salary hike" },
	{
		id: "6",
		name: "To attain further higher education after upGrad program",
	},
	{
		id: "7",
		name: "To establish myself as an expert in leading conversations, writing blogs/papers, freelancing, coaching, etc.",
	},
	{ id: "8", name: "To get a certificate/diploma/degree" },
];

export const studyHoursOptions = [
	{ id: "1", name: "Less than 1 hr" },
	...Array.from({ length: 20 }, (_, index) => {
		const id = (index + 2).toString();
		const name = index + 1 + (index + 1 > 1 ? " hrs" : " hr");
		return { id, name };
	}),
];

export const weekDaysOptions = [
	{ id: "1", name: "Weekdays" },
	{ id: "2", name: "Weekends" },
	{ id: "3", name: "I learn whenever I get time" },
	{ id: "4", name: `I don't like to plan` },
];

export const learningTimeOptions = Array.from({ length: 47 }, (_, index) => {
	const hours = Math.floor(index / 2) + 5; // Start at 5:00 AM
	const minutes = index % 2 === 0 ? "00" : "30"; // Alternate between 00 and 30 minutes
	const period = hours >= 12 ? "PM" : "AM"; // Adjust for AM/PM
	const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
	const id = (index + 1).toString();
	const name = `${formattedHours}:${minutes} ${period}`;
	return { id, name };
});

export const yesOrNoOptions = [
	{ id: "yes", name: "YES" },
	{ id: "No", name: "NO" },
];

export const timeSlotsOptions = [
	{ id: "1", name: "Saturday 1st Half" },
	{ id: "2", name: "Saturday 2nd Half" },
	{ id: "3", name: "Sunday 1st Half" },
	{ id: "4", name: "Sunday 2nd Half" },
];

export const domainOptions = [
	{ id: "1", name: "Academia" },
	{ id: "2", name: "Analytics" },
	{ id: "3", name: "Big data" },
	{ id: "4", name: "Business management" },
	{ id: "5", name: "Consulting" },
	{ id: "6", name: "Data science" },
	{ id: "7", name: "Finance" },
	{ id: "8", name: "Human Resource" },
	{ id: "9", name: "In-house counsel" },
	{ id: "10", name: "Law" },
	{ id: "11", name: "Litigation" },
	{ id: "12", name: "Machine learning" },
	{ id: "13", name: "Management" },
	{ id: "14", name: "Marketing" },
	{ id: "15", name: "Operations" },
	{ id: "16", name: "Product management" },
	{ id: "17", name: "Project management" },
	{ id: "18", name: "Sales" },
	{ id: "19", name: "Software development" },
	{ id: "20", name: "Strategy" },
	{ id: "21", name: "Other" },
];

export const internshipDurationOptions = [
	{ id: "1", name: "3 months" },
	{ id: "2", name: "6 months" },
	{ id: "3", name: "Others" },
];

export const whatWentWrongOptions = [
	{
		label: strings.PROBLEM_STATEMENT_AMBIGUOUS,
		value: strings.PROBLEM_STATEMENT_AMBIGUOUS,
	},
	{
		label: strings.FEEDBACK_MORE_DETAILED,
		value: strings.FEEDBACK_MORE_DETAILED,
	},
	{
		label: strings.EVALUATION_CRITERIA_UNCLEAR,
		value: strings.EVALUATION_CRITERIA_UNCLEAR,
	},
	{
		label: strings.GRADING_DELAYED,
		value: strings.GRADING_DELAYED,
	},
	{ label: strings.OTHERS_CAMEL, value: strings.OTHERS_CAMEL },
];
