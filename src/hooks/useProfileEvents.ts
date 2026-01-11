import { useAnalytics } from "@hooks/useAnalytics";
import {
	ISection,
	IEventName,
	IEntityAction,
	IPageCategory,
	IComponentName,
} from "@interface/events.interface";
import { strings } from "@assets/strings";
import { IWorkExperienceInput } from "@interface/user.interface";

const createComponentName = (
	item: IWorkExperienceInput,
	defaultLabel: string,
) => {
	switch (item) {
		case IWorkExperienceInput.IsWorking:
			return {
				component_name: IComponentName.CURRENTLY_WORKING,
				label: strings.ARE_YOU_CURRENTLY_WORKING,
			};
		case IWorkExperienceInput.ExperienceYear:
			return {
				component_name: IComponentName.TOTAL_WORK_EXPERIENCE,
				label: strings.TOTAL_WORK_EXPERIENCE_IN_YEARS,
			};
		case IWorkExperienceInput.Organization:
			return {
				component_name: IComponentName.ORGANISATION,
				label: strings.CURRENT_ORGANIZATION,
			};
		case IWorkExperienceInput.Designation:
			return {
				component_name: IComponentName.DESIGNATON,
				label: strings.CURRENT_DESIGNATION,
			};
		case IWorkExperienceInput.Industry:
			return {
				component_name: IComponentName.INDUSTRY,
				label: strings.INDUSTRY,
			};
		case IWorkExperienceInput.Package:
			return {
				component_name: IComponentName.CURRENT_CTC,
				label: "NA", //* This input is removed for web / Mobile app?
			};
		case IWorkExperienceInput.CodingRequired:
			return {
				component_name: IComponentName.CODING_REQUIRED,
				label: strings.DOES_YOUR_JOB_REQUIRE_CODING,
			};
		default:
			return {
				component_name: item,
				label: defaultLabel,
			};
	}
};

export const useProfileEvents = () => {
	const { trackEvent } = useAnalytics();

	const commonParams = {
		page_category: IPageCategory.PROFILE_PAGE,
	};

	const workExpCommonParams = {
		page_category: IPageCategory.PROFILE_PAGE,
		section: ISection.EDIT_WORK_EXP,
	};

	const headerDropDownParams = {
		section: ISection.HEADER,
	};

	const onProfileView = () => {
		trackEvent({
			eventName: IEventName.PAGE_LOADED,
			eventData: {
				...commonParams,
				label: strings.PROFILE_PAGE_LOADED,
			},
		});
	};

	const EditIconClicked = () => {
		trackEvent({
			eventName: IEventName.ICON_CLICK,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				component_name: IComponentName.EDIT_PERSONAL_DETAILS,
				label: IComponentName.EDIT_PERSONAL_DETAILS,
			},
		});
	};

	const profilePicClicked = () => {
		trackEvent({
			eventName: IEventName.ICON_CLICK,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				component_name: IComponentName.EDIT_PROFILE_PIC,
				label: IComponentName.EDIT_PROFILE_PIC,
			},
		});
	};

	const onPersonalDetailsView = () => {
		trackEvent({
			eventName: IEventName.PAGE_LOADED,
			eventData: {
				...commonParams,
				section: ISection.PERSONAL_DETAILS,
				label: strings.PERSONAL_DETAILS_PAGE_LOADED,
			},
		});
	};

	const onMyAccountClicked = () => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				page_category: IPageCategory.PROFILE_PAGE,
				section: ISection.PROFILE,
				component_name: IComponentName.MY_ACCOUNT,
				label: strings.MY_ACCOUNT,
			},
		});
	};

	const onEditPersonalDetails = (name: string, value: string) => {
		trackEvent({
			eventName: IEventName.MINIMAL_EDIT,
			eventData: {
				...commonParams,
				section: IComponentName.EDIT_PERSONAL_DETAILS,
				component_name: name,
				label: value,
			},
		});
	};

	const ChooseValueOnDropdown = (name: string, value: string) => {
		trackEvent({
			eventName: IEventName.RESPONSE_EDIT,
			eventData: {
				...commonParams,
				section: IComponentName.EDIT_PERSONAL_DETAILS,
				component_name: name,
				label: value,
			},
		});
	};

	const chooseProfilePicOptions = (name: string) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				section: IComponentName.EDIT_PROFILE_PIC,
				component_name: name,
				label: name,
			},
		});
	};

	// My Account Section
	const onMyAccountView = () => {
		trackEvent({
			eventName: IEventName.PAGE_LOADED,
			eventData: {
				...commonParams,
				section: IEventName.MY_ACCOUNT_DETAILS,
				label: IEventName.MY_ACCOUNT_DETAILS,
			},
		});
	};

	// About
	const onAboutEditIconClicked = (label: string) => {
		trackEvent({
			eventName: IEventName.ICON_CLICK,
			eventData: {
				...commonParams,
				section: ISection.ABOUT,
				component_name: IComponentName.EDIT_ABOUT,
				label,
			},
		});
	};

	const onEditAbout = (aboutText: string) => {
		trackEvent({
			eventName: IEventName.MINIMAL_EDIT,
			eventData: {
				...commonParams,
				section: ISection.EDIT_ABOUT,
				component_name: IComponentName.ABOUT_ME,
				label: aboutText,
			},
		});
	};

	const onSaveAboutButtonClicked = (label: string) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				section: ISection.EDIT_ABOUT,
				component_name: IComponentName.SAVE,
				label,
			},
		});
	};

	const onMyAccountModalView = (sectionName: string) => {
		trackEvent({
			eventName: IEventName.MODAL_VIEW,
			eventData: {
				...commonParams,
				section: sectionName,
				label: sectionName,
			},
		});
	};

	// Certificate
	const onCertificateButtonClicked = (
		name: string,
		label: string,
		certificateName: string | undefined,
	) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				section: ISection.EDIT_CERTIFICATE,
				component_name: name,
				label,
				entity_name: certificateName,
			},
		});
	};

	// Education
	const EducationIconClicked = (label: string) => {
		trackEvent({
			eventName: IEventName.ICON_CLICK,
			eventData: {
				...commonParams,
				section: ISection.EDUCATION,
				component_name: IComponentName.EDIT_EDUCATION,
				label,
			},
		});
	};

	const SaveEducationClicked = () => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				section: IComponentName.EDIT_EDUCATION,
				component_name: IComponentName.SAVE,
				label: strings.UPDATE_EDUCATION,
			},
		});
	};

	const onEditTextEducation = (name: string, value: string) => {
		trackEvent({
			eventName: IEventName.MINIMAL_EDIT,
			eventData: {
				...commonParams,
				section: IComponentName.EDIT_EDUCATION,
				component_name: name,
				label: value,
			},
		});
	};

	const ChooseValueOnEducationDropdown = (
		name: string,
		value: string,
		optionSelected: string,
	) => {
		trackEvent({
			eventName: IEventName.RESPONSE_EDIT,
			eventData: {
				...commonParams,
				section: IComponentName.EDIT_EDUCATION,
				component_name: name,
				label: value,
				entity_name: optionSelected,
			},
		});
	};

	const AddEducationIconClicked = () => {
		trackEvent({
			eventName: IEventName.ICON_CLICK,
			eventData: {
				...commonParams,
				section: IComponentName.ADD_EDUCATION,
				component_name: IComponentName.ADD_ANOTHER,
				label: IComponentName.ADD_ANOTHER,
				entity_action: IEntityAction.ADD,
			},
		});
	};

	const onModalClose = (name: string | undefined) => {
		trackEvent({
			eventName: IEventName.MODAL_CLOSE,
			eventData: {
				...commonParams,
				section: name,
				component_name: IComponentName.BACK_BTN,
				label: IComponentName.BACK_BTN,
			},
		});
	};

	// Work Exp
	const onWorkExpScreenView = () => {
		trackEvent({
			eventName: IEventName.MODAL_VIEW,
			eventData: {
				...workExpCommonParams,
				label: ISection.EDIT_WORK_EXP,
			},
		});
	};

	const EditIconWorkExpClicked = (label: string) => {
		trackEvent({
			eventName: IEventName.ICON_CLICK,
			eventData: {
				...workExpCommonParams,
				component_name: ISection.EDIT_WORK_EXP,
				label,
			},
		});
	};

	const onSaveWorkExpButtonClicked = () => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...workExpCommonParams,
				component_name: IComponentName.SAVE,
				label: IComponentName.SAVE,
			},
		});
	};

	// Back button
	const onWorkExpModalClose = () => {
		trackEvent({
			eventName: IEventName.MODAL_CLOSE,
			eventData: {
				...workExpCommonParams,
				component_name: IComponentName.CLOSE,
				label: IComponentName.CLOSE,
			},
		});
	};

	const ChooseValueOnWorkExpDropdown = (
		name: IWorkExperienceInput,
		value: string,
		optionSelected: string,
	) => {
		trackEvent({
			eventName: IEventName.RESPONSE_EDIT,
			eventData: {
				...workExpCommonParams,
				...createComponentName(name, value),
				entity_name: optionSelected,
			},
		});
	};

	const AddWorkExpIconClicked = () => {
		trackEvent({
			eventName: IEventName.ICON_CLICK,
			eventData: {
				...workExpCommonParams,
				component_name: IComponentName.ADD_ANOTHER,
				label: IComponentName.ADD_ANOTHER,
				entity_action: IEntityAction.ADD,
			},
		});
	};

	return {
		onProfileView,
		AddWorkExpIconClicked,
		ChooseValueOnWorkExpDropdown,
		onWorkExpModalClose,
		AddEducationIconClicked,
		EditIconClicked,
		EditIconWorkExpClicked,
		ChooseValueOnEducationDropdown,
		onCertificateButtonClicked,
		profilePicClicked,
		onSaveWorkExpButtonClicked,
		onWorkExpScreenView,
		onPersonalDetailsView,
		onEditTextEducation,
		SaveEducationClicked,
		onMyAccountClicked,
		onEditPersonalDetails,
		ChooseValueOnDropdown,
		chooseProfilePicOptions,
		onMyAccountView,
		onAboutEditIconClicked,
		onMyAccountModalView,
		onEditAbout,
		onSaveAboutButtonClicked,
		EducationIconClicked,
		onModalClose,
	};
};
