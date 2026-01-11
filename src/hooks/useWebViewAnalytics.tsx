import { useSelector } from "react-redux";
import { RootState } from "@redux/store/root.reducer";
import { useAnalytics } from "./useAnalytics";
import {
	IComponentName,
	IEventName,
	IPageCategory,
	ISection,
} from "@interface/events.interface";
import { useEffect } from "react";
import { IWebViewEventEnum } from "@interface/app.interface";
import { IAssetType } from "@interface/asset.interface";

export const useWebViewTracker = (event?: IWebViewEventEnum) => {
	const { trackEvent } = useAnalytics();

	const selectedAsset = useSelector(
		(state: RootState) => state.studyPlan?.selectedAsset,
	);
	const courseVariant = useSelector(
		(state: RootState) => state.studyPlan?.courseVariant,
	);
	const courseCategory = useSelector(
		(state: RootState) => state.studyPlan?.courseCategory,
	);

	const defaultEventData = {
		entity_name: selectedAsset?.name,
		course_type: courseVariant,
		course_category: courseCategory,
		asset_type: IAssetType.ASSESSMENT,
	};

	useEffect(() => {
		triggerEvent();
	}, [event]);

	const triggerEvent = () => {
		if (event) {
			switch (event) {
				case IWebViewEventEnum.START_ASSESSMENT:
					startEvent();
					break;
				case IWebViewEventEnum.SUBMIT_ASSESSMENT:
					onSubmitEvent();
					break;
				case IWebViewEventEnum.VIEW_ASSESSMENT_REPORT:
					onSeeResults();
					break;
				case IWebViewEventEnum.RETAKE_ASSESSMENT:
					onRetakeAssessment();
					break;
				default:
					break;
			}
		}
	};

	const startEvent = () => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...defaultEventData,
				page_category: IPageCategory.COURSE_CONSUMPTION,
				section: ISection.ASSESSMENT_DETAILS,
				component_name: IComponentName.START_ASSESSMENT_BUTTON,
			},
		});
	};

	const pageLoadedEvent = () => {
		trackEvent({
			eventName: IEventName.PAGE_LOADED,
			eventData: {
				...defaultEventData,
				page_category: IPageCategory.ASSESSMENT_VIEW,
				section: ISection.ASSESSMENT_QUESTION,
			},
		});
	};

	const onSubmitEvent = () => {
		trackEvent({
			eventName: IEventName.POP_UP_VIEWED,
			eventData: {
				...defaultEventData,
				page_category: IPageCategory.ASSESSMENT_VIEW,
				section: ISection.ASSESSMENT_SUBMITTED,
			},
		});
	};

	const onSeeResults = () => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				page_category: IPageCategory.COURSE_CONSUMPTION,
				section: ISection.ASSESSMENT_FAILED_PASS,
				component_name: IComponentName.UNDERSTAND_MY_RESULTS,
				...defaultEventData,
			},
		});
	};

	const onRetakeAssessment = () => {
		trackEvent({
			eventName: IEventName.CTA_CLICK,
			eventData: {
				...defaultEventData,
				page_category: IPageCategory.COURSE_CONSUMPTION,
				section: ISection.ASSESSMENT_FAILED_PASS,
				component_name: IComponentName.RETAKE_ASSESSMENT,
			},
		});
	};

	return {
		startEvent,
		pageLoadedEvent,
		onSubmitEvent,
		onRetakeAssessment,
		onSeeResults,
	};
};
