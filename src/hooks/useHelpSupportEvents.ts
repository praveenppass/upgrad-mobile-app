import { useAnalytics } from "@hooks/useAnalytics";
import {
	ISection,
	IEventName,
	IPageCategory,
	IComponentName,
} from "@interface/events.interface";
import { strings } from "@assets/strings";
import {
	HELP_AND_SUPPORT_PAGE_LOADED,
	HELP_SUPPORT_EVENT,
} from "@interface/helpSupport.interface";

export const useHelpSupportEvents = () => {
	const { trackEvent } = useAnalytics();
	const commonParams = {
		page_category: IPageCategory.HELP_SUPPORT_EVENT,
	};

	const headerDropDownParams = {
		section: ISection.HEADER,
	};

	const onHelpSupportClicked = () => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				page_category: IPageCategory.PROFILE_PAGE,
				section: ISection.PROFILE,
				component_name: IComponentName.HELP_SUPPORT_EVENT,
				label: HELP_SUPPORT_EVENT.HELP_SUPPORT_EVENT,
			},
		});
	};

	const onHelpSupportScreenView = () => {
		trackEvent({
			eventName: IEventName.PAGE_LOADED,
			eventData: {
				...commonParams,
				label: HELP_AND_SUPPORT_PAGE_LOADED.HELP_SUPPORT_LOADED,
			},
		});
	};

	const onRaiseATicketClicked = () => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...commonParams,
				section: ISection.TICKET_LIST,
				component_name: IComponentName.RAISE_A_TICKET,
				label: IComponentName.RAISE_A_TICKET,
			},
		});
	};

	const onRaiseTicketEdit = (label: string, component_name: string) => {
		trackEvent({
			eventName: IEventName.MINIMAL_EDIT,
			eventData: {
				...commonParams,
				section: ISection.RAISE_A_TICKET,
				label: label,
				component_name,
			},
		});
	};

	const AddAttachmentClicked = () => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				section: ISection.RAISE_A_TICKET,
				component_name: IComponentName.ADD_ATTACHMENT,
				label: IComponentName.ADD_ATTACHMENT,
			},
		});
	};

	const RemoveAttachmentClicked = () => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				section: ISection.RAISE_A_TICKET,
				component_name: IComponentName.REMOVE_ATTACHMENT,
				label: IComponentName.REMOVE_ATTACHMENT,
			},
		});
	};

	const OnSubmitClicked = (
		course: string,
		category: string,
		entity_name: string,
	) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				section: ISection.RAISE_A_TICKET,
				component_name: IComponentName.SUBMIT_TICKET,
				label: IComponentName.RAISE_A_TICKET,
				entity_name: entity_name,
				additional_info: {
					course,
					category,
				},
			},
		});
	};

	const OnTabSwitch = (name: string) => {
		trackEvent({
			eventName: IEventName.TAB_SWITCHED,
			eventData: {
				...commonParams,
				...headerDropDownParams,
				component_name: name,
				label: name,
			},
		});
	};

	const onCreateNewTicketClicked = (currentTab: string) => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...commonParams,
				section: ISection.TICKET_LIST,
				component_name: IComponentName.NEW_TICKET,
				label: IComponentName.NEW_TICKET,
				current_tab: currentTab,
			},
		});
	};

	const onExpansionTicketCard = (
		entity_name: string,
		entity_action: boolean,
	) => {
		trackEvent({
			eventName: IEventName.EXPANSION,
			eventData: {
				...commonParams,
				section: ISection.TICKET_DETAILS,
				component_name: IComponentName.HEADER_DROPDOWN,
				label: IComponentName.HEADER_DROPDOWN,
				entity_name,
				entity_action,
			},
		});
	};

	const TicketCardClicked = (
		currentTab: string,
		entity_name: string,
		course: string,
		category: string,
	) => {
		trackEvent({
			eventName: IEventName.CARD_CLICK,
			eventData: {
				...commonParams,
				section: ISection.TICKET_LIST,
				component_name: IComponentName.TICKET_SELECTED,
				entity_name,
				label: IComponentName.TICKET_SELECTED,
				current_tab: currentTab,
				additional_info: {
					course,
					category,
				},
			},
		});
	};

	const onTicketDetailsScreenView = (entity_name: string) => {
		trackEvent({
			eventName: IEventName.PAGE_LOADED,
			eventData: {
				...commonParams,
				section: ISection.TICKET_DETAILS,
				label: strings.TICKET_DETAILS_LOADED,
				entity_name,
			},
		});
	};

	const ReopenTicketClicked = (
		entity_name: string,
		course: string,
		category: string,
	) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				section: ISection.TICKET_DETAILS,
				component_name: IComponentName.REOPEN_TICKET,
				label: IComponentName.REOPEN_TICKET,
				entity_name,
				additional_info: {
					course,
					category,
				},
			},
		});
	};

	const onConversationEdit = (label: string, entity_name: string) => {
		trackEvent({
			eventName: IEventName.MINIMAL_EDIT,
			eventData: {
				...commonParams,
				section: ISection.TICKET_DETAILS,
				component_name: IComponentName.ENTER_A_MESSAGE,
				label: label,
				entity_name: entity_name,
			},
		});
	};

	const AddAttachmentTicketDetailsClicked = (
		entity_name: string,
		course: string,
		category: string,
		name: string,
	) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				section: ISection.TICKET_DETAILS,
				component_name: name,
				label: name,
				entity_name,
				additional_info: {
					course,
					category,
				},
			},
		});
	};

	const RemoveAttachmentTicketDetailsClicked = (
		entity_name: string,
		course: string,
		category: string,
	) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonParams,
				section: ISection.TICKET_DETAILS,
				component_name: IComponentName.REMOVE_ATTACHMENT,
				label: IComponentName.REMOVE_ATTACHMENT,
				entity_name,
				additional_info: {
					course,
					category,
				},
			},
		});
	};

	const onRaiseTicketAttachmentSuccess = (
		course: string,
		category: string,
		name: string,
	) => {
		trackEvent({
			eventName: IEventName.POPUP_VIEWED,
			eventData: {
				...commonParams,
				section: ISection.RAISE_A_TICKET,
				component_name: name,
				label: name,
				additional_info: {
					course,
					category,
				},
			},
		});
	};

	const onAttachmentSuccess = (
		entity_name: string,
		course: string,
		category: string,
	) => {
		trackEvent({
			eventName: IEventName.POPUP_VIEWED,
			eventData: {
				...commonParams,
				section: ISection.TICKET_DETAILS,
				component_name: IComponentName.ATTACHMENT_ADDED,
				label: IComponentName.ATTACHMENT_ADDED,
				entity_name,
				additional_info: {
					course,
					category,
				},
			},
		});
	};

	return {
		onHelpSupportClicked,
		onHelpSupportScreenView,
		onRaiseATicketClicked,
		onRaiseTicketEdit,
		AddAttachmentClicked,
		onRaiseTicketAttachmentSuccess,
		AddAttachmentTicketDetailsClicked,
		OnSubmitClicked,
		RemoveAttachmentClicked,
		OnTabSwitch,
		onCreateNewTicketClicked,
		TicketCardClicked,
		onAttachmentSuccess,
		onTicketDetailsScreenView,
		ReopenTicketClicked,
		onConversationEdit,
		onExpansionTicketCard,
		RemoveAttachmentTicketDetailsClicked,
	};
};
