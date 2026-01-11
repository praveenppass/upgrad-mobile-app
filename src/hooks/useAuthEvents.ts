import { C } from "@assets/constants";
import {
	ISection,
	IEventName,
	IEntityAction,
	IPageCategory,
	IComponentName,
} from "@interface/events.interface";
import { useAnalytics } from "./useAnalytics";

const { strings } = C;

export const useAuthEvents = () => {
	const { trackEvent } = useAnalytics();
	const commonEvents = {
		page_category: IPageCategory.LOGIN_PAGE,
	};

	const onLoginView = () => {
		trackEvent({
			eventName: IEventName.PAGE_LOADED,
			eventData: {
				...commonEvents,
			},
		});
	};

	const onTrackBackBtn = () => {
		trackEvent({
			eventName: IEventName.BACK_BUTTON,
			eventData: {
				page_category: IPageCategory.LOGIN_PAGE,
				section: ISection.OS_BUILT_IN,
			},
		});
	};

	const onCredentialsInputChange = (label: string, isPhone?: boolean) => {
		trackEvent({
			eventName: IEventName.MINIMAL_EDIT,
			eventData: {
				...commonEvents,
				label,
				section: ISection.LOGIN_DETAILS,
				medium: isPhone ? IEntityAction.PHONE : IEntityAction.EMAIL,
				component_name: isPhone
					? IComponentName.ENTER_PHONE
					: IComponentName.ENTER_EMAIL,
			},
		});
	};

	const onOtpChange = (otp: string, isPhone?: boolean) => {
		trackEvent({
			eventName: IEventName.MINIMAL_EDIT,
			eventData: {
				...commonEvents,
				label: otp,
				section: ISection.LOGIN_DETAILS,
				component_name: IComponentName.ENTER_OTP,
				medium: isPhone ? IEntityAction.PHONE : IEntityAction.EMAIL,
			},
		});
	};

	const onLoginClick = (isPhone?: boolean) => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...commonEvents,
				label: strings.LOG_IN,
				section: ISection.LOGIN_DETAILS,
				component_name: IComponentName.LOGIN_BTN,
				medium: isPhone ? IEntityAction.PHONE : IEntityAction.EMAIL,
			},
		});
	};

	const onClickGoogle = () => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...commonEvents,
				section: ISection.ALT_LOGIN,
				label: IComponentName.GOOGLE,
				component_name: IComponentName.GOOGLE,
			},
		});
	};

	const onCredError = (error_type: IComponentName, isPhone?: boolean) => {
		trackEvent({
			eventName: IEventName.ERROR_CAPTURED,
			eventData: {
				...commonEvents,
				component_name: error_type,
				section: ISection.LOGIN_DETAILS,
				error_message: IComponentName.INVALID_CRED,
				medium: isPhone ? IEntityAction.PHONE : IEntityAction.EMAIL,
			},
		});
	};

	const onClickResendOTP = (isPhone?: boolean) => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...commonEvents,
				label: strings.RESEND_OTP,
				section: ISection.LOGIN_DETAILS,
				component_name: IComponentName.RESEND_OTP,
				medium: isPhone ? IEntityAction.PHONE : IEntityAction.EMAIL,
			},
		});
	};

	const onClickCountry = (label: string) => {
		trackEvent({
			eventName: IEventName.EXPANSION,
			eventData: {
				...commonEvents,
				label,
				medium: IEntityAction.PHONE,
				section: ISection.LOGIN_DETAILS,
				component_name: IComponentName.COUNTRY_CODE,
			},
		});
	};

	const onChooseCountry = (label: string) => {
		trackEvent({
			eventName: IEventName.ACTION_BTN_CLICK,
			eventData: {
				...commonEvents,
				label,
				component_name: label,
				medium: IEntityAction.PHONE,
				section: IComponentName.COUNTRY_CODE,
			},
		});
	};

	const onSearchCountryCode = (label: string) => {
		trackEvent({
			eventName: IEventName.MINIMAL_EDIT,
			eventData: {
				...commonEvents,
				label,
				medium: IEntityAction.PHONE,
				section: IComponentName.COUNTRY_CODE,
				component_name: IComponentName.SEARCH_BAR,
			},
		});
	};

	const onCloseCountryModal = () => {
		trackEvent({
			eventName: IEventName.MODAL_CLOSE,
			eventData: {
				...commonEvents,
				label: IEntityAction.CLOSE,
				medium: IEntityAction.PHONE,
				component_name: IEntityAction.CLOSE,
				section: IComponentName.COUNTRY_CODE,
			},
		});
	};

	const onAuthSuccess = () => {
		trackEvent({
			eventName: IEventName.AUTH_SUCCESS,
			eventData: {
				...commonEvents,
				label: strings.LOG_IN,
				section: ISection.USER_TERMS_CONDITIONS,
				component_name: IComponentName.LOGIN_SUCCESS,
			},
		});
	};

	return {
		onLoginView,
		onCredError,
		onOtpChange,
		onLoginClick,
		onClickGoogle,
		onAuthSuccess,
		onClickCountry,
		onTrackBackBtn,
		onChooseCountry,
		onClickResendOTP,
		onCloseCountryModal,
		onSearchCountryCode,
		onCredentialsInputChange,
	};
};
