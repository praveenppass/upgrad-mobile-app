import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import useContactDetailsModel from "@screens/Tabs/MyProfile/ContactDetails/useContactDetailsModel";

import {
	ICheckboxFieldConfig,
	IMobileNumberVerifyFieldConfig,
	IProfileInputType,
	ITextFieldConfig,
} from "@components/MyProfile/common/profile.interface";
import { getFieldValidations } from "@components/MyProfile/common/profile.util";
import { ToastType, useToast } from "@components/Reusable/Toast";

import { RootState } from "@redux/store/root.reducer";

import { RootHomeStackList } from "@interface/types/rootHomeStack.type";

import { strings } from "@assets/strings";

interface IFormValues {
	email?: string;
	mobile?: string;
	whatsAppMobile?: boolean;
	alternateEmail?: string;
	verify?: boolean;
}

interface IContactDetailsFields {
	mobile: IMobileNumberVerifyFieldConfig;
	email: ITextFieldConfig;
	alternateEmail: ITextFieldConfig;
	whatsAppMobile: ICheckboxFieldConfig;
}

const useContactDetailsController = () => {
	const {
		getUserContactDetails,
		contactDetails,
		getUserContactDetailsConfig,
		contactDetailsConfig,
		refetchUserContactDetails,
		contactDetailsConfigLoading,
		contactDetailsLoading,
		updateUserContactDetails,
		updateUserContactDetailsLoading,

		updateProfileSectionStatus,
		updateProfileSectionStatusLoading,
	} = useContactDetailsModel();

	const { showToast } = useToast();
	const navigation = useNavigation<RootHomeStackList>();

	useEffect(() => {
		getUserContactDetails();
		getUserContactDetailsConfig();
	}, []);

	const [contactDetailsFields, setContactDetailsFields] =
		useState<IContactDetailsFields | null>(null);

	useEffect(() => {
		if (!contactDetails || !contactDetailsConfig) return;

		const {
			userProfileConfigurationForLearner: {
				contactDetails: {
					fields: { alternateEmail, email, mobile, whatsAppMobile },
				},
			},
		} = contactDetailsConfig;

		const { user } = contactDetails;

		const contactDetailsMapped: IContactDetailsFields = {
			mobile: {
				name: "mobile",
				type: IProfileInputType.MOBILE_NUMBER_VERIFY,
				isDisabled: true,
				order: mobile.order,
				label: mobile.label,
				isMandatory: false, // TODO: Remove this once the mobile number is verified
				isVisible: mobile.show,
				validations: getFieldValidations({
					isMandatory: false, // TODO: Remove this once the mobile number is verified
					pattern: /^[6-9]\d{9}$/,
				}),
				placeholder: "Mobile Number",
				description: mobile.subText || "",
				isVerified: true,
				hideVerify: true,
				onVerifySuccess: async () => {
					await refetchUserContactDetails();

					methods.setValue("verify", true, { shouldDirty: true });
				},
			},

			email: {
				name: "email",
				type: IProfileInputType.TEXT,
				isDisabled: true,
				order: email.order,
				label: email.label,
				isMandatory: email.isMandatory,
				isVisible: email.show,
				validations: getFieldValidations({
					isMandatory: email.isMandatory,
					pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				}),
				description: email.subText || "",
			},
			whatsAppMobile: {
				name: "whatsAppMobile",
				type: IProfileInputType.CHECKBOX,
				isDisabled: false,
				order: whatsAppMobile.order,
				label: whatsAppMobile.label,
				isMandatory: whatsAppMobile.isMandatory,
				isVisible: whatsAppMobile.show,
				validations: getFieldValidations({
					isMandatory: whatsAppMobile.isMandatory,
				}),
				description: whatsAppMobile.subText || "",
			},
			alternateEmail: {
				name: "alternateEmail",
				type: IProfileInputType.TEXT,
				isDisabled: false,
				order: alternateEmail.order,
				label: alternateEmail.label,
				isMandatory: alternateEmail.isMandatory,
				isVisible: alternateEmail.show,
				validations: getFieldValidations({
					isMandatory: alternateEmail.isMandatory,
					pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				}),
				description: alternateEmail.subText || "",
			},
		};
		setContactDetailsFields(contactDetailsMapped);
	}, [contactDetails, contactDetailsConfig]);
	useEffect(() => {
		if (!contactDetails) return;

		const { user } = contactDetails;

		const defaultValues = {
			email: user.email || undefined,
			mobile: user.mobile?.replaceAll("-", "") || undefined,
			whatsAppMobile: !!user.whatsAppMobile,
			alternateEmail: user.alternateEmail || undefined,
			verify: false,
		};
		methods.reset(defaultValues);
	}, [contactDetails]);

	const fields = Object.values(contactDetailsFields || {})
		.filter((a) => a.isVisible)
		.sort((a, b) => a.order - b.order);

	const { ...methods } = useForm<IFormValues>();

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		const isWhatsappMobile = data.whatsAppMobile;

		await updateUserContactDetails({
			alternateEmail: data.alternateEmail,
			whatsAppNumber: isWhatsappMobile ? data.mobile : null,
			whatsAppNumberCountryCode: isWhatsappMobile ? "+91" : null,
		});

		await updateProfileSectionStatus();

		showToast({
			message: strings.SAVED_SUCCESSFULLY,
			type: ToastType.SUCCESS,
			duration: 1000,
		});

		setTimeout(() => navigation.goBack(), 1200);
	};

	const onError: SubmitErrorHandler<IFormValues> = (errors) => errors;

	const buttonDisabled =
		updateUserContactDetailsLoading || updateProfileSectionStatusLoading;
	const loading = contactDetailsConfigLoading || contactDetailsLoading;

	return {
		fields,
		methods,
		onSubmit,
		onError,
		buttonDisabled,
		loading,
	};
};

export default useContactDetailsController;
