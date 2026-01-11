interface IMarketingWidgetsData {
	marketingWidgets: IMarketingWidgets;
}

interface IMarketingWidgets {
	totalCount: number;
	result: IWidgetResult[];
}

interface IWidgetResult {
	id: string;
	image: string;
	label: string;
	headline: string;
	title: string;
	status: string;
	order: number;
	startsAt: string;
	endsAt: string;
	type: string;
	action: IMarketingAction;
}

enum IMarketingActionType {
	button = "button",
}

interface IMarketingAction {
	link: string;
	actionType: IMarketingActionType;
}

export {
	type IWidgetResult,
	IMarketingActionType,
	type IMarketingAction,
	type IMarketingWidgets,
	type IMarketingWidgetsData,
};
