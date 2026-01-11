import axios, { AxiosInstance, AxiosResponse } from "axios";

import {
	IGetGooglePlaceDetails,
	IGetGooglePlacesPredictions,
	IGooglePlacesGeocodeResponse,
	IGooglePlacesPrediction,
	IGooglePlacesPredictionsResponse,
} from "@services/googlePlaces/googlePlaces.interface";

import { ENV } from "@config/env";

const GOOGLE_PLACES_BASE_URL = "https://maps.googleapis.com/maps/api";

const googlePlacesAxios: AxiosInstance = axios.create({
	baseURL: GOOGLE_PLACES_BASE_URL,
	timeout: 10000,
	params: {
		key: ENV.googlePlacesApiKey,
	},
});

export const getGooglePlacesPredictions = async ({
	input,
	types,
	components,
}: IGetGooglePlacesPredictions) => {
	try {
		const response: AxiosResponse<IGooglePlacesPredictionsResponse> =
			await googlePlacesAxios.get("/place/autocomplete/json", {
				params: { input, types, components },
			});
		return response.data.predictions || [];
	} catch (error) {
		return [];
	}
};

const getGooglePlacesGeocode = async (address: string) => {
	try {
		const response: AxiosResponse<IGooglePlacesGeocodeResponse> =
			await googlePlacesAxios.get("/geocode/json", {
				params: { address },
			});

		return response.data.results[0] || null;
	} catch (error) {
		return null;
	}
};

export const getGooglePlaceDetails = async ({
	placeName,
	placeType,
}: IGetGooglePlaceDetails) => {
	const geoCode = await getGooglePlacesGeocode(placeName);

	if (!geoCode) return null;

	const place = geoCode.address_components.find((component) =>
		component.types.includes(placeType),
	);

	return place || null;
};

export const mapGooglePlacesPredictions = (
	predictions: IGooglePlacesPrediction[],
) =>
	predictions.map(({ structured_formatting: { main_text } }) => ({
		label: main_text,
		value: main_text,
	}));
