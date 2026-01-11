import React from "react";

import { MAX_BOTTOM_TABS } from "@components/studyPlan/common/BottomTab/bottomTab.constants";
import {
	IBottomTabItem,
	IBottomTabType,
} from "@components/studyPlan/common/BottomTab/bottomTab.interface";

import { horizontalScale, verticalScale } from "@utils/functions";

import getString from "@strings/getString";
import { createStringConstants } from "@strings/utils/strings.utils";

import { colors } from "@assets/colors";
import { DownloadOutlineIcon } from "@assets/icons/svg/common";
import {
	AddNoteFillIcon,
	AddNoteOutlineIcon,
	BookmarksFillIcon,
	BookmarksOutlineIcon,
	CertificateFillIcon,
	CertificateOutlineIcon,
	ChatbotFillIcon,
	ChatbotOutlineIcon,
	Courses2FillIcon,
	Courses2OutlineIcon,
	CoursesFillIcon,
	CoursesOutlineIcon,
	NotesFillIcon,
	NotesOutlineIcon,
	PlannerFillIcon,
	PlannerOutlineIcon,
	ReportFillIcon,
	ReportOutlineIcon,
} from "@assets/icons/svg/studyPlan";

const { neutral } = colors;

export const getBottomTabs = (tabs: IBottomTabItem[]) => {
	const sortedTabs = tabs.sort((a, b) => a.order - b.order);

	const hasMoreTabs = sortedTabs.length > MAX_BOTTOM_TABS;

	if (hasMoreTabs)
		return {
			bottomTabs: sortedTabs.slice(0, MAX_BOTTOM_TABS - 1),
			showMoreTabs: sortedTabs.slice(MAX_BOTTOM_TABS - 1),
		};

	return {
		bottomTabs: sortedTabs,
		showMoreTabs: [],
	};
};

const STRINGS = createStringConstants({
	STUDY_PLAN: "studyPlan.bottomTab.studyPlan",
	COURSE_MENU: "studyPlan.bottomTab.courseMenu",
	PLANNER: "studyPlan.bottomTab.planner",
	CHATBOT: "studyPlan.bottomTab.chatbot",
	NOTES: "studyPlan.bottomTab.notes",
	BOOKMARKS: "studyPlan.bottomTab.bookmarks",
	ADD_NOTE: "studyPlan.bottomTab.addNote",
	REPORT: "studyPlan.bottomTab.report",
	SCORECARD: "studyPlan.bottomTab.scorecard",
	CERTIFICATE: "studyPlan.bottomTab.certificate",
});

export const getTabData = (tab: IBottomTabItem) => {
	switch (tab.id) {
		case IBottomTabType.CONTAINER2:
		case IBottomTabType.CONTAINER3:
			return {
				icon: (
					<CoursesOutlineIcon
						color={neutral.grey_06}
						width={horizontalScale(26)}
						height={verticalScale(22)}
					/>
				),
				activeIcon: (
					<CoursesFillIcon
						color={neutral.black}
						width={horizontalScale(26)}
						height={verticalScale(22)}
					/>
				),
				label: getString(STRINGS.STUDY_PLAN),
			};
		case IBottomTabType.CONTAINER6:
			return {
				icon: (
					<Courses2OutlineIcon
						color={neutral.grey_06}
						height={verticalScale(22)}
						width={horizontalScale(22)}
					/>
				),
				activeIcon: (
					<Courses2FillIcon
						color={neutral.black}
						height={verticalScale(22)}
						width={horizontalScale(22)}
					/>
				),
				label: getString(STRINGS.COURSE_MENU),
			};

		case IBottomTabType.PLANNER:
			return {
				icon: (
					<PlannerOutlineIcon
						color={neutral.grey_06}
						width={horizontalScale(22)}
						height={verticalScale(22)}
					/>
				),
				activeIcon: (
					<PlannerFillIcon
						color={neutral.black}
						width={horizontalScale(22)}
						height={verticalScale(22)}
					/>
				),
				label: getString(STRINGS.PLANNER),
			};

		case IBottomTabType.CHATBOT:
			return {
				icon: (
					<ChatbotOutlineIcon
						width={horizontalScale(34)}
						height={verticalScale(32)}
					/>
				),
				activeIcon: (
					<ChatbotFillIcon
						width={horizontalScale(34)}
						height={verticalScale(32)}
					/>
				),
				label: getString(STRINGS.CHATBOT),
			};

		case IBottomTabType.NOTES:
			return {
				icon: (
					<NotesOutlineIcon
						color={neutral.grey_06}
						height={verticalScale(24)}
						width={horizontalScale(22)}
					/>
				),
				activeIcon: (
					<NotesFillIcon
						color={neutral.black}
						height={verticalScale(24)}
						width={horizontalScale(22)}
					/>
				),
				label: getString(STRINGS.NOTES),
			};

		case IBottomTabType.BOOKMARKS:
			return {
				icon: (
					<BookmarksOutlineIcon
						color={neutral.grey_06}
						height={verticalScale(24)}
						width={horizontalScale(18)}
					/>
				),
				activeIcon: (
					<BookmarksFillIcon
						color={neutral.black}
						height={verticalScale(24)}
						width={horizontalScale(18)}
					/>
				),
				label: getString(STRINGS.BOOKMARKS),
			};

		case IBottomTabType.ADD_NOTE:
			return {
				icon: (
					<AddNoteOutlineIcon
						color={neutral.grey_06}
						width={horizontalScale(22)}
						height={verticalScale(22)}
					/>
				),
				activeIcon: (
					<AddNoteFillIcon
						color={neutral.black}
						width={horizontalScale(22)}
						height={verticalScale(22)}
					/>
				),
				label: getString(STRINGS.ADD_NOTE),
			};

		case IBottomTabType.REPORT:
			return {
				icon: (
					<ReportOutlineIcon
						color={neutral.grey_06}
						width={horizontalScale(22)}
						height={verticalScale(22)}
					/>
				),
				activeIcon: (
					<ReportFillIcon
						color={neutral.black}
						width={horizontalScale(22)}
						height={verticalScale(22)}
					/>
				),
				label: getString(STRINGS.REPORT),
			};

		case IBottomTabType.SCORECARD: {
			const Icon = (
				<DownloadOutlineIcon
					color={neutral.grey_06}
					width={horizontalScale(22)}
					height={verticalScale(22)}
				/>
			);

			return {
				icon: Icon,
				activeIcon: Icon,
				label: getString(STRINGS.SCORECARD), // TODO: Add scorecard string
			};
		}
		case IBottomTabType.CERTIFICATE:
			return {
				icon: (
					<CertificateOutlineIcon
						color={neutral.grey_06}
						width={horizontalScale(22)}
						height={verticalScale(22)}
					/>
				),
				activeIcon: (
					<CertificateFillIcon
						color={neutral.black}
						width={horizontalScale(22)}
						height={verticalScale(22)}
					/>
				),
				label: getString(STRINGS.CERTIFICATE),
			};
	}
};
