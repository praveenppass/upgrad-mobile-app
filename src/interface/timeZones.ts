interface ITimeZoneData {
	timezones?: {
		result: ITimeZone[];
	};
}

interface ITimeZone {
	id: string;
	name: string;
	offset: string;
	timezone: string;
}

export { type ITimeZone, type ITimeZoneData };
