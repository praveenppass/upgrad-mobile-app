import { IMenuItem } from "@interface/app.interface";

const sessionDropDownMenu: IMenuItem[] = [
	{
		title: "Re-Schedule",
		value: "Re-Schedule",
	},
	{
		title: "Cancel Session",
		value: "Cancel Session",
	},
];

const rescheduleDropDownMenu: IMenuItem[] = [
	{
		title: "Join",
		value: "Join",
	},
	{
		title: "Re-Schedule",
		value: "Re-Schedule",
	},
];

export { sessionDropDownMenu, rescheduleDropDownMenu };
