import { type MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";

export interface HelpSupportTabData {
	tabs: IHelpSupportTabData[];
}

interface IHelpSupportTabData {
	component: React.FunctionComponent<{ tabName: string }>;
	name: string;
	options?: MaterialTopTabNavigationOptions;
	params?: {
		data?: unknown;
	};
	badge?: number;
}
