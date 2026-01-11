import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import useMyTimezoneModel from "@screens/Tabs/MyProfile/MyTimezone/useMyTimezoneModel";

import { IDropdownInputItem } from "@components/Inputs/Dropdowns/common/dropdown.interface";
import {
	IDropdownFieldConfig,
	IProfileInputType,
} from "@components/MyProfile/common/profile.interface";
import {
	extractTimezoneFromLabel,
	getFieldValidations,
	getTimezoneLabel,
} from "@components/MyProfile/common/profile.util";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { getMasterData, IMasterDataKey } from "@services/cpsService";

import { setTimezone } from "@redux/slices/personalDetails.slice";
import { RootState } from "@redux/store/root.reducer";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

interface IFormValues {
	timezone?: IDropdownInputItem;
}

interface ITimezoneDetails {
	timezone: IDropdownFieldConfig;
}
const useMyTimezoneController = () => {
	const { showToast } = useToast();
	const navigation = useNavigation<RootHomeStackList>();
	const dispatch = useDispatch();
	const userCurrentTimezone = useSelector(
		(state: RootState) => state.personalDetails.timezone,
	);

	const { updateMyTimezone, updateMyTimezoneLoading } = useMyTimezoneModel();

	const { ...methods } = useForm<IFormValues>();

	const timezoneDetails: ITimezoneDetails = {
		timezone: {
			name: "timezone",
			type: IProfileInputType.DROPDOWN,
			isDisabled: false,
			order: 1,
			label: strings.TIMEZONE,
			isMandatory: true,
			isVisible: true,
			valuesDependency: {
				getValues: async () => {
					const data = await getMasterData(IMasterDataKey.TIMEZONE);

					if (!data) return [];

					return data.map(({ value, offset }) => ({
						label: getTimezoneLabel({
							timezone: value,
							offset: offset ?? "",
						}),
						value,
					}));
				},
			},
			isSearchEnabled: true,
			description: strings.MY_TIMEZONE_DESCRIPTION,
			validations: getFieldValidations({
				isMandatory: true,
			}),
		},
	};
	const fields = Object.values(timezoneDetails || {});
	const onError: SubmitErrorHandler<IFormValues> = (errors) => errors;
	const buttonDisabled = updateMyTimezoneLoading;

	useEffect(() => {
		const defaultValues = {
			timezone: userCurrentTimezone.name
				? {
						label: getTimezoneLabel({
							timezone: userCurrentTimezone.name,
							offset: userCurrentTimezone.offset,
						}),
						value: userCurrentTimezone.name,
					}
				: undefined,
		};

		methods.reset(defaultValues);
	}, [userCurrentTimezone]);

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		await updateMyTimezone({
			timezone: data.timezone?.value,
		});

		showToast({
			message: strings.SAVED_SUCCESSFULLY,
			type: ToastType.SUCCESS,
			duration: 1000,
		});
		const { name, offset } = extractTimezoneFromLabel(
			data.timezone?.label || "",
		);

		dispatch(setTimezone({ name, offset }));
		setTimeout(() => navigation.goBack(), 1200);
	};

	return {
		fields,
		methods,
		onError,
		loading: updateMyTimezoneLoading,
		buttonDisabled,
		onSubmit,
	};
};
export default useMyTimezoneController;
