export enum IGooglePlacesTypes {
	COUNTRY = "country",
	STATE = "administrative_area_level_1",
	CITY = "(cities)",
}

export interface IGooglePlacesGeocodeResponse {
	results: IGooglePlacesGeocodeResult[];
}

interface IGooglePlacesGeocodeResult {
	address_components: IGooglePlacesGeocodeResultAddressComponent[];
}

interface IGooglePlacesGeocodeResultAddressComponent {
	types: string[];
	long_name: string;
	short_name: string;
}

export interface IGooglePlacesPrediction {
	description: string;
	place_id: string;
	structured_formatting: {
		main_text: string;
		secondary_text: string;
	};
}
export interface IGooglePlacesPredictionsResponse {
	predictions: IGooglePlacesPrediction[];
}

export interface IGetGooglePlacesPredictions {
	input: string;
	types: string;
	components?: string;
}

export interface IGetGooglePlaceDetails {
	placeName: string;
	placeType: IGooglePlacesTypes;
}
